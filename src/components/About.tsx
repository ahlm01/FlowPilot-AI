"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.print();
  };

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[#E8DCC8]/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Portrait & Details */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[3/4] border border-[#2C3E50]/15 p-3 bg-[#F5F0E6]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/designer_portrait.jpg"
                  alt="Elena Rostova working at her wooden loom in the studio"
                  fill
                  className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
              
              {/* Overlay Label */}
              <div className="absolute -bottom-4 -left-4 bg-[#2C3E50] text-[#F5F0E6] px-4 py-3 shadow-md max-w-[200px]">
                <span className="block text-[8px] tracking-[0.25em] uppercase font-sans text-[#E8DCC8]">
                  ON THE LOOM
                </span>
                <span className="block text-xs font-serif italic mt-1 leading-snug">
                  Warp setup for botanical silk weave
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Section Tag */}
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#6B8CAE]">
                  OUR PHILOSOPHY
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2B2320]">
                  The Rhythm of Weaver & Dye Pot
                </h2>
              </div>

              {/* Story Copy */}
              <div className="space-y-6 text-sm md:text-base text-[#2B2320]/80 leading-relaxed font-sans tracking-wide">
                <p>
                  Elena Rostova is a textile designer and weaver based between Kyoto and Paris. 
                  Her work explores the quiet dialogues between raw plant fibers, natural resist-dyeing 
                  techniques, and the mathematical geometry of hand-weaving. Rooted in deep respect for 
                  historical textiles, she seeks to capture a sense of unhurried presence in every cloth.
                </p>
                <p>
                  Every piece begins with fiber sourcing: organic wild linen from Normandy, raw silk from 
                  small farms, and hand-spun cotton. The dyeing process is seasonal and slow, relying on 
                  traditional materials like indigo fermentation vats, walnut hulls, madder root, and 
                  contact eco-printing with eucalyptus and fern.
                </p>
                <p>
                  Rejecting rapid production cycles, Elena designs from a loom-first perspective. The pattern, 
                  weight, and texture are negotiated during the act of weaving. The result is a collection of 
                  living textiles—each carrying raw variations, tactile imperfections, and a soul of quiet luxury.
                </p>
              </div>

              {/* Craft Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-[#2C3E50]/10">
                <div>
                  <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#6B8CAE]">
                    FIBERS
                  </h4>
                  <p className="font-serif italic text-sm text-[#2B2320] mt-1">
                    Wild linen, nettle fiber, hand-spun raw silk
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#6B8CAE]">
                    DYES
                  </h4>
                  <p className="font-serif italic text-sm text-[#2B2320] mt-1">
                    Natural indigo fermentation, madder, marigolds
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#6B8CAE]">
                    TECHNIQUES
                  </h4>
                  <p className="font-serif italic text-sm text-[#2B2320] mt-1">
                    4-shaft hand loom, katazome resist, eco-printing
                  </p>
                </div>
              </div>

              {/* PDF Booklet Button */}
              <div className="pt-6">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-3 bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-[#F5F0E6] px-6 py-3.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download Atelier Booklet (PDF)</span>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
