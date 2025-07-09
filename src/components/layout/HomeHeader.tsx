'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { storage } from '@/services/storage';
import { nwc } from '@getalby/sdk';

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // First check if we have a connected NWC string
        const connectedNwcString = storage.getConnectedNwcString();
        
        // If not, check for the regular NWC string from signup
        const nwcString = connectedNwcString || storage.getNwcString();
        
        if (!nwcString) {
          setIsLoading(false);
          return;
        }
        
        // Initialize NWC client
        const client = new nwc.NWCClient({
          nostrWalletConnectUrl: nwcString,
        });
        
        // Get balance
        const balanceResponse = await client.getBalance();
        setBalance(balanceResponse.balance);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching wallet balance:', err);
        setIsLoading(false);
      }
    };
    
    fetchBalance();
  }, []);

  return (
    <header className="border-b border-gray-100 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-40 h-12 relative overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="askexperts.io"
              fill
              className="object-contain"
              style={{
                objectPosition: 'left center'
              }}
            />
          </div>
        </Link>
        
        <div className="flex items-center">
          {/* Bitcoin Balance */}
          <div className="mr-4 flex items-center">
            <span className="text-[#F7931A] mr-1">₿</span>
            {isLoading ? (
              <div className="w-6 h-4 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              <span>{balance !== null ? Math.floor(balance / 1000) : '0'}</span>
            )}
          </div>
          
          {/* Burger Menu */}
          <div className="relative">
            <button 
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                <Link
                  href="/home"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/home/mcp"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  MCP Server
                </Link>
                <Link
                  href="/home/wallet"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wallet
                </Link>
                {/* <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    storage.clearUserData();
                    router.push('/');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}