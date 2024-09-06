import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { isFieldRequired, TaxpayerForm } from "../schema";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  name: keyof TaxpayerForm;
  placeholder?: string;
  style?: React.CSSProperties;
  scale: number;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  name,
  placeholder = "Select an option",
  style,
  scale,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  // Combine the passed style with our scaled font size
  const combinedStyle = {
    ...style,
    fontSize: `${0.875 * scale}rem`,
  };

  const isRequired = isFieldRequired(name);

  return (
    <div
      ref={selectRef}
      className="relative w-full h-full"
      style={combinedStyle}
    >
      <div
        className="w-full h-full bg-white border border-sky-300 hover:border-sky-500  cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative items-center justify-between flex px-2 overflow-hidden w-full h-full">
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className="flex-shrink-0"
            style={{ width: "8%", height: "40%" }}
          />

          {isRequired && (
            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-10 w-10 bg-sky-300/70 rotate-45 transform origin-center transition-colors">
              <span className="absolute text-white top-[23px] left-[17px] text-lg">
                *
              </span>
            </span>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${
                option.value === value ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelect(option)}
              style={{
                padding: `${2 * scale}% ${4 * scale}%`,
                fontSize: `${0.675 * scale}rem`,
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
