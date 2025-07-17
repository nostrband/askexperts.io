import React from 'react';
import Button from '../ui/Button';

export default function CommunitySection() {
  const communityActions = [
    "Join the conversation",
    "Review the protocol",
    "Build your Experts",
    "Send PRs"
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Community & Contribution
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            We&apos;re building this for open AI builders, Bitcoiners, and those who believe expertise should be decentralized.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {communityActions.map((action, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 flex items-center justify-center text-center"
              >
                <p className="font-medium">{action}</p>
              </div>
            ))}
          </div>
          
          <Button 
            href="https://github.com/nostrband/askexperts" 
            variant="primary"
            external
            className="text-lg px-8"
          >
            View the Code & Docs →
          </Button>
        </div>
      </div>
    </section>
  );
}