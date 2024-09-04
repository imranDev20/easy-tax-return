"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageOne from "@/public/images/1.png";

import { z } from "zod";

// Zod schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date(),
  favoriteNumber: z.number().min(1).max(100),
  agreeToTerms: z.boolean(),
});

// Infer the TypeScript type from the Zod schema
type FormData = z.infer<typeof formSchema>;

// Define the possible field types
type FieldType = "text" | "email" | "number" | "date" | "checkbox" | "select";

// Define the structure for each form field
interface FormField {
  name: keyof FormData;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[]; // For select fields
  x: number;
  y: number;
  width: number;
  height: number;
}

// Array of form fields with positioning information
const formFields: FormField[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    x: 341,
    y: 389,
    width: 594,
    height: 43,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    x: 538,
    y: 432,
    width: 397,
    height: 43,
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    x: 538,
    y: 475,
    width: 397,
    height: 43,
  },
];

export { formSchema, formFields };
export type { FormData, FormField };

const ResponsiveFormOverlay: React.FC = () => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
              width: `${field.width + 200}px`, // Increased width to accommodate label
              height: `${field.height}px`,
            }}
          >
            <input {...register(field.name)} type="checkbox" className="mr-2" />
            <label>{field.label}</label>
          </div>
        );
      // Add cases for other field types as needed
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div
        ref={containerRef}
        className="relative w-full max-w-[1480px] overflow-hidden"
      >
        <Image src={ImageOne} alt="Form Background" layout="responsive" />
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

export default ResponsiveFormOverlay;
