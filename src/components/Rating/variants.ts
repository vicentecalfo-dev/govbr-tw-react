import { cva } from "class-variance-authority";

const ratingVariants = cva("inline-flex items-end gap-2", {
  variants: {
    alignment: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    },
  },
  defaultVariants: {
    alignment: "left",
  },
});

const ratingStarsVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "text-base",
      md: "text-xl",
      lg: "text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export { ratingVariants, ratingStarsVariants };
