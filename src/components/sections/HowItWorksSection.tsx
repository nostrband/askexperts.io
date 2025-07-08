import React from 'react';
import Image from 'next/image';
import StepCard from '../ui/StepCard';

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Ask for Experts",
      description: "Add our MCP server and give your AI tools to find and ask experts."
    },
    {
      number: 2,
      title: "Experts Bid to Answer",
      description: "Experts discover a summary of your question and bid to answer it."
    },
    {
      number: 3,
      title: "Encrypted Q&A",
      description: "Your AI selects experts, they get paid and answer your detailed question."
    }
  ];

  const products = [
    { name: "Claude Desktop", logo: "/logos/claude.png" },
    { name: "Cline", logo: "/logos/cline.png" },
    { name: "Cursor", logo: "/logos/cursor.png" },
    { name: "Goose", logo: "/logos/goose.png" },
    { name: "LibreChat", logo: "/logos/librechat.png" },
    { name: "VSCode", logo: "/logos/vscode.png" },
    { name: "Windsurf", logo: "/logos/windsurf.svg" },
    { name: "Zed", logo: "/logos/zed.png" }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-6">Works With Your AI Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.name} className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-2 relative flex items-center justify-center">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={64}
                      height={64}
                      className="rounded-lg max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{product.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}