import { cva } from "class-variance-authority";

export const sheetViewportVariants = cva(
  "pointer-events-none fixed inset-0 z-50 flex flex-row",
  {
    variants: {
      side: {
        left: "justify-start",
        right: "justify-end",
        top: "items-start",
        bottom: "items-end",
      },
    },
    defaultVariants: {
      side: "left",
    },
  }
);

export const sheetContentVariants = cva(
  "relative flex max-h-full w-full flex-col overflow-hidden border shadow-xl outline-none transition-transform duration-300 ease-in-out will-change-transform data-[motion=closed]:pointer-events-none data-[motion=closing]:pointer-events-none data-[motion=opening]:pointer-events-none data-[motion=open]:pointer-events-auto",
  {
    variants: {
      variant: {
        default:
          "bg-govbr-pure-0 text-govbr-pure-100 border-govbr-gray-20",
        dark: "bg-govbr-blue-warm-vivid-90 text-govbr-blue-warm-20 border-govbr-blue-warm-20",
      },
      side: {
        left: "h-full max-w-[420px] border-r translate-x-0 mr-auto data-[motion=closed]:-translate-x-[120%] data-[motion=opening]:-translate-x-[120%] data-[motion=closing]:-translate-x-[120%] data-[motion=open]:translate-x-0",
        right: "h-full max-w-[420px] border-l translate-x-0 ml-auto data-[motion=closed]:translate-x-[120%] data-[motion=opening]:translate-x-[120%] data-[motion=closing]:translate-x-[120%] data-[motion=open]:translate-x-0",
        top: "w-full max-h-[80vh] border-b translate-y-0 data-[motion=closed]:-translate-y-[120%] data-[motion=opening]:-translate-y-[120%] data-[motion=closing]:-translate-y-[120%] data-[motion=open]:translate-y-0",
        bottom: "w-full max-h-[80vh] border-t translate-y-0 data-[motion=closed]:translate-y-[120%] data-[motion=opening]:translate-y-[120%] data-[motion=closing]:translate-y-[120%] data-[motion=open]:translate-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
      side: "left",
    },
  }
);

export const sheetHeaderVariants = cva(
  "flex items-center justify-between gap-3 border-b pr-12",
  {
    variants: {
      variant: {
        default: "border-govbr-gray-20 text-govbr-blue-warm-vivid-70",
        dark: "border-govbr-blue-warm-20 text-govbr-blue-warm-20",
      },
      density: {
        relaxed: "px-8 py-5",
        comfortable: "px-6 py-4",
        compact: "px-4 py-3",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "relaxed",
    },
  }
);

export const sheetBodyVariants = cva("flex-1 overflow-auto", {
  variants: {
    density: {
      relaxed: "px-8 py-6",
      comfortable: "px-6 py-4",
      compact: "px-4 py-3",
      none: "p-0",
    },
  },
  defaultVariants: {
    density: "relaxed",
  },
});

export const sheetFooterVariants = cva(
  "flex items-center justify-end gap-3 border-t",
  {
    variants: {
      variant: {
        default: "border-govbr-gray-20 text-govbr-pure-100",
        dark: "border-govbr-blue-warm-20 text-govbr-blue-warm-20",
      },
      density: {
        relaxed: "px-8 py-5",
        comfortable: "px-6 py-4",
        compact: "px-4 py-3",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "relaxed",
    },
  }
);
