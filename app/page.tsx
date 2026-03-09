// This is your home page
// It only imports sections - NO logic here at all
// Each section manages its own code internally

import HeroSection from "@/components/sections/HeroSection";
import TickerSection from "@/components/sections/TickerSection";
import BrandMarquee from "@/components/sections/BrandMarquee";
import HowItWorks from "@/components/sections/HowItWorks";
import CreatorNetwork from "@/components/sections/CreatorNetwork";
import StatsBand from "@/components/sections/StatsBand";
import VideoGallery from "@/components/sections/VideoGallery";
import CampaignTypes from "@/components/sections/CampaignTypes";
import FaqSection from "@/components/sections/FaqSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import DualCta from "@/components/sections/DualCta";
import Modal from "@/components/ui/Modal";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DualCta />
      <TickerSection />
      <BrandMarquee />
      <HowItWorks />
      <CreatorNetwork />
      <StatsBand />
      <VideoGallery />
      <CampaignTypes />
      <NewsletterSection />
      <FaqSection />

      {/* Modal lives here so it's available to VideoGallery clicks */}
      <Modal />
    </>
  );
}