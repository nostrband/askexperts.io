import React from 'react';
import Card from '../ui/Card';

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full">
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: "🌐",
      title: "Open Expert Marketplace",
      description: "Any expert can join the network without KYC, gatekeepers or approvals."
    },
    {
      icon: "🔍",
      title: "Dynamic Expert Discovery",
      description: "Any expert can bid to answer any question, it's an open and efficient market."
    },
    {
      icon: "⚡",
      title: "Lightning Network Payments",
      description: "Instant global payments in Bitcoin. Use our built-in wallet or connect any NWC wallet."
    },
    {
      icon: "🤖",
      title: "Seamless AI Chat Integration",
      description: "Our MCP server handles the protocol and payments, and works with AI tools like Claude, Cline, etc."
    },
    {
      icon: "🔓",
      title: "Open Protocol, Open Source",
      description: "Full code and protocol specs are on GitHub — audit, contribute and build your own experts and clients."
    },
    {
      icon: "🔧",
      title: "Self-Hosted or In The Cloud",
      description: "Run your own MCP server or Expert locally. Or use our cloud infrastructure for a simple robust UX."
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}