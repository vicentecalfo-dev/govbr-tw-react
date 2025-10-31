import { cva } from "class-variance-authority";

const treeVariants = cva("flex flex-col gap-1 text-sm", {
  variants: {
    variant: {
      default: "text-govbr-gray-90",
      danger: "text-govbr-red-vivid-60",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-yellow-vivid-80",
      dark: "text-govbr-pure-0",
      featured: "text-govbr-blue-warm-vivid-80",
    },
    density: {
      lowest: "gap-2",
      low: "gap-1.5",
      default: "gap-1",
      high: "gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
    density: "default",
  },
});

const treeItemVariants = cva(
  "flex w-full items-center gap-2 rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-govbr-blue-warm-10/40",
        danger: "hover:bg-govbr-red-vivid-10/60",
        success: "hover:bg-govbr-green-cool-vivid-10/60",
        warning: "hover:bg-govbr-yellow-vivid-10/70",
        dark: "hover:bg-govbr-blue-warm-80/50",
        featured: "hover:bg-govbr-blue-warm-10/40",
      },
      density: {
        lowest: "min-h-14 px-2",
        low: "min-h-12 px-2",
        default: "min-h-10 px-1.5",
        high: "min-h-8 px-1.5",
      },
      disabled: {
        true: "cursor-not-allowed opacity-60",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
      disabled: false,
    },
  }
);

const treeLabelVariants = cva("flex-1 truncate text-left text-sm", {
  variants: {
    variant: {
      default: "text-govbr-gray-90",
      danger: "text-govbr-red-vivid-60",
      success: "text-govbr-green-cool-vivid-60",
      warning: "text-govbr-yellow-vivid-80",
      dark: "text-govbr-pure-0",
      featured: "text-govbr-blue-warm-vivid-80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const treeToggleVariants = cva(
  "flex shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default:
          "hover:bg-govbr-blue-warm-10/70 focus-visible:outline-govbr-blue-warm-vivid-60",
        danger:
          "hover:bg-govbr-red-vivid-10/70 focus-visible:outline-govbr-red-vivid-60",
        success:
          "hover:bg-govbr-green-cool-vivid-10/70 focus-visible:outline-govbr-green-cool-vivid-60",
        warning:
          "hover:bg-govbr-yellow-vivid-10/70 focus-visible:outline-govbr-yellow-vivid-60",
        dark:
          "hover:bg-govbr-blue-warm-80/70 focus-visible:outline-govbr-blue-warm-20",
        featured:
          "hover:bg-govbr-blue-warm-10/70 focus-visible:outline-govbr-blue-warm-vivid-60",
      },
      density: {
        lowest: "h-8 w-8",
        low: "h-7 w-7",
        default: "h-6 w-6",
        high: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
    },
  }
);

const treeIconWrapperVariants = cva("flex shrink-0 items-center justify-center", {
  variants: {
    density: {
      lowest: "h-8 w-8",
      low: "h-7 w-7",
      default: "h-6 w-6",
      high: "h-5 w-5",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export {
  treeIconWrapperVariants,
  treeItemVariants,
  treeLabelVariants,
  treeToggleVariants,
  treeVariants,
};
