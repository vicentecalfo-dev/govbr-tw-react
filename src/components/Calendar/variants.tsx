import { cva } from "class-variance-authority";

export const calendarVariants = cva(
  "flex flex-col gap-4 rounded-2xl border p-4 shadow-sm transition-colors",
  {
    variants: {
      variant: {
        light:
          "bg-govbr-pure-0 border-govbr-gray-10 text-govbr-gray-80",
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

export const dayButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-70 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        light:
          "text-govbr-gray-80 focus-visible:ring-offset-govbr-pure-0 hover:bg-govbr-blue-warm-20/70",
        dark: "text-govbr-pure-0 focus-visible:ring-offset-govbr-blue-warm-vivid-90 hover:bg-govbr-blue-warm-20/30",
      },
      density: {
        comfortable: "h-10 w-10 text-sm",
        compact: "h-8 w-8 text-xs",
      },
      isSelected: {
        true: "",
        false: "",
      },
      isToday: {
        true: "",
        false: "",
      },
      isOutside: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "light",
        isSelected: true,
        class:
          "bg-govbr-blue-warm-vivid-70 text-govbr-pure-0 hover:bg-govbr-blue-warm-vivid-70/90",
      },
      {
        variant: "dark",
        isSelected: true,
        class:
          "bg-govbr-pure-0 text-govbr-blue-warm-vivid-90 hover:bg-govbr-pure-0/90",
      },
      {
        isOutside: true,
        isSelected: false,
        class: "text-govbr-gray-60 hover:bg-transparent",
      },
      {
        variant: "dark",
        isOutside: true,
        isSelected: false,
        class: "text-govbr-blue-warm-20 hover:bg-transparent",
      },
      {
        isToday: true,
        isSelected: false,
        class:
          "border border-govbr-blue-warm-vivid-70 border-solid",
      },
      {
        variant: "dark",
        isToday: true,
        isSelected: false,
        class: "border border-govbr-blue-warm-20 border-solid",
      },
    ],
    defaultVariants: {
      variant: "light",
      density: "comfortable",
      isSelected: false,
      isToday: false,
      isOutside: false,
    },
  }
);
