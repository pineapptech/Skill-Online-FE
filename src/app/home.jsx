import React from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/hero-section";
import LogosSection from "@/components/home/logos-section";
import OurGoalSection from "@/components/home/our-goal-section";
import GetStartedSection from "@/components/home/get-started-section";
import OurCoursesSection from "@/components/home/our-courses-section";
import ApplicationProcessSection from "@/components/home/application-process-section";
import AboutSection from "@/components/home/about-section";
import ContactSection from "@/components/home/contact-section";
import Newsletter from "@/components/home/newsletter";
import Footer from "@/components/footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogosSection />
      <OurGoalSection />
      <GetStartedSection />
      <OurCoursesSection />
      <ApplicationProcessSection />
      <AboutSection />
      <ContactSection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Homepage;
