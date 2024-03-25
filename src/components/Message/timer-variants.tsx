import { cva } from "class-variance-authority";

const variants = cva("h-2", {
  variants: {
    variant: {
      info: "bg-govbr-blue-warm-vivid-70",
      success: "bg-govbr-green-cool-vivid-50",
      danger: "bg-govbr-red-vivid-50",
      warning: "bg-govbr-yellow-vivid-20"
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default variants;
