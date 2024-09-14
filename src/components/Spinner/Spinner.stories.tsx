import { Spinner } from ".";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: Spinner,
  title: "Spinner",
};

export const Default = () => (
  <div className="flex">
    <div className="flex gap-5 p-5">
      <Spinner />
    </div>
    <div className="flex gap-5 bg-govbr-blue-warm-vivid-90 p-5 justify-center">
      <Spinner variant="dark" />
    </div>
    <div className="flex gap-5 p-5 bg-govbr-blue-warm-vivid-70">
      <Spinner variant="invert-light" />
    </div>
    <div className="flex gap-5 p-5 bg-govbr-blue-warm-20">
      <Spinner variant="invert-dark" />
    </div>
  </div>
);

export const Sizes = () => (
  <div className="flex gap-5 items-center">
    <Spinner size="button" />
    <Spinner size="small" />
    <Spinner size="medium" />
    <Spinner size="large" />
  </div>
);

export const CustomSize = () => (
  <div className="flex gap-5 items-center justify-center size-[300px] bg-govbr-blue-warm-vivid-90">
    <Spinner variant="invert-light" className="size-[200px]" />
  </div>
);

export const CustomColors = () => (
  <div className="flex">
    <div className="flex gap-5 p-5">
      <Spinner className="text-purple-300" />
    </div>
    <div className="flex gap-5 p-5 bg-orange-600">
      <Spinner className="text-orange-300" />
    </div>
  </div>
);
