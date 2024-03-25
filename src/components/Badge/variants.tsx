import { cva } from "class-variance-authority";

const variants = cva(
  `inline-flex whitespace-nowrap text-center rounded-md items-center justify-center`,
  {
    variants: {
      variant: {
        default: "bg-govbr-blue-warm-vivid-70 text-govbr-pure-0",
        "default-light": "bg-govbr-blue-warm-20 text-govbr-blue-warm-vivid-70",
        success: "bg-govbr-green-cool-vivid-50 text-govbr-pure-0",
        "success-light": "bg-govbr-green-cool-vivid-5 text-govbr-green-cool-vivid-50",
        danger: "bg-govbr-red-vivid-50 text-govbr-pure-0",
        "danger-light": "bg-govbr-red-vivid-10 text-govbr-red-vivid-50",
        warning: "bg-govbr-yellow-vivid-20 text-govbr-pure-100",
        "warning-light": "bg-govbr-yellow-vivid-5 text-govbr-pure-100",
        neutral: "bg-govbr-gray-10 text-govbr-pure-100"
      },
      size:{
        small:"py-1 px-2 text-xs",
        medium:"py-2 px-3 text-sm",
        large: "py-3 px-4 text-base"
      }
    },

    defaultVariants: {
      variant: "default-light",
      size: "small"
    },
  }
);

export default variants;
