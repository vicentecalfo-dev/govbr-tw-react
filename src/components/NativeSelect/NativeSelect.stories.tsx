import { useState } from "react";
import NativeSelect from ".";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default {
  component: NativeSelect,
  title: "Form/Native Select",
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


export const Default = () => {
  const [selected, setSelected] = useState("ts");

  function handleOnChange(event: any) {
    setSelected(event.target.value);
  }

  return (
    <>
      <NativeSelect options={mockOptions} onChange={handleOnChange} value={selected}/>
    </>
  );
};
