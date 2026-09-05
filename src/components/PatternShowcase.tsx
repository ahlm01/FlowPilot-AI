"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const MOTIFS = [
  {
    id: 1,
    name: "Wild Fern Stamp",
    category: "Resist Motif",
    description: "Carved from cherry wood and applied using resist rice-paste.",
    image: "/images/print_detail.jpg",
  },
  {
    id: 2,
    name: "Tension Grid Motif",
    category: "Weave Draft",
    description: "Graphic draft representing dynamic shift in yarn weights.",
    image: "/images/weave_detail.jpg",
  },
  {
    id: 3,
    name: "Botanical Leaf Stamp",
    category: "Block Print",
    description: "Hand-inked organic shapes carved from linoleum block.",
    image: "/images/applied_cushion.jpg",
  },
];

const PATTERNS = [
  {
    id: "indigo-repeat",
    name: "Sugi Leaves Resist",
    description: "Inspired by cedar foliage along the mountain trails of northern Kyoto. Shibori clamp resist dyed on cotton linen canvas.",
    image: "/images/tiled_pattern_indigo.jpg",
  },
];

export default function PatternShowcase() {
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0]);
  const [isTiled, setIsTiled] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <section id="patterns" className="py-24 md:py-32 bg-[#F5F0E6] relative">
      <div className="absolute inset-0 bg-weave pointer-events-none opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#6B8CAE]">
            DESIGN DRAFTS & REPEATS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2B2320]">
            Motifs & Repeating Patterns
          </h2>
        </div>

        {/* Top Section: Interactive Pattern Repeat Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Side: Detail & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] tracking-widest uppercase font-sans text-[#6B8CAE]">
                SELECTED PATTERN SCALE STUDY
              </span>
              <h3 className="font-serif text-2xl text-[#2B2320]">
                {selectedPattern.name}
              </h3>
              <p className="text-xs text-[#2B2320]/60 font-sans italic">
                Repeated yardage study
              </p>
            </div>
            
            <p className="text-sm text-[#2B2320]/80 leading-relaxed font-sans tracking-wide">
              {selectedPattern.description}
            </p>

            {/* Toggle Switch */}
            <div className="pt-4 flex flex-col space-y-3">
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#6B8CAE]">
                Toggle Visual Scale
              </span>
              
              <div className="inline-flex bg-[#E8DCC8]/40 border border-[#2C3E50]/10 p-1 w-max">
                <button
                  onClick={() => setIsTiled(false)}
                  className={`text-[10px] uppercase tracking-widest px-4 py-2 font-sans transition-all duration-300 ${
                    !isTiled
                      ? "bg-[#2C3E50] text-[#F5F0E6] shadow-sm"
                      : "text-[#2B2320]/70 hover:text-[#2B2320]"
                  }`}
                >
                  Single Unit
                </button>
                <button
                  onClick={() => setIsTiled(true)}
                  className={`text-[10px] uppercase tracking-widest px-4 py-2 font-sans transition-all duration-300 ${
                    isTiled
                      ? "bg-[#2C3E50] text-[#F5F0E6] shadow-sm"
                      : "text-[#2B2320]/70 hover:text-[#2B2320]"
                  }`}
                >
                  Tiled Repeat
                </button>
              </div>
            </div>

            {/* Scale metadata label */}
            <div className="text-[10px] text-[#2B2320]/50 font-mono tracking-wider space-y-1 pt-4 border-t border-[#2C3E50]/10">
              <p>REPEATING UNIT: 16cm × 16cm</p>
              <p>MORTON VAT NO. 02 (INDIGO NATURAL RESIST)</p>
            </div>
          </div>

          {/* Right Side: Visual repeat display container */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full border border-[#2C3E50]/15 p-4 bg-[#E8DCC8]/20 shadow-md">
              <div className="relative w-full h-full bg-[#F5F0E6] overflow-hidden flex items-center justify-center">
                {isTiled ? (
                  /* Repeated / tiled background */
                  <div
                    className="absolute inset-0 transition-all duration-500 ease-in-out"
                    style={{
                      backgroundImage: `url(${selectedPattern.image})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "160px 160px",
                    }}
                  />
                ) : (
                  /* Single unit image centered */
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="relative w-[70%] aspect-square"
                  >
                    <Image
                      src={selectedPattern.image}
                      alt={selectedPattern.name}
                      fill
                      className="object-cover border border-[#2C3E50]/10 shadow-sm"
                      sizes="(max-width: 768px) 70vw, 40vw"
                    />
                  </motion.div>
                )}

                {/* Soft watermark stamp inside display */}
                <div className="absolute top-4 left-4 bg-[#F5F0E6]/90 border border-[#2C3E50]/10 px-2 py-1 text-[8px] tracking-[0.1em] font-sans text-[#2B2320] uppercase backdrop-blur-sm pointer-events-none">
                  {isTiled ? "Tiled repeat simulation" : "Single unit view"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Motif unit grid */}
        <div className="space-y-6 pt-12 border-t border-[#2C3E50]/10">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#6B8CAE]">
              MOTIF LIBRARY
            </span>
            <h3 className="font-serif text-lg text-[#2B2320] mt-1">
              Individual Repeat Blocks
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOTIFS.map((motif, index) => (
              <div
                key={motif.id}
                onClick={() => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
                className="group cursor-pointer border border-[#2C3E50]/5 bg-[#E8DCC8]/25 p-3 flex flex-col justify-between hover:border-[#2C3E50]/20 transition-all duration-300"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#F5F0E6]">
                  <Image
                    src={motif.image}
                    alt={motif.name}
                    fill
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <div className="mt-3 flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-sm text-[#2B2320] italic">
                      {motif.name}
                    </h4>
                    <p className="text-[10px] font-sans text-[#2B2320]/60 mt-0.5">
                      {motif.description}
                    </p>
                  </div>
                  <span className="text-[9px] tracking-wider uppercase font-sans text-[#6B8CAE] px-2 py-0.5 bg-[#F5F0E6] border border-[#2C3E50]/10">
                    {motif.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox for motif clicks */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={MOTIFS.map((m) => ({
          src: m.image,
          title: m.name,
          description: `${m.category} — ${m.description}`,
        }))}
        render={{
          slide: ({ slide }: any) => (
            <div className="flex flex-col items-center justify-center p-4 w-full h-full">
              <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center">
                <img
                  src={slide.src}
                  alt={slide.title || ""}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              {slide.description && (
                <div className="text-center bg-[#2B2320]/90 p-4 max-w-xl mx-auto mt-4 border border-[#E8DCC8]/20">
                  <h4 className="font-serif italic text-base text-[#F5F0E6] mb-1">{slide.title}</h4>
                  <p className="text-[#E8DCC8] text-xs leading-relaxed">{slide.description}</p>
                </div>
              )}
            </div>
          )
        }}
      />
    </section>
  );
}
