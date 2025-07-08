import React from 'react';

export default function AudienceSection() {
  const audiencePoints = [
    "AI with real domain expertise",
    "Bitcoin-native payments with no fiat required",
    "Self-hosted infrastructure — your rules, your data",
    "Open protocols, no vendor lock-in"
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Who This is For
          </h2>
          
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h3 className="text-xl font-semibold mb-6">If You Care About:</h3>
            
            <ul className="space-y-4 mb-8">
              {audiencePoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✅</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-lg font-medium text-center">
              You&apos;re in the right place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}