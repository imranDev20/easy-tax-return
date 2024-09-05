import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  name: string;
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
    fontSize: `${1 * scale}rem`,
  };

  return (
    <div
      ref={selectRef}
      className="relative w-full h-full"
      style={combinedStyle}
    >
      <div
        className="w-full h-full bg-white border-2 border-gray-400 rounded flex items-center justify-between px-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className="flex-shrink-0"
          style={{ width: "10%", height: "50%" }}
        />
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
              style={{ padding: `${2 * scale}% ${4 * scale}%` }}
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
