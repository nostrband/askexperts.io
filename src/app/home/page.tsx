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
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Welcome to AskExperts.io</h1>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
        <p className="text-gray-600 mb-4">
          You've successfully set up your AskExperts.io account. From here, you can manage your settings,
          view your usage, and access additional resources.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Button
            variant="primary"
            onClick={() => router.push('/home/onboarding')}
          >
            Configure MCP Server
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => router.push('/home/onboarding/wallet')}
          >
            Wallet Settings
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => {
              storage.clearUserData();
              router.push('/');
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}