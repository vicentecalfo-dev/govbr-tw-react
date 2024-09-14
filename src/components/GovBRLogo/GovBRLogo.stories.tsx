import { GovBRLogo } from ".";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: GovBRLogo,
  title: "Gov.BR Logo",
};

export const Default = () => (
  <>
    <GovBRLogo  />
  </>
);

export const White = () => (
  <>
    <GovBRLogo variant="white" className="bg-govbr-blue-warm-vivid-90 p-5" />
  </>
);

export const Black = () => (
  <>
    <GovBRLogo variant="black" className="p-5" />
  </>
);

export const DarkGray = () => (
  <>
    <GovBRLogo variant="dark-gray" className="bg-govbr-gray-2 p-5" />
  </>
);

export const LightGray = () => (
  <>
    <GovBRLogo variant="light-gray" className="bg-govbr-gray-60 p-5" />
  </>
);

export const CustomColor = () => (
  <>
    <GovBRLogo variant="light-gray" className="p-5" colors={["fill-orange-600", "fill-purple-600", "fill-emerald-600"]} />
  </>
);
