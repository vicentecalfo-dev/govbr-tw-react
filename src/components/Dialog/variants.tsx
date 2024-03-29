import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      default: "backdrop:bg-black/50",
      dark:"backdrop:bg-black/50"
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
