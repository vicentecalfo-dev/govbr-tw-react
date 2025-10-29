import React from "react";

import { Rating } from ".";

export default {
  component: Rating,
  title: "Rating",
};

export const Basic = () => (
  <Rating value={3} showValue />
);

export const Sizes = () => (
  <div className="flex flex-col gap-3">
    <Rating size="sm" value={2} />
    <Rating size="md" value={3} />
    <Rating size="lg" value={5} />
  </div>
);

export const CustomColors = () => (
  <div className="flex flex-col gap-3">
    <Rating
      value={4}
      activeClassName="!text-govbr-green-cool-vivid-50"
      inactiveClassName="!text-govbr-green-cool-vivid-5"
      showValue
    />
    <Rating
      value={2}
      activeClassName="!text-red-500"
      inactiveClassName="!text-red-200"
    />
  </div>
);

export const CustomMax = () => (
  <Rating value={8} max={10} showValue />
);
