import { cva } from "class-variance-authority";

const variants = cva("text-sm flex", {
  variants: {
    variant: {
      default: "text-govbr-gray-80",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-pure-100",
      dark: "text-govbr-blue-warm-20",
      featured:""
    },
    density: {
      lowest:"px3 py-3",
      low: "px-3 py-3",
      default: "px-3 py-3",
      high: "px-3 py-3",
    },
  },
  defaultVariants: {
    variant: "default",
    density: "default"
  },
});

export default variants;
