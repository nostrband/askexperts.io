import React from 'react';
import { Inter } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} font-sans antialiased min-h-screen bg-white`}>
      <header className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center">
            <div className="w-40 h-12 relative overflow-hidden">
              <Image
                src="/logo.jpeg"
                alt="askexperts.io"
                fill
                className="object-contain"
                style={{
                  objectPosition: 'left center'
                }}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}