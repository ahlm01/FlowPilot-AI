"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const handleScrollClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#F5F0E6] overflow-hidden"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-weave pointer-events-none opacity-45" />

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-24 md:py-32">
        
        {/* Left Column: Poetic Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Fabric Swatch Eyebrow */}
            <div className="inline-block border border-[#2C3E50]/20 px-3 py-1 bg-[#E8DCC8]/40">
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-medium text-[#2C3E50]">
                Est. 2018 — Kyoto & Paris
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-serif font-light text-[#2B2320] leading-[1.1] md:leading-[1.05]">
              Handcrafted <br />
              <span className="italic text-[#2C3E50] font-normal">materiality</span>, <br />
              slowly woven.
            </h1>

            {/* Poetic description */}
            <p className="max-w-md text-sm md:text-base text-[#2B2320]/80 font-sans leading-relaxed tracking-wide">
              A boutique textile design atelier dedicated to raw materials, 
              ancient botanical dyes, and hand-loomed artifacts. Each thread 
              holds a story of origin, craft, and unhurried time.
            </p>

            {/* Explore Button */}
            <div className="pt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center text-xs uppercase tracking-[0.25em] font-medium text-[#2B2320] py-3 transition-colors duration-300"
              >
                <span>Discover the craft</span>
                <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2320] scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Lookbook Image */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] lg:aspect-[3/4] flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative border border-[#2C3E50]/10 p-4 bg-[#E8DCC8]/30 shadow-md backdrop-blur-sm"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/cover_fabric.jpg"
                alt="Organic hand-woven linen fabric draped in studio"
                fill
                priority
                className="object-cover transition-transform duration-[2s] hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            {/* Soft decorative swatch stamp */}
            <div className="absolute bottom-6 right-6 bg-[#F5F0E6] border border-[#2C3E50]/15 px-3 py-2 text-center shadow-sm">
              <span className="block text-[8px] font-sans tracking-[0.2em] uppercase text-[#6B8CAE]">
                SWATCH NO.
              </span>
              <span className="block text-xs font-serif italic text-[#2C3E50]">
                L-102
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <button
          onClick={handleScrollClick}
          className="group flex flex-col items-center space-y-2 focus:outline-none"
          aria-label="Scroll to About Section"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#2B2320]/60 font-sans group-hover:text-[#2C3E50] transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-[#2C3E50]/30 group-hover:bg-[#2C3E50] transition-colors"
          />
        </button>
      </div>
    </section>
  );
}
