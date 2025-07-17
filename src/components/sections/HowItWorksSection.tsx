import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import StepCard from "../ui/StepCard";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/atom-one-dark.css";

// Register the languages you need
hljs.registerLanguage("json", json);

// Define the code as a constant to reuse
const mcpServerCode = `{
  "mcpServers": {
    "askexperts": {
      "command": "npx",
      "args": [
        "-y",
        "askexperts",
        "smart"
      ],
      "env": {
        "NWC_STRING": "<your nwc connection string>",
        "OPENAI_API_KEY": "<your openrouter key>",
        "OPENAI_BASE_URL": "https://openrouter.ai/api/v1"
      }
    }
  }
}`;

export default function HowItWorksSection() {
  const jsonCodeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Apply highlighting when component mounts
    if (jsonCodeRef.current) {
      hljs.highlightElement(jsonCodeRef.current);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(mcpServerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const steps = [
    {
      number: 1,
      title: "Ask for Experts",
      description:
        "Add our MCP server and give your AI tools to find and ask experts.",
    },
    {
      number: 2,
      title: "Experts Bid to Answer",
      description:
        "Experts discover a summary of your question and bid to answer it.",
    },
    {
      number: 3,
      title: "Encrypted Q&A",
      description:
        "Your AI selects experts, they get paid and answer your detailed question.",
    },
  ];

  const products = [
    { name: "Claude Desktop", logo: "/logos/claude.png" },
    { name: "Cline", logo: "/logos/cline.png" },
    { name: "Cursor", logo: "/logos/cursor.png" },
    { name: "Goose", logo: "/logos/goose.png" },
    { name: "LibreChat", logo: "/logos/librechat.png" },
    { name: "VSCode", logo: "/logos/vscode.png" },
    { name: "Windsurf", logo: "/logos/windsurf.svg" },
    { name: "Zed", logo: "/logos/zed.png" },
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

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Works With Your AI Tools
            </h3>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto relative flex-1">
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded z-10 cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <pre className="rounded-lg text-sm font-mono p-0 text-left">
                  <code
                    ref={jsonCodeRef}
                    className="language-json hljs p-4 block"
                  >
                    {mcpServerCode}
                  </code>
                </pre>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 flex items-center">
                {products.map((product) => (
                  <div
                    key={product.name}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="w-10 h-10 mb-2 relative flex items-center justify-center">
                      <Image
                        src={product.logo}
                        alt={`${product.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-lg max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-center">
                      {product.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
