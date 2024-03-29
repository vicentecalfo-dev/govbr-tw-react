import { cva } from "class-variance-authority";

const variants = cva("font-bold text-lg flex items-center", {
  variants: {
    variant: {
        default: "text-govbr-blue-warm-vivid-70",
        dark:"text-govbr-blue-warm-20"
    },
    padding:{
        true:"p-6",
        false:""
    }
  },
  defaultVariants: {
    variant: "default"
  },
});

export default variants;
