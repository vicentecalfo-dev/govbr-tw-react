import { cva } from "class-variance-authority";

const searchBoxRootVariants = cva("relative w-full", {
  variants: {
    density: {
      lowest: "",
      low: "",
      default: "",
      high: "",
    },
    variant: {
      default: "",
      danger: "",
      success: "",
      warning: "",
      dark: "",
      featured: "",
    },
  },
  defaultVariants: {
    density: "default",
    variant: "default",
  },
});

const searchBoxPanelVariants = cva(
  "absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-md border shadow-lg",
  {
    variants: {
      variant: {
        default: "border-govbr-gray-20 bg-white text-govbr-gray-90",
        danger:
          "border-govbr-red-vivid-40 bg-govbr-red-vivid-5 text-govbr-red-vivid-60",
        success:
          "border-govbr-green-cool-vivid-40 bg-govbr-green-cool-vivid-5 text-govbr-green-cool-vivid-60",
        warning:
          "border-govbr-yellow-vivid-30 bg-govbr-yellow-vivid-5 text-govbr-yellow-vivid-80",
        dark:
          "border-govbr-blue-warm-30 bg-govbr-blue-warm-90 text-govbr-pure-0",
        featured:
          "border-govbr-gray-10 bg-govbr-gray-5 text-govbr-gray-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const searchBoxOptionVariants = cva(
  "flex w-full items-center gap-3 px-4 text-left text-sm transition-colors focus:outline-none",
  {
    variants: {
      density: {
        lowest: "py-3.5",
        low: "py-3",
        default: "py-2.5",
        high: "py-2",
      },
      active: {
        true: "",
        false: "",
      },
      variant: {
        default: "",
        danger: "",
        success: "",
        warning: "",
        dark: "",
        featured: "",
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: "default",
        className:
          "bg-govbr-blue-warm-10 text-govbr-blue-warm-vivid-70",
      },
      {
        active: false,
        variant: "default",
        className:
          "text-govbr-gray-90 hover:bg-govbr-gray-10",
      },
      {
        active: true,
        variant: "danger",
        className:
          "bg-govbr-red-vivid-10 text-govbr-red-vivid-60",
      },
      {
        active: false,
        variant: "danger",
        className:
          "text-govbr-red-vivid-60 hover:bg-govbr-red-vivid-10/50",
      },
      {
        active: true,
        variant: "success",
        className:
          "bg-govbr-green-cool-vivid-10 text-govbr-green-cool-vivid-60",
      },
      {
        active: false,
        variant: "success",
        className:
          "text-govbr-green-cool-vivid-60 hover:bg-govbr-green-cool-vivid-10/60",
      },
      {
        active: true,
        variant: "warning",
        className:
          "bg-govbr-yellow-vivid-10 text-govbr-yellow-vivid-80",
      },
      {
        active: false,
        variant: "warning",
        className:
          "text-govbr-yellow-vivid-80 hover:bg-govbr-yellow-vivid-10/60",
      },
      {
        active: true,
        variant: "dark",
        className:
          "bg-govbr-blue-warm-80 text-govbr-pure-0",
      },
      {
        active: false,
        variant: "dark",
        className:
          "text-govbr-blue-warm-10 hover:bg-govbr-blue-warm-80/40",
      },
      {
        active: true,
        variant: "featured",
        className:
          "bg-govbr-blue-warm-10 text-govbr-blue-warm-vivid-80",
      },
      {
        active: false,
        variant: "featured",
        className:
          "text-govbr-gray-80 hover:bg-govbr-blue-warm-10/60",
      },
    ],
    defaultVariants: {
      density: "default",
      active: false,
      variant: "default",
    },
  }
);

const searchBoxMessageVariants = cva("px-4 py-3 text-sm", {
  variants: {
    state: {
      loading: "text-govbr-gray-70",
      empty: "text-govbr-gray-70",
      error: "text-govbr-red-vivid-60",
    },
    variant: {
      default: "",
      danger: "",
      success: "",
      warning: "",
      dark: "text-govbr-blue-warm-10",
      featured: "",
    },
  },
  compoundVariants: [
    {
      state: "error",
      variant: "danger",
      className: "text-govbr-red-vivid-60",
    },
    {
      state: "loading",
      variant: "dark",
      className: "text-govbr-blue-warm-10",
    },
    {
      state: "empty",
      variant: "dark",
      className: "text-govbr-blue-warm-10",
    },
  ],
  defaultVariants: {
    state: "empty",
    variant: "default",
  },
});

export {
  searchBoxMessageVariants,
  searchBoxOptionVariants,
  searchBoxPanelVariants,
  searchBoxRootVariants,
};
