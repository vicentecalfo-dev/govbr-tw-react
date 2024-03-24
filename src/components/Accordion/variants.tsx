import { cva } from "class-variance-authority";

const variants = cva("", {
  variants: {
    variant:{
        default:"border-govbr-gray-20 text-govbr-blue-warm-vivid-70 hover:bg-govbr-gray-2 aria-[expanded=true]:bg-govbr-gray-2",
        dark: "border-govbr-blue-warm-20 text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/20 aria-[expanded=true]:bg-govbr-blue-warm-20/20"
    }
  },

  defaultVariants: {
    variant: "default"
  },
});

export default variants;