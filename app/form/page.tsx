"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageOne from "@/public/images/1.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import { FormData, formSchema } from "./schema";
import { RadioGroup } from "./_components/radio";
import CustomSelect from "./_components/select";

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
interface FormField {
  name: keyof FormData;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string; x?: number; y?: number }>;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
}

const images = [ImageOne, ImageTwo, ImageThree];

// Array of form fields with positioning information
const formFields: FormField[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    x: 341,
    y: 276,
    width: 594,
    height: 29,
    imageIndex: 0,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    x: 538,
    y: 306,
    width: 397,
    height: 29,
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
    imageIndex: 1,
    dayPosition: { x: 538, y: 460, width: 60, height: 29 },
    monthPosition: { x: 608, y: 475, width: 60, height: 29 },
    yearPosition: { x: 678, y: 475, width: 100, height: 29 },
  },
  {
    name: "radioOption",
    type: "radio",
    label: "Choose an option",
    options: [
      { label: "Option 1", value: "option1", x: 100, y: 550 },
      { label: "Option 2", value: "option2", x: 300, y: 550 },
      { label: "Option 3", value: "option3", x: 500, y: 550 },
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
    height: 43,
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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
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
              options={
                field.options?.map((option) => ({
                  ...option,
                  x: option.x ? option.x * scale : 0,
                  y: option.y ? option.y * scale : 0,
                })) || []
              }
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
                  options={field.options || []}
                  value={value}
                  onChange={onChange}
                  name={field.name}
                  placeholder={field.placeholder}
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
