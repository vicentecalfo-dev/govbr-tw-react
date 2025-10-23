import React from "react";
import { v4 as uuidv4 } from "uuid";
import { GovLogo } from ".";

export default {
  component: GovLogo,
  title: "Gov Logo",
};

export const Default = () => (
  <>
    <GovLogo />
  </>
);

export const Sizes = () => (
  <>
    <GovLogo className="!w-[150px]" />
  </>
);
