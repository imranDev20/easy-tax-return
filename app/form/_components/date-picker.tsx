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
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const flatpickrRef = useRef<Flatpickr>(null);

  useEffect(() => {
    if (day && month && year) {
      const newDate = new Date(`${year}-${month}-${day}`);
      if (!isNaN(newDate.getTime())) {
        setDate(newDate);
        onChange(newDate);
      }
    }
  }, [day, month, year, onChange]);

  const handleDateChange = (selectedDates: Date[]) => {
    if (selectedDates[0]) {
      const newDate = selectedDates[0];
      setDay(newDate.getDate().toString().padStart(2, "0"));
      setMonth((newDate.getMonth() + 1).toString().padStart(2, "0"));
      setYear(newDate.getFullYear().toString());
    }
  };

  const openDatepicker = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
    }
  };

  const renderDateField = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    position: DateFieldPosition,
    placeholder: string
  ) => (
    <input
      type="text"
      value={value}
      onChange={(e) => setter(e.target.value)}
      onClick={openDatepicker}
      placeholder={placeholder}
      style={{
        position: "absolute",
        left: `${position.x / 10}%`,
        top: `${position.y / 10}%`,
        width: `${position.width / 10}%`,
        height: `${position.height / 10}%`,
        fontSize: `${1 * scale}rem`,
        padding: "4px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      readOnly
    />
  );

  return (
    <>
      {renderDateField(day, setDay, dayPosition, "DD")}
      {renderDateField(month, setMonth, monthPosition, "MM")}
      {renderDateField(year, setYear, yearPosition, "YYYY")}
      <Flatpickr
        ref={flatpickrRef}
        value={date}
        onChange={handleDateChange}
        options={{
          dateFormat: "Y-m-d",
          allowInput: true,
          disableMobile: true,
          appendTo: document.body,
        }}
      />
    </>
  );
};

export default CustomDatePicker;
