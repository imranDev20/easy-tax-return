import React, { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";

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
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onChange,
  dayPosition,
  monthPosition,
  yearPosition,
  scale,
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

  const handleDateChange = (selectedDates: Date[]) => {
    const newDate = selectedDates[0] || null;
    setSelectedDate(newDate);
    onChange(newDate);
    window.scrollTo(0, scrollPositionRef.current);
  };

  const openDatepicker = () => {
    if (flatpickrInstance.current) {
      scrollPositionRef.current = window.pageYOffset;
      flatpickrInstance.current.open();
    }
  };

  const renderDateField = (
    value: string,
    position: DateFieldPosition,
    placeholder: string,
    ref?: React.RefObject<HTMLInputElement>
  ) => (
    <input
      ref={ref}
      type="text"
      value={value}
      onClick={openDatepicker}
      placeholder={placeholder}
      style={{
        position: "absolute",
        left: `${position.x / 10}%`,
        top: `${position.y / 10}%`,
        width: `${position.width / 10}%`,
        height: `${position.height / 10}%`,
        fontSize: `${14 * scale}px`,
        padding: "4px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      readOnly
    />
  );

  useEffect(() => {
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
  }, []);
  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
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
