'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#2A9D8F] via-[#6A4C93] to-[#F26430] text-transparent bg-clip-text">💬 Ask Experts</span><br/>Powered by Human Knowledge<br/>In Your AI Chat
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Open Protocol.<br/>End-to-end Encrypted.<br/>Lightning Payments.<br/>Freedom Tech.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              className="text-lg px-8"
              onClick={async () => {
                try {
                  // Check if user data already exists in localStorage
                  const existingUserData = storage.getUserData();
                  
                  if (existingUserData) {
                    // User already signed up, redirect directly to onboarding
                    router.push('/home/onboarding');
                    return;
                  }
                  
                  // Show loading state (could add a loading state to Button component)
                  const userData = await api.signup();
                  
                  // Save user data to localStorage
                  storage.saveUserData(userData);
                  
                  // Redirect to onboarding page
                  router.push('/home/onboarding');
                } catch (error) {
                  console.error('Error during signup:', error);
                  // Could add error handling/notification here
                }
              }}
            >
              ⚡ Get Started
            </Button>
            
            <Button 
              href="#how-it-works" 
              variant="secondary"
              className="text-lg px-8"
            >
              How It Works →
            </Button>
          </div>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Protocol Diagram</h3>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-3xl h-[600px]">
                <Image
                  src="/diagram.svg"
                  alt="Protocol Diagram showing AI chat → Expert Discovery → Encrypted Q&A → Lightning payment"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}