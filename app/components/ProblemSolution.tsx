"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

export default function ProblemSolution() {
  return (
    <section className="bg-white px-4 md:px-6 py-8 md:py-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center mb-8">
          The Problem & Our Solution
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ============ PROBLEM SLIDER ============ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-red-50 rounded-3xl p-8 md:p-10 border border-red-100 relative"
          >
            <div className="absolute top-0 left-0 bg-red-100 text-red-800 px-6 py-2 rounded-br-2xl font-bold text-sm uppercase tracking-wide">
              The Struggle
            </div>
            <div className="mt-8 h-full flex flex-col justify-center">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="w-full pb-10"
              >
                {[
                  "Employees feeling sluggish after oily, unhealthy lunches.",
                  "Inconsistent delivery times disrupting meetings and workflow.",
                  "Limited variety leading to daily food boredom.",
                  "Hygiene concerns with unverified local vendors.",
                ].map((text, i) => (
                  <SwiperSlide key={i}>
                    <div className="min-h-45 flex items-center justify-center text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 leading-tight">
                        &ldquo;{text}&rdquo;
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* ============ SOLUTION SLIDER ============ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-green-50 rounded-3xl p-8 md:p-10 border border-green-100 relative"
          >
            <div className="absolute top-0 left-0 bg-green-100 text-green-800 px-6 py-2 rounded-br-2xl font-bold text-sm uppercase tracking-wide">
              The Swadify Fix
            </div>
            <div className="mt-8 h-full flex flex-col justify-center">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="w-full pb-10"
              >
                {[
                  "Nutritious, home-style meals that boost energy.",
                  "Guaranteed on-time delivery, every single day.",
                  "Rotating menus with North, South, and Asian options.",
                  "Strict hygiene checks and premium packaging.",
                ].map((text, i) => (
                  <SwiperSlide key={i}>
                    <div className="min-h-45 flex items-center justify-center text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 leading-tight">
                        &ldquo;{text}&rdquo;
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
