"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CTA() {
  // TODO: Replace with your actual Google Maps location URL
  const googleMapsUrl = "https://www.google.com/maps/place/28%C2%B035'51.2%22N+76%C2%B059'02.2%22E/@28.597559,76.9813729,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.597559!4d76.9839478?hl=en&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", address: "", message: "" });
      } else {
        setSubmitStatus("error");
        console.error("Web3Forms Error:", result);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-orange-600 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side Content */}
          <div className="flex flex-col justify-center text-left space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              We are ready to deliver food and answer your questions
            </h2>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-orange-100 border-b-2 border-orange-400 pb-2 inline-block">
                Our Details
              </h3>
              
              <div className="space-y-4 text-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-orange-200 text-sm font-bold uppercase tracking-wider mb-1">Contact Number</p>
                    <p className="font-semibold">+91 9868918083</p> {/* Placeholder for Contact Number */}
                    <p className="font-semibold">+91 9599521306</p> {/* Placeholder for second number */}
                    <p className="font-semibold">+91 8076700377</p> {/* Placeholder for second number */}
                  </div>
                  
                  <div>
                    <p className="text-orange-200 text-sm font-bold uppercase tracking-wider mb-1">Email</p>
                    <p className="font-semibold">contact@swadifykitchen.com</p> {/* Placeholder for Email */}
                  </div>
                </div>

                <div>
                  <h4 className="text-orange-200 text-sm font-bold uppercase tracking-wider mb-1">Location</h4>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <p className="font-semibold group-hover:text-orange-200 transition-colors">
                      E2b gali number 1 ,Roshan Vihar  <br/>
                      Najafgarh ,New delhi
                    </p>
                    <span className="text-sm text-orange-200 underline mt-1 inline-block group-hover:text-white transition-colors">
                      View on Google Maps
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl text-neutral-800 h-full flex flex-col justify-center"
          >
          {submitStatus === "success" ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
              <p className="text-neutral-600">Thank you for contacting us. We will respond shortly.</p>
              <button 
                onClick={() => setSubmitStatus("idle")}
                className="mt-6 text-orange-600 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-neutral-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:ring-orange-200'} focus:border-orange-500 focus:ring-4 outline-none transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-neutral-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:ring-orange-200'} focus:border-orange-500 focus:ring-4 outline-none transition-all`}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-neutral-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:ring-orange-200'} focus:border-orange-500 focus:ring-4 outline-none transition-all`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-bold text-neutral-700 mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:ring-orange-200'} focus:border-orange-500 focus:ring-4 outline-none transition-all`}
                    placeholder="123 Business Park, Tech City"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-neutral-700 mb-2">Enquiry / Suggestions</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-neutral-300 focus:ring-orange-200'} focus:border-orange-500 focus:ring-4 outline-none transition-all resize-none`}
                  placeholder="Tell us about your requirements..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "error" && (
                <p className="text-red-500 text-center font-medium">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          )}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
