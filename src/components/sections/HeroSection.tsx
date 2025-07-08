import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

export default function HeroSection() {
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
              href="https://github.com/yourusername/askexperts.io" 
              variant="primary"
              className="text-lg px-8"
              external
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
                  sizes="(max-width: 768px) 100vw, 768px" /* max-w-3xl = 768px */
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