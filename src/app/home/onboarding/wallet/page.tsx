'use client';

import React from 'react';
import Button from '@/components/ui/Button';

export default function WalletPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Wallet</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        This section will be defined later. Here you will be able to configure your Bitcoin Lightning wallet.
      </p>
      
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={() => {
            // This will be implemented later
            console.log('Wallet configuration completed');
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}