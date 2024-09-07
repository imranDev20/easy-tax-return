import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuPhone } from "react-icons/lu";

export default function ContactCTA() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="  text-center px-4">
        <h2 className="text-2xl md:text-[2.5rem] leading-tight font-semibold mb-4 font-serif">
          Not sure what you need? Chat with <br /> a concierge about your
          situation.
        </h2>
        <p className="text-sm mb-8">
          The first step to hassle-free accounting, tax returns, and tax
          planning starts by <br /> reaching out to one of our representatives.
        </p>
        <Link href="#" className="">
          <Button className="rounded-none inline-flex items-center uppercase bg-white text-primary py-5 px-6 hover:bg-gray-200">
            <LuPhone className="mr-2" />
            Contact Us
          </Button>
        </Link>
      </div>
    </section>
  );
}
