import React, { useState, useEffect } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface CustomCheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  style?: React.CSSProperties;
  scale: number;
  width: number;
  height: number;
  required: boolean;
  onBlur?: (val: string | boolean) => void;
  value?: boolean; // Add value prop
  onChange?: (value: boolean) => void; // Add onChange prop
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  name,
  register,
  style,
  scale,
  width,
  height,
  required,
  onBlur,
  value,
  onChange,
}) => {
  // Use controlled state if value prop is provided, otherwise use local state
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = value !== undefined ? value : internalChecked;

  const combinedStyle = {
    ...style,
    fontSize: `${1 * scale}rem`,
    width: `${width / 10}%`,
    height: `${height / 10}%`,
  };

  const { onChange: registerOnChange, ...rest } = register(name);

  useEffect(() => {
    // Only load from localStorage if value prop is not provided
    if (value === undefined) {
      const storedValue = localStorage.getItem(name);
      if (storedValue) {
        setInternalChecked(JSON.parse(storedValue));
      }
    }
  }, [name, value]);

  useEffect(() => {
    // Update internal state when value prop changes
    if (value !== undefined) {
      setInternalChecked(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = e.target.checked;

    // Update internal state if uncontrolled
    if (value === undefined) {
      setInternalChecked(newCheckedState);
      localStorage.setItem(name, JSON.stringify(newCheckedState));
    }

    // Call parent onChange if provided
    if (onChange) {
      onChange(newCheckedState);
    }

    // Call react-hook-form's onChange
    registerOnChange(e);

    // Call onBlur callback if provided
    if (onBlur) {
      onBlur(newCheckedState);
    }
  };

  return (
    <div className="relative" style={combinedStyle}>
      <label className="flex items-center cursor-pointer w-full h-full">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
          {...rest}
          className="absolute opacity-0 w-0 h-0"
        />
        <span className="relative overflow-hidden w-full h-full border border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500">
          {required && (
            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
              <span className="absolute text-white top-[23px] left-[17px] text-lg">
                *
              </span>
            </span>
          )}
          <span className="flex items-center justify-center w-full h-full">
            {isChecked && (
              <svg
                viewBox="0 0 150 150"
                className="text-black fill-current"
                style={{ width: "80%", height: "80%" }}
              >
                <path d="M39.323,124.635c-1.979-0.026-10.5-12.115-18.951-26.871L5,70.939l3.987-3.778c2.19-2.076,8.072-3.772,13.083-3.772h9.097 l4.576,13.658l4.577,13.665l36.4-37.755c20.019-20.764,43.139-41.175,51.394-45.353L143.106,0L112.84,32.579 C96.206,50.495,73.66,78.551,62.752,94.916C51.845,111.282,41.302,124.654,39.323,124.635z" />
              </svg>
            )}
          </span>
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
