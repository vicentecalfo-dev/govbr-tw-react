import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      default: "w-full fill-[#2864AE] fill-[#46AD44] fill-[#FABD10]",
      negative: "w-full fill-[#FFFFFF] fill-[#FFFFFF] fill-[#FFFFFF]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
