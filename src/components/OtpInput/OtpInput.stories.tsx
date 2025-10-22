import React, { useState } from "react";
import OtpInput from ".";

export default {
  component: OtpInput,
  title: "Form/OtpInput",
};

export const Default = () => (
  <div className="flex flex-col gap-4 p-6">
    <OtpInput digits={6} autoFocus />
    <OtpInput digits={4} placeholder="0" pattern="x-xx-x"/>
  </div>
);

export const WithPattern = () => (
  <div className="flex flex-col gap-4 p-6">
    <OtpInput pattern="xxx-xxx" />
    <OtpInput pattern="xxxx-xx" />
  </div>
);

export const Controlled = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-4 p-6">
      <OtpInput
        pattern="xxx-xxx"
        value={value}
        onChange={setValue}
        onComplete={(next) => {
          // eslint-disable-next-line no-alert
          alert(`Codigo inserido: ${next}`);
        }}
      />
      <p className="text-sm text-govbr-gray-80">
        Valor atual: <span className="font-semibold">{value || "-"}</span>
      </p>
    </div>
  );
};
