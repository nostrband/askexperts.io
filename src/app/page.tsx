import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ForBuildersSection from '@/components/sections/ForBuildersSection';
import CommunitySection from '@/components/sections/CommunitySection';
// Commented out unused sections
// import CTASection from '@/components/sections/CTASection';
// import AudienceSection from '@/components/sections/AudienceSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ForBuildersSection />
        {/* <CTASection />
        <AudienceSection /> */}
        <CommunitySection />
      </main>
      <Footer />
    </>
  );
}
