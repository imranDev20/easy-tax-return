import React from "react";
import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutImage from "@/public/about-us.jpg";

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto my-52 px-4 md:px-8" id="about-us">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 mb-8 lg:mb-0 relative px-8">
          <div className="relative rounded-t-full overflow-hidden max-w-full mx-auto min-h-[550px]">
            <Image
              src={AboutImage}
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-8 left-0 bg-[#CBEBBD] text-[#222C1E] py-2 px-4 rounded-md shadow-md font-serif ">
            <p className="font-medium text-2xl">10+ Years</p>
            <p className="font-medium text-2xl">of Experience</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-5 flex flex-col justify-center">
          <h4 className="text-sm text-primary font-medium uppercase mb-2">
            ABOUT US
          </h4>
          <h2 className="text-3xl md:text-[2.5rem] font-bold mb-6 leading-tight font-serif">
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
            {[
              "We create a Comprehensive Tax Reduction Plan",
              "We clean up your Bookkeeping, Payroll, Accounting & Operations",
              "We pro-actively manage your S-Corp or LLC salary decisions & tax payments",
              "We keep your Bookkeeping up-to-date & accurate",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-primary mr-3 w-5 h-5 mt-1" />
                <p>{item}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center flex-wrap mt-4">
            <span className="text-gray-400 mr-4 mb-4 lg:mb-0">
              Still not confident?
            </span>
            <Button className="inline-flex items-center text-white px-4 transition duration-300 py-5">
              <Phone className="mr-2 w-5 h-5" />
              CONTACT US
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
