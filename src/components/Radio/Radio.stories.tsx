import { useState } from "react";
import Radio from ".";

export default {
  component: Radio,
  title: "Radio",
};

export const Default = () => {
  const [currentValue, setCurrentValue] = useState<any>("A");
  const items: any = [
    { value: "A", label: "Opção A", variant: "default" },
    { value: "B", label: "Opção B", variant: "default" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant }: any, index: number) => (
        <Radio
          name="teste"
          variant={variant}
          value={value}
          key={index}
          checked={value === currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        >
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const States = () => {
  const items: any = [
    { value: "Success", label: "Success", variant: "success" },
    { value: "Danger", label: "Danger", variant: "danger" },
    { value: "Warning", label: "Warning", variant: "warning" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant }: any, index: number) => (
        <Radio name="teste-1" variant={variant} value={value} key={index}>
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const Disabled = () => {
  const items: any = [
    { value: "Default", label: "Default", variant: "default" },
    { value: "Success", label: "Success", variant: "success" },
    { value: "Danger", label: "Danger", variant: "danger" },
    { value: "Warning", label: "Warning", variant: "warning" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant }: any, index: number) => (
        <Radio name="teste-1" variant={variant} value={value} key={index} disabled>
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const Dark = () =>{
    const items: any = [
        { value: "Opção A", label: "Opção A", variant: "dark" ,disabled:false},
        { value: "Opção B", label: "Opção B", variant: "dark", disabled:false},
        { value: "Danger", label: "Danger", variant: "dark", disabled:true },
      ];
    return (
  <div className="flex flex-col gap-3 bg-govbr-blue-warm-vivid-90 p-6">
      {items.map(({ value, label, variant,disabled }: any, index: number) => (
        <Radio name="teste-1" variant={variant} value={value} key={index} disabled={disabled}>
          {label}
        </Radio>
      ))}
  </div>
)};
