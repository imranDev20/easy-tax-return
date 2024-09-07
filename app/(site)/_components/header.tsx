import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import React from "react";

export default function Header() {
  const NAV_OPTIONS = [
    { label: "Home", link: "#" },
    {
      label: "Services",
      link: "#services",
    },
    {
      label: "About Us",
      link: "#about-us",
    },
    {
      label: "Testimonial",
      link: "#testimonial",
    },
  ];

  return (
    <>
      <header className="bg-secondary py-9">
        <div className="container mx-auto flex items-center justify-between">
          <span className="italic font-bold text-primary font-sans text-3xl">
            e-taxreturn
          </span>
          <div className="hidden md:flex justify-between items-center ">
            <ul className="flex justify-between items-center">
              {NAV_OPTIONS.map((item) => (
                <li
                  key={item.label}
                  className="mx-2 px-2 text-font uppercase hover:text-primary transition-colors"
                >
                  <a href={item.link}> {item.label}</a>
                </li>
              ))}
            </ul>
            <Button className="ml-10 rounded-none uppercase p-5 flex items-center">
              <Phone className="w-5 h-5 mr-1" />
              Contact Us
            </Button>
          </div>
        </div>
      </header>
      <hr />
    </>
  );
}
