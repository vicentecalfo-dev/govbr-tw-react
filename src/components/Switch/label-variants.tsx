import { cva } from "class-variance-authority";

const variants = cva("cursor-pointer flex items-center gap-3 ", {
  variants: {
      labelPosition:{
        top: "flex-col-reverse",
        left:"flex-row-reverse",
        right:"flex-row"
      }
  },
  defaultVariants: {
    labelPosition: "left",
  },
});

export default variants;
