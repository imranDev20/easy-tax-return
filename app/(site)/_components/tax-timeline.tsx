import React from "react";
import DocumentIcon from "@/public/icons/document-icon";
import CurvedLine from "@/public/curved-line";

interface TimelineStepProps {
  text: string;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ text }) => (
  <div className="flex flex-col items-center">
    <DocumentIcon height={96} width={96} />
    <p className="text-center text-xl mt-5">{text}</p>
  </div>
);

const CurvedArrow: React.FC = () => (
  <svg
    className="w-full h-16"
    viewBox="0 0 200 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 32C22 0 44 0 66 32C88 64 110 64 132 32C154 0 176 0 200 32"
      stroke="#E5E7EB"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <path
      d="M200 32L195 27"
      stroke="#E5E7EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TaxTimeline: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 my-20 text-center">
        <h2 className="text-blue-500 text-sm font-medium mb-2 uppercase">
          How We Works
        </h2>
        <h1 className="font-serif text-[2.5rem] leading-none font-bold mb-4">
          Timeline of the tax filling process
        </h1>
        <p className="text-gray-600 mb-12 max-w-lg mx-auto text-sm">
          Tax services that are customized to enhance your financial strategy
          and minimize tax liabilities. Trust us for tax preparation, planning,
          and filing needs to thrive in today&apos;s competitive market.
        </p>
        <div className="grid grid-cols-7 gap-4 items-center mt-10">
          <TimelineStep text="Gather income documents" />
          <CurvedLine />
          <TimelineStep text="Complete tax form" />
          <CurvedLine />
          <TimelineStep text="Submit online in secure way" />
          <CurvedLine />
          <TimelineStep text="Confirmation Message" />
        </div>
      </div>
    </section>
  );
};

export default TaxTimeline;
