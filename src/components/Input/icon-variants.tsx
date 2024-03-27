import { cva } from "class-variance-authority";

const variants = cva("absolute", {
  variants: {
    variant: {
      default: "text-govbr-blue-warm-vivid-70",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-pure-100",
      dark: "text-govbr-blue-warm-20",
      featured:""
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;