import { cva } from "class-variance-authority";

const variants = cva("flex flex-col text-govbr-pure-100 rounded-lg", {
  variants: {
    variant: {
      info: "bg-govbr-blue-warm-vivid-10",
      success: "bg-govbr-green-cool-vivid-5",
      danger: "bg-govbr-red-vivid-10",
      warning: "bg-govbr-yellow-vivid-5",
    },
    density: {
      lowest: "",
      low: "",
      default: "",
      high: "",
    },
  },
  defaultVariants: {
    variant: "info",
    density: "default",
  },
});

export default variants;
