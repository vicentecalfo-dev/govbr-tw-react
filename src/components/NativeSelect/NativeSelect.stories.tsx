import { useState } from "react";
import NativeSelect from ".";

export default {
  component: NativeSelect,
  title: "Native Select",
};

const mockOptions = [
  {
    label: "Javascript",
    value: "js",
  },
  {
    label: "Typescript",
    value: "ts",
  },
  {
    label: "Python",
    value: "py",
  },
];

export const Default = () => (
  <>
    <NativeSelect options={mockOptions} />
    <NativeSelect options={mockOptions} selected="ts" />
  </>
);

export const ControlState = () => {
  const [selected, setSelected] = useState();

  function handleOnChange(event: any) {
    setSelected(event.target.value);
  }

  return (
    <>
      <NativeSelect options={mockOptions} onChange={handleOnChange} selected={selected}/>
    </>
  );
};
