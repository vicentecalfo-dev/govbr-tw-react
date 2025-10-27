import { cva, type VariantProps } from "class-variance-authority";

export const sidebarContainerVariants = cva(
  "fixed z-40 flex flex-col overflow-hidden transition-[transform,width] duration-300 ease-in-out will-change-transform p-0",
  {
    variants: {
      theme: {
        light: "bg-govbr-gray-2 text-govbr-gray-80 border-govbr-gray-10",
        dark: "bg-govbr-blue-warm-vivid-90 text-govbr-pure-0 border-govbr-blue-warm-20",
      },
      variant: {
        sidebar: "shadow-sm",
        floating: "border shadow-lg rounded-md",
        inset: "border shadow-md",
      },
      side: {
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      { variant: "sidebar", side: "left", className: "border-r" },
      { variant: "sidebar", side: "right", className: "border-l" },
      {
        variant: "floating",
        theme: "light",
        className: "bg-govbr-gray-2 supports-[backdrop-filter]:backdrop-blur-md",
      },
      {
        variant: "floating",
        theme: "dark",
        className: "bg-govbr-blue-warm-vivid-90/90 supports-[backdrop-filter]:backdrop-blur-md",
      },
    ],
    defaultVariants: {
      theme: "light",
      variant: "sidebar",
      side: "left",
    },
  }
);

export const sidebarHeaderVariants = cva("flex flex-col gap-3 border-b px-6 py-6 transition-all", {
  variants: {
    theme: {
      light: "border-govbr-gray-10",
      dark: "border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-90",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

export const sidebarFooterVariants = cva("mt-auto flex flex-col gap-3 border-t p-6 transition-all", {
  variants: {
    theme: {
      light: "border-govbr-gray-10",
      dark: "border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-90",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

export const sidebarSeparatorVariants = cva("my-4 h-px", {
  variants: {
    theme: {
      light: "bg-govbr-gray-10",
      dark: "bg-govbr-blue-warm-vivid-80",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

export const sidebarGroupLabelVariants = cva(
  "flex h-8 items-center gap-2 px-6 text-xs tracking-wide transition-opacity duration-200",
  {
    variants: {
      theme: {
        light: "text-govbr-gray-60",
        dark: "text-govbr-blue-warm-20",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export const sidebarContentVariants = cva(
  "flex min-h-0 flex-1 flex-col overflow-y-auto p-6",
  {
    variants: {
      theme: {
        light: "bg-transparent",
        dark: "bg-govbr-blue-warm-vivid-90",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export const sidebarMenuButtonVariants = cva(
  "relative flex w-full items-center gap-3 rounded-md p-3 text-left text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 group/menu-button",
  {
    variants: {
      theme: {
        light:
          "text-govbr-gray-60 hover:bg-govbr-gray-10 focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        dark: "text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-vivid-80 focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
      },
      size: {
        sm: "h-8 text-xs",
        md: "h-9",
        lg: "h-12 text-base",
      },
      variant: {
        default: "",
        outline: "border",
      },
      iconOnly: {
        true: "h-10 w-10 justify-center px-0",
        false: "",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        theme: "light",
        variant: "outline",
        className: "border-govbr-gray-20",
      },
      {
        theme: "dark",
        variant: "outline",
        className: "border-govbr-blue-warm-20",
      },
      {
        theme: "light",
        active: true,
        className: "bg-govbr-blue-warm-vivid-10 text-govbr-blue-warm-vivid-70 font-semibold",
      },
      {
        theme: "dark",
        active: true,
        className: "bg-govbr-blue-warm-vivid-80 text-govbr-pure-0 font-semibold",
      },
    ],
    defaultVariants: {
      theme: "light",
      size: "md",
      variant: "default",
      iconOnly: false,
      active: false,
    },
  }
);

export const sidebarMenuActionVariants = cva(
  "absolute right-3 top-2 flex h-6 w-6 items-center justify-center rounded-full text-sm transition-opacity focus-visible:outline-none group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100 md:opacity-0",
  {
    variants: {
      theme: {
        light: "text-govbr-gray-60 hover:bg-govbr-gray-10 hover:text-govbr-blue-warm-vivid-60 focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-50",
        dark: "text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-vivid-80 hover:text-govbr-pure-0 focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-60",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export const sidebarMenuBadgeVariants = cva(
  "pointer-events-none absolute right-3 top-2 flex min-w-6 items-center justify-center rounded-md px-2 text-xs font-semibold",
  {
    variants: {
      theme: {
        light: "bg-govbr-blue-warm-20 text-govbr-blue-warm-vivid-80",
        dark: "bg-govbr-blue-warm-vivid-80 text-govbr-pure-0",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export const sidebarMenuSubVariants = cva("ml-7 flex min-w-0 flex-col gap-1 border-l pl-3", {
  variants: {
    theme: {
      light: "border-govbr-gray-20",
      dark: "border-govbr-blue-warm-20",
    },
  },
  defaultVariants: {
    theme: "light",
  },
});

export const sidebarMenuSubButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      theme: {
        light:
          "text-govbr-gray-80 hover:bg-govbr-gray-10 focus-visible:ring-govbr-blue-warm-vivid-50",
        dark: "text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-vivid-80 focus-visible:ring-govbr-blue-warm-vivid-60",
      },
      size: {
        sm: "h-7 text-xs",
        md: "h-8",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        theme: "light",
        active: true,
        className: "bg-govbr-blue-warm-vivid-10 text-govbr-blue-warm-vivid-70 font-medium",
      },
      {
        theme: "dark",
        active: true,
        className: "bg-govbr-blue-warm-vivid-80 text-govbr-pure-0 font-medium",
      },
    ],
    defaultVariants: {
      theme: "light",
      size: "md",
      active: false,
    },
  }
);

export const sidebarRailVariants = cva(
  "hidden h-16 w-3 -translate-y-1/2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-50 md:flex cursor-pointer",
  {
    variants: {
      theme: {
        light: "bg-govbr-gray-20 hover:bg-govbr-blue-warm-vivid-70",
        dark: "bg-govbr-blue-warm-vivid-80 hover:bg-govbr-blue-warm-vivid-60",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export const sidebarGroupActionVariants = cva(
  "absolute right-4 top-3 flex h-6 w-6 items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      theme: {
        light: "text-govbr-gray-60 hover:bg-govbr-gray-10 hover:text-govbr-blue-warm-vivid-60 focus-visible:ring-govbr-blue-warm-vivid-50",
        dark: "text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-vivid-80 hover:text-govbr-pure-0 focus-visible:ring-govbr-blue-warm-vivid-60",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export type SidebarMenuButtonVariantProps = Pick<VariantProps<typeof sidebarMenuButtonVariants>, "size" | "variant">;
export type SidebarMenuSubButtonVariantProps = Pick<VariantProps<typeof sidebarMenuSubButtonVariants>, "size">;
