"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Atelier", href: "#hero" },
  { label: "Story", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Research", href: "#research" },
  { label: "Patterns", href: "#patterns" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsTop(currentScrollPos < 50);
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-[#2C3E50]/5 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        isTop
          ? "bg-transparent py-6"
          : "bg-[#F5F0E6]/90 backdrop-blur-md py-4 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand/Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="group flex flex-col font-serif"
        >
          <span className="text-lg md:text-xl font-medium tracking-wide text-[#2B2320]">
            ELENA ROSTOVA
          </span>
          <span className="text-[9px] tracking-[0.25em] text-[#6B8CAE] uppercase font-sans">
            Textile Atelier
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-xs uppercase tracking-[0.2em] text-[#2B2320] hover:text-[#2C3E50] transition-colors font-sans py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-end w-6 h-6 space-y-1.5 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`block h-0.5 bg-[#2B2320] transition-all duration-300 ${
              mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
            }`}
          />
          <span
            className={`block h-0.5 bg-[#2B2320] transition-all duration-300 ${
              mobileMenuOpen ? "w-0 opacity-0" : "w-4"
            }`}
          />
          <span
            className={`block h-0.5 bg-[#2B2320] transition-all duration-300 ${
              mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[65px] bg-[#F5F0E6] z-40 transition-all duration-500 md:hidden flex flex-col items-center justify-center space-y-8 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className="text-lg font-serif tracking-[0.1em] text-[#2B2320] hover:text-[#2C3E50] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
