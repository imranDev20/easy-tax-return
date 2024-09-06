import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { isFieldRequired, TaxpayerForm } from "../schema";

// Import types from the main flatpickr module
type FlatpickrInstance = flatpickr.Instance;
type FlatpickrOptions = flatpickr.Options.Options;

interface DateFieldPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CustomDatePickerProps {
  onChange: (date: Date | null) => void;
  dayPosition: DateFieldPosition;
  monthPosition: DateFieldPosition;
  yearPosition: DateFieldPosition;
  scale: number;
  name: keyof TaxpayerForm;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onChange,
  dayPosition,
  monthPosition,
  yearPosition,
  scale,
  name,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const flatpickrInstance = useRef<FlatpickrInstance | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const formatDate = (date: Date | null) => {
    if (!date) return { day: "", month: "", year: "" };
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      year: date.getFullYear().toString(),
    };
  };

  const { day, month, year } = formatDate(selectedDate);

  const openDatepicker = () => {
    if (flatpickrInstance.current) {
      scrollPositionRef.current = window.pageYOffset;
      flatpickrInstance.current.open();
    }
  };

  const isRequired = isFieldRequired(name);

  const renderDateField = (
    value: string,
    position: DateFieldPosition,
    placeholder: string,
    ref?: React.RefObject<HTMLInputElement>
  ) => (
    <div
      style={{
        position: "absolute",
        left: `${position.x / 10}%`,
        top: `${position.y / 10}%`,
        width: `${position.width / 10}%`,
        height: `${position.height / 10}%`,
        fontSize: `${14 * scale}px`,
      }}
      className="overflow-hidden"
    >
      <input
        ref={ref}
        type="text"
        value={value}
        onClick={openDatepicker}
        placeholder={placeholder}
        className="relative overflow-hidden w-full h-full border border-sky-300 rounded-none bg-sky-300/10 focus:border-sky-500 focus:ring-0 focus:outline-0 focus:bg-transparent hover:border-sky-500 px-2 py-2 cursor-pointer"
        readOnly
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

  useEffect(() => {
    const handleDateChange = (selectedDates: Date[]) => {
      const newDate = selectedDates[0] || null;
      setSelectedDate(newDate);
      onChange(newDate);
      window.scrollTo(0, scrollPositionRef.current);
    };

    if (hiddenInputRef.current && containerRef.current && dayInputRef.current) {
      const options: FlatpickrOptions = {
        dateFormat: "Y-m-d",
        allowInput: false,
        disableMobile: true,
        static: true,
        appendTo: containerRef.current,
        onChange: handleDateChange,
        onOpen: () => {
          const calendarElem = flatpickrInstance.current?.calendarContainer;
          const containerRect = containerRef.current!.getBoundingClientRect();
          const dayInputRect = dayInputRef.current!.getBoundingClientRect();

          if (calendarElem) {
            calendarElem.style.position = "absolute";
            calendarElem.style.top = `${
              dayInputRect.bottom - containerRect.top + 5
            }px`;
            calendarElem.style.left = `${
              dayInputRect.left - containerRect.left
            }px`;
            calendarElem.style.zIndex = "9999";
          }
        },
        onClose: () => {
          window.scrollTo(0, scrollPositionRef.current);
        },
      };

      flatpickrInstance.current = flatpickr(hiddenInputRef.current, options);
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
      }
    };
  }, [onChange]);

  return (
    <div ref={containerRef}>
      {renderDateField(day, dayPosition, "DD", dayInputRef)}
      {renderDateField(month, monthPosition, "MM")}
      {renderDateField(year, yearPosition, "YYYY")}
      <input
        ref={hiddenInputRef}
        type="text"
        style={{ display: "none", position: "absolute", left: "-9999px" }}
        readOnly
      />
    </div>
  );
};

export default CustomDatePicker;
