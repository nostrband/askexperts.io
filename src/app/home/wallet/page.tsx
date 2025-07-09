'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { storage } from '@/services/storage';
import { nwc } from '@getalby/sdk';
import { QRCodeSVG } from 'qrcode.react';

export default function WalletPage() {
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nwcClient, setNwcClient] = useState<nwc.NWCClient | null>(null);
  const [isConnectedWallet, setIsConnectedWallet] = useState(false);
  
  // Modal states
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState<number>(0);
  const [withdrawInvoice, setWithdrawInvoice] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [paymentHash, setPaymentHash] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'expired' | null>(null);
  
  // Polling interval reference
  const paymentCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Check if user is logged in, if not redirect to landing page
  useEffect(() => {
    if (!storage.isLoggedIn()) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const initializeWallet = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First check if we have a connected NWC string
        const connectedNwcString = storage.getConnectedNwcString();
        
        // If not, check for the regular NWC string from signup
        const nwcString = connectedNwcString || storage.getNwcString();
        
        if (!nwcString) {
          setError('No wallet connection found');
          setIsLoading(false);
          return;
        }
        
        // Set if this is a connected wallet or built-in wallet
        setIsConnectedWallet(!!connectedNwcString);
        
        // Initialize NWC client
        const client = new nwc.NWCClient({
          nostrWalletConnectUrl: nwcString,
        });
        
        setNwcClient(client);
        
        // Get balance
        const balanceResponse = await client.getBalance();
        setBalance(balanceResponse.balance);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing wallet:', err);
        setError('Failed to connect to wallet');
        setIsLoading(false);
      }
    };
    
    initializeWallet();
  }, []);
  
  // Function to check payment status
  const checkPaymentStatus = async () => {
    if (!nwcClient || !paymentHash) return;
    
    try {
      const invoiceStatus = await nwcClient.lookupInvoice({
        payment_hash: paymentHash,
      });
      
      if (invoiceStatus.settled_at && invoiceStatus.settled_at > 0) {
        // Payment received
        setPaymentStatus('paid');
        
        // Clear the interval
        if (paymentCheckInterval.current) {
          clearInterval(paymentCheckInterval.current);
          paymentCheckInterval.current = null;
        }
        
        // Update balance
        const balanceResponse = await nwcClient.getBalance();
        setBalance(balanceResponse.balance);
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
    }
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
      }
    };
  }, []);
  
  // Start polling when payment hash is set
  useEffect(() => {
    if (paymentHash && paymentStatus === 'pending' && !paymentCheckInterval.current) {
      // Check immediately
      checkPaymentStatus();
      
      // Then set up interval (every 3 seconds)
      paymentCheckInterval.current = setInterval(checkPaymentStatus, 3000);
    }
    
    return () => {
      if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
        paymentCheckInterval.current = null;
      }
    };
  }, [paymentHash, paymentStatus]);
  
  const handleTopup = async () => {
    if (!nwcClient) {
      setError('Wallet not connected');
      return;
    }
    
    if (topupAmount <= 0) {
      return;
    }
    
    try {
      setIsLoading(true);
      // Reset payment status
      setPaymentStatus('pending');
      setPaymentHash(null);
      
      // Use the nwcClient to create an invoice
      const invoiceResponse = await nwcClient.makeInvoice({
        amount: topupAmount * 1000, // sats to ms
        description: 'Topup AskExperts wallet',
        expiry: 2 * 60, // 2 minutes
      });
      
      setInvoice(invoiceResponse.invoice);
      setPaymentHash(invoiceResponse.payment_hash);
      setIsLoading(false);
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError('Failed to create invoice');
      setIsLoading(false);
    }
  };
  
  const handleWithdraw = async () => {
    if (!nwcClient) {
      setError('Wallet not connected');
      return;
    }
    
    if (!withdrawInvoice) {
      return;
    }
    
    try {
      setIsWithdrawing(true);
      
      // Use the nwcClient to pay the invoice
      await nwcClient.payInvoice({
        invoice: withdrawInvoice,
      });
      
      // Update balance
      const balanceResponse = await nwcClient.getBalance();
      setBalance(balanceResponse.balance);
      
      // Reset and close modal
      setWithdrawInvoice('');
      setIsWithdrawModalOpen(false);
      setIsWithdrawing(false);
    } catch (err) {
      console.error('Error paying invoice:', err);
      setError('Failed to pay invoice');
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {isConnectedWallet ? 'Connected wallet' : 'Wallet'}
      </h1>
      
      {/* Balance display */}
      <div className="flex flex-col items-center justify-center my-8">
        {isLoading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex items-center text-4xl font-bold">
            <span className="text-[#F7931A] mr-2">₿</span>
            <span>{balance !== null ? Math.floor(balance / 1000) : '---'}</span>
          </div>
        )}
      </div>
      
      {/* Action buttons - only show for built-in wallet */}
      {!isConnectedWallet && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => setIsTopupModalOpen(true)}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            Topup
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => setIsWithdrawModalOpen(true)}
            disabled={isLoading}
          >
            Withdraw
          </Button>
        </div>
      )}
      
      {/* Topup Modal */}
      {isTopupModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Topup wallet</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsTopupModalOpen(false);
                  // Clear interval when closing modal
                  if (paymentCheckInterval.current) {
                    clearInterval(paymentCheckInterval.current);
                    paymentCheckInterval.current = null;
                  }
                  // Reset payment status
                  setPaymentStatus(null);
                  setPaymentHash(null);
                  setTopupAmount(0);
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              {paymentStatus === 'paid' ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-64 h-64 flex items-center justify-center">
                    <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                      <svg
                        className="w-20 h-20 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-green-600 mt-4">
                    Payment received!
                  </p>
                </div>
              ) : invoice ? (
                <>
                  <p className="mb-4 text-center">
                    Scan this QR code using your Lightning Wallet
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-lg">
                      {/* QR code using qrcode.react */}
                      <QRCodeSVG
                        value={invoice}
                        size={256}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Invoice will expire in 2 minutes
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#6A4C93] mr-2"></div>
                      <p className="text-sm text-[#6A4C93]">
                        Waiting for payment...
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (sats)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A4C93]"
                    value={topupAmount || ''}
                    onChange={(e) => setTopupAmount(parseInt(e.target.value) || 0)}
                    placeholder="Enter amount in sats"
                    min="1"
                  />
                </>
              )}
            </div>
            
            <div className="flex justify-end">
              {paymentStatus === 'paid' ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsTopupModalOpen(false);
                    // Reset payment status
                    setPaymentStatus(null);
                    setPaymentHash(null);
                    setTopupAmount(0);
                    setInvoice(null);
                  }}
                >
                  Done
                </Button>
              ) : invoice ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsTopupModalOpen(false);
                    // Clear interval when closing modal
                    if (paymentCheckInterval.current) {
                      clearInterval(paymentCheckInterval.current);
                      paymentCheckInterval.current = null;
                    }
                    // Reset payment status
                    setPaymentStatus(null);
                    setPaymentHash(null);
                    setTopupAmount(0);
                    setInvoice(null);
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleTopup}
                  disabled={isLoading || topupAmount <= 0}
                >
                  Generate Invoice
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Withdraw funds</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setWithdrawInvoice('');
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lightning Invoice
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A4C93]"
                value={withdrawInvoice}
                onChange={(e) => setWithdrawInvoice(e.target.value)}
                placeholder="Invoice"
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setWithdrawInvoice('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleWithdraw}
                disabled={isWithdrawing || !withdrawInvoice}
              >
                {isWithdrawing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Withdrawing...</span>
                  </div>
                ) : (
                  "Withdraw"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}