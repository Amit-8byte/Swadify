
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* ================= BACKGROUND SECTION ================= */}
      {/* Suggestion: Add a subtle food pattern or the logo as a large watermark here */}
      {/* Path: /public/images/loader-bg.png */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
         <Image 
            src="/images/loader-bg.png" 
            alt="Background Pattern" 
            fill 
            className="object-contain"
            priority
            unoptimized
         />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* ================= CHEF & ANIMATIONS ================= */}
        <div className="relative mb-8 w-80 h-80 flex items-center justify-center">
            
            {/* --- Steam Animation --- */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-3">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-12 bg-neutral-300 rounded-full blur-[2px]"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ 
                            y: [-15, -60], 
                            opacity: [0, 0.6, 0],
                            scaleY: [1, 1.5]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>

            {/* --- Chef Image --- */}
            {/* Path: /public/images/chef.png */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-64 h-64 md:w-80 md:h-80 relative z-10 flex items-center justify-center"
            >
                 <Image 
                    src="/images/chef.png" 
                    alt="Swadify Chef" 
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    unoptimized
                 />
            </motion.div>

            {/* --- Floating Food Items --- */}
            {/* Paths: /public/images/chilli.png, /public/images/food-item.png */}
            {[
                { src: "/images/chilli.png", x: -170, y: -50, delay: 0.6, rotate: -15 },
                { src: "/images/vegetable.png", x: 170, y: -70, delay: 0.8, rotate: 15 },
                { src: "/images/food-bowl.png", x: -120, y: 150, delay: 1.0, rotate: -10 },
                { src: "/images/carrot.png", x: 150, y: 130, delay: 1.2, rotate: 10 },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute z-0"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        x: item.x, 
                        y: item.y,
                        rotate: item.rotate 
                    }}
                    transition={{ 
                        duration: 0.6, 
                        delay: item.delay, 
                        type: "spring",
                        stiffness: 100 
                    }}
                >
                    <Image 
                        src={item.src} 
                        alt="Food item" 
                        width={80} 
                        height={80} 
                        className="object-contain drop-shadow-md" 
                        unoptimized
                    />
                </motion.div>
            ))}
        </div>

        {/* ================= TEXT SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-orange-600 tracking-tight drop-shadow-sm">
            Welcome to Swadify
          </h1>
          <p className="mt-3 text-lg text-neutral-600 font-medium">
            Freshness Loading...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
