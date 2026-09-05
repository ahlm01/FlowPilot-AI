"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const WORKS = [
  {
    id: 1,
    title: "Fermented Indigo Warp",
    category: "Weaves",
    materials: "Organic cotton & local Japanese indigo dye",
    description: "Hand-woven on a 4-shaft countermarch loom. Explores gradient tension and dye absorption variations.",
    image: "/images/weave_detail.jpg",
    gridClass: "md:col-span-8 aspect-[16/10]",
  },
  {
    id: 2,
    title: "Botanical Eco-Prints",
    category: "Prints",
    materials: "Wild eucalyptus leaves, bracken ferns, organic silk",
    description: "Contact eco-printing created by bundling fresh foliage and steaming in natural spring water.",
    image: "/images/print_detail.jpg",
    gridClass: "md:col-span-4 aspect-[3/4]",
  },
  {
    id: 3,
    title: "Embroidered Nettle Cushion",
    category: "Products",
    materials: "Hand-spun nettle fiber, sheep wool, hand-stitched details",
    description: "Applied interior piece featuring raw textured backing and geometric embroidery details.",
    image: "/images/applied_cushion.jpg",
    gridClass: "md:col-span-4 aspect-[3/4]",
  },
  {
    id: 4,
    title: "Kyoto Shibori Yardage",
    category: "Prints",
    materials: "Fine mulberry silk, indigo resist block-stamping",
    description: "Continuous length fabric styled with traditional fold-and-clamp resist techniques.",
    image: "/images/tiled_pattern_indigo.jpg",
    gridClass: "md:col-span-8 aspect-[16/10]",
  },
];

const CATEGORIES = ["All", "Weaves", "Prints", "Products"];

export default function WorksGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredWorks = WORKS.filter(
    (work) => activeCategory === "All" || work.category === activeCategory
  );

  const openLightbox = (workId: number) => {
    const indexInFiltered = filteredWorks.findIndex((w) => w.id === workId);
    setLightboxIndex(indexInFiltered >= 0 ? indexInFiltered : 0);
    setLightboxOpen(true);
  };

  return (
    <section id="works" className="py-24 md:py-32 bg-[#F5F0E6] relative">
      <div className="absolute inset-0 bg-weave pointer-events-none opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#6B8CAE]">
              CURATED COLLECTION
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2B2320]">
              The Lookbook
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 border-b border-[#2C3E50]/10 pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[10px] font-sans tracking-[0.2em] uppercase py-2 px-3 transition-colors duration-300 relative ${
                  activeCategory === category
                    ? "text-[#2C3E50]"
                    : "text-[#2B2320]/60 hover:text-[#2C3E50]"
                }`}
              >
                <span>{category}</span>
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilterBorder"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2C3E50]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden bg-[#E8DCC8]/40 border border-[#2C3E50]/5 p-3 flex flex-col justify-between cursor-pointer ${work.gridClass}`}
                onClick={() => openLightbox(work.id)}
              >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden flex-grow">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Soft overlay on hover */}
                  <div className="absolute inset-0 bg-[#2B2320]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Swatch Details Footer */}
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-serif italic text-base text-[#2B2320] group-hover:text-[#2C3E50] transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wider text-[#6B8CAE] font-sans mt-0.5">
                      {work.materials}
                    </p>
                  </div>
                  <span className="text-[10px] font-sans tracking-widest text-[#2B2320]/40 group-hover:text-[#2C3E50] transition-colors">
                    [{work.category.toUpperCase()}]
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Implementation */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filteredWorks.map((w) => ({
          src: w.image,
          title: w.title,
          description: `${w.materials} — ${w.description}`,
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
