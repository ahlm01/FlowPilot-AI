"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const PRODUCTS = [
  {
    id: 1,
    title: "Organic Nettle Cushion Cover",
    description: "Individually hand-loomed raw nettle fiber cushion covers. Finished with organic sheep wool backings and natural bone enclosures.",
    specs: ["Size: 45cm × 45cm", "Front: Hand-spun Nettle", "Back: Unbleached Wool"],
    image: "/images/applied_cushion.jpg",
    price: "€160",
    layout: "lg:col-span-7 aspect-[4/3] md:aspect-[16/10]",
  },
  {
    id: 2,
    title: "Resist Shibori Fabric Yardage",
    description: "Continuous running cotton-linen yardage suitable for apparel or interior upholstery. Organic indigo vat resist printed by hand.",
    specs: ["Width: 110cm", "Material: 60% Linen, 40% Cotton", "Indigo Fermentation Vat"],
    image: "/images/tiled_pattern_indigo.jpg",
    price: "€85 / meter",
    layout: "lg:col-span-5 aspect-square lg:aspect-[3/4]",
  },
];

export default function ProductsShowcase() {
  return (
    <section id="products" className="py-24 md:py-32 bg-[#E8DCC8]/30 relative">
      <div className="absolute inset-0 bg-weave-tight pointer-events-none opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20 space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#6B8CAE]">
            FINISHED GOODS
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2B2320]">
            Applied Textiles & Yardage
          </h2>
          <p className="text-sm text-[#2B2320]/75 font-sans leading-relaxed tracking-wide">
            Our fabrics translate into living spaces and simple apparel. 
            We offer limited edition cushion covers, wall hangings, and hand-printed running fabric.
          </p>
        </div>

        {/* Editorial Product Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              className={`group flex flex-col justify-between border border-[#2C3E50]/10 bg-[#F5F0E6] p-4 shadow-sm ${product.layout}`}
            >
              {/* Product Image Frame */}
              <div className="relative w-full h-full overflow-hidden bg-[#E8DCC8]/40 mb-6">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-[1.8s] group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Product Metadata & Description */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-baseline border-b border-[#2C3E50]/10 pb-2">
                  <h3 className="font-serif text-lg md:text-xl text-[#2B2320]">
                    {product.title}
                  </h3>
                  <span className="font-serif italic text-sm text-[#2C3E50]">
                    {product.price}
                  </span>
                </div>
                
                <p className="text-xs text-[#2B2320]/80 leading-relaxed font-sans tracking-wide">
                  {product.description}
                </p>

                {/* Specs List */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase font-mono tracking-widest text-[#2B2320]/50 pt-2">
                  {product.specs.map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Studio Bespoke Order Banner */}
        <div className="mt-24 border border-[#2C3E50]/15 bg-[#F5F0E6]/50 p-8 md:p-12 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[9px] tracking-widest uppercase font-sans text-[#6B8CAE] block">
              BESPOKE ORDERS
            </span>
            <h3 className="font-serif text-xl text-[#2B2320]">
              Custom Yardage & Architectural Commission
            </h3>
            <p className="text-xs text-[#2B2320]/70 leading-relaxed font-sans">
              We collaborate with architects, interior designers, and fashion houses to create 
              exclusive textile lines and custom installations. Select dye pools and custom loom setups are available by inquiry.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="whitespace-nowrap bg-[#2C3E50] text-[#F5F0E6] hover:bg-[#2C3E50]/90 transition-colors text-xs uppercase tracking-[0.2em] px-6 py-3.5 font-sans"
          >
            Inquire about custom loom
          </button>
        </div>

      </div>
    </section>
  );
}
