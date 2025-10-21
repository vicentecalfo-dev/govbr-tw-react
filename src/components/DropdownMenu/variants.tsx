import { cva } from "class-variance-authority";

export const dropdownMenuContentVariants = cva(
  "z-50 min-w-[10rem] overflow-hidden rounded-xl border border-govbr-gray-10 bg-govbr-pure-0 p-1 text-sm text-govbr-gray-80 shadow-lg focus:outline-none",
  {
    variants: {
      side: {
        bottom: "mt-2",
        top: "mb-2",
        left: "mr-2",
        right: "ml-2",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  }
);

export const dropdownMenuItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:bg-govbr-blue-warm-20 focus:text-govbr-blue-warm-vivid-80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);

export const dropdownMenuCheckboxItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 pr-8 text-sm outline-none transition-colors focus:bg-govbr-blue-warm-20 focus:text-govbr-blue-warm-vivid-80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "pl-9",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);

export const dropdownMenuRadioItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 pr-8 text-sm outline-none transition-colors focus:bg-govbr-blue-warm-20 focus:text-govbr-blue-warm-vivid-80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "pl-9",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);

export const dropdownMenuLabelVariants = cva(
  "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-govbr-blue-warm-vivid-80",
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);

export const dropdownMenuSeparatorVariants = cva(
  "my-1 h-px bg-govbr-gray-10"
);

export const dropdownMenuSubTriggerVariants = cva(
  "flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors data-[state=open]:bg-govbr-blue-warm-20 data-[state=open]:text-govbr-blue-warm-vivid-80 focus:bg-govbr-blue-warm-20 focus:text-govbr-blue-warm-vivid-80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }
);
