import { cva } from "class-variance-authority";

export const carouselSliderVariants = cva(
  "relative isolate flex w-full flex-col gap-4 rounded-2xl border p-4",
  {
    variants: {
      variant: {
        light: "bg-govbr-pure-0 border-govbr-gray-10 text-govbr-gray-80",
        dark: "bg-govbr-blue-warm-vivid-90 border-govbr-blue-warm-20 text-govbr-pure-0",
      },
      density: {
        comfortable: "gap-4",
        compact: "gap-2",
      },
    },
    defaultVariants: {
      variant: "light",
      density: "comfortable",
    },
  }
);

export const navigationButtonVariants = cva(
  "absolute top-1/2 -translate-y-1/2",
  {
    variants: {
      floating: {
        true: "shadow-lg",
        false: "",
      },
    },
    defaultVariants: {
      floating: true,
    },
  }
);
