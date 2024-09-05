import React, { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

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
  const flatpickrRef = useRef<Flatpickr>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

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
  };

  const openDatepicker = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
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
    if (flatpickrRef.current && containerRef.current && dayInputRef.current) {
      const flatpickrInstance = flatpickrRef.current.flatpickr;
      const calendarElem = flatpickrInstance.calendarContainer;
      const containerRect = containerRef.current.getBoundingClientRect();
      const dayInputRect = dayInputRef.current.getBoundingClientRect();

      if (calendarElem) {
        calendarElem.style.position = "absolute";
        calendarElem.style.top = `${
          dayInputRect.bottom - containerRect.top + 5
        }px`;
        calendarElem.style.left = `${dayInputRect.left - containerRect.left}px`;
        calendarElem.style.zIndex = "9999";
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {renderDateField(day, dayPosition, "DD", dayInputRef)}
      {renderDateField(month, monthPosition, "MM")}
      {renderDateField(year, yearPosition, "YYYY")}
      <Flatpickr
        ref={flatpickrRef}
        value={selectedDate}
        onChange={handleDateChange}
        options={{
          dateFormat: "Y-m-d",
          allowInput: false,
          disableMobile: true,
          static: true,
          appendTo: containerRef.current || undefined,
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
