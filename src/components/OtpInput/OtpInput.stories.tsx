import React, { useState } from "react";
import OtpInput from ".";

export default {
  component: OtpInput,
  title: "OtpInput",
};

export const Default = () => (
  <div className="flex flex-col gap-4 p-6">
    <OtpInput digits={6} autoFocus />
    <OtpInput digits={4} placeholder="0" />
  </div>
);

export const WithPattern = () => (
  <div className="flex flex-col gap-4 p-6">
    <OtpInput pattern="xxx-xxx-xxx" />
    <OtpInput pattern="xxxx-xx" />
    <OtpInput pattern="xx-xx-xx" variant="success" />
  </div>
);

export const Variants = () => (
  <div className="flex flex-col gap-6 p-6">
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-govbr-gray-80">Tons claros</span>
      <div className="flex flex-wrap gap-4">
        <OtpInput digits={6} variant="default" />
        <OtpInput digits={6} variant="danger" />
        <OtpInput digits={6} variant="success" />
        <OtpInput digits={6} variant="warning" />
        <OtpInput digits={6} variant="featured" />
      </div>
    </div>
    <div className="flex flex-col gap-3 rounded-md bg-govbr-blue-warm-vivid-90 p-6">
      <span className="text-sm font-medium text-govbr-pure-0">Tons escuros</span>
      <OtpInput digits={6} variant="dark" />
    </div>
  </div>
);

export const Density = () => {
  const densities = ["lowest", "low", "default", "high"] as const;

  return (
    <div className="flex flex-col gap-3 p-6">
      {densities.map((density) => (
        <div key={density} className="flex items-center gap-4">
          <span className="w-20 text-sm font-medium capitalize text-govbr-gray-80">
            {density}
          </span>
          <OtpInput digits={6} density={density} placeholder="0" />
        </div>
      ))}
    </div>
  );
};

export const Controlled = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-4 p-6">
      <OtpInput
        pattern="xxx-xxx"
        value={value}
        onChange={setValue}
        onComplete={(next) => {
          // eslint-disable-next-line no-console
          console.log(`Codigo inserido: ${next}`);
        }}
      />
      <p className="text-sm text-govbr-gray-80">
        Valor atual: <span className="font-semibold">{value || "-"}</span>
      </p>
    </div>
  );
};
