import { cva } from "class-variance-authority";

const variants = cva("absolute hidden", {
  variants: {
    variant: {
      default: "text-govbr-blue-warm-vivid-70",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-pure-100",
      "default-solid": "text-govbr-pure-0",
      "danger-solid": "text-govbr-pure-0",
      "success-solid": "text-govbr-pure-0",
      "warning-solid": "text-govbr-pure-100",
      dark: "text-govbr-pure-0",
      "dark-solid": "text-govbr-blue-warm-vivid-90",
    }
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;



