"use client";

import { IndividualTaxReturnFormInput } from "@/app/(site)/individual-tax-return/schema";
import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

interface CustomRadioProps {
  label: string;
  checked: boolean;
  onChange: (newValue: string | undefined) => void;
  name: string;
  value: string;
  style?: React.CSSProperties;
  scale: number;
  width: number;
  height: number;
  required: boolean;
  disabled?: boolean;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  checked,
  onChange,
  name,
  value,
  style,
  scale,
  width,
  height,
  required,
  disabled = false,
}) => {
  const combinedStyle = {
    ...style,
    fontSize: `${1 * scale}rem`,
    width: `${width / 10}%`,
    height: `${height / 10}%`,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onChange(checked && !required ? undefined : value);
    }
  };

  return (
    <div
      className={`flex items-center ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      style={combinedStyle}
      onClick={handleClick}
    >
      {label && (
        <label className="absolute right-[120%] text-nowrap">{label}</label>
      )}
      <div
        className={`relative overflow-hidden w-full h-full border ${
          disabled
            ? "border-gray-300 bg-gray-100"
            : "border-sky-300 bg-sky-300/10 focus:border-sky-500 hover:border-sky-500"
        } rounded-none focus:ring-0 focus:outline-0`}
        style={{ width: "100%", height: "100%" }}
      >
        {required && !disabled && (
          <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
            <span className="absolute text-white top-[23px] left-[17px] text-lg">
              *
            </span>
          </span>
        )}
        <div
          className={`${checked ? "flex items-center justify-center" : ""}`}
          style={{ width: "100%", height: "100%" }}
        >
          {checked && (
            <svg
              viewBox="0 0 150 150"
              className={`fill-current ${
                disabled ? "text-gray-400" : "text-black"
              }`}
              style={{ width: "80%", height: "80%" }}
            >
              <path d="M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

interface RadioGroupProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  x: number;
  y: number;
  options: Array<{
    label: string;
    value: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  scale: number;
  required: boolean;
  label: string;
  disabled?: boolean;
  resetFields?: (keyof IndividualTaxReturnFormInput)[];
}

function RadioGroup<TFieldValues extends FieldValues>({
  control,
  name,
  options,
  scale,
  required,
  label,
  x,
  y,
  disabled = false,
  resetFields,
}: RadioGroupProps<TFieldValues>) {
  const { resetField } = useFormContext<IndividualTaxReturnFormInput>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div>
          {label && (
            <label
              className={`text-xl font-medium ${
                disabled ? "text-gray-400" : ""
              }`}
              style={{
                position: "absolute",
                left: `${x / 10}%`,
                top: `${y / 10}%`,
              }}
            >
              {label}
            </label>
          )}
          {options.map((option) => (
            <CustomRadio
              key={option.value}
              label={option.label}
              checked={value === option.value}
              onChange={(newValue) => {
                onChange(newValue);

                resetFields &&
                  resetFields.forEach((fieldName) => resetField(fieldName));
              }}
              name={name}
              value={option.value}
              style={{
                position: "absolute",
                left: `${option.x / 10}%`,
                top: `${option.y / 10}%`,
              }}
              scale={scale}
              width={option.width}
              height={option.height}
              required={required}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    />
  );
}

export { CustomRadio, RadioGroup };
