import { cva } from "class-variance-authority";

const variants = cva(
  "flex items-center justify-center rounded-full uppercase bg-govbr-blue-warm-20 text-govbr-blue-warm-vivid-70 bg-cover",
  {
    variants: {
      variant: {
        image: "aspect-auto",
        initials: "font-bold",
      },
      size: {
        small: "size-10",
        medium: "size-24 text-4xl",
        large: "size-40 text-7xl",
      },
    },
    defaultVariants: {
      variant: "initials",
      size: "small",
    },
  }
);

export default variants;
