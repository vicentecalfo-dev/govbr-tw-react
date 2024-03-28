import { cva } from "class-variance-authority";

const variants = cva("appearance-none rounded-full hover:cursor-pointer border from-45%  to-50% to-transparent checked:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent", {
  variants: {
    variant: {
      default: "border-govbr-gray-20 hover:bg-govbr-blue-warm-20 from-govbr-blue-warm-vivid-70 outline-govbr-blue-warm-vivid-70",
      danger: "border-govbr-red-vivid-50 hover:bg-govbr-red-vivid-10 from-govbr-red-vivid-50 outline-govbr-red-vivid-50",
      success: "border-govbr-green-cool-vivid-50 hover:bg-govbr-green-cool-vivid-5 from-govbr-green-cool-vivid-50 outline-govbr-green-cool-vivid-50",
      warning: "border-govbr-yellow-vivid-20 hover:bg-govbr-yellow-vivid-5 from-govbr-yellow-vivid-20 outline-govbr-yellow-vivid-20",
      dark: "border-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/20 from-govbr-blue-warm-20 outline-govbr-blue-warm-20",
    },
    density: {
      lowest: "size-10",
      low: "size-8",
      default: "size-6",
      high: "size-4",
      
    }
  },
  defaultVariants: {
    variant: "default",
    density: "default",
  },
});

export default variants;



