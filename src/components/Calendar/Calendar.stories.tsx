import React, { useState } from "react";

import Calendar from ".";
import { Button } from "../Button";

export default {
  component: Calendar,
  title: "Calendar",
};

export const Default = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row">
      <Calendar value={selected} onChange={setSelected} />
      <div className="flex h-full flex-col gap-4 rounded-xl border border-govbr-gray-10 p-4">
        <div className="text-sm font-semibold uppercase tracking-wide text-govbr-gray-80">
          Data selecionada
        </div>
        <div className="text-base font-medium">
          {selected
            ? selected.toLocaleDateString("pt-BR")
            : "Nenhuma data"}
        </div>
        <Button onClick={() => setSelected(new Date())}>Hoje</Button>
      </div>
    </div>
  );
};

export const DarkTheme = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-wrap gap-6 bg-govbr-blue-warm-vivid-90 p-6">
      <Calendar
        variant="dark"
        value={selected}
        onChange={setSelected}
        density="compact"
        minDate={new Date()}
        yearRange={{ start: 2020, end: 2035 }}
      />
      <div className="text-govbr-pure-0">
        {selected
          ? `Selecionado: ${selected.toLocaleDateString("pt-BR")}`
          : "Selecione uma data futura"}
      </div>
    </div>
  );
};

export const WithDisabledDates = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  const disableWeekends = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Calendar
      value={selected}
      onChange={setSelected}
      disabledDate={disableWeekends}
      minDate={new Date("2024-01-01")}
      maxDate={new Date("2024-12-31")}
    />
  );
};

export const CustomTranslations = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      value={selected}
      onChange={setSelected}
      locale="en-US"
      translations={{
        weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      }}
    />
  );
};
