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
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Download, Save } from "lucide-react";
import SignatureField from "./_components/signature";

// Define the possible field types
type FieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "select"
  | "signature";

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

interface SignatureFormField extends BaseFormField {
  type: "signature";
}

type OtherFormField = Omit<BaseFormField, "type"> & {
  type: Exclude<FieldType, "radio" | "select" | "date" | "signature">;
};

type FormField =
  | RadioFormField
  | SelectFormField
  | DateFormField
  | SignatureFormField
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
    height: 100,
    imageIndex: 0,
    dayPosition: { x: 140, y: 618, width: 60, height: 27 },
    monthPosition: { x: 210, y: 618, width: 60, height: 27 },
    yearPosition: { x: 280, y: 618, width: 100, height: 27 },
  },
  {
    name: "dateOfBirth",
    type: "date",
    label: "Date of Birth",
    placeholder: "Select your date of birth",
    x: 300,
    y: 600,
    width: 397,
    height: 100,
    imageIndex: 0,
    dayPosition: { x: 140, y: 618, width: 60, height: 27 },
    monthPosition: { x: 210, y: 618, width: 60, height: 27 },
    yearPosition: { x: 280, y: 618, width: 100, height: 27 },
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
    placeholder: "Minimum Tax Area",
    options: [
      { label: "Dhaka / Chittagong City Corporation", value: "red" },
      { label: "Other City Corporation Area", value: "blue" },
      { label: "Other Area", value: "green" },
    ],
    x: 350,
    y: 709,
    width: 300,
    height: 26,
    imageIndex: 1,
  },

  {
    name: "signature",
    type: "signature",
    label: "Signature",
    x: 538,
    y: 700,
    width: 500,
    height: 200,
    imageIndex: 2,
  },
];

const ResponsiveFormOverlay: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fitToScreen, setFitToScreen] = useState(false);
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
    <div className="bg-secondary min-h-screen pb-20">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif text-center">
          Online Tax Return Form
        </h1>
        <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Complete your tax return easily and securely. Our form is designed to
          guide you through the process step by step.
        </p>

        <div
          className={`bg-white shadow-lg rounded-lg overflow-hidden mx-auto`}
        >
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

      {/* Scrollspy */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
        {images.map((_, index) => (
          <button
            type="button"
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
                onClick={() =>
                  scrollToImage(Math.max(0, currentImageIndex - 1))
                }
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
                onClick={() =>
                  scrollToImage(
                    Math.min(images.length - 1, currentImageIndex + 1)
                  )
                }
                disabled={currentImageIndex === images.length - 1}
                title="Next Page"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => console.log("Save for later")}
              variant="outline"
              className="px-4 py-2 text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Save className="mr-2 h-4 w-4" />
              Save for Later
            </Button>
            <Button
              onClick={() => console.log("Save PDF")}
              className="px-6 py-2 bg-primary text-white font-semibold transition duration-300 hover:bg-primary-dark"
            >
              <Download className="mr-2 h-5 w-5" />
              Save PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveFormOverlay;
