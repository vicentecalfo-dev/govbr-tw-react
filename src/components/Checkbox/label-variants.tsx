import { cva } from "class-variance-authority";

const variants = cva("flex gap-3 cursor-pointer m-0", {
  variants: {
    variant: {
      default: "text-govbr-pure-100",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-pure-100",
      "default-solid": "text-govbr-pure-100",
      "danger-solid": "text-govbr-red-vivid-50",
      "success-solid": "text-govbr-green-cool-vivid-50",
      "warning-solid": "text-govbr-pure-100",
      dark: "text-govbr-pure-0",
      "dark-solid": "text-govbr-pure-0",
    },
    disabled:{
        true:"opacity-60 cursor-not-allowed",
        false: ""
    }
  },
  defaultVariants: {
    variant: "default",
    disabled: false
  },
});

export default variants;



