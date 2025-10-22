import { cva } from "class-variance-authority";

const variants = cva("shadow-md flex flex-col rounded-xl", {
  variants: {
    variant: {
      default: "bg-govbr-pure-0",
      dark:"bg-govbr-blue-warm-vivid-90"
    },
    padding:{
        true:"",
        false:""
    }
  },
  defaultVariants: {
    variant: "default"
  },
});

export default variants;
