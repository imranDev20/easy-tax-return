"use client";
import ImageOne from "@/public/images/1.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup } from "./_components/radio";
import CustomSelect from "./_components/select";
import { TaxReturnFormInput, taxReturnFormSchema } from "./schema";

import "flatpickr/dist/themes/airbnb.css";
import CustomDatePicker from "./_components/date-picker";

// Define the possible field types
type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "select";

// Define the structure for each form field
interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BaseFormField {
  name: keyof TaxReturnFormInput;
  type: FieldType;
  label: string;
  placeholder?: string;
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

interface SelectFormField extends BaseFormField {
  type: "select";
  options: Array<{ label: string; value: string }>;
}

interface DateFormField extends BaseFormField {
  type: "date";
  dayPosition: DateFieldPosition;
  monthPosition: DateFieldPosition;
  yearPosition: DateFieldPosition;
}

type OtherFormField = Omit<BaseFormField, "type"> & {
  type: Exclude<FieldType, "radio" | "select" | "date">;
};
type FormField =
  | RadioFormField
  | SelectFormField
  | DateFormField
  | OtherFormField;

const images = [ImageOne, ImageTwo, ImageThree];

const formFields: FormField[] = [
  {
    name: "taxpayerName",
    type: "text",
    label: "Tax payer name",
    placeholder: "Enter your full name",
    x: 341,
    y: 276,
    width: 594,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "nationalId",
    type: "text",
    label: "National ID No / Passport No.",
    placeholder: "National ID No / Passport No.",
    x: 538,
    y: 306,
    width: 397,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "tin",
    type: "text",
    label: "TIN",
    placeholder: "TIN",
    x: 538,
    y: 336,
    width: 397,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "circle",
    type: "text",
    label: "Circle",
    placeholder: "Circle",
    x: 250,
    y: 367,
    width: 290,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "zone",
    type: "text",
    label: "Zone",
    placeholder: "Zone",
    x: 580,
    y: 365,
    width: 355,
    height: 29,
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
        y: 415,
        width: 45,
        height: 35,
      },
      {
        label: "Option 2",
        value: "Non-resident",
        x: 890,
        y: 415,
        width: 45,
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
    placeholder: "Select your date of birth",
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
    placeholder: "Spouse Name",
    x: 650,
    y: 580,
    width: 290,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "spouseTin",
    type: "text",
    label: "Spouse Tin",
    placeholder: "Spouse TIN",
    x: 650,
    y: 615,
    width: 290,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "addressLine1",
    type: "text",
    label: "Spouse Tin",
    placeholder: "Address",
    x: 225,
    y: 650,
    width: 700,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "addressLine2",
    type: "text",
    label: "Spouse Tin",
    placeholder: "Address",
    x: 225,
    y: 680,
    width: 700,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "telephone",
    type: "text",
    label: "Telephone",
    placeholder: "Telephone",
    x: 130,
    y: 730,
    width: 250,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "mobile",
    type: "text",
    label: "Mobile",
    placeholder: "Mobile",
    x: 400,
    y: 730,
    width: 250,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "E-mail",
    x: 680,
    y: 730,
    width: 250,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "employerName",
    type: "text",
    label: "Employer Name",
    placeholder: "Employer Name",
    x: 130,
    y: 780,
    width: 700,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "businessName",
    type: "text",
    label: "Business Name",
    placeholder: "Business Name",
    x: 490,
    y: 815,
    width: 400,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "bin",
    type: "text",
    label: "BIN",
    placeholder: "BIN",
    x: 490,
    y: 845,
    width: 400,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "partnersMembersAssociation1",
    type: "text",
    label: "Partner Name",
    placeholder: "Partner Name",
    x: 130,
    y: 890,
    width: 700,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "partnersMembersAssociation2",
    type: "text",
    label: "Partner Name",
    placeholder: "Partner Name",
    x: 130,
    y: 925,
    width: 700,
    height: 29,
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
        x: 720,
        y: 265,
        width: 40,
        height: 30,
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
    placeholder: "Fish Farming Amount",
    x: 780,
    y: 265,
    width: 150,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "shareOfIncomeFromAOP",
    type: "text",
    label: "shareOfIncomeFromAOP",
    placeholder: "Share Of Income From AOP",
    x: 780,
    y: 450,
    width: 150,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "incomeOfMinor",
    type: "text",
    label: "incomeOfMinor",
    placeholder: "Income Of Minor",
    x: 780,
    y: 480,
    width: 150,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "taxableIncomeFromAbroad",
    type: "text",
    label: "incomeOfMinor",
    placeholder: "Taxable Income From Abroad",
    x: 780,
    y: 510,
    width: 150,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "minimumTax",
    type: "select",
    label: "Choose One",
    options: [
      { label: "Dhaka / Chattogram City Corporation Area", value: "Dhaka/ChattogramCityCorporationArea" },
      { label: "Other City Corporation Area", value: "OtherCityCorporationArea" },
      { label: "Other Area", value: "OtherArea" },
    ],
    x: 270,
    y: 705,
    width: 300,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "netWealthSurcharge",
    type: "select",
    label: "Choose One",
    options: [     
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    x: 140,
    y: 780,
    width: 600,
    height: 10,
    imageIndex: 1,
  },
  {
    name: "environmentalSurcharge",
    type: "text",
    label: "environmentalSurcharge",
    placeholder: "Environmental Surcharge",
    x: 780,
    y: 795,
    width: 150,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "delayInterest",
    type: "text",
    label: "delay Interest",
    placeholder: "Delay Interest",
    x: 780,
    y: 820,
    width: 150,
    height: 29,
    imageIndex: 1,
  },
  {
    name: "netWealthSurcharge",
    type: "select",
    label: "Choose One",
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
    name: "radioOption",
    type: "radio",
    label: "Choose an option",
    options: [
      {
        label: "Option 1",
        value: "option1",
        x: 100,
        y: 550,
        width: 40,
        height: 30,
      },
      {
        label: "Option 2",
        value: "option2",
        x: 300,
        y: 550,
        width: 40,
        height: 30,
      },
      {
        label: "Option 3",
        value: "option3",
        x: 400,
        y: 550,
        width: 40,
        height: 30,
      },
    ],
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    imageIndex: 2,
  },
  {
    name: "favoriteColor",
    type: "select",
    label: "Favorite Color",
    options: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
    x: 538,
    y: 550,
    width: 300,
    height: 29,
    imageIndex: 2,
  },
];

const ResponsiveFormOverlay: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaxReturnFormInput>({
    resolver: zodResolver(taxReturnFormSchema),
    defaultValues: {
      radioOption: undefined,
      favoriteColor: undefined,
    },
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

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const onSubmit: SubmitHandler<TaxReturnFormInput> = (data) => {
    console.log(data);
    // Handle form submission
  };

  console.log(errors);

  const renderField = (field: FormField) => {
    const fieldStyle = {
      position: "absolute" as const,
      left: `${field.x / 10}%`,
      top: `${field.y / 10}%`,
      width: `${field.width / 10}%`,
      height: `${field.height / 10}%`,
      fontSize: `${1 * scale}rem`,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            {...register(field.name)}
            type={field.type}
            placeholder={field.placeholder}
            className="absolute border border-gray-300 rounded px-2 py-1"
            style={fieldStyle}
          />
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
          <div style={fieldStyle}>
            <RadioGroup
              control={control}
              name={field.name as "radioOption"}
              options={field.options.map((option) => ({
                ...option,
                x: option.x,
                y: option.y,
                width: option.width,
                height: option.height,
              }))}
              scale={scale}
            />
          </div>
        );
      case "select":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name as "favoriteColor"}
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  options={field.options}
                  value={value}
                  onChange={onChange}
                  name={field.name}
                  placeholder={field.placeholder}
                  scale={scale}
                />
              )}
            />
          </div>
        );
      case "date":
        return (
          <Controller
            name={field.name as "dateOfBirth"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomDatePicker
                onChange={(date) => {
                  onChange(date);
                }}
                dayPosition={field.dayPosition}
                monthPosition={field.monthPosition}
                yearPosition={field.yearPosition}
                scale={scale}
              />
            )}
          />
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

  return (
    <div className="relative">
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToImage(index)}
            className={`block mb-2 w-8 h-8 rounded-full ${
              currentImageIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="w-full max-w-[1480px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {images.map((image, index) => (
            <div
              key={index}
              ref={setImageRef(index)}
              className="relative border-4 border-blue-500"
            >
              <Image
                src={image}
                alt={`Form Background ${index + 1}`}
                layout="responsive"
              />
              <div className="absolute top-0 left-0 w-full h-full">
                {formFields
                  .filter((field) => field.imageIndex === index)
                  .map(renderField)}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded"
            style={{ fontSize: `${1.6 * scale}rem` }} // Scale submit button font size
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResponsiveFormOverlay;
