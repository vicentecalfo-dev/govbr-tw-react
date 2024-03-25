import { cva } from "class-variance-authority";

const variants = cva("py-3 px-6 border-b font-semibold flex justify-start items-center gap-6", {
  variants: {
    variant: {
      default:
        "border-govbr-gray-10 text-govbr-blue-warm-vivid-70 hover:bg-govbr-gray-2 aria-[expanded=true]:bg-govbr-gray-2",
      dark: "border-govbr-blue-warm-20 text-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/20 aria-[expanded=true]:bg-govbr-blue-warm-20/20",
    },
    iconPosition:{
      left: "flex-row-reverse",
      right: "flex-row",
    }
  },

  defaultVariants: {
    variant: "default",
    iconPosition: "right"
  },
});

export default variants;
