import { cva } from "class-variance-authority";

const variants = cva("w-full p-3 overflow-auto", {
  variants: {
    variant: {
      default: "",
      dark: "text-govbr-pure-0",
    },
    density: {
      low: "",
      default: "",
      high: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
