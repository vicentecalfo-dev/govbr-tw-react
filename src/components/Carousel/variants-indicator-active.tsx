import { cva } from "class-variance-authority";

const variants = cva("size-3 rounded-full", {
  variants: {
    variant: {
      light: "bg-govbr-blue-warm-vivid-70",
      dark: "bg-govbr-blue-warm-vivid-80",
      white: "bg-govbr-yellow-vivid-20"
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export default variants;