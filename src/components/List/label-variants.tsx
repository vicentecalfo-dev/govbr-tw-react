import { cva } from "class-variance-authority";

const variants = cva("flex flex-col flex-1 text-left", {
  variants: {
    variant: {
      default: "text-govbr-blue-warm-vivid-70",
      dark: "text-govbr-pure-0"
    },
    locatorPosition: {
        top: 'flex-col',
        bottom: 'flex-col-reverse'
    }
  },
  defaultVariants: {
    variant: "default",
  },
});

export default variants;
