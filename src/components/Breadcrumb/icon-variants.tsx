import { cva } from "class-variance-authority";

const variants = cva("inline-flex items-center gap-3", {
  variants: {
    variant: {
      default: "text-govbr-gray-20",
      dark: "text-govbr-blue-warm20",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export default variants;
