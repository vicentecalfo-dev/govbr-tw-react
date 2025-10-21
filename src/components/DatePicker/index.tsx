import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import Input from "../Input";
import { Button } from "../Button";
import Calendar from "../Calendar";
import type { CalendarProps } from "../Calendar";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  locale?: string;
  calendarProps?: Omit<CalendarProps, "value" | "onChange">;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  locale = "pt-BR",
  calendarProps,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale),
    [locale]
  );

  const toggleCalendar = () => {
    setIsCalendarOpen((previous) => !previous);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsCalendarOpen(false);
  };

  const { locale: calendarLocaleOverride, ...calendarRest } =
    calendarProps ?? {};

  return (
    <div className="relative inline-flex flex-col gap-2">
      <Input
        type="text"
        value={selectedDate ? dateFormatter.format(selectedDate) : ""}
        readOnly
        onClick={toggleCalendar}
        iconPosition="right"
      >
        <Button
          size="icon"
          variant="ghost"
          density="high"
          type="button"
          onClick={toggleCalendar}
        >
          <FontAwesomeIcon icon={faCalendarDays} />
        </Button>
      </Input>
      {isCalendarOpen && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20">
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            locale={calendarLocaleOverride ?? locale}
            {...calendarRest}
          />
        </div>
      )}
    </div>
  );
};

export { DatePicker };
