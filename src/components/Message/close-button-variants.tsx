import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      info: "hover:!bg-govbr-blue-warm-vivid-20",
      success: "hover:!bg-govbr-green-cool-vivid-10",
      danger: "hover:!bg-govbr-red-vivid-20",
      warning: "hover:!bg-govbr-yellow-vivid-10"
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default variants;
