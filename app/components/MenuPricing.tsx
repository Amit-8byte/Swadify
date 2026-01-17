"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "North Indian",
    price: "₹149",
    description: "Classic flavors, comforting taste.",
    features: ["2 Roti / Paratha", "Rice & Dal", "Seasonal Sabzi", "Salad & Pickle"],
    recommended: false,
  },
  {
    name: "South Indian",
    price: "₹149",
    description: "Light, healthy, and authentic.",
    features: ["Rice / Roti", "Sambar & Rasam", "Poriyal / Kootu", "Curd & Papad"],
    recommended: true,
  },
  {
    name: "Chinese Combo",
    price: "₹169",
    description: "Zesty twist to your daily lunch.",
    features: ["Fried Rice / Noodles", "Manchurian / Gravy", "Spring Roll (2pcs)", "Kimchi Salad"],
    recommended: false,
  },
];

export default function MenuPricing() {
  return (
    <section id="menu-pricing" className="bg-white px-4 md:px-6 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-800">
            Choose the perfect plan for your team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border ${
                plan.recommended ? "border-orange-500 ring-4 ring-orange-50" : "border-neutral-200"
              } flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
              <p className="text-neutral-600 mb-6">{plan.description}</p>
              <div className="text-4xl font-extrabold text-orange-600 mb-6">
                {plan.price}<span className="text-lg text-neutral-500 font-medium">/meal</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-neutral-800">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
                plan.recommended 
                  ? "bg-orange-600 text-white hover:bg-orange-700" 
                  : "bg-orange-50 text-orange-700 hover:bg-orange-100"
              }`}>
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
