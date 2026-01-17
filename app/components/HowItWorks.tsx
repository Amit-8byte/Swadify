"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Choose Your Plan",
    description: "Select a meal plan that fits your office size and dietary preferences. Flexible options for every team.",
  },
  {
    id: "02",
    title: "We Cook Fresh",
    description: "Our chefs prepare home-style, hygienic meals daily using premium ingredients. No preservatives.",
  },
  {
    id: "03",
    title: "We Deliver Warm",
    description: "On-time delivery directly to your office desk. Enjoy hot, delicious food without the hassle.",
  },
];

export default function HowItWorks() {
  return (
    <section id="HowItWorks" className="bg-orange-50 px-4 md:px-6 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            How Swadify Works
          </h2>
          <p className="mt-4 text-lg text-neutral-800 max-w-2xl mx-auto">
            Three simple steps to upgrade your corporate dining experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-orange-100 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 text-9xl font-bold text-orange-50 opacity-50 select-none">
                {step.id}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                <p className="text-neutral-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
