import { cva } from "class-variance-authority";

const variants = cva("flex gap-3 cursor-pointer", {
  variants: {
    variant: {
      default: "text-govbr-pure-100",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-pure-100",
      dark: "text-govbr-pure-0",
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



