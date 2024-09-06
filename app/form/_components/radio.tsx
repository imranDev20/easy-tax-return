import React from "react";
import { Controller, Control } from "react-hook-form";
import { isFieldRequired, TaxpayerForm } from "../schema";

interface CustomRadioProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: keyof TaxpayerForm;
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

  const isRequired = isFieldRequired(name);

  return (
    <label className="flex items-center cursor-pointer" style={combinedStyle}>
      <div
        className="relative overflow-hidden w-full h-full border border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500"
        style={{ width: "100%", height: "100%" }}
      >
        <input
          type="radio"
          className="hidden"
          checked={checked}
          onChange={onChange}
          name={name}
          value={value}
        />

        {isRequired && (
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
  control: Control<TaxpayerForm>;
  name: keyof TaxpayerForm;
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
        <div>
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
