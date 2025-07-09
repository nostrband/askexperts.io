'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/services/storage';

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
      {/* Header is now in HomeHeader component */}
      
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Connect to our MCP server and start asking experts
          </h1>
          <p className="text-gray-600">
            More features coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}