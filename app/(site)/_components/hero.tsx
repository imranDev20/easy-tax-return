import Image from "next/image";
import heroImage from "@/public/hero-image.jpg";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import DocumentIcon from "@/public/icons/document-icon";
import BankIcon from "@/public/icons/bank-icon";
import CompanyIcon from "@/public/icons/company-icon";
import AvatarOne from "@/public/avatar-1.jpg";
import VatIcon from "@/public/icons/vat-icon";

const HERO_CARD_OPTIONS = [
  {
    label: "Individual Tax Return",
    Icon: DocumentIcon,
    href: "individual-tax-return",
    color: "bg-[rgba(168,241,229,0.2)]",
    hoverColor: "bg-[rgba(168,241,229,0.4)]",
  },
  {
    label: "Company Income Tax",
    Icon: CompanyIcon,
    href: "company-income-tax",
    color: "bg-[rgba(235,189,189,0.2)]",
    hoverColor: "bg-[rgba(235,189,189,0.4)]",
  },
  {
    label: "VAT Related Services",
    Icon: VatIcon,
    href: "vat-related-services",
    color: "bg-[rgba(241,239,168,0.2)]",
    hoverColor: "bg-[rgba(241,239,168,0.4)]",
  },
];

export default function Hero() {
  const rating = 5.0;
  const maxRating = 5;

  return (
    <section className="bg-secondary">
      <div className="container mx-auto py-8 md:py-12 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] leading-tight lg:leading-none font-bold text-primary mb-4 font-serif">
            #1 Online Tax Return Preparer in Bangladesh
          </h1>
          <p className="text-gray-700 mb-6 text-sm md:text-base mx-auto lg:mx-0 max-w-2xl">
            Tax services that are customized to enhance your financial strategy
            and minimize tax liabilities. Trust us for tax preparation,
            planning, and filing needs to thrive in today&apos;s competitive
            market.
          </p>

          <div className="flex flex-col items-center lg:items-start lg:flex-row mb-8">
            <div className="flex -space-x-4 sm:-space-x-6 mr-0 lg:mr-4 mb-4 lg:mb-0">
              {[1, 2, 3, 4].map((index) => (
                <Image
                  key={index}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
                  src={AvatarOne}
                  alt={`Client ${index}`}
                />
              ))}
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-lg sm:text-xl font-bold mr-2">
                  {rating.toFixed(2)}
                </span>
                <div className="flex">
                  {[...Array(maxRating)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Our clients rate us as excellent.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mt-8 lg:mt-14"
            id="services"
          >
            {HERO_CARD_OPTIONS.map((item) => (
              <Link
                href={`/${item.href}`}
                key={item.label}
                className={`p-4 sm:p-5 ease-in-out duration-300 cursor-pointer group block relative overflow-hidden ${item.color}`}
              >
                <div
                  className={`absolute inset-0 ${item.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10 flex flex-col items-center lg:items-start">
                  <item.Icon
                    height={36}
                    width={36}
                    className="sm:h-12 sm:w-12"
                  />
                  <h3 className="text-font font-serif text-lg sm:text-[1.35rem] mt-2 sm:mt-3 text-center lg:text-left">
                    {item.label}
                  </h3>
                  <div className="text-xs sm:text-sm mt-2 flex items-center text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    <span className="font-medium">Discover</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 mt-8 lg:mt-0">
          <div className="relative p-4 sm:p-6">
            <div className="relative w-full rounded-t-full overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
              <Image
                src={heroImage}
                alt="Easy tax return hero image"
                fill
                objectFit="cover"
              />
            </div>

            <p className="absolute top-1/4 left-0 bg-[#EBBDBD] py-1 rounded font-serif text-base sm:text-xl px-3 sm:px-5 text-[#513B3B] shadow-md transform hover:scale-105 transition-transform duration-300">
              Tax Advice
            </p>
            <div className="absolute top-1/2 right-0 bg-[#A8F1E5] text-[#324F4B] py-1 rounded font-serif text-base sm:text-xl px-3 sm:px-5 shadow-md transform hover:scale-105 transition-transform duration-300">
              Legal Advice
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#F1EFA8] py-1 rounded text-[#535237] font-serif text-base sm:text-xl px-3 sm:px-5 shadow-md transform hover:scale-105 transition-transform duration-300">
              Financial Advice
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
