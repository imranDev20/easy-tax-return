"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import LoginForm from "../login/_components/login-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    aria-label="Menu toggle"
    role="button"
  >
    <Path
      variants={{
        closed: { d: "M 2 2.5 L 20 2.5" },
        open: { d: "M 3 16.5 L 17 2.5" },
      }}
      animate={isOpen ? "open" : "closed"}
    />
    <Path
      d="M 2 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
      animate={isOpen ? "open" : "closed"}
    />
    <Path
      variants={{
        closed: { d: "M 2 16.346 L 20 16.346" },
        open: { d: "M 3 2.5 L 17 16.346" },
      }}
      animate={isOpen ? "open" : "closed"}
    />
  </svg>
);

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NAV_OPTIONS = useMemo(
    () => [
      { label: "Home", link: "home" },
      { label: "Process", link: "process" },
      { label: "About Us", link: "about-us" },
      { label: "Testimonials", link: "testimonials" },
    ],
    []
  );

  const handleScroll = useCallback(() => {
    const scrollY = window.pageYOffset;
    const scrolled = scrollY > 50;
    setIsScrolled(scrolled);

    const sections = NAV_OPTIONS.map((option) =>
      document.getElementById(option.link)
    ).filter(Boolean);

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollY + window.innerHeight / 3) {
        setActiveSection(section.id);
        break;
      }
    }

    if (scrollY < 50) {
      setActiveSection("home");
    }
  }, [NAV_OPTIONS]);

  useLayoutEffect(() => {
    handleScroll(); // Check scroll position immediately on mount
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
      setIsMobileMenuOpen(false);
    },
    []
  );

  const NavLinks = ({ mobile = false }) => (
    <ul
      className={`flex ${mobile ? "flex-col space-y-4" : "items-center"}`}
      role="navigation"
    >
      {NAV_OPTIONS.map((navItem) => (
        <li
          key={navItem.label}
          className={`mx-4 text-font uppercase hover:text-primary transition-colors
            ${activeSection === navItem.link ? "text-primary" : ""}`}
        >
          <a
            href={`#${navItem.link}`}
            onClick={(e) => handleSmoothScroll(e, navItem.link)}
            className={`transition-colors duration-300
              ${activeSection === navItem.link ? "text-primary" : ""}`}
            aria-current={activeSection === navItem.link ? "page" : undefined}
          >
            {navItem.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const MobileNavLinks = () => {
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    };

    return (
      <motion.ul
        className="flex flex-col space-y-4 mt-10"
        variants={container}
        initial="hidden"
        animate="show"
        role="navigation"
      >
        {NAV_OPTIONS.map((navItem) => (
          <motion.li
            key={navItem.label}
            variants={item}
            className={`mx-4 text-font uppercase hover:text-primary transition-colors
              ${activeSection === navItem.link ? "text-primary" : ""}`}
          >
            <a
              href={`#${navItem.link}`}
              onClick={(e) => handleSmoothScroll(e, navItem.link)}
              className={`transition-colors duration-300
                ${activeSection === navItem.link ? "text-primary" : ""}`}
              aria-current={activeSection === navItem.link ? "page" : undefined}
            >
              {navItem.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled ? "bg-white shadow-md" : "bg-secondary"}`}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <div
          className={`flex items-center transition-all duration-300 ${
            isScrolled ? "h-[60px] md:h-[80px]" : "h-[72px] md:h-[108px]"
          }`}
        >
          <span
            className={`italic font-bold font-sans text-2xl md:text-3xl transition-colors duration-300
            ${isScrolled ? "text-primary" : "text-primary"}`}
            role="heading"
            aria-level={1}
          >
            e-taxreturn
          </span>
        </div>
        <nav className="hidden md:flex justify-between items-center">
          <NavLinks />
          <Button
            className="ml-10 uppercase flex items-center transition-colors duration-300"
            onClick={() => setIsLoginModalOpen(true)}
            aria-label="Login"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-auto"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <MenuToggle isOpen={isMobileMenuOpen} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px]"
              aria-label="Mobile menu"
            >
              <SheetHeader>
                <SheetTitle className="text-primary">E-taxreturn</SheetTitle>
              </SheetHeader>
              <MobileNavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginForm
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
