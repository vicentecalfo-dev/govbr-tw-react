import { cva } from "class-variance-authority";

const variants = cva("size-3 rounded-full", {
  variants: {
    variant: {
      light: "bg-govbr-gray-20",
      dark: "bg-govbr-blue-warm-20",
      white: "bg-govbr-pure-0"
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export default variants;