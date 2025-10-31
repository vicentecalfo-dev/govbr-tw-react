import { cva } from "class-variance-authority";

const tableVariants = cva("w-full border-separate border-spacing-0 text-sm text-left", {
  variants: {
    variant: {
      default: "text-govbr-gray-80 bg-govbr-pure-0",
      subtle: "text-govbr-gray-80 bg-govbr-gray-2",
      dark: "text-govbr-pure-0 bg-govbr-blue-warm-vivid-90",
    },
    bordered: {
      true: "border border-govbr-gray-20",
      false: "",
    },
    rounded: {
      true: "overflow-hidden rounded-lg",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    bordered: false,
    rounded: true,
  },
});

const tableHeaderCellVariants = cva(
  "px-4 py-3 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-govbr-gray-2 text-govbr-blue-warm-vivid-80 border-govbr-gray-20",
        subtle:
          "bg-govbr-blue-warm-20 text-govbr-blue-warm-vivid-70 border-govbr-blue-warm-vivid-40",
        dark:
          "bg-govbr-blue-warm-vivid-80 text-govbr-pure-0 border-govbr-blue-warm-vivid-70",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      sticky: {
        true: "sticky top-0 z-10",
        false: "",
      },
      lined: {
        true: "border-b",
        false: "border-b-0",
      },
    },
    defaultVariants: {
      variant: "default",
      align: "left",
      sticky: false,
      lined: true,
    },
  },
);

const tableRowVariants = cva("", {
  variants: {
    variant: {
      default: "",
      subtle: "",
      dark: "even:bg-govbr-blue-warm-vivid-80/40",
    },
    striped: {
      true: "odd:bg-transparent even:bg-govbr-gray-2/60",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "dark",
      striped: true,
      class: "even:bg-govbr-blue-warm-vivid-80/60",
    },
  ],
  defaultVariants: {
    variant: "default",
    striped: false,
  },
});

const tableCellVariants = cva("text-sm align-middle", {
  variants: {
    variant: {
      default: "border-govbr-gray-10 text-govbr-gray-80",
      subtle: "border-govbr-gray-20 text-govbr-gray-80",
      dark: "border-govbr-blue-warm-vivid-80 text-govbr-pure-0",
    },
    density: {
      relaxed: "px-5 py-4",
      default: "px-4 py-3",
      compact: "px-3 py-2 text-xs",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    lined: {
      true: "border-b",
      false: "border-b-0",
    },
  },
  defaultVariants: {
    variant: "default",
    density: "default",
    align: "left",
    lined: true,
  },
});

export {
  tableCellVariants,
  tableHeaderCellVariants,
  tableRowVariants,
  tableVariants,
};
