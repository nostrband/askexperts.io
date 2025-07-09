import React from 'react';
import Button from '../ui/Button';

export default function ForBuildersSection() {
  return (
    <section id="for-builders" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            For Builders
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-[#F7931A]">💡</span> Your Knowledge &rarr; Your AI Expert
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#F7931A] mr-2">✓</span>
                    <p>Package your expertise as an AI Expert — prompts, tools, your knowledge base.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F7931A] mr-2">✓</span>
                    <p>Build and host yourself, or use our scalable infrastructure.</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#F7931A] mr-2">✓</span>
                    <p>Get paid in Bitcoin directly — no intermediaries.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F7931A] mr-2">✓</span>
                    <p>Promote your Expert, make your knowledge work 24/7.</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                href="https://github.com/nostrband/askexperts/blob/main/NIP-174.md" 
                variant="primary"
              >
                Explore the Protocol →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}