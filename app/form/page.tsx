"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageOne from "@/public/images/1.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import { isFieldRequired, TaxpayerForm, taxpayerSchema } from "./schema";
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

interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BaseFormField {
  name: keyof TaxpayerForm;
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
    name: "fullName",
    type: "text",
    label: "Full Name",
    placeholder: "",
    x: 344,
    y: 277.5,
    width: 589,
    height: 26,
    imageIndex: 0,
  },
  {
    name: "nationalIdOrPassport",
    type: "text",
    label: "Email Address",
    placeholder: "",
    x: 542,
    y: 308,
    width: 390,
    height: 26,
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
    height: 27,
    imageIndex: 0,
    dayPosition: { x: 140, y: 616, width: 60, height: 27 },
    monthPosition: { x: 210, y: 616, width: 60, height: 29 },
    yearPosition: { x: 280, y: 616, width: 100, height: 29 },
  },
  {
    name: "residentialStatus",
    type: "radio",
    label: "Choose an option",
    options: [
      {
        label: "Option 1",
        value: "resident",
        x: 715,
        y: 418,
        width: 39,
        height: 28,
      },
      {
        label: "Option 2",
        value: "non-resident",
        x: 892,
        y: 418,
        width: 39,
        height: 28,
      },
    ],
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    imageIndex: 0,
  },
  {
    name: "tin",
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
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaxpayerForm>({
    resolver: zodResolver(taxpayerSchema),
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

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const onSubmit: SubmitHandler<TaxpayerForm> = (data) => {
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

    const isRequired = isFieldRequired(field.name);

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <input
              {...register(field.name)}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full h-full absolute border px-2 py-1 border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
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
            name={field.name}
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

  const setFormContainerRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      formContainerRefs.current[index] = el;
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
              <div
                ref={setFormContainerRef(index)}
                className="absolute top-0 left-0 w-full h-full"
              >
                {formFields.map((field) => renderField(field, index))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded"
            style={{ fontSize: `${1.6 * scale}rem` }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResponsiveFormOverlay;
