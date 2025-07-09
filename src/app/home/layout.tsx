'use client';

import React from 'react';
import { Inter } from "next/font/google";
import HomeHeader from '../../components/layout/HomeHeader';

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
      <HomeHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}