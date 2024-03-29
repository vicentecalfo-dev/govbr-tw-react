import { cva } from "class-variance-authority";

const variants = cva("h-[1px] inline-block w-full border-t", {
  variants: {
    variant: {
        default: "border-govbr-gray-20",
        dark:"border-govbr-blue-warm-20/50",
        black: "border-govbr-gray-20",
    }
  },
  defaultVariants: {
    variant: "default"
  },
});

export default variants;
