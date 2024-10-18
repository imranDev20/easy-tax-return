"use client";

import { RadioGroup } from "@/components/custom/radio";
import CustomSelect from "@/components/custom/select";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { Controller, FormProvider, SubmitHandler } from "react-hook-form";

import CustomDatePicker from "@/components/custom/date-picker";
import SignatureField from "@/components/custom/signature";
import { Button } from "@/components/ui/button";
import { debounce, isFieldRequired, snakeToNormalText } from "@/lib/utils";
import "flatpickr/dist/themes/airbnb.css";
import {
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  Download,
  Loader2,
  Menu,
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
import { NumericFormat, numericFormatter } from "react-number-format";
import { FormField } from "@/types/tax-return-form";
import { useTaxReturnForm } from "@/hooks/use-tax-return-form";
import { generatePDF } from "@/lib/pdf";

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

interface Image {
  src: string;
}

export const createDebugOverlay = (
  images: Image[],
  formFields: FormField[],
  formData: IndividualTaxReturnFormInput
): void => {
  const container: HTMLDivElement = document.createElement("div");
  container.style.position = "relative";
  container.style.marginTop = "20px";
  document.body.appendChild(container);

  images.forEach((image: Image, i: number) => {
    const formContainer: HTMLDivElement = document.createElement("div");
    formContainer.style.position = "relative";
    formContainer.style.width = "595px";
    formContainer.style.height = "842px";
    formContainer.style.marginBottom = "20px";

    const imageContainer: HTMLDivElement = document.createElement("div");
    imageContainer.style.position = "relative";
    imageContainer.style.width = "100%";
    imageContainer.style.height = "100%";

    const img: HTMLImageElement = document.createElement("img");
    img.src = image.src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const fieldsContainer: HTMLDivElement = document.createElement("div");
    fieldsContainer.style.position = "absolute";
    fieldsContainer.style.top = "0";
    fieldsContainer.style.left = "0";
    fieldsContainer.style.width = "100%";
    fieldsContainer.style.height = "100%";

    formFields
      .filter((field: FormField) => field.imageIndex === i && field.isVisible)
      .forEach((field: FormField) => {
        if (field.type === "radio") {
          const value =
            formData[field.name as keyof IndividualTaxReturnFormInput];
          field.options?.forEach((option) => {
            const radioContainer: HTMLDivElement =
              document.createElement("div");
            radioContainer.style.position = "absolute";
            radioContainer.style.left = `${option.x / 10}%`;
            radioContainer.style.top = `${option.y / 10}%`;
            radioContainer.style.width = `${option.width / 10}%`;
            radioContainer.style.height = `${option.height / 10}%`;
            radioContainer.style.border = "1px solid red";
            radioContainer.style.backgroundColor = "rgba(255, 0, 0, 0.1)";

            if (value === option.value) {
              const svg: SVGElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
              );
              svg.setAttribute("viewBox", "0 0 150 150");
              svg.style.width = "80%";
              svg.style.height = "80%";
              svg.style.position = "absolute";
              svg.style.top = "10%";
              svg.style.left = "10%";

              const path: SVGPathElement = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
              );
              path.setAttribute(
                "d",
                "M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z"
              );
              path.setAttribute("fill", "black");

              svg.appendChild(path);
              radioContainer.appendChild(svg);
            }

            fieldsContainer.appendChild(radioContainer);
          });
        } else {
          const fieldContainer: HTMLDivElement = document.createElement("div");
          fieldContainer.style.position = "absolute";
          fieldContainer.style.left = `${field.x / 10}%`;
          fieldContainer.style.top = `${field.y / 10}%`;
          fieldContainer.style.width = `${field.width / 10}%`;
          fieldContainer.style.height = `${field.height / 10}%`;
          fieldContainer.style.border = "1px solid red";
          fieldContainer.style.backgroundColor = "rgba(255, 0, 0, 0.1)";

          const fieldElement: HTMLInputElement =
            document.createElement("input");
          fieldElement.style.position = "absolute";
          fieldElement.style.left = "0";
          fieldElement.style.top = "0";
          fieldElement.style.width = "100%";
          fieldElement.style.height = "100%";
          fieldElement.style.fontSize = "14px";
          fieldElement.style.fontFamily = "Arial, sans-serif";
          fieldElement.style.padding = "0px";
          fieldElement.style.border = "none";
          fieldElement.style.background = "transparent";
          fieldElement.style.overflow = "hidden";

          const value =
            formData[field.name as keyof IndividualTaxReturnFormInput];

          if (
            field.type === "number" &&
            value !== undefined &&
            value !== null
          ) {
            fieldElement.value = numericFormatter(value.toString(), {
              thousandSeparator: true,
              decimalScale: 2,
              fixedDecimalScale: true,
            });
          } else {
            fieldElement.value = value?.toString() || "";
          }

          fieldContainer.appendChild(fieldElement);
          fieldsContainer.appendChild(fieldContainer);
        }
      });

    imageContainer.appendChild(fieldsContainer);
    formContainer.appendChild(imageContainer);
    container.appendChild(formContainer);
  });
};

const IndividualTaxReturnForm: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [targetImageIndex, setTargetImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lastScrolledIndex, setLastScrolledIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoadedImages = [...prev];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isScrollspyOpen, setIsScrollspyOpen] = useState(false);

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

  const { calculatePrivateEmploymentTotals, calculateTaxPayable } =
    calculations;

  useEffect(() => {
    // This effect will run when the component mounts
    const debugMode = true; // Set this to true when you want to debug

    if (debugMode) {
      // Assuming you have access to your form data, fields, and images here
      createDebugOverlay(images, formFields, form.getValues());
    }

    // Cleanup function to remove the debug overlay when component unmounts
    return () => {
      const debugOverlay = document.querySelector(
        'div[style*="position: relative"]'
      );
      if (debugOverlay) {
        debugOverlay.remove();
      }
    };
  }, [form, formFields]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "netWealthSurcharge") {
        if (value.netWealthSurcharge === "YES") {
          setValue("netWealthSurchargeAmount", "0.0");
        } else {
          setValue("netWealthSurchargeAmount", undefined);
        }
      }

      if (name === "minimumTax") {
        if (value.minimumTax === "DHAKA_CHATTOGRAM_CITY_CORPORATION_AREA") {
          setValue("minimumTaxAmount", "5000.00");
          calculateTaxPayable();
        }
        if (value.minimumTax === "OTHER_CITY_CORPORATION_AREA") {
          setValue("minimumTaxAmount", "4000.00");
          calculateTaxPayable();
        }
        if (value.minimumTax === "OTHER_AREA") {
          setValue("minimumTaxAmount", "3000.00");
          calculateTaxPayable();
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
  }, [watch, setValue, calculatePrivateEmploymentTotals, calculateTaxPayable]);

  const updateScale = useCallback(() => {
    if (containerRef.current && imageRefs.current[0]) {
      const imageWidth = imageRefs.current[0].offsetWidth;
      const newScale = imageWidth / 1000; // Assuming 1000px as base width
      setScale(newScale);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedScrollToImage = useCallback(
    debounce((index: number) => {
      imageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }, 500),
    [imageRefs]
  );

  const debouncedHandleScroll = useMemo(
    () =>
      debounce(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const bufferZone = window.innerHeight * 0.1;

        imageRefs.current.forEach((ref, index) => {
          if (ref) {
            const topBoundary = ref.offsetTop + bufferZone;
            const bottomBoundary =
              ref.offsetTop + ref.offsetHeight - bufferZone;

            if (
              scrollPosition > topBoundary &&
              scrollPosition < bottomBoundary
            ) {
              setCurrentImageIndex(index);
              if (index !== lastScrolledIndex) {
                setTargetImageIndex(index);
                setLastScrolledIndex(index);
              }
            }
          }
        });
      }, 100),
    [
      lastScrolledIndex,
      setCurrentImageIndex,
      setTargetImageIndex,
      setLastScrolledIndex,
    ]
  );

  const handleScroll = useCallback(() => {
    debouncedHandleScroll();
  }, [debouncedHandleScroll]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScale, handleScroll]);

  useEffect(() => {
    if (targetImageIndex !== lastScrolledIndex) {
      debouncedScrollToImage(targetImageIndex);
      setLastScrolledIndex(targetImageIndex);
    }
  }, [targetImageIndex, lastScrolledIndex, debouncedScrollToImage]);

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

  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      setTargetImageIndex((prevIndex) => {
        const newIndex =
          direction === "prev"
            ? Math.max(0, prevIndex - 1)
            : Math.min(images.length - 1, prevIndex + 1);
        if (newIndex !== prevIndex) {
          setLastScrolledIndex(newIndex);
          debouncedScrollToImage(newIndex);
        }
        return newIndex;
      });
    },
    [debouncedScrollToImage]
  );

  const onSubmit: SubmitHandler<IndividualTaxReturnFormInput> = async (
    data
  ) => {
    startTransition(async () => {
      try {
        await generatePDF(images, formFields, data);
        console.log(data);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    });
  };

  const renderField = (field: FormField, imageIndex: number) => {
    if (field.imageIndex !== imageIndex || !field.isVisible) return null;

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
                render={({ field: { value, onChange } }) => (
                  <div style={fieldStyle} className="overflow-hidden">
                    <input
                      type={field.type}
                      value={value as string}
                      onBlur={(e) => {
                        onChange(e.target.value);
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
                render={({ field: { value, onChange } }) => (
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
                        // onChange(e.target.value);
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

  const allImagesLoaded = loadedImages.every((loaded) => loaded);

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
                      <div className="relative">
                        {!loadedImages[index] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                            <Loader2 className="w-20 h-20 animate-spin text-primary" />
                          </div>
                        )}
                        <Image
                          src={image}
                          loading="lazy"
                          placeholder="blur"
                          alt={`Form Background ${index + 1}`}
                          layout="responsive"
                          className={`rounded-lg transition-opacity duration-300 ${
                            loadedImages[index] ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => handleImageLoad(index)}
                        />
                      </div>
                      {loadedImages[index] && (
                        <div
                          ref={setFormContainerRef(index)}
                          className="absolute top-0 left-0 w-full h-full"
                        >
                          {formFields.map((field) => renderField(field, index))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Responsive Scrollspy */}
                {isMobile ? (
                  <Button
                    onClick={() => setIsScrollspyOpen(!isScrollspyOpen)}
                    className="fixed right-10 bottom-10 z-20 bg-white shadow-lg rounded-full p-2"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                ) : null}

                <div
                  className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 transition-all duration-300 ${
                    isMobile
                      ? isScrollspyOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                      : ""
                  }`}
                >
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setTargetImageIndex(index);
                        if (isMobile) setIsScrollspyOpen(false);
                      }}
                      className={`block mb-2 w-8 h-8 rounded-full transition-all duration-300 ${
                        currentImageIndex === index
                          ? "bg-primary text-white scale-110"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Responsive Floating Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
                  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
                    <div className="hidden md:flex items-center space-x-6 mb-4 md:mb-0">
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10"
                          disabled={targetImageIndex === 0}
                          title="Previous Page"
                          onClick={() => handleNavigation("prev")}
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <span className="text-sm font-medium bg-gray-100 px-3 py-2 rounded-md">
                          Page {targetImageIndex + 1} of {images.length}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10"
                          disabled={targetImageIndex === images.length - 1}
                          title="Next Page"
                          type="button"
                          onClick={() => handleNavigation("next")}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        type="submit"
                        disabled={isPending || !allImagesLoaded}
                        className="w-full"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating PDF...
                          </>
                        ) : !allImagesLoaded ? (
                          "Loading Form..."
                        ) : (
                          "Save PDF"
                        )}
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
