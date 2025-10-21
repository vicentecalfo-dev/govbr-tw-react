import { cva } from "class-variance-authority";

export const itemVariants = cva(
  "flex w-full items-start gap-4 rounded-2xl border p-4 transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-govbr-pure-0 border-govbr-gray-10 text-govbr-gray-80 hover:bg-govbr-gray-2",
        subtle:
          "bg-govbr-gray-2 border-govbr-gray-2 text-govbr-gray-80 hover:bg-govbr-gray-10",
        dark: "bg-govbr-blue-warm-vivid-90 border-govbr-blue-warm-20 text-govbr-pure-0 hover:bg-govbr-blue-warm-vivid-80",
      },
      density: {
        comfortable: "p-4 gap-4",
        compact: "p-3 gap-3",
      },
      bordered: {
        true: "",
        false: "border-transparent",
      },
    },
    compoundVariants: [
      {
        variant: "dark",
        bordered: false,
        class: "border-govbr-blue-warm-20",
      },
      {
        variant: "dark",
        class: "text-govbr-pure-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      density: "comfortable",
      bordered: true,
    },
  }
);
