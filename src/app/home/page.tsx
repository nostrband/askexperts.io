'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/services/storage';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();

  // Check if user is logged in, if not redirect to landing page
  useEffect(() => {
    if (!storage.isLoggedIn()) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#6A4C93]">AskExperts Chat</h1>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => router.push('/home/onboarding')}
            className="text-sm px-3 py-1"
          >
            Configure MCP
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => router.push('/home/onboarding/wallet')}
            className="text-sm px-3 py-1"
          >
            Wallet
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => {
              storage.clearUserData();
              router.push('/');
            }}
            className="text-sm px-3 py-1"
          >
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Chat messages area (empty for now) */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* This area will be populated with chat messages in the future */}
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg mb-2">Welcome to AskExperts</p>
            <p>Ask a question to get started</p>
          </div>
        </div>
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 pr-28 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#6A4C93] shadow-sm"
              placeholder="Ask experts anything"
            />
            <div className="absolute bottom-4 right-4">
              <Button
                variant="primary"
                className="rounded-full px-6 py-2 font-medium"
              >
                Ask
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}