import { cva } from "class-variance-authority";

const variants = cva(`absolute z-50`, {
  variants: {
    position: {
      "bottom-left": "top-full mt-3 left-0",
      "bottom-right": "top-full mt-3 right-0",
      "top-left": "bottom-full mb-3 left-0",
      "top-right": "bottom-full mb-3 right-0",
      left: "right-full -translate-y-1/2 top-2/4 mr-3",
      right: "left-full -translate-y-1/2 top-2/4 ml-3"
    }
  },

  defaultVariants: {
    position: "bottom-left"
  },
});

export default variants;
