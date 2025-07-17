'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { storage } from '@/services/storage';
import { showComingSoonDialog } from '@/services/dialog';

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
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
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#how-it-works" className="text-gray-600 hover:text-[#0F172A]">
            How It Works
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-[#0F172A]">
            Features
          </Link>
          <Link href="#for-builders" className="text-gray-600 hover:text-[#0F172A]">
            For Builders
          </Link>
          <Link href="https://github.com/nostrband/askexperts" className="text-gray-600 hover:text-[#0F172A]">
            Docs
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="primary"
            onClick={showComingSoonDialog}
          >
            ⚡ Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}