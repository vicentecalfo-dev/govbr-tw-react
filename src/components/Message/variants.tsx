import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      info: "text-govbr-blue-warm-vivid-70 bg-govbr-blue-warm-vivid-10",
      success: "text-govbr-green-cool-vivid-50 bg-govbr-green-cool-vivid-5",
      danger: "text-govbr-red-vivid-50 bg-govbr-red-vivid-10",
      warning: "text-govbr-pure-100 bg-govbr-yellow-vivid-5"
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default variants;
