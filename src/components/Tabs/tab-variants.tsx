import { cva } from "class-variance-authority";

const variants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "",
      dark: ""
    }
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
