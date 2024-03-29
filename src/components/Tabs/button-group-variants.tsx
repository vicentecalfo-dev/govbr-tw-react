import { cva } from "class-variance-authority";

const variants = cva("flex item-center border-b", {
  variants: {
    variant: {
      default: "border-govbr-gray-20",
      dark:""
    },
    density:{
        low: "h-12 min-w-12",
        default: "h-10 min-w-10",
        high: "h-8 min-w-8",
    }
  },
  defaultVariants: {
    variant: "default",
    density: "default"
  },
});

export default variants;
