'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { storage } from '@/services/storage';
import { nwc } from '@getalby/sdk';
import { QRCodeSVG } from 'qrcode.react';

const TOPUP_AMOUNT_SATS = 1000;
const EXPIRY_MIN = 2;

export default function WalletPage() {
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nwcClient, setNwcClient] = useState<nwc.NWCClient | null>(null);
  
  // Modal states
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectString, setConnectString] = useState('');
  const [connectError, setConnectError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [paymentHash, setPaymentHash] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'expired' | null>(null);
  
  // Polling interval reference
  const paymentCheckInterval = useRef<NodeJS.Timeout | null>(null);

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
    
    // Save NWC string from signup to localStorage if not already saved
    const userData = storage.getUserData();
    if (userData?.nwc && !storage.getNwcString()) {
      storage.saveNwcString(userData.nwc);
    }
    
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
  }, [paymentHash, paymentStatus, checkPaymentStatus]);
  
  const handleTopup = async () => {
    if (!nwcClient) {
      setError('Wallet not connected');
      return;
    }
    
    try {
      setIsLoading(true);
      // Reset payment status
      setPaymentStatus('pending');
      setPaymentHash(null);
      
      // Use the nwcClient to create an invoice
      const invoiceResponse = await nwcClient.makeInvoice({
        amount: TOPUP_AMOUNT_SATS * 1000, // sats to ms
        description: 'Topup AskExperts wallet',
        expiry: EXPIRY_MIN * 60,
      });
      
      setInvoice(invoiceResponse.invoice);
      setPaymentHash(invoiceResponse.payment_hash);
      setIsTopupModalOpen(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError('Failed to create invoice');
      setIsLoading(false);
    }
  };
  
  const handleConnect = async () => {
    if (!connectString) {
      setConnectError('Please enter a valid NWC connection string');
      return;
    }
    
    try {
      setIsLoading(true);
      setConnectError(null);
      
      // Initialize new NWC client with provided string
      const client = new nwc.NWCClient({
        nostrWalletConnectUrl: connectString,
      });
      
      // Test connection by getting balance
      const balanceResponse = await client.getBalance();
      
      // If successful, save the connected string
      storage.saveConnectedNwcString(connectString);
      setNwcClient(client);
      setBalance(balanceResponse.balance);
      
      // Close modal and reset form
      setIsConnectModalOpen(false);
      setConnectString('');
      setIsLoading(false);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setConnectError('Failed to connect to wallet. Please check your connection string.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Wallet</h1>
      
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
      
      {/* Info text */}
      <p className="text-lg text-gray-600 mb-8 text-center">
        Experts are paid for each answer. Topup the built-in wallet or connect your own.
      </p>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="primary"
          onClick={handleTopup}
          disabled={isLoading}
          className="flex items-center justify-center"
        >
          Topup with ₿ {TOPUP_AMOUNT_SATS}
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => setIsConnectModalOpen(true)}
          disabled={isLoading}
        >
          Connect wallet
        </Button>
      </div>
      
      {/* Continue button - only shown when balance > 0 */}
      {balance !== null && Math.floor(balance / 1000) > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            onClick={() => router.push('/home')}
            className="w-full sm:w-auto px-8"
          >
            Continue
          </Button>
        </div>
      )}
      
      {/* Topup Modal */}
      {isTopupModalOpen && invoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Topup with ₿ {TOPUP_AMOUNT_SATS}</h2>
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
              ) : (
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
                      Invoice will expire in {EXPIRY_MIN} minutes
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#6A4C93] mr-2"></div>
                      <p className="text-sm text-[#6A4C93]">
                        Waiting for payment...
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant={paymentStatus === 'paid' ? "primary" : "secondary"}
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
                }}
              >
                {paymentStatus === 'paid' ? "Done" : "Close"}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Connect Wallet Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Connect wallet</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsConnectModalOpen(false);
                  setConnectError(null);
                  setConnectString('');
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
                NWC connection string
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A4C93]"
                value={connectString}
                onChange={(e) => setConnectString(e.target.value)}
                placeholder="nostr+walletconnect://..."
              />
              {connectError && (
                <p className="mt-2 text-sm text-red-600">{connectError}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => {
                  setIsConnectModalOpen(false);
                  setConnectError(null);
                  setConnectString('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConnect}
                disabled={isLoading || !connectString}
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}