import React from 'react';
// import Link from 'next/link'; // Commented out as it's not currently used

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            {/* <Link href="/" className="flex items-center">
              <div className="w-40 h-12 relative overflow-hidden">
                <img
                  src="/logo.jpeg"
                  alt="askexperts.io"
                  className="object-contain brightness-[0.9]"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectPosition: 'left center',
                    filter: 'brightness(2)'
                  }}
                />
              </div>
            </Link> */}
            <p className="text-gray-400 mt-2">
              AskExperts: open protocol for expert AI.
            </p>
          </div>
          
          {/* Commented out for closed beta
          <div className="flex flex-wrap gap-8">
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="https://github.com/nostrband/askexperts" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#docs" className="text-gray-400 hover:text-white">
                    Docs
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="https://primal.net/artur" className="text-gray-400 hover:text-white">
                    Nostr
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          */}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          
          {/* Commented out for closed beta
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
}