"use client";

import { RadioGroup } from "@/components/custom/radio";
import CustomSelect from "@/components/custom/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import CustomDatePicker from "@/components/custom/date-picker";
import SignatureField from "@/components/custom/signature";
import { Button } from "@/components/ui/button";
import { isFieldRequired, snakeToNormalText } from "@/lib/utils";
import "flatpickr/dist/themes/airbnb.css";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Save,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  IndividualTaxReturnFormInput,
  individualTaxReturnSchema,
} from "../schema";

import {
  CALCULATE_OPTION,
  MINIMUM_TAX_OPTIONS,
  NET_WEALTH_LAST_DATE,
  NET_WEALTH_SURCHARGE_OPTIONS,
  REPAIR_COLLECTION_OPTIONS,
} from "@/lib/constants";
import ImageOne from "@/public/images/1.png";
import ImageTen from "@/public/images/10.png";
import ImageEleven from "@/public/images/11.png";
import ImageTwo from "@/public/images/2.png";
import ImageThree from "@/public/images/3.png";
import ImageFour from "@/public/images/4.png";
import ImageFive from "@/public/images/5.png";
import ImageSix from "@/public/images/6.png";
import ImageSeven from "@/public/images/7.png";
import ImageEight from "@/public/images/8.png";
import ImageNine from "@/public/images/9.png";
import { createIndividualTaxReturn, createPayment } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CustomCheckbox from "@/components/custom/checkbox";
import { RepairCollection } from "@prisma/client";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import { FormField } from "@/types/tax-return-form";
import { useTaxReturnForm } from "@/hooks/use-tax-return-form";

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
  ImageTen,
  ImageEleven,
];

const IndividualTaxReturnForm: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const { form, formFields, calculations } = useTaxReturnForm();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = form;
  const { calculatePrivateEmploymentTotals } = calculations;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "netWealthSurcharge") {
        if (value.netWealthSurcharge === "YES") {
          setValue("netWealthSurchargeAmount", "0.0");
        } else {
          setValue("netWealthSurchargeAmount", undefined);
        }
      }

      if (name === "tranportFacilityPrivateVehicleCC") {
        calculatePrivateEmploymentTotals();
      }

      if (name === "netWealthLastDate") {
        if (value.netWealthLastDate === "NO_I_AM_A_NEW_TAXPAYER") {
          setValue("netWealthLastDateAmount", "0.0");
        } else {
          setValue("netWealthLastDateAmount", "");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, calculatePrivateEmploymentTotals]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && imageRefs.current["0"]) {
        const imageWidth = imageRefs.current["0"].offsetWidth;
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
        return (
          <>
            {field.isVisible && (
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <div style={fieldStyle} className="relative overflow-hidden">
                    <input
                      type={field.type}
                      value={value as string}
                      onChange={(e) => onChange(e.target.value)}
                      onBlur={(e) => {
                        onBlur();
                        if (field?.onBlur) field.onBlur(e.target.value);
                      }}
                      className={`w-full h-full absolute border px-2 font-medium ${
                        !field.disabled
                          ? (errors as any)[field.name]
                            ? "border-red-500 bg-red-300/10 focus:border-red-700 focus:ring-0 focus:outline-0 focus:bg-red-300/20 hover:border-red-700"
                            : "border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
                          : "bg-[#F5F5F5] font-medium text-[#948C91]"
                      }`}
                      style={{ fontSize: `${14 * scale}px` }}
                      disabled={field.disabled}
                    />
                    {renderErrorAndRequiredIndicator(field, errors, isRequired)}
                  </div>
                )}
              />
            )}
          </>
        );

      case "number":
        return (
          <>
            {field.isVisible && (
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <div style={fieldStyle} className="relative overflow-hidden">
                    <NumericFormat
                      value={value as string}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      className={`w-full h-full absolute border px-2 font-medium ${
                        !field.disabled
                          ? (errors as any)[field.name]
                            ? "border-red-500 bg-red-300/10 focus:border-red-700 focus:ring-0 focus:outline-0 focus:bg-red-300/20 hover:border-red-700"
                            : "border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
                          : "bg-[#F5F5F5] font-medium text-[#948C91]"
                      }`}
                      style={{ fontSize: `${14 * scale}px` }}
                      disabled={field.disabled}
                      allowNegative={false}
                      customInput={CustomInput}
                      onValueChange={(values) => {
                        onChange(values.value);
                      }}
                      onBlur={(e) => {
                        onBlur();
                        if (field?.onBlur) field.onBlur(e.target.value);
                      }}
                    />
                    {renderErrorAndRequiredIndicator(field, errors, isRequired)}
                  </div>
                )}
              />
            )}
          </>
        );

      case "checkbox":
        return (
          <CustomCheckbox
            label={field.label}
            name={field.name}
            register={register as any}
            style={{
              position: "absolute",
              left: `${field.x / 10}%`,
              top: `${field.y / 10}%`,
            }}
            scale={scale}
            width={field.width}
            height={field.height}
            required={isFieldRequired(individualTaxReturnSchema, field.name)}
            onBlur={field.onBlur}
          />
        );
      case "radio":
        return (
          <RadioGroup
            control={control}
            name={field.name as any}
            options={field.options}
            scale={scale}
            disabled={field.disabled}
            resetFields={field.resetFields}
            required={isRequired}
            label={field.label}
            x={field.x}
            y={field.y}
          />
        );
      case "select":
        return (
          <div style={fieldStyle}>
            <Controller
              name={field.name as any}
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
                  onBlur={field.onBlur}
                  isVisible={field.isVisible}
                />
              )}
            />
          </div>
        );

      case "date":
        return (
          <Controller
            name={field.name as any}
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

      // case "signature":
      //   return (
      //     <div style={fieldStyle}>
      //       <Controller
      //         name="signature"
      //         control={control}
      //         render={({ field: { onChange, value } }) => (
      //           <SignatureField
      //             onChange={(signatureData) => {
      //               onChange(signatureData);
      //             }}
      //             width={field.width}
      //             height={field.height}
      //             value={value as string}
      //           />
      //         )}
      //       />
      //     </div>
      //   );
      case "textarea":
        return (
          <div style={fieldStyle} className="relative overflow-hidden">
            <textarea
              {...register(field.name as any)}
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

  const onSubmit: SubmitHandler<IndividualTaxReturnFormInput> = (data) => {
    // Handle form submission
    startTransition(async () => {
      try {
        const createData = {
          ...data,
          userId: "xyz123456",
        };

        const result = await createIndividualTaxReturn(createData);

        if (result.success) {
          toast({
            title: "Success",
            description: result.message,
            variant: "success",
          });
          router.push("/admin");
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif text-center">
          Online Tax Return Form
        </h1>
        <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Complete your tax return easily and securely. Our form is designed to
          guide you through the process step by step.
        </p>

        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative" ref={containerRef}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      ref={setImageRef(index)}
                      className="relative border border-gray-200 mb-8 rounded-lg"
                    >
                      <Image
                        src={image}
                        loading="lazy"
                        placeholder="blur"
                        alt={`Form Background ${index + 1}`}
                        layout="responsive"
                        className="rounded-lg"
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
                      type="button"
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
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          disabled={currentImageIndex === 0}
                          title="Previous Page"
                          onClick={() => {
                            if (currentImageIndex > 0) {
                              setCurrentImageIndex(currentImageIndex - 1);
                              scrollToImage(currentImageIndex - 1);
                            }
                          }}
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
                          type="button"
                          onClick={() => {
                            if (currentImageIndex < images.length - 1) {
                              setCurrentImageIndex(currentImageIndex + 1);
                              scrollToImage(currentImageIndex + 1);
                            }
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
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
                        className="px-6 py-2 font-medium transition duration-300"
                        type="submit"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Save PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
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

// Custom input component
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { onBlur, ...rest } = props;
  return (
    <input
      {...rest}
      ref={ref}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e);
        }
      }}
    />
  );
});

CustomInput.displayName = "CustomInput";

// Helper function to render error and required indicator
const renderErrorAndRequiredIndicator = (
  field: FormField,
  errors: any,
  isRequired: boolean
) => (
  <>
    {(errors as any)[field.name] && (
      <p className="absolute bottom-0 left-0 text-red-500 text-xs mt-1">
        {(errors as any)[field.name]?.message as string}
      </p>
    )}
    {isRequired && !field.disabled && (
      <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
        <span className="absolute text-white top-[23px] left-[17px] text-lg">
          *
        </span>
      </span>
    )}
  </>
);
