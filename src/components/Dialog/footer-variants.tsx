import { cva } from "class-variance-authority";

const variants = cva("flex items-center", {
  variants: {
    variant: {
      default: "text-govbr-pure-100",
      dark:"text-govbr-blue-warm-20"
    },
    padding:{
        true:"p-6",
        false:""
    }
  },
  defaultVariants: {
    variant: "default"
  },
});

export default variants;
