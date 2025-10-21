import { cva } from "class-variance-authority";

const buttonGroupVariants = cva("inline-flex flex-nowrap items-stretch", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    separated: {
      true: "gap-2",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    separated: false,
  },
});

export default buttonGroupVariants;
