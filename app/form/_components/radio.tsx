import React from "react";
import { Controller, Control } from "react-hook-form";
import { FormData } from "../schema";

interface CustomRadioProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
  value: string;
  style?: React.CSSProperties;
  scale: number;
  width: number;
  height: number;
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
}) => {
  const combinedStyle = {
    ...style,
    fontSize: `${1 * scale}rem`,
    width: `${width / 10}%`, // Convert to percentage
    height: `${height / 10}%`, // Convert to percentage
  };

  return (
    <label className="flex items-center cursor-pointer" style={combinedStyle}>
      <div className="relative" style={{ width: "100%", height: "100%" }}>
        <input
          type="radio"
          className="hidden"
          checked={checked}
          onChange={onChange}
          name={name}
          value={value}
        />
        <div
          className={`bg-white border-2 border-gray-400 rounded ${
            checked ? "flex items-center justify-center" : ""
          }`}
          style={{ width: "100%", height: "100%" }}
        >
          {checked && (
            <svg
              viewBox="0 0 150 150"
              className="text-black fill-current"
              style={{ width: "80%", height: "80%" }}
            >
              <path d="M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z" />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
};

interface RadioGroupProps {
  control: Control<FormData>;
  name: keyof FormData;
  options: Array<{
    label: string;
    value: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  scale: number;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  control,
  name,
  options,
  scale,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
        >
          {options.map((option) => (
            <CustomRadio
              key={option.value}
              label={option.label}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
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
            />
          ))}
        </div>
      )}
    />
  );
};

export { CustomRadio, RadioGroup };
