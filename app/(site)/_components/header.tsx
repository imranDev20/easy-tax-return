"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const NAV_OPTIONS = useMemo(
    () => [
      { label: "Home", link: "home" },
      { label: "Process", link: "process" },
      { label: "About Us", link: "about-us" },
      { label: "Testimonials", link: "testimonials" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = NAV_OPTIONS.map((option) =>
        document.getElementById(option.link)
      ).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }

      if (window.scrollY < 50) {
        setActiveSection("home");
      }
    };

    handleScroll(); // Call on mount to set initial state
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [NAV_OPTIONS]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (targetId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setActiveSection(targetId);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled ? "py-3 bg-white shadow-md" : "py-9 bg-secondary"}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <span
          className={`italic font-bold font-sans text-3xl transition-colors duration-300
          ${isScrolled ? "text-primary" : "text-primary"}`}
        >
          e-taxreturn
        </span>
        <div className="hidden md:flex justify-between items-center">
          <ul className="flex justify-between items-center">
            {NAV_OPTIONS.map((item) => (
              <li
                key={item.label}
                className={`mx-2 px-2 text-font uppercase hover:text-primary transition-colors
                  ${activeSection === item.link ? "text-primary" : ""}`}
              >
                <a
                  href={`#${item.link}`}
                  onClick={(e) => handleSmoothScroll(e, item.link)}
                  className={`transition-colors duration-300
                  
                    ${activeSection === item.link ? "text-primary" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            className={`ml-10 uppercase p-5 flex items-center transition-colors duration-300`}
          >
            <Phone className="w-5 h-5 mr-2" />
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
}
