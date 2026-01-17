"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import HowItWorks from "./components/HowItWorks";
import MenuPricing from "./components/MenuPricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Loader from "./components/Loader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 3.5 seconds to allow animations (steam, chef) to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <MenuPricing />
      <Testimonials />
      <CTA />
    </>
  );
}
