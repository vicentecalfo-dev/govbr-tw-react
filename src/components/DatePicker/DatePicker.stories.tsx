import React, { useState } from "react";

import { DatePicker } from ".";

export default {
  component: DatePicker,
  title: "Form/DatePicker",
};

export const Default = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col gap-4 p-6">
      <DatePicker value={selected} onChange={setSelected} />
      <span className="text-sm opacity-70">
        {selected ? selected.toLocaleDateString("pt-BR") : "Nenhuma data"}
      </span>
    </div>
  );
};

export const CustomCalendar = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4 p-6">
      <DatePicker
        value={selected}
        onChange={setSelected}
        locale="en-US"
        calendarProps={{
          variant: "dark",
          density: "compact",
          weekStartsOn: 1,
          translations: {
            weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
          },
        }}
      />
      <span className="text-sm text-govbr-blue-warm-vivid-70">
        {selected ? selected.toLocaleDateString("en-US") : "Select a date"}
      </span>
    </div>
  );
};
