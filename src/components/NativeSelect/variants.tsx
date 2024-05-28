import { cva } from "class-variance-authority";

const variants = cva("appearance-none block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", {
  variants: {
    variant: {
      default: "bg-govbr-pure-0 border-govbr-gray-20 outline-govbr-blue-warm-vivid-70 text-govbr-pure-100 hover:bg-govbr-gray-10  disabled:hover:bg-govbr-pure-0 read-only:hover:bg-govbr-pure-0",
      danger: "border-govbr-red-vivid-50 outline-govbr-red-vivid-50 bg-govbr-red-vivid-10 placeholder:text-govbr-red-vivid-50 text-govbr-red-vivid-50",
      success: "border-govbr-green-cool-vivid-50 outline-govbr-green-cool-vivid-50 bg-govbr-green-cool-vivid-5 placeholder:text-govbr-green-cool-vivid-50 text-govbr-green-cool-vivid-50",
      warning: "border-govbr-yellow-vivid-20 outline-govbr-yellow-vivid-20 bg-govbr-yellow-vivid-5 placeholder:text-govbr-pure-100 text-govbr-pure-100",
      dark: "border-govbr-blue-warm-20 outline-govbr-blue-warm-20 bg-transparent hover:bg-govbr-blue-warm-20/20 placeholder:text-govbr-blue-warm-20 text-govbr-pure-0 disabled:bg-govbr-blue-warm-20/20 read-only:hover:bg-transparent",
      featured: "border-govbr-gray-2 outline-govbr-blue-warm-vivid-70 text-govbr-pure-100 bg-govbr-gray-2 hover:bg-govbr-gray-10 disabled:hover:bg-govbr-gray-2  read-only:hover:bg-govbr-gray-2 text-govbr-gray-80"
    },
    density: {
      lowest: "h-14",
      low: "h-12",
      default: "h-10 pl-3 pr-10",
      high: "h-8",
      
    }
  },
  defaultVariants: {
    variant: "default",
    density: "default"
  },
});

export default variants;
