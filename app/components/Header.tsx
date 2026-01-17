"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Header() {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="fixed top-0 z-50 w-full h-20 bg-white/90 backdrop-blur-md shadow-sm transition-colors duration-300">
      <nav className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="#hero" className="flex items-center gap-2">
          <Image 
            src="/images/loader-bg.png" 
            alt="Swadify Logo" 
            width={60} 
            height={60} 
            className="object-contain"
            unoptimized
          />
          <span className="text-xl font-bold text-orange-600">Swadify Kitchen</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-semibold text-black">
          <li>
            <Link href="#hero" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
          </li>
          {/* <li>
         <Link href="#menu" className="hover:text-orange-600 transition-colors">
             Menu
            </Link>
          </li> */}
          <li>
            <Link href="#contact" className="hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </li>
          <li>
            <Link href="#menu-pricing" className="hover:text-orange-600 transition-colors">
              Menu&Pricing
            </Link>
          </li>
          <li>
            <Link href="#testimonials" className="hover:text-orange-600 transition-colors">
              Testimonials
            </Link>
          </li>
          <li>
              <Link
                href="#HowItWorks"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                How It Works
              </Link>
         
            </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
        <button
          className="text-2xl text-black"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col gap-4 px-4 py-4 font-semibold text-black">
            <li>
              <Link
                href="#hero"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              {/* <Link
                href="#menu"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                Menu
              </Link> */}
            </li>
            <li>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="#menu-pricing"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                Menu Pricing
              </Link>
            </li>
            <li>
              <Link
                href="#testimonials"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                Testimonials
              </Link>
            </li>
             <li>
              <Link
                href="#HowItWorks"
                onClick={() => setOpen(false)}
                className="hover:text-orange-600 transition-colors"
              >
                How It Works
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
