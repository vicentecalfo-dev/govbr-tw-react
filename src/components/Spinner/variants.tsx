import { cva } from "class-variance-authority";

const variants = cva("animate-spin", {
  variants: {
    variant: {
      light: "text-govbr-blue-warm-vivid-70",
      dark: "text-govbr-blue-warm-20",
      "invert-light": "text-govbr-pure-0",
      "invert-dark": "text-govbr-blue-warm-vivid-90"
    },
    size: {
      button: "size-4",
      small: "size-10",
      medium: "size-24",
      large: "size-40",
    },
  },
  defaultVariants: {
    variant: "light",
    size: "small",
  },
});

export default variants;
