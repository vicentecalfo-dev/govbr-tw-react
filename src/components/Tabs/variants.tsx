import { cva } from "class-variance-authority";

const variants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "",
      dark:""
    },
    density:{
        low: "",
        default: "",
        high: "",
    }
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
