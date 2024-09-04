import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "../../../images/hero-image.jpg";

export default function Hero() {
  return (
    <div className=" bg-[#F8F8F8] py-9">
      <div className="flex max-w-6xl mx-auto ">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-4xl font-semibold text-[#0074D9]">
              Bangladesh Tax <br /> Preparation & Consulting
            </h1>
            <p className="texr-sm w-3/4 my-4">
              Tax services that are customized to enhance your financial
              strategy and minimize tax liabilities. Trust us for tax
              preparation, planning, and filing needs to thrive in today&apos;s
              competitive market.
            </p>
            <Button className="mt-8 bg-[#0074D9] text-white rounded-none">
              Discover
            </Button>
          </div>
        </div>
        <div className="relative mt-8">
          <Image className=" rounded-t-full" src={heroImage} alt="hero-image" />
          <div className="absolute top-4 left-4 bg-[#EBBDBD] rounded-lg text-[#513B3B] px-2 py-1 ">
            Tax Advice
          </div>
          <div className="absolute top-32 -right-8 bg-[#A8F1E5] rounded-lg text-teal-600 px-2 py-1  ">
            Legal Advice
          </div>
          <div className="absolute bottom-4 -left-10 bg-[#F1EFA8] rounded-lg text-[#535237] px-2 py-1  ">
            Financial Advice
          </div>
        </div>
      </div>
    </div>
  );
}
