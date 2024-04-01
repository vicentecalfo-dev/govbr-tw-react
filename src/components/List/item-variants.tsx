import { cva } from "class-variance-authority";

const variants = cva("p-3 border-b flex gap-3 items-center", {
  variants: {
    variant: {
      default: "border-govbr-gray-20 text-govbr-blue-warm-vivid-70",
      dark: "border-govbr-blue-warm-20/20 text-govbr-blue-warm-20"
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
