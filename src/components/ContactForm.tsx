"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Please introduce yourself (minimum 2 characters)." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  message: z.string().min(10, { message: "Please share a few details (minimum 10 characters)." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F5F0E6] relative">
      <div className="absolute inset-0 bg-weave pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Studio info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#6B8CAE]">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#2B2320]">
                Studio Inquiries
              </h2>
            </div>
            
            <p className="text-sm text-[#2B2320]/80 leading-relaxed font-sans tracking-wide">
              For inquiries regarding custom weaving commissions, fabric yardage, wholesale 
              catalogs, or press appointments, please write to us.
            </p>

            {/* Studio Coordinates */}
            <div className="space-y-6 pt-6 border-t border-[#2C3E50]/15">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#6B8CAE]">
                    PARIS ATELIER
                  </h4>
                  <p className="text-xs text-[#2B2320] font-serif italic mt-1.5 leading-relaxed">
                    12 Rue des Alchimistes<br />
                    75003 Paris, France
                  </p>
                </div>
                <div>
                  <h4 className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#6B8CAE]">
                    KYOTO STUDIO
                  </h4>
                  <p className="text-xs text-[#2B2320] font-serif italic mt-1.5 leading-relaxed">
                    Kamigyo-ku, Kyoto<br />
                    602-0824, Japan
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <h4 className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#6B8CAE]">
                  DIRECT COURIER
                  </h4>
                <p className="text-sm font-sans tracking-wider text-[#2C3E50] font-medium">
                  atelier@elenarostova.com
                </p>
              </div>

              {/* Socials */}
              <div className="pt-2">
                <h4 className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#6B8CAE] mb-3">
                  DIGITAL ARCHIVE
                </h4>
                <div className="flex space-x-6 text-xs font-sans tracking-widest uppercase">
                  <a href="#" className="text-[#2B2320] hover:text-[#2C3E50] transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-[#2B2320] hover:text-[#2C3E50] transition-colors">
                    Pinterest
                  </a>
                  <a href="#" className="text-[#2B2320] hover:text-[#2C3E50] transition-colors">
                    Journal
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Elegant Contact Form */}
          <div className="lg:col-span-7 bg-[#E8DCC8]/25 border border-[#2C3E50]/10 p-8 md:p-12 shadow-sm">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif italic text-lg text-[#2B2320] border-b border-[#2C3E50]/10 pb-3">
                    Send a Correspondence
                  </h3>
                  
                  {/* Name field */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="name" className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#2B2320]">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="bg-[#F5F0E6] border border-[#2C3E50]/15 px-4 py-3 text-sm text-[#2B2320] placeholder-[#2B2320]/30 focus:outline-none focus:border-[#2C3E50] transition-colors"
                      placeholder="Elena"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-700 font-sans tracking-wide mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#2B2320]">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="bg-[#F5F0E6] border border-[#2C3E50]/15 px-4 py-3 text-sm text-[#2B2320] placeholder-[#2B2320]/30 focus:outline-none focus:border-[#2C3E50] transition-colors"
                      placeholder="elena@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-700 font-sans tracking-wide mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="message" className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#2B2320]">
                      Inquiry Details
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="bg-[#F5F0E6] border border-[#2C3E50]/15 px-4 py-3 text-sm text-[#2B2320] placeholder-[#2B2320]/30 focus:outline-none focus:border-[#2C3E50] transition-colors resize-none"
                      placeholder="Tell us about your project, loom dimensions, or seasonal requests..."
                      {...register("message")}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-700 font-sans tracking-wide mt-1">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2C3E50] text-[#F5F0E6] hover:bg-[#2C3E50]/90 transition-colors uppercase tracking-[0.25em] text-xs font-sans py-4 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sealing thread...</span>
                      </>
                    ) : (
                      <span>Transmit Message</span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-6 py-12"
                >
                  {/* Succesful stamp */}
                  <div className="w-12 h-12 bg-[#2C3E50]/10 flex items-center justify-center rounded-full text-[#2C3E50]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#2B2320]">
                      Correspondence Received
                    </h3>
                    <p className="text-xs text-[#2B2320]/60 uppercase tracking-widest font-sans">
                      Stitch confirmed.
                    </p>
                  </div>
                  <p className="text-sm text-[#2B2320]/80 leading-relaxed font-sans max-w-sm">
                    Thank you. Your message has been routed to our Kyoto and Paris desks. 
                    A studio director will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] font-sans tracking-widest text-[#2C3E50] border-b border-[#2C3E50] pb-0.5 hover:text-[#6B8CAE] hover:border-[#6B8CAE] transition-colors uppercase pt-4"
                  >
                    Send another correspondence
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
