"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@/components/custom/radio";
import CustomSelect from "@/components/custom/select";

import "flatpickr/dist/themes/airbnb.css";
import CustomDatePicker from "@/components/custom/date-picker";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Save,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import SignatureField from "@/components/custom/signature";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "../schema";
import { isFieldRequired } from "@/lib/utils";

import ImageOne from "@/public/images/1.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import ImageFour from "@/public/images/4.png";
import ImageFive from "@/public/images/5.png";
import ImageSix from "@/public/images/6.png";
import ImageSeven from "@/public/images/7.png";
import ImageEight from "@/public/images/8.png";
import ImageNine from "@/public/images/8.png";

// Define the possible field types
type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "select"
  | "signature"
  | "textarea";

interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BaseFormField {
  name: keyof IndividualTaxReturnFormInput;
  type: FieldType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
}

interface RadioFormField extends BaseFormField {
  type: "radio";
  options: Array<{
    label: string;
    value: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}
interface TextAreaFormField extends BaseFormField {
  type: "textarea";
  rows?: number;
  cols?: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SelectFormField extends BaseFormField {
  type: "select";
  options: Array<{ label: string; value: string }>;
  placeholder: string;
}

interface DateFormField extends BaseFormField {
  type: "date";
  dayPosition: DateFieldPosition;
  monthPosition: DateFieldPosition;
  yearPosition: DateFieldPosition;
}

interface SignatureFormField extends BaseFormField {
  type: "signature";
}

type OtherFormField = Omit<BaseFormField, "type"> & {
  type: Exclude<FieldType, "radio" | "select" | "date" | "signature" | "textarea">;
};

type FormField =
  | RadioFormField
  | SelectFormField
  | DateFormField
  | SignatureFormField
  | OtherFormField
  |TextAreaFormField;
  

const images = [
  ImageOne,
  ImageTwo,
  ImageThree,
  ImageFour,
  ImageFive,
  ImageSix,
  ImageSeven,
  ImageEight,
  ImageNine,
];

const formFields: FormField[] = [
  {
    name: "taxpayerName",
    type: "text",
    label: "Tax payer name",
    x: 341,
    y: 275,
    width: 594,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "nationalId",
    type: "text",
    label: "National ID No / Passport No.",
    x: 538,
    y: 306,
    width: 397,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "tin",
    type: "text",
    label: "TIN",

    x: 538,
    y: 337,
    width: 397,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "circle",
    type: "text",
    label: "Circle",

    x: 252,
    y: 367,
    width: 285,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "zone",
    type: "text",
    label: "Zone",

    x: 685,
    y: 367,
    width: 250,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "residentialStatus",
    type: "radio",
    label: "Choose an option",
    options: [
      {
        label: "Option 1",
        value: "Resident",
        x: 712,
        y: 416,
        width: 45,
        height: 32,
      },
      {
        label: "Option 2",
        value: "Non-resident",
        x: 890,
        y: 416,
        width: 45,
        height: 32,
      },
    ],
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    imageIndex: 0,
  },
  {
    name: "specialBenefits",
    type: "radio",
    label: "Choose an option",
    options: [
      {
        label: "Option 1",
        value: "GazettedWarWoundedFreedomFighter",
        x: 490,
        y: 470,
        width: 49,
        height: 35,
      },
      {
        label: "Option 2",
        value: "Female",
        x: 888,
        y: 470,
        width: 49,
        height: 35,
      },
      {
        label: "Option 3",
        value: "ThirdGender",
        x: 490,
        y: 505,
        width: 49,
        height: 35,
      },
      {
        label: "Option 4",
        value: "DisabledPerson",
        x: 888,
        y: 505,
        width: 49,
        height: 35,
      },

      {
        label: "Option 5",
        value: "Aged65OrMore",
        x: 490,
        y: 540,
        width: 49,
        height: 35,
      },
    ],
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    imageIndex: 0,
  },
  {
    name: "isParentOfDisabledPerson",
    type: "radio",
    label: "Choose an option",
    options: [
      {
        label: "",
        value: "true",
        x: 888,
        y: 543,
        width: 49,
        height: 35,
      },
    ],
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    imageIndex: 0,
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",

    x: 538,
    y: 475,
    width: 397,
    height: 29,
    imageIndex: 0,
    dayPosition: { x: 150, y: 620, width: 60, height: 29 },
    monthPosition: { x: 220, y: 620, width: 60, height: 29 },
    yearPosition: { x: 290, y: 620, width: 100, height: 29 },
  },
  {
    name: "spouseName",
    type: "text",
    label: "spouse name",

    x: 650,
    y: 577,
    width: 287,
    height: 34,
    imageIndex: 0,
  },
  {
    name: "spouseTin",
    type: "text",
    label: "Spouse Tin",

    x: 650,
    y: 612,
    width: 287,
    height: 39,
    imageIndex: 0,
  },
  {
    name: "addressLine1",
    type: "text",
    label: "addressLine1",

    x: 223,
    y: 651,
    width: 712,
    height: 32,
    imageIndex: 0,
  },
  {
    name: "addressLine2",
    type: "text",
    label: "addressLine2",

    x: 223,
    y: 682,
    width: 712,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "telephone",
    type: "text",
    label: "Telephone",
    x: 130,
    y: 732,
    width: 267,
    height: 31,
    imageIndex: 0,
  },
  {
    name: "mobile",
    type: "text",
    label: "Mobile",
    x: 396,
    y: 732,
    width: 281,
    height: 31,
    imageIndex: 0,
  },
  {
    name: "email",
    type: "email",
    label: "Email",

    x: 678,
    y: 731,
    width: 259,
    height: 31,
    imageIndex: 0,
  },
  {
    name: "employerName",
    type: "text",
    label: "Employer Name",

    x: 130,
    y: 782,
    width: 805,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "businessName",
    type: "text",
    label: "Business Name",

    x: 488,
    y: 812,
    width: 449,
    height: 31,
    imageIndex: 0,
  },
  {
    name: "bin",
    type: "text",
    label: "BIN",
    x: 488,
    y: 843,
    width: 449,
    height: 31,
    imageIndex: 0,
  },
  {
    name: "partnersMembersAssociation1",
    type: "text",
    label: "Partner Name",
    x: 130,
    y: 893,
    width: 807,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "partnersMembersAssociation2",
    type: "text",
    label: "Partner Name",
    x: 130,
    y: 923,
    width: 807,
    height: 30,
    imageIndex: 0,
  },
  {
    name: "incomeFishFarming",
    type: "radio",
    label: "Choose an option",
    options: [
      {
        label: "Option 1",
        value: "option1",
        x: 704,
        y: 264,
        width: 67,
        height: 34,
      },
    ],
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    imageIndex: 1,
  },
  {
    name: "incomeFishFarmingAmount",
    type: "text",
    label: "Fish farming amount",

    x: 770,
    y: 263,
    width: 170,
    height: 34,
    imageIndex: 1,
  },
  {
    name: "shareOfIncomeFromAOP",
    type: "text",
    label: "shareOfIncomeFromAOP",

    x: 770,
    y: 450,
    width: 168,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "incomeOfMinor",
    type: "text",
    label: "incomeOfMinor",

    x: 770,
    y: 479,
    width: 168,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "taxableIncomeFromAbroad",
    type: "text",
    label: "incomeOfMinor",

    x: 770,
    y: 508,
    width: 168,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "minimumTax",
    type: "select",
    label: "Choose One",
    placeholder: "Minimum Tax Area",
    options: [
      {
        label: "Dhaka / Chattogram City Corporation Area",
        value: "Dhaka/ChattogramCityCorporationArea",
      },
      {
        label: "Other City Corporation Area",
        value: "OtherCityCorporationArea",
      },
      { label: "Other Area", value: "OtherArea" },
    ],
    x: 270,
    y: 708,
    width: 350,
    height: 28,
    imageIndex: 1,
  },
  {
    name: "netWealthSurcharge",
    type: "select",
    label: "Choose One",
    placeholder:
      "Do you have more than one motor vehicle or more than 8000 sqft house property/properties (in city corporation area)?",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    x: 170,
    y: 780,
    width: 599,
    height: 12,
    imageIndex: 1,
  },
  {
    name: "environmentalSurcharge",
    type: "text",
    label: "environmentalSurcharge",
    x: 770,
    y: 795,
    width: 170,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "delayInterest",
    type: "text",
    label: "delay Interest",

    x: 770,
    y: 823,
    width: 170,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "netWealthSurcharge",
    type: "select",
    label: "Choose One",
    placeholder: "placeholder",
    options: [
      { label: "Calculate", value: "Calculate" },
      { label: "Re-Calculate", value: "Re-Calculate" },
    ],
    x: 780,
    y: 885,
    width: 160,
    height: 29,
    imageIndex: 1,
  },

  {
    name: "advanceTaxPaidAmount",
    type: "text",
    label: "Advance Tax PaidAmount",

    x: 770,
    y: 137,
    width: 170,
    height: 29,
    imageIndex: 2,
  },
  {
    name: "adjustmentOfTaxRefund",
    type: "text",
    label: "adjustmentOfTaxRefund",

    x: 770,
    y: 167,
    width: 170,
    height: 29,
    imageIndex: 2,
  },
  {
    name: "taxPaidWithThisReturn",
    type: "text",
    label: "taxPaidWithThisReturn",

    x: 770,
    y: 195,
    width: 170,
    height: 29,
    imageIndex: 2,
  },
  {
    name: "listOfDocumentsFurnishedWithThisReturn1",
    type: "textarea",
    label: "listOfDocumentsFurnishedWithThisReturn1",

    x: 91,
    y: 384,
    width: 425,
    height: 300,
    imageIndex: 2,
  },
  {
    name: "listOfDocumentsFurnishedWithThisReturn2",
    type: "textarea",
    label: "listOfDocumentsFurnishedWithThisReturn2",

    x: 516,
    y: 384,
    width: 424,
    height: 300,
    imageIndex: 2,
  },
  {
    name: "fatherOrHusband",
    type: "text",
    label: "fatherOrHusband",

    x: 632,
    y: 730,
    width: 300,
    height: 29,
    imageIndex: 2,
  },
  {
    name: "placeOfSignature",
    type: "text",
    label: "placeOfSignature",
    x: 145,
    y: 870,
    width: 250,
    height: 29,
    imageIndex: 2,
  },
  {
    name: "locationDescriptionOwnershipProportionOfProperty",
    type: "textarea",
    label: "locationDescriptionOwnershipProportionOfProperty",

    x: 90,
    y: 227,
    width: 260,
    height: 340,
    imageIndex: 4,
  },
  {
    name: "rentReceivedOrAnnualValue",
    type: "text",
    label: "rentReceivedOrAnnualValue",

    x: 750,
    y: 227,
    width: 95,
    height: 34,
    imageIndex: 4,
  },
  {
    name: "advanceRentReceived",
    type: "text",
    label: "advanceRentReceived",

    x: 750,
    y: 260,
    width: 95,
    height: 20,
    imageIndex: 4,
  },
  {
    name: "valueOfAnyBenefit",
    type: "text",
    label: "valueOfAnyBenefit",

    x: 750,
    y: 280,
    width: 95,
    height: 20,
    imageIndex: 4,
  },
  {
    name: "adjustedAdvanceRent",
    type: "text",
    label: "adjustedAdvanceRent",

    x: 750,
    y: 300,
    width: 95,
    height: 20,
    imageIndex: 4,
  },
  {
    name: "vacancyAllowance",
    type: "text",
    label: "vacancyAllowance",

    x: 750,
    y: 320,
    width: 95,
    height: 18,
    imageIndex: 4,
  },
  {
    name: "repairCollection",
    type: "select",
    label: "Choose One",
    placeholder: "Choose One",
    options: [     
      {
        label: "Commercial property",
        value: "Commercial property",
      },
      {
        label: "Non-commercial",
        value: "Non-commercial",
      },
      {
        label: "Residential property",
        value: "Residential property",
      },
      {
        label: "Mixed property",
        value: "Mixed property",
      },
      
    ],
    x: 640,
    y: 376,
    width: 110,
    height: 20,
    imageIndex: 4,
  },
  {
    name: "municipalOrLocalTax",
    type: "text",
    label: "municipalOrLocalTax",

    x: 751,
    y: 397,
    width: 95,
    height: 19,
    imageIndex: 4,
  },
  {
    name: "landRevenue",
    type: "text",
    label: "landRevenue",

    x: 751,
    y: 417,
    width: 95,
    height: 19,
    imageIndex: 4,
  },
  {
    name: "interestMortgageCapitalCharge",
    type: "text",
    label: "interestMortgageCapitalCharge",

    x: 751,
    y: 435,
    width: 95,
    height: 34,
    imageIndex: 4,
  },
  {
    name: "insurancePremiumPaid",
    type: "text",
    label: "insurancePremiumPaid",

    x: 751,
    y: 470,
    width: 95,
    height: 19,
    imageIndex: 4,
  },
  {
    name: "others",
    type: "text",
    label: "others",

    x: 751,
    y: 490,
    width: 95,
    height: 19,
    imageIndex: 4,
  },
  {
    name: "TaxpayersShare",
    type: "text",
    label: "TaxpayersShare",

    x: 655,
    y: 546,
    width: 60,
    height: 19,
    imageIndex: 4,
  },
  {
    name: "taxDeductedSourceFromIncomeRent",
    type: "text",
    label: "taxDeductedSourceFromIncomeRent",

    x: 845,
    y: 570,
    width: 95,
    height: 19,
    imageIndex: 4,
  },
  {
    name: "salesTurnoverReceipt",
    type: "text",
    label: "salesTurnoverReceipt",

    x: 844,
    y: 765,
    width: 95,
    height: 20,
    imageIndex: 4,
  },
  {
    name: "grossProfit",
    type: "text",
    label: "grossProfit",

    x: 844,
    y: 785,
    width: 95,
    height: 20,
    imageIndex: 4,
  },
  {
    name: "generalExpensesSellingExpenses",
    type: "text",
    label: "generalExpensesSellingExpenses",

    x: 844,
    y: 805,
    width: 95,
    height: 34,
    imageIndex: 4,
  },
];

const IndividualTaxReturnForm: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IndividualTaxReturnFormInput>({
    resolver: zodResolver(individualTaxReturnSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && imageRefs.current[0]) {
        const containerWidth = containerRef.current.offsetWidth;
        const imageWidth = imageRefs.current[0].offsetWidth;
        const newScale = imageWidth / 1000; // Assuming 1000px as base width
        setScale(newScale);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      imageRefs.current.forEach((ref, index) => {
        if (
          ref &&
          ref.offsetTop <= scrollPosition &&
          ref.offsetTop + ref.offsetHeight > scrollPosition
        ) {
          setCurrentImageIndex(index);
        }
      });
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit: SubmitHandler<IndividualTaxReturnFormInput> = (data) => {
    console.log(data);
    // Handle form submission
  };

  const renderField = (field: FormField, imageIndex: number) => {
    if (field.imageIndex !== imageIndex) return null;

    const fieldStyle = {
      position: "absolute" as const,
      left: `${field.x / 10}%`,
      top: `${field.y / 10}%`,
      width: `${field.width / 10}%`,
      height: `${field.height / 10}%`,
    };

    const isRequired = isFieldRequired(individualTaxReturnSchema, field.name);

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <input
              {...register(field.name)}
              type={field.type}
              className="w-full h-full absolute border px-2 border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
              style={{ fontSize: `${14 * scale}px` }}
            />

            {isRequired && (
              <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
                <span className="absolute text-white top-[23px] left-[17px] text-lg">
                  *
                </span>
              </span>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div className="absolute flex items-center" style={fieldStyle}>
            <input {...register(field.name)} type="checkbox" className="mr-2" />
            <label>{field.label}</label>
          </div>
        );
      case "radio":
        return (
          <RadioGroup
            control={control}
            name={field.name}
            options={field.options}
            scale={scale}
            required={isRequired}
          />
        );
      case "select":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  options={field.options}
                  value={value as string}
                  onChange={onChange}
                  name={field.name}
                  scale={scale}
                  required={isRequired}
                  placeholder={field.placeholder}
                />
              )}
            />
          </div>
        );

      case "date":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                onChange={(date) => {
                  onChange(date);
                }}
                name={field.name}
                dayPosition={field.dayPosition}
                monthPosition={field.monthPosition}
                yearPosition={field.yearPosition}
                scale={scale}
              />
            )}
          />
        );

      case "signature":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SignatureField onChange={onChange} />
              )}
            />
          </div>
        );
        case "textarea":
          return (
            <div style={fieldStyle} className="relative overflow-hidden">
              <textarea
                {...register(field.name)}
                className="w-full h-full absolute border px-2 border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
                style={{ fontSize: `${14 * scale}px` }}
              />
              {isRequired && (
                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
                  <span className="absolute text-white top-[23px] left-[17px] text-lg">
                    *
                  </span>
                </span>
              )}
            </div>
          );
      default:
        return null;
    }
  };

  const scrollToImage = (index: number) => {
    setCurrentImageIndex(index);
    imageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const setImageRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      imageRefs.current[index] = el;
    },
    []
  );

  const setFormContainerRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      formContainerRefs.current[index] = el;
    },
    []
  );

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif text-center">
          Online Tax Return Form
        </h1>
        <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Complete your tax return easily and securely. Our form is designed to
          guide you through the process step by step.
        </p>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative" ref={containerRef}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    ref={setImageRef(index)}
                    className="relative border-2 border-gray-200 rounded-lg mb-8"
                  >
                    <Image
                      src={image}
                      alt={`Form Background ${index + 1}`}
                      layout="responsive"
                    />
                    <div
                      ref={setFormContainerRef(index)}
                      className="absolute top-0 left-0 w-full h-full"
                    >
                      {formFields.map((field) => renderField(field, index))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scrollspy */}
              <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToImage(index)}
                    className={`block mb-2 w-8 h-8 rounded-full ${
                      currentImageIndex === index
                        ? "bg-primary text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
                <div className="container mx-auto flex justify-between items-center py-3 px-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentImageIndex === 0}
                        title="Previous Page"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        Page {currentImageIndex + 1} of {images.length}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={currentImageIndex === images.length - 1}
                        title="Next Page"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 border-l border-gray-300 pl-4">
                      <Button
                        onClick={() =>
                          setScale((prev) => Math.max(prev - 0.1, 0.5))
                        }
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        title="Zoom Out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {Math.round(scale * 100)}%
                      </span>
                      <Button
                        onClick={() =>
                          setScale((prev) => Math.min(prev + 0.1, 2))
                        }
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        title="Zoom In"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => console.log("Save for later")}
                      variant="outline"
                      className="px-4 py-2 text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-300 font-medium"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save for Later
                    </Button>
                    <Button
                      onClick={() => console.log("Save PDF")}
                      className="px-6 py-2 bg-primary text-white font-medium transition duration-300 hover:bg-primary-dark"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Save PDF
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4 font-serif text-primary">
            Need Assistance?
          </h3>
          <p className="text-gray-700 mb-4">
            Our tax experts are here to help you with any questions or concerns.
          </p>
          <Button className="px-6 py-3 bg-secondary text-primary border-2 border-primary rounded-lg font-semibold text-lg transition duration-300 hover:bg-primary hover:text-white">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualTaxReturnForm;
