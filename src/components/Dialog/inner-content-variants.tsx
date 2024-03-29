import { cva } from "class-variance-authority";

const variants = cva("bg-transparent", {
  variants: {
    variant: {
      default: "text-govbr-pure-100",
      dark:"text-govbr-pure-0"
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
