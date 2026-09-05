"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const RESEARCH_ITEMS = [
  {
    id: 1,
    title: "Dye Vat Logs: Autumn Indigo",
    date: "Sept — Nov 2025",
    notes: "Testing fermentation speed under varying temperatures. The addition of wheat bran and sake stimulated yeast growth, yielding a deep, midnight-indigo hue on linen yarn.",
    tags: ["Indigo fermentation", "Linen yarns", "Kyoto studio"],
    image: "/images/weave_detail.jpg",
  },
  {
    id: 2,
    title: "Eco-printed Eucalyptus Leaves",
    date: "Oct 2025",
    notes: "Bundling eucalyptus leaves in rust-treated silk. Acidic rain-water steaming yields bright, copper-orange prints and soft olive halos.",
    tags: ["Botanical printing", "Eucalyptus", "Natural mordant"],
    image: "/images/print_detail.jpg",
  },
];

export default function InspirationSection() {
  return (
    <section id="research" className="py-24 md:py-32 bg-[#E8DCC8]/20 relative">
      <div className="absolute inset-0 bg-weave-tight pointer-events-none opacity-[0.03]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#6B8CAE]">
            THE RESEARCH DESK
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#2B2320] leading-tight">
            Moodboards, Swatches <br />& Dye Studies
          </h2>
          <p className="text-sm md:text-base text-[#2B2320]/75 leading-relaxed font-sans max-w-xl">
            A window into the studio's slow research process. We catalog natural mordants, 
            botanical print transfers, and clamp-resist geometry before sitting at the loom.
          </p>
        </div>

        {/* Two Column Layout: Left Column (Moodboard Grid) & Right Column (Research Logs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Moodboard Collage (Editorial Masonry) */}
          <div className="lg:col-span-6 space-y-12">
            <div className="border-b border-[#2C3E50]/15 pb-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#2B2320]">
                STUDIO INSPIRATION BOARD
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6 relative">
              {/* Item 1: Botanical Print Detail */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="space-y-3"
              >
                <div className="relative aspect-[3/4] overflow-hidden border border-[#2C3E50]/10 bg-[#F5F0E6] p-1.5 shadow-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/print_detail.jpg"
                      alt="Botanical contact prints flatlay"
                      fill
                      className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[9px] tracking-widest uppercase font-sans text-[#6B8CAE]">
                    COLLECTION III
                  </span>
                  <h4 className="font-serif italic text-sm text-[#2B2320]">
                    Eco-print Studies
                  </h4>
                  <p className="text-[11px] text-[#2B2320]/60 mt-1 leading-relaxed">
                    Analyzing tannin extraction levels of chestnut hulls and oak bark on silk.
                  </p>
                </div>
              </motion.div>

              {/* Item 2: Indigo Shibori Detail */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1 }}
                className="space-y-3 pt-8 md:pt-12"
              >
                <div className="relative aspect-[3/4] overflow-hidden border border-[#2C3E50]/10 bg-[#F5F0E6] p-1.5 shadow-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/tiled_pattern_indigo.jpg"
                      alt="Resist dyed indigo textile swatch"
                      fill
                      className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[9px] tracking-widest uppercase font-sans text-[#6B8CAE]">
                    SHIBORI ARCHIVE
                  </span>
                  <h4 className="font-serif italic text-sm text-[#2B2320]">
                    Indigo Resists
                  </h4>
                  <p className="text-[11px] text-[#2B2320]/60 mt-1 leading-relaxed">
                    Traditional wooden board clamping on hand-woven mulberry silk yarn lengths.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Color Palette Swatches */}
            <div className="pt-6 border-t border-[#2C3E50]/10">
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#6B8CAE] mb-4">
                SEASONAL PALETTE INGREDIENTS
              </h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#2C3E50] border border-white/20" />
                  <span className="text-xs font-serif text-[#2B2320] italic">Indigo Vat #4</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#5C4033] border border-white/20" />
                  <span className="text-xs font-serif text-[#2B2320] italic">Crushed Walnut</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E8DCC8] border border-white/20" />
                  <span className="text-xs font-serif text-[#2B2320] italic">Washed Sand</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#6B8CAE] border border-white/20" />
                  <span className="text-xs font-serif text-[#2B2320] italic">Dusty Nettle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Research Diaries */}
          <div className="lg:col-span-6 space-y-12">
            <div className="border-b border-[#2C3E50]/15 pb-4">
              <h3 className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#2B2320]">
                STUDIO DIARIES & SWATCH LOGS
              </h3>
            </div>

            <div className="space-y-10">
              {RESEARCH_ITEMS.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.15 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
                >
                  {/* Log Image */}
                  <div className="md:col-span-4 relative aspect-[4/3] md:aspect-square overflow-hidden border border-[#2C3E50]/10 bg-[#F5F0E6]">
                    <Image
                      src={log.image}
                      alt={log.title}
                      fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 15vw"
                    />
                  </div>

                  {/* Log Text */}
                  <div className="md:col-span-8 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif italic text-base text-[#2B2320]">
                        {log.title}
                      </h4>
                      <span className="text-[10px] font-sans text-[#2B2320]/50 tracking-wider">
                        {log.date}
                      </span>
                    </div>
                    <p className="text-xs text-[#2B2320]/80 leading-relaxed font-sans tracking-wide">
                      {log.notes}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {log.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] tracking-[0.1em] uppercase font-sans bg-[#F5F0E6] text-[#2C3E50]/80 px-2 py-0.5 border border-[#2C3E50]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Poetic quote */}
            <div className="bg-[#F5F0E6]/60 border border-[#2C3E50]/5 p-6 space-y-3 shadow-inner">
              <p className="font-serif italic text-sm text-[#2B2320]/90 leading-relaxed">
                "Textiles are the tactile records of seasons. The humidity of the air, the mineral 
                makeup of spring water, the age of the bark—all register upon the thread, 
                visible to those who take time to touch."
              </p>
              <span className="block text-[9px] font-sans tracking-[0.25em] text-[#6B8CAE] uppercase text-right">
                — Studio Ledger, 2026
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
