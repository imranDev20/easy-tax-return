"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageOne from "@/public/images/1.png";
import ImageTwo from "@/public/images/2.png";

import { z } from "zod";

// Zod schema
const formSchema = z.object({
  taxpayerName: z.string().min(1, "Name is required"),
  nationalId: z.string().min(1, "National ID or Passport number is required"),
  tin: z.string().min(1, "TIN is required"),
  circle: z.string().min(1, "Circle is required"),
  zone: z.string().min(1, "Zone is required"),
  residentialStatus: z.enum(["Resident", "Non-resident"]),
  specialBenefits: z
    .enum([
      "None",
      "GazettedWarWoundedFreedomFighter",
      "Female",
      "ThirdGender",
      "DisabledPerson",
      "Aged65OrMore",
    ])
    .optional(),
  isParentOfDisabledPerson: z.boolean().optional(),
  dateOfBirth: z.date(),
  spouseName: z.string().optional(),
  spouseTin: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  telephone: z.string().optional(),
  mobile: z.string(),
  email: z.string().email("Invalid email address"),
  employerName: z.string().optional(),
  businessName: z.string().optional(),
  bin: z.string().optional(),
  partnersMembersAssociation1: z.string().optional(),
  partnersMembersAssociation2: z.string().optional(),
  favoriteNumber: z.number().min(1).max(100),
  agreeToTerms: z.boolean(),
  radioOption: z.enum(["option1", "option2", "option3"]),
});

// Infer the TypeScript type from the Zod schema
type FormData = z.infer<typeof formSchema>;

// Define the possible field types
type FieldType = "text" | "email" | "number" | "date" | "checkbox" | "radio";

// Define the structure for each form field
interface FormField {
  name: keyof FormData;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string; x: number; y: number }>;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Array of form fields with positioning information
const formFields: FormField[] = [
  {
    name: "taxpayerName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your tax payer",
    x: 345,
    y: 389,
    width: 575,
    height: 43,
  },
  {
    name: "nationalId",
    type: "text",
    label: "National ID / Passport No",
    placeholder: "National ID / Passport No",
    x: 538,
    y: 432,
    width: 397,
    height: 43,
  },
  {
    name: "tin",
    type: "text",
    label: "TIN",
    placeholder: "TIN Number",
    x: 538,
    y: 475,
    width: 397,
    height: 43,
  },
  {
    name: "circle",
    type: "text",
    label: "Circle",
    placeholder: "Circle",
    x: 260,
    y: 515,
    width: 275,
    height: 43,
  },
  {
    name: "zone",
    type: "text",
    label: "Zone",
    placeholder: "Zone",
    x: 685,
    y: 520,
    width: 245,
    height: 43,
  },
  {
    name: "residentialStatus",
    type: "radio",
    label: "Choose an option",
    options: [
      { label: "Option 1", value: "Resident", x: 710, y: 587 },
      { label: "Option 2", value: "Non-Resident", x: 880, y: 587 },
    ],
    x: 0,
    y: 0,
    width: 0,
    height: 0,
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
        y: 665,
      },
      { label: "Option 1", value: "ThirdGender", x: 490, y: 715 },
      { label: "Option 1", value: "Aged65OrMore", x: 490, y: 765 },
      { label: "Option 2", value: "Female", x: 880, y: 665 },
      { label: "Option 2", value: "DisabledPerson", x: 880, y: 715 },
    ],
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  {
    name: "isParentOfDisabledPerson",
    type: "radio",
    label: "Choose an option",
    options: [{ label: "Option 2", value: "true", x: 880, y: 765 }],
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    placeholder: "Date Of Birth",
    x: 150,
    y: 860,
    width: 280,
    height: 43,
  },
  {
    name: "spouseName",
    type: "text",
    label: "Spouse Name",
    placeholder: "Spouse Name",
    x: 650,
    y: 810,
    width: 280,
    height: 43,
  },
  {
    name: "spouseTin",
    type: "text",
    label: "Spouse Tin",
    placeholder: "Spouse Tin",
    x: 650,
    y: 860,
    width: 280,
    height: 43,
  },
  {
    name: "addressLine1",
    type: "text",
    label: "Address",
    placeholder: "Address",
    x: 230,
    y: 910,
    width: 680,
    height: 43,
  },
  {
    name: "addressLine2",
    type: "text",
    label: "Address",
    placeholder: "Address",
    x: 230,
    y: 955,
    width: 680,
    height: 43,
  },
  {
    name: "telephone",
    type: "text",
    label: "Telephone",
    placeholder: "Telephone",
    x: 145,
    y: 1020,
    width: 250,
    height: 43,
  },
  {
    name: "mobile",
    type: "text",
    label: "Mobile",
    placeholder: "Mobile",
    x: 400,
    y: 1020,
    width: 250,
    height: 43,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    x: 680,
    y: 1020,
    width: 250,
    height: 43,
  },
  {
    name: "employerName",
    type: "text",
    label: "Employeer Name",
    placeholder: "Employeer Name",
    x: 145,
    y: 1090,
    width: 720,
    height: 43,
  },
  {
    name: "businessName",
    type: "text",
    label: "Business Name",
    placeholder: "Business Name",
    x:490,
    y: 1135,
    width: 400,
    height: 43,
  },
  {
    name: "bin",
    type: "text",
    label: "Bin",
    placeholder: "BIN",
    x:490,
    y: 1175,
    width: 400,
    height: 43,
  },
  {
    name: "partnersMembersAssociation1",
    type: "text",
    label: "Bin",
    placeholder: "Partner Name",
    x:150,
    y: 1250,
    width: 770,
    height: 43,
  },
  {
    name: "partnersMembersAssociation2",
    type: "text",
    label: "Bin",
    placeholder: "Partner Name",
    x:150,
    y: 1290,
    width: 770,
    height: 43,
  },
];

const ResponsiveFormOverlay: React.FC = () => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radioOption: undefined,
    },
  });

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = containerWidth / 1000; // Assuming 1000px as base width
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return (
          <input
            {...register(field.name)}
            type={field.type}
            placeholder={field.placeholder}
            className="absolute border border-gray-300 rounded px-2 py-1"
            style={{
              left: `${field.x}px`,
              top: `${field.y}px`,
              width: `${field.width}px`,
              height: `${field.height}px`,
            }}
          />
        );
      case "checkbox":
        return (
          <div
            className="absolute flex items-center"
            style={{
              left: `${field.x}px`,
              top: `${field.y}px`,
              width: `${field.width + 200}px`,
              height: `${field.height}px`,
            }}
          >
            <input {...register(field.name)} type="checkbox" className="mr-2" />
            <label>{field.label}</label>
          </div>
        );
      case "radio":
        return (
          <Controller
            name={field.name as "radioOption"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="absolute">
                {field.options?.map((option) => (
                  <CustomRadio
                    key={option.value}
                    label={option.label}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                    name={field.name}
                    value={option.value}
                    style={{
                      position: "absolute",
                      left: `${option.x}px`,
                      top: `${option.y}px`,
                    }}
                  />
                ))}
              </div>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center w-full p-8 max-w-screen-xl mx-auto">
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div className="relative w-full overflow-hidden border-[12px]">
          <Image src={ImageOne} alt="Form Background" layout="responsive" />
        </div>
        <div className="relative w-full overflow-hidden border-[12px]">
          <Image src={ImageTwo} alt="Form Background" layout="responsive" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {formFields.map((field) => renderField(field))}
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

interface CustomRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  checked: boolean;
  onChange: () => void;
  style?: React.CSSProperties;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  checked,
  onChange,
  style,
  ...props
}) => {
  return (
    <label className="flex items-center cursor-pointer" style={style}>
      <div className="relative">
        <input
          type="radio"
          className="hidden"
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <div
          className={`w-12 h-12 bg-white border-2 border-gray-400 rounded ${
            checked ? "flex items-center justify-center" : ""
          }`}
        >
          {checked && (
            <svg
              viewBox="0 0 150 150"
              className="w-12 h-12 text-black fill-current"
            >
              <path d="M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z" />
            </svg>
          )}
        </div>
      </div>
      {/* {label && <span className="ml-2">{label}</span>} */}
    </label>
  );
};

export default ResponsiveFormOverlay;
