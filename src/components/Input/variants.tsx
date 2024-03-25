import { cva } from "class-variance-authority";

const variants = cva("border border-govbr-gray-10 inline-flex rounded-md", {
  variants: {
    variant: {
      default: "",
      dark: "",
    },
    density: {
      low: "h-12",
      default: "h-10",
      high: "h-8",
    },
  },
  defaultVariants: {
    variant: "default",
    density: "default"
  },
});

export default variants;
