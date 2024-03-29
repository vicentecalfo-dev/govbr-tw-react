import { cva } from "class-variance-authority";

const variants = cva("flex gap-6 items-center w-full uppercase", {
  variants: {
    variant: {
        default: "text-govbr-blue-warm-vivid-70",
        dark:"text-govbr-blue-warm-20",
        black: "text-govbr-pure-100"
    }
  },
  defaultVariants: {
    variant: "default"
  },
});

export default variants;
