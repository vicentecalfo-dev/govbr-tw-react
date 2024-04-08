import { cva } from "class-variance-authority";

const variants = cva(
  "relative peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute flex items-center after:rounded-full after:transition-all border",
  {
    variants: {
      variant: {
        default: "bg-govbr-pure-0 peer-focus:bg-govbr-blue-vivid-80/20 after:bg-govbr-gray-20 peer-checked:bg-govbr-blue-warm-20 peer-checked:after:bg-govbr-blue-warm-vivid-70  peer-disabled:opacity-50  peer-disabled:cursor-not-allowed",
      },
      density: {
        low: "w-16 h-10 after:h-7 after:w-7 after:start-[4px] peer-checked:after:start-[1px]",
        default: "w-12 h-8 after:h-5 after:w-5 after:start-[4px] peer-checked:after:start-[2px]",
        high: "w-10 h-6 after:h-4 after:w-4 after:start-[3px] peer-checked:after:start-[3px]",
      },
      labelPosition:{
        top: "",
        left:"",
        right:""
      }
    },
    defaultVariants: {
      variant: "default",
      density: "default",
      labelPosition: "left"
    },
  }
);

export default variants;
