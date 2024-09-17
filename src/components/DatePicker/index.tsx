import React, { useState, useEffect } from "react";
import Input from "../Input";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  locale?: string; // Prop para o locale
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  locale = "pt-BR", // Locale padrão
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Funções para formatação de datas e nomes de dias/meses
  const dateFormatter = new Intl.DateTimeFormat(locale);
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const dayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
    }
  }, [value]);

  const handleDateClick = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // Remover horário para garantir precisão na comparação
    setSelectedDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
    setIsCalendarOpen(false);
  };

  const handleInputClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const changeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newMonth);
      return newDate;
    });
  };

  const changeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(newYear);
      return newDate;
    });
  };

  const handleYearInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d{4}$/.test(value)) {
      changeYear(event);
    }
  };

  const changeMonthByOffset = (offset: number) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  const renderCalendar = () => {
    if (!isCalendarOpen) return null;

    const startDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    // Determinar o início do calendário (começar no início da semana)
    const calendarStartDate = new Date(startDate);
    calendarStartDate.setDate(startDate.getDate() - startDate.getDay());

    // Determinar o final do calendário (encontrar o final da semana)
    const calendarEndDate = new Date(endDate);
    calendarEndDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days: JSX.Element[] = [];
    for (
      let d = calendarStartDate;
      d <= calendarEndDate;
      d.setDate(d.getDate() + 1)
    ) {
      const isCurrentMonth = d.getMonth() === currentMonth.getMonth();
      days.push(
        <div
          key={d.toDateString()}
          onClick={() => handleDateClick(new Date(d))}
          className={`size-10 rounded-full cursor-pointer flex justify-center items-center text-govbr-blue-warm-vivid-70 ${
            selectedDate?.toDateString() === d.toDateString()
              ? "!bg-govbr-blue-warm-vivid-70 text-govbr-pure-0"
              : "hover:bg-gray-200"
          } ${!isCurrentMonth ? "text-gray-400" : ""}`}
        >
          {d.getDate()}
        </div>
      );
    }

    const monthOptions = Array.from({ length: 12 }, (_, i) => (
      <option key={i} value={i}>
        {new Intl.DateTimeFormat(locale, { month: "long" }).format(
          new Date(0, i)
        )}
      </option>
    ));

    return (
      <div className="absolute border border-gray-300 bg-white shadow-lg">
        <div className="flex items-center p-2">
          <button onClick={() => changeMonthByOffset(-12)} className="px-2">
            {"<<"}
          </button>
          <button onClick={() => changeMonthByOffset(-1)} className="px-2">
            {"<"}
          </button>
          <select
            value={currentMonth.getMonth()}
            onChange={changeMonth}
            className="mx-2 border border-gray-300 p-1"
          >
            {monthOptions}
          </select>
          <input
            type="number"
            value={currentMonth.getFullYear()}
            onChange={handleYearInputChange}
            className="mx-2 border border-gray-300 p-1 w-24"
            min="1900"
            max="2100"
          />
          <button onClick={() => changeMonthByOffset(1)} className="px-2">
            {">"}
          </button>
          <button onClick={() => changeMonthByOffset(12)} className="px-2">
            {">>"}
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {Array.from({ length: 7 }, (_, i) => new Date(0, 0, i)).map(
            (date) => (
              <div key={date.toDateString()} className="text-center font-bold">
                {dayFormatter.format(date)}
              </div>
            )
          )}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={selectedDate ? dateFormatter.format(selectedDate) : ""}
        
        iconPosition="right"
      >
        <Button size="icon" variant="ghost" density="high" onClick={handleInputClick}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </Button>
      </Input>
      {renderCalendar()}
    </div>
  );
};

export { DatePicker };
