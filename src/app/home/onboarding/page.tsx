"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { storage } from "@/services/storage";

// App options for the dropdown
const appOptions = [
  { name: "Claude", logo: "/logos/claude.png" },
  { name: "Cline", logo: "/logos/cline.png" },
  { name: "Cursor", logo: "/logos/cursor.png" },
  { name: "RooCode", logo: "/logos/roocode.png" },
  { name: "Goose", logo: "/logos/goose.png" },
  { name: "LibreChat", logo: "/logos/librechat.png" },
  { name: "VS Code", logo: "/logos/vscode.png" },
  { name: "Zed", logo: "/logos/zed.png" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [userData, setUserData] = useState<{
    token: string;
    mcp_server_url: string;
  } | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const data = storage.getUserData();
    if (data) {
      setUserData(data);
    } else {
      // Redirect to home if no user data
      router.push("/");
    }
  }, [router]);

  const handleAppSelect = (appName: string) => {
    setSelectedApp(appName);
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleSkip = () => {
    router.push("/home/onboarding/wallet");
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Ask in AI chats</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        To add the <em>ask experts</em> tools to your AI chat app, you need to
        configure a connection to our MCP server.
      </p>

      <div className="flex flex-col gap-4 items-center">
        <div className="relative w-full">
          <Button
            variant="primary"
            className="w-full flex items-center justify-between"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Configure MCP server</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </Button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                {appOptions.map((app) => (
                  <li key={app.name}>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                      onClick={() => handleAppSelect(app.name)}
                    >
                      <div className="w-8 h-8 relative mr-3">
                        <Image
                          src={app.logo}
                          alt={app.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      {app.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button variant="secondary" onClick={handleSkip}>
          Skip for now
        </Button>
      </div>

      {/* Modal for app configuration */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 relative mr-3">
                <Image
                  src={
                    appOptions.find((app) => app.name === selectedApp)?.logo ||
                    ""
                  }
                  alt={selectedApp}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-bold">{selectedApp} Configuration</h2>
              <button
                className="ml-auto text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-4">
                Follow these steps to configure the MCP server in {selectedApp}:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Open {selectedApp} settings</li>
                <li>Navigate to Extensions or Plugins section</li>
                <li>
                  Add a new MCP server with the following config:
                  <div className="mt-2 mb-2">
                    <div className="bg-gray-100 rounded p-3 relative">
                      <button
                        className={`absolute top-2 right-2 rounded p-1 transition-colors ${
                          isCopied
                            ? "bg-green-100 text-green-600"
                            : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (typeof navigator !== 'undefined' && navigator.clipboard) {
                            const config = `{
  "askexperts": {
    "type": "streamable-http",
    "url": "${userData?.mcp_server_url || ''}",
    "headers": {
      "Authorization": "Bearer ${userData?.token || ''}"
    }
  }
}`;
                            navigator.clipboard.writeText(config);
                            setIsCopied(true);
                            setTimeout(() => {
                              setIsCopied(false);
                            }, 2000);
                          }
                        }}
                        title={isCopied ? "Copied!" : "Copy to clipboard"}
                      >
                        {isCopied ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 8v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2z"
                            ></path>
                          </svg>
                        )}
                      </button>
                      <pre className="overflow-x-auto text-sm">
                        <code>
{`{
  "askexperts": {
    "type": "streamable-http",
    "url": "${userData?.mcp_server_url || ''}",
    "headers": {
      "Authorization": "Bearer ${userData?.token || ''}"
    }
  }
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </li>
                <li>Save the configuration</li>
              </ol>
            </div>

            <div className="flex justify-end">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false);
                  router.push("/home/onboarding/wallet");
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
