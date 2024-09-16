import { cva } from "class-variance-authority";

const variants = cva("absolute top-1/2 transform -translate-y-1/2 h-full px-3", {
  variants: {
    variant: {
      light: "text-govbr-blue-warm-vivid-70 hover:bg-govbr-blue-warm-vivid-70/30 hover:text-govbr-pure-0",
      dark: "text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-vivid-80/30",
      white: "text-govbr-pure-0 hover:bg-white/50 hover:bg-govbr-yellow-vivid-20/30"
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export default variants;
