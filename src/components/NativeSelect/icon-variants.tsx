import { cva } from "class-variance-authority";

const variants = cva("absolute pointer-events-none", {
  variants: {
    variant: {
      default: "text-govbr-blue-warm-vivid-70",
      danger: "text-govbr-red-vivid-50",
      success: "text-govbr-green-cool-vivid-50",
      warning: "text-govbr-yellow-vivid-20",
      dark: "textr-govbr-blue-warm-20",
      featured: "border-govbr-gray-2 outline-govbr-blue-warm-vivid-70 text-govbr-pure-100 bg-govbr-gray-2 hover:bg-govbr-gray-10 disabled:hover:bg-govbr-gray-2  read-only:hover:bg-govbr-gray-2 text-govbr-gray-80"
    },
    density: {
      lowest: "h-14",
      low: "h-12",
      default: "right-2.5",
      high: "h-8",
      
    }
  },
  defaultVariants: {
    variant: "default",
    density: "default"
  },
});

export default variants;
