"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-white  px-4 md:px-6 py-8 md:py-12 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* ================= TEXT SLIDER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
          >
            <SwiperSlide>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
                Home-Style Food for Corporate Offices
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-800 font-medium">
                Daily fresh meals that feel like home, built for working teams.
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
                Hygienic • Reliable • On-Time
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-800 font-medium">
                No more unhealthy lunches or delivery chaos.
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight">
                Built for Corporate Teams
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-800 font-medium">
                Consistent quality with scalable meal plans.
              </p>
            </SwiperSlide>
          </Swiper>
        </motion.div>

        {/* ================= IMAGE SLIDER ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            className="rounded-xl overflow-hidden"
          >
            <SwiperSlide>
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <Image
                  src="/images/Screen1.jpg"
                  alt="Delicious Corporate Meal 1"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <Image
                  src="/images/Screen2.jpg"
                  alt="Delicious Corporate Meal 2"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <Image
                  src="/images/Screen3.jpg"
                  alt="Delicious Corporate Meal 3"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}
