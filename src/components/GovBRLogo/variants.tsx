import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant: {
      default: "fill-[#2864AE] fill-[#46AD44] fill-[#FABD10]",
      white: "fill-[#FFFFFF] fill-[#FFFFFF] fill-[#FFFFFF]",
      "dark-gray": "fill-govbr-gray-60 fill-govbr-gray-60 fill-govbr-gray-60",
      "light-gray": "fill-govbr-gray-10 fill-govbr-gray-10 fill-govbr-gray-10",
      "black": "fill-[#000000] fill-[#000000] fill-[#000000]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
