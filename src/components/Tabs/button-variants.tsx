import { cva } from "class-variance-authority";

const variants = cva("px-6 flex items-center h-full border-b-4 border-b-transparent box-border font-semibold ", {
  variants: {
    variant: {
      default: "aria-selected:border-b-govbr-blue-warm-vivid-70 aria-selected:hover:bg-govbr-pure-0  aria-selected:text-govbr-blue-warm-vivid-70 hover:bg-govbr-gray-10",
      dark: "aria-selected:border-b-govbr-blue-warm-20 aria-selected:hover:bg-transparent aria-selected:text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/20 text-govbr-pure-0"
    },
    density:{
        low: "gap-3",
        default: "gap-3",
        high: "gap-3",
    }
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
