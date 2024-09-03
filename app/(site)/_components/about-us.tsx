import aboutImage from "@/images/about-us.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
export default function AboutUs() {
  return (
    <section className="max-w-6xl mx-auto my-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="  mb-8 md:mb-0 relative">
          <Image src={aboutImage} alt="aboutImage" className="w-96" />
          <div className="absolute bottom-8 -left-8 bg-[#CBEBBD] text-[#73866B] py-2 px-4 leading-none rounded-md shadow">
            10+ Years <br /> of Experience
          </div>
        </div>

        <div className="md:w-1/2 md:pl-12">
          <h4 className="text-sm text-blue-600 font-semibold uppercase mb-2">
            About Us
          </h4>
          <h2 className="text-3xl font-bold mb-6">
            We&apos;re not your typical CPA firm, an outsourced accounting
            service
          </h2>
          <p className="text-gray-600 mb-6">
            Tax services that are customized to enhance your financial strategy
            and minimize tax liabilities. Trust us for tax preparation,
            planning, and filing needs to thrive in today&apos;s competitive
            market.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <FaCheck className="text-blue-600 mr-2" />
              We create a Comprehensive Tax Reduction Plan
            </li>
            <li className="flex items-center">
              <FaCheck className="text-blue-600 mr-2" />
              We clean up your Bookkeeping, Payroll, Accounting & Operations
            </li>
            <li className="flex items-center">
              <FaCheck className="text-blue-600 mr-2" />
              We pro-actively manage your S-Corp or LLC salary decisions & tax
              payments
            </li>
            <li className="flex items-center">
              <FaCheck className="text-blue-600 mr-2" />
              We keep your Bookkeeping up-to-date & accurate
            </li>
          </ul>

          <div className="flex items-center">
            <span className="text-gray-400 mr-4">Still not confident?</span>

            <Link
              href="#"
              className="inline-flex items-center text-white bg-blue-600 py-2 px-4 "
            >
              <LuPhone className="mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
