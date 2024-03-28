import { cva } from "class-variance-authority";

const variants = cva("inline-flex rounded-full", {
  variants: {
    variant: {
      default: "bg-govbr-blue-warm-vivid-70",
      online: "bg-govbr-green-cool-vivid-50",
      offline: "bg-govbr-red-vivid-50",
      away: "bg-govbr-yellow-vivid-20",
    },
    size: {
      small: "size-3",
      medium: "size-4",
      large: "size-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
