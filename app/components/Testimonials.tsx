"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

interface Feedback {
  id?: string;
  name: string;
  message: string;
  designation?: string;
  rating: number;
  link?: string;
  image?: string;
}

export default function Testimonials() {
  const manualFeedbacks: Feedback[] = [
    {
      name: "QUA LOAN",
      message: "Swadify has transformed our office lunches. The food is consistently fresh, hygienic, and tastes just like a home-cooked meal. Highly recommended!", 
      designation: "Floor Manager",
      rating: 5,
      link: "https://qualoan.com",
      image: "/images/qualoan-logo.png",
    },
    {
      name: "QUA LOAN",
      message: "Managing lunch for the team used to be a hassle, but Swadify made it seamless. Great variety and punctual delivery every single day.",
      designation: "Team Leader",
      rating: 5,
      link: "https://qualoan.com",
      image: "/images/qualoan-logo.png",
    },
   
  ];

  const [feedbacks, setFeedbacks] = useState<Feedback[]>(manualFeedbacks);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFeedbacks((prev) => [...prev, ...data]);
      })
      .catch((err) => console.error("Failed to fetch feedback", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newFeedback = await res.json();
        setFeedbacks([newFeedback.data, ...feedbacks]);
        setShowForm(false);
        setFormData({ name: "", message: "", rating: 5 });
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const pin = prompt("Enter Admin PIN to delete this review:");
    if (!pin) return;

    try {
      const res = await fetch(`/api/feedback?id=${id}&pin=${pin}`, { method: "DELETE" });
      if (res.ok) {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert("Incorrect PIN. Deletion failed.");
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <section id="testimonials" className="bg-orange-50 px-4 md:px-6 py-8 md:py-12 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-neutral-800">
            Real feedback from corporate teams who love our food.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="mb-8">
          {feedbacks.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              loop
              className="pb-12"
            >
              {feedbacks.map((feedback, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 h-full flex flex-col relative group">
                    {/* Delete Button (Visible on Hover) */}
                    {feedback.id && (
                      <button
                        onClick={() => handleDelete(feedback.id!)}
                        className="absolute top-4 right-4 text-neutral-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Delete Review"
                      >
                        ✕
                      </button>
                    )}
                    <div className="flex text-orange-500 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-xl">
                          {i < feedback.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <div className="mb-6 flex-1">
                      <p className="text-neutral-700 italic mb-2">
                        &ldquo;{feedback.message}&rdquo;
                      </p>
                      {feedback.designation && (
                        <p className="text-sm text-neutral-500 font-bold">{feedback.designation}</p>
                      )}
                    </div>
                    <div className="flex items-center mt-auto">
                      {feedback.image ? (
                        <div className="w-10 h-10 relative mr-3 rounded-full overflow-hidden border border-neutral-100 bg-white">
                          <Image
                            src={feedback.image}
                            alt={feedback.name}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold mr-3">
                          {feedback.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col">
                        {feedback.link ? (
                          <a
                            href={feedback.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-black hover:text-orange-600 transition-colors leading-tight"
                          >
                            {feedback.name}
                          </a>
                        ) : (
                          <span className="font-bold text-black leading-tight">{feedback.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-neutral-500">Loading reviews...</p>
          )}
        </div>

        {/* Feedback Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors"
          >
            {showForm ? "Close Form" : "Write a Review"}
          </button>
        </div>

        {/* Feedback Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Company / Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-black bg-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Rating</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-black bg-white"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Review</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-black bg-white"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-600 text-blackpy-3 rounded-xl font-bold hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
