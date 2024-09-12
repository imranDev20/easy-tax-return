import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuPhone } from "react-icons/lu";

export default function ContactCTA() {
  return (
    <section className="bg-primary text-white py-12 md:py-16">
      <div className="container mx-auto text-center px-4 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] leading-tight font-semibold mb-4 font-serif">
          Not sure what you need?
          <br className="hidden sm:inline" /> Chat with a concierge about your
          situation.
        </h2>
        <p className="text-sm md:text-base mb-8 max-w-2xl mx-auto">
          The first step to hassle-free accounting, tax returns, and tax
          planning starts by reaching out to one of our representatives.
        </p>
        <Link href="#" className="inline-block">
          <Button className="w-full sm:w-auto inline-flex items-center justify-center uppercase bg-white text-primary py-3 px-4 sm:py-5 sm:px-6 hover:bg-gray-200 text-sm md:text-base">
            <LuPhone className="mr-2" />
            Contact Us
          </Button>
        </Link>
      </div>
    </section>
  );
}
