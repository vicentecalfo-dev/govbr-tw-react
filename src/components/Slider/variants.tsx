import { cva } from "class-variance-authority";

/**
 * Mantém a mesma filosofia de variantes/densidades usada nos outros inputs.
 * - variant: default | danger | success | warning | dark | featured
 * - density: lowest | low | default | high
 * Você ainda pode sobrescrever cores via prop `colors`.
 */

export const sliderRootVariants = cva("flex items-center w-full select-none", {
  variants: {
    density: {
      lowest: "h-10",
      low: "h-9",
      default: "h-8",
      high: "h-7",
    },
  },
  defaultVariants: {
    density: "default",
  },
});

export const sliderTrackVariants = cva(
  "relative w-full rounded-md cursor-pointer touch-none",
  {
    variants: {
      density: {
        lowest: "h-3",
        low: "h-2.5",
        default: "h-2",
        high: "h-1.5",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

// fundo (vazio)
export const sliderTrailVariants = cva(
  "absolute inset-0 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-govbr-gray-10",
        danger: "bg-govbr-red-vivid-10",
        success: "bg-govbr-green-cool-vivid-5",
        warning: "bg-govbr-yellow-vivid-5",
        dark: "bg-govbr-blue-warm-20/30",
        featured: "bg-govbr-gray-2",
      },
      density: {
        lowest: "",
        low: "",
        default: "",
        high: "",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
    },
  }
);

// preenchido
export const sliderLevelVariants = cva(
  "absolute left-0 top-0 bottom-0 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-govbr-blue-warm-vivid-70",
        danger: "bg-govbr-red-vivid-50",
        success: "bg-govbr-green-cool-vivid-50",
        warning: "bg-govbr-yellow-vivid-20",
        dark: "bg-govbr-blue-cool-vivid-60",
        featured: "bg-govbr-blue-warm-20",
      },
      density: {
        lowest: "",
        low: "",
        default: "",
        high: "",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
    },
  }
);

// handler
export const sliderThumbVariants = cva(
  "absolute top-1/2 -translate-y-1/2 translate-x-[-50%] rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-govbr-pure-0 border-govbr-blue-warm-vivid-50 focus-visible:ring-govbr-blue-warm-vivid-50 ring-offset-transparent",
        danger:
          "bg-govbr-pure-0 border-govbr-red-vivid-50 focus-visible:ring-govbr-red-vivid-50 ring-offset-transparent",
        success:
          "bg-govbr-pure-0 border-govbr-green-cool-vivid-50 focus-visible:ring-govbr-green-cool-vivid-50 ring-offset-transparent",
        warning:
          "bg-govbr-pure-0 border-govbr-yellow-vivid-20 focus-visible:ring-govbr-yellow-vivid-20 ring-offset-transparent",
        dark:
          "bg-govbr-pure-0 border-govbr-blue-warm-20 focus-visible:ring-govbr-blue-warm-20 ring-offset-transparent",
        featured:
          "bg-govbr-pure-0 border-govbr-gray-20 focus-visible:ring-govbr-blue-warm-vivid-50 ring-offset-transparent",
      },
      density: {
        lowest: "w-5 h-5",
        low: "w-5 h-5",     // se não tiver, substitua por w-5 h-5 ou w-4 h-4 conforme seu Tailwind
        default: "w-4 h-4",
        high: "w-4 h-4",    // idem acima
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-grab active:cursor-grabbing",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
      disabled: false,
    },
  }
);
