import { cva } from "class-variance-authority";

const variants = cva("size-6", {
  variants: {
    variant: {
      info: "text-govbr-blue-warm-vivid-70",
      success: "text-govbr-green-cool-vivid-50",
      danger: "text-govbr-red-vivid-50",
      warning: "text-govbr-pure-100"
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default variants;
