import { cva } from "class-variance-authority";

const variants = cva("py-3 px-6", {
  variants: {
    variant: {
      default: "text-govbr-pure-100",
      dark: "text-govbr-pure-0",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export default variants;
