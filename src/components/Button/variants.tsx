import { cva } from "class-variance-authority";

const variants = cva(
  "flex items-center justify-center rounded-full font-semibold gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-govbr-blue-warm-vivid-70 hover:bg-govbr-blue-warm-vivid-70/80 text-govbr-pure-0",
        outline:
          "hover:bg-govbr-blue-warm-20 border-govbr-blue-warm-vivid-70 border text-govbr-blue-warm-vivid-70",
        ghost: "hover:bg-govbr-blue-warm-20 text-govbr-blue-warm-vivid-70",
        "default-dark":
          "bg-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/80 text-govbr-blue-warm-vivid-90",
        "outline-dark":
          "hover:bg-govbr-blue-warm-20/20 border-govbr-blue-warm-20 border text-govbr-blue-warm-20",
        "ghost-dark": "hover:bg-govbr-blue-warm-20/20 text-govbr-blue-warm-20",
        "default-success":
          "bg-govbr-green-cool-vivid-50 hover:bg-govbr-green-cool-vivid-50/80 text-govbr-pure-0",
        "outline-success":
          "hover:bg-govbr-green-cool-vivid-5 border-govbr-green-cool-vivid-50 border text-govbr-green-cool-vivid-50",
        "ghost-success":
          "hover:bg-govbr-green-cool-vivid-5 text-govbr-green-cool-vivid-50",
        "default-danger":
          "bg-govbr-red-vivid-50 hover:bg-govbr-red-vivid-50/80 text-govbr-pure-0",
        "outline-danger":
          "hover:bg-govbr-red-vivid-10 border-govbr-red-vivid-50 border text-govbr-red-vivid-50",
        "ghost-danger": "hover:bg-govbr-red-vivid-10 text-govbr-red-vivid-50",
        "default-warning":
          "bg-govbr-yellow-vivid-20 hover:bg-govbr-yellow-vivid-20/80 text-govbr-pure-100",
        "outline-warning":
          "hover:bg-govbr-yellow-vivid-5 border-govbr-yellow-vivid-20 border text-govbr-pure-100",
        "ghost-warning": "hover:bg-govbr-yellow-vivid-5 text-govbr-pure-100",
      },
      density: {
        low: "h-12 min-w-12",
        default: "h-10 min-w-10",
        high: "h-8 min-w-8",
      },
      size:{
        icon:"px-0",
        auto: "px-6"
      }
    },
    defaultVariants: {
      variant: "default",
      density: "default",
      size: "auto"
    },
  }
);

export default variants;
