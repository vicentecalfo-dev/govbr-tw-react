import { cva } from "class-variance-authority";

export const stepVariants = cva("w-full", {
  variants: {
    orientation: {
      horizontal: "flex items-start",
      vertical: "flex h-full flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepItemVariants = cva("relative", {
  variants: {
    orientation: {
      horizontal: "flex flex-1 flex-col items-center gap-3 text-center",
      vertical: "flex flex-1 items-stretch gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepIndicatorWrapperVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "relative flex w-full items-center justify-center",
      vertical:
        "relative flex h-full flex-col items-center justify-center self-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const indicatorPalette = {
  default: {
    complete:
      "bg-govbr-blue-warm-vivid-70 border-govbr-blue-warm-vivid-70 text-govbr-pure-0",
    current:
      "bg-govbr-blue-warm-20 border-govbr-blue-warm-vivid-70 text-govbr-blue-warm-vivid-70",
    upcoming:
      "bg-govbr-pure-0 border-govbr-blue-warm-20 text-govbr-blue-warm-vivid-60",
  },
  danger: {
    complete:
      "bg-govbr-red-vivid-50 border-govbr-red-vivid-50 text-govbr-pure-0",
    current:
      "bg-govbr-red-vivid-10 border-govbr-red-vivid-50 text-govbr-red-vivid-50",
    upcoming:
      "bg-govbr-pure-0 border-govbr-red-vivid-20 text-govbr-red-vivid-40",
  },
  success: {
    complete:
      "bg-govbr-green-cool-vivid-50 border-govbr-green-cool-vivid-50 text-govbr-pure-0",
    current:
      "bg-govbr-green-cool-vivid-10 border-govbr-green-cool-vivid-50 text-govbr-green-cool-vivid-50",
    upcoming:
      "bg-govbr-pure-0 border-govbr-green-cool-vivid-10 text-govbr-green-cool-vivid-50",
  },
  warning: {
    complete:
      "bg-govbr-yellow-vivid-20 border-govbr-yellow-vivid-20 text-govbr-pure-100",
    current:
      "bg-govbr-yellow-vivid-5 border-govbr-yellow-vivid-20 text-govbr-yellow-vivid-20",
    upcoming:
      "bg-govbr-pure-0 border-govbr-yellow-vivid-5 text-govbr-yellow-vivid-20",
  },
  featured: {
    complete:
      "bg-govbr-blue-warm-20 border-govbr-blue-warm-20 text-govbr-blue-warm-vivid-80",
    current:
      "bg-govbr-blue-warm-vivid-20 border-govbr-blue-warm-vivid-80 text-govbr-blue-warm-vivid-80",
    upcoming:
      "bg-govbr-pure-0 border-govbr-blue-warm-10 text-govbr-blue-warm-vivid-80",
  },
  dark: {
    complete:
      "bg-govbr-blue-warm-vivid-80 border-govbr-blue-warm-vivid-80 text-govbr-pure-0",
    current:
      "bg-govbr-blue-warm-20 border-govbr-blue-warm-vivid-80 text-govbr-blue-warm-vivid-70",
    upcoming:
      "bg-govbr-blue-warm-vivid-90 border-govbr-blue-warm-40 text-govbr-blue-warm-30",
  },
} as const;

type IndicatorVariant = keyof typeof indicatorPalette;
type IndicatorStatus = keyof (typeof indicatorPalette)[IndicatorVariant];

const indicatorCompound = Object.entries(indicatorPalette).flatMap(
  ([variant, statuses]) =>
    Object.entries(statuses).map(([status, className]) => ({
      variant,
      status,
      class: className,
    }))
);

export const stepIndicatorVariants = cva(
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-govbr-blue-warm-vivid-70",
        danger: "text-govbr-red-vivid-50",
        success: "text-govbr-green-cool-vivid-50",
        warning: "text-govbr-yellow-vivid-20",
        featured: "text-govbr-blue-warm-20",
        dark: "text-govbr-pure-0",
      },
      status: {
        complete: "",
        current: "",
        upcoming: "",
      },
    },
    compoundVariants: indicatorCompound as Array<{
      variant: IndicatorVariant;
      status: IndicatorStatus;
      class: string;
    }>,
    defaultVariants: {
      variant: "default",
      status: "upcoming",
    },
  }
);

const connectorPalette = {
  default: {
    complete: "bg-govbr-blue-warm-vivid-70",
    current: "bg-govbr-blue-warm-vivid-70",
    upcoming: "bg-govbr-blue-warm-20",
  },
  danger: {
    complete: "bg-govbr-red-vivid-50",
    current: "bg-govbr-red-vivid-50",
    upcoming: "bg-govbr-red-vivid-20",
  },
  success: {
    complete: "bg-govbr-green-cool-vivid-50",
    current: "bg-govbr-green-cool-vivid-50",
    upcoming: "bg-govbr-green-cool-vivid-10",
  },
  warning: {
    complete: "bg-govbr-yellow-vivid-20",
    current: "bg-govbr-yellow-vivid-20",
    upcoming: "bg-govbr-yellow-vivid-5",
  },
  featured: {
    complete: "bg-govbr-blue-warm-20",
    current: "bg-govbr-blue-warm-20",
    upcoming: "bg-govbr-blue-warm-10",
  },
  dark: {
    complete: "bg-govbr-blue-warm-vivid-80",
    current: "bg-govbr-blue-warm-vivid-80",
    upcoming: "bg-govbr-blue-warm-40",
  },
} as const;

type ConnectorVariant = keyof typeof connectorPalette;
type ConnectorStatus = keyof (typeof connectorPalette)[ConnectorVariant];

const connectorCompound = Object.entries(connectorPalette).flatMap(
  ([variant, statuses]) =>
    Object.entries(statuses).map(([status, className]) => ({
      variant,
      status,
      class: className,
    }))
);

export const stepConnectorVariants = cva("transition-colors duration-200", {
  variants: {
    orientation: {
      horizontal: "flex-1 h-0.5 rounded-full",
      vertical: "w-0.5 flex-1 rounded-full min-h-4",
    },
    variant: {
      default: "",
      danger: "",
      success: "",
      warning: "",
      featured: "",
      dark: "",
    },
    status: {
      complete: "",
      current: "",
      upcoming: "",
    },
  },
  compoundVariants: connectorCompound as Array<{
    variant: ConnectorVariant;
    status: ConnectorStatus;
    class: string;
  }>,
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    status: "upcoming",
  },
});

export const stepContentVariants = cva("flex flex-col gap-1", {
  variants: {
    orientation: {
      horizontal: "mt-3 max-w-[240px] items-center text-center",
      vertical: "items-start justify-center text-left",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepLabelVariants = cva("text-sm font-medium transition-colors", {
  variants: {
    orientation: {
      horizontal: "text-center",
      vertical: "text-left",
    },
    variant: {
      default: "text-govbr-blue-warm-vivid-70",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-yellow-vivid-20",
      featured: "text-govbr-blue-warm-20",
      dark: "text-govbr-pure-0",
    },
    status: {
      complete: "text-govbr-gray-90",
      current: "text-govbr-gray-90",
      upcoming: "text-govbr-gray-70",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    status: "upcoming",
  },
});

export const stepDescriptionVariants = cva("text-xs text-govbr-gray-50", {
  variants: {
    orientation: {
      horizontal: "text-center",
      vertical: "text-left",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type StepOrientation = NonNullable<
  Parameters<typeof stepVariants>[0]
>["orientation"];

export type StepStatus = "complete" | "current" | "upcoming";

