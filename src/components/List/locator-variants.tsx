import { cva } from "class-variance-authority";

const variants = cva("font-normal text-xs", {
  variants: {
    variant: {
      default: "text-govbr-gray-60",
      dark: "text-govbr-blue-warm-20"
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
