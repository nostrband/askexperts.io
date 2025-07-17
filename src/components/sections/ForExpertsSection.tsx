import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.css';

// Register the languages you need
hljs.registerLanguage('typescript', typescript);

export default function ForExpertsSection() {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Apply highlighting when component mounts
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);
  return (
    <section id="for-experts" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            For Experts
          </h2>

          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-[#F7931A]">💡</span> Your Knowledge &rarr; Your AI Expert
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#F7931A] mr-2">✓</span>
                    <p>Package your expertise as an AI Expert — models, prompts, tools, context.</p>
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

          <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-[#F7931A]">💻</span> Build Your Own Expert
            </h2>
            
            <div className="mb-8 overflow-x-auto">
              <pre className="rounded-lg text-sm font-mono p-0">
                <code ref={codeRef} className="language-typescript hljs p-4 block">
{`import { AskExpertsServer } from 'askexperts/expert';

const expert = new AskExpertsServer({
  privkey,
  discoveryRelays: ['wss://relay1.askexperts.io'],
  hashtags: ['ai', 'help', 'javascript'],
  onAsk: async (ask) => ({
    offer: "I can help with your AI-related JavaScript question!"
  }),
  onPrompt: async (prompt) => {
    const invoice = await createLightningInvoice(100);
    return { invoices: [{ invoice }] };
  },
  onProof: async (prompt, expertQuote, proof) => ({
    content: 'This is my answer.'
  })
});

await expert.start();`}
                </code>
              </pre>
            </div>
            
            <div className="text-center">
              <Button
                href="https://github.com/nostrband/askexperts/tree/main?tab=readme-ov-file#expert-server-usage"
                variant="primary"
              >
                Learn more →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}