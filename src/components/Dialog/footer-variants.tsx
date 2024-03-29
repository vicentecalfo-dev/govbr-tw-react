import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      default: "bg-govbr-pure-0",
      dark:""
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
