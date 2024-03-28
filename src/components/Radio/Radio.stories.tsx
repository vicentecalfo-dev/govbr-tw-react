import { useState } from "react";
import Radio from ".";

export default {
  component: Radio,
  title: "Radio",
};

export const Default = () => {
  const [currentValue, setCurrentValue] = useState<any>("A");
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "default",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "default-solid",
    },
    {
      value: "G",
      label: "Disabled",
      variant: "default-solid",
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant, disabled }: any, index: number) => (
        <Radio
          name="teste"
          variant={variant}
          value={value}
          key={index}
          checked={value === currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          disabled={disabled ? disabled : false}
        >
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const Success = () => {
  const [currentValue, setCurrentValue] = useState<any>("A");
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "success",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "success-solid",
    },
    {
      value: "G",
      label: "Disabled",
      variant: "success",
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant, disabled }: any, index: number) => (
        <Radio
          name="teste"
          variant={variant}
          value={value}
          key={index}
          checked={value === currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          disabled={disabled ? disabled : false}
        >
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const Danger = () => {
  const [currentValue, setCurrentValue] = useState<any>("A");
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "danger",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "danger-solid",
    },
    {
      value: "G",
      label: "Disabled",
      variant: "danger",
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant, disabled }: any, index: number) => (
        <Radio
          name="teste"
          variant={variant}
          value={value}
          key={index}
          checked={value === currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          disabled={disabled ? disabled : false}
        >
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const Warning = () => {
  const [currentValue, setCurrentValue] = useState<any>("A");
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "warning",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "warning-solid",
    },
    {
      value: "G",
      label: "Disabled",
      variant: "warning",
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ value, label, variant, disabled }: any, index: number) => (
        <Radio
          name="teste"
          variant={variant}
          value={value}
          key={index}
          checked={value === currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          disabled={disabled ? disabled : false}
        >
          {label}
        </Radio>
      ))}
    </div>
  );
};

export const Dark = () => {
  const [currentValue, setCurrentValue] = useState<any>("A");
  const items: any = [
    {
      value: "A",
      label: "Default",
      variant: "dark",
    },
    {
      value: "B",
      label: "Default Solid",
      variant: "dark-solid",
    },
    {
      value: "G",
      label: "Disabled",
      variant: "dark",
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-col gap-3 bg-govbr-blue-warm-vivid-90 p-6">
      {items.map(({ value, label, variant, disabled }: any, index: number) => (
        <Radio
          name="teste"
          variant={variant}
          value={value}
          key={index}
          checked={value === currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          disabled={disabled ? disabled : false}
        >
          {label}
        </Radio>
      ))}
    </div>
  );
};
