import { cva } from "class-variance-authority";

const variants = cva("rounded-md size-full placeholder:italic", {
  variants: {
    variant: {
      default: "",
      dark: "",
    },
    density: {
      low: "px-3",
      default: "px-3",
      high: "px-3",
    },
  },
  defaultVariants: {
    variant: "default",
    density: "default"
  },
});

export default variants;