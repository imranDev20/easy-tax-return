import Link from "next/link";
import { LuPhone } from "react-icons/lu";

export default function ContactCTA() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="  text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Not sure what you need? Chat with <br /> a concierge about your
          situation.
        </h2>
        <p className="text-sm mb-8">
          The first step to hassle-free accounting, tax returns, and tax
          planning starts by <br /> reaching out to one of our representatives.
        </p>
        <Link
          href="#"
          className="inline-flex items-center uppercase bg-white text-blue-600 py-2 px-6   "
        >
          <LuPhone className="mr-2" />
          Contact Us
        </Link>
      </div>
    </section>
  );
}
