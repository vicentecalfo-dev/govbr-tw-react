import { cva } from "class-variance-authority";

const variants = cva(
  `hidden group-hover:block opacity-0 group-hover:opacity-100 transition p-2 rounded absolute whitespace-nowrap  
  m-auto 
  after:absolute
  after:h-0
  after:w-0 
  z-50
  shadow`,
  {
    variants: {
      variant: {
        default:
          "bg-govbr-blue-warm-vivid-60 text-govbr-pure-0 after:border-govbr-blue-warm-vivid-60",
          success: "bg-govbr-green-cool-vivid-50 text-govbr-pure-0 after:border-govbr-green-cool-vivid-50",
          danger: "bg-govbr-red-vivid-50 text-govbr-pure-0 after:border-govbr-red-vivid-50",
          warning: "bg-govbr-yellow-vivid-20 text-govbr-pure-100 after:border-govbr-yellow-vivid-20"
      },
      position: {
        bottom: "after:left-1/2 after:-top-2 after:-translate-x-1/2 after:border-x-8 after:border-x-transparent after:border-b-8 mt-3 top-full ",
        top: "after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-x-8 after:border-x-transparent after:border-t-8 mb-3 bottom-full ",
        right: "after:-left-2 after:top-1/2 after:-translate-y-1/2 after:border-y-8 after:border-y-transparent after:border-r-8  ml-3 left-full -translate-y-1/2 top-2/4",
        left: "after:-right-2 after:top-1/2 after:-translate-y-1/2 after:border-y-8 after:border-y-transparent after:border-l-8  mr-3 right-full -translate-y-1/2 top-2/4"
      },
    },

    defaultVariants: {
      variant: "default",
      position: "bottom"
    },
  }
);

export default variants;
