import { cva } from "class-variance-authority";

const variants = cva("block m-0 appearance-none rounded hover:cursor-pointer border relative disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent", {
  variants: {
    variant: {
      default: "border-govbr-gray-20 hover:bg-govbr-blue-warm-20 from-govbr-blue-warm-vivid-70 outline-govbr-blue-warm-vivid-70",
      danger: "border-govbr-red-vivid-50 hover:bg-govbr-red-vivid-10 from-govbr-red-vivid-50 outline-govbr-red-vivid-50",
      success: "border-govbr-green-cool-vivid-50 hover:bg-govbr-green-cool-vivid-5 from-govbr-green-cool-vivid-50 outline-govbr-green-cool-vivid-50",
      warning: "border-govbr-yellow-vivid-20 hover:bg-govbr-yellow-vivid-5 from-govbr-yellow-vivid-20 outline-govbr-yellow-vivid-20",
      "default-solid": "border-govbr-gray-20 hover:bg-govbr-blue-warm-20 outline-govbr-blue-warm-vivid-70 from-govbr-pure-0 !to-govbr-blue-warm-vivid-70 checked:border-govbr-blue-warm-vivid-70 checked:bg-govbr-blue-warm-vivid-70 checked:hover:bg-govbr-blue-warm-vivid-70",
      "danger-solid": "border-govbr-red-vivid-50 hover:bg-govbr-red-vivid-10 outline-govbr-red-vivid-50 from-govbr-pure-0 !to-govbr-red-vivid-50 checked:border-bg-govbr-red-vivid-50 checked:bg-govbr-red-vivid-50 checked:hover:bg-govbr-red-vivid-50",
      "success-solid": "border-govbr-green-cool-vivid-50 hover:bg-govbr-green-cool-vivid-5 outline-govbr-green-cool-vivid-50 from-govbr-pure-0 !to-govbr-green-cool-vivid-50 checked:border-govbr-green-cool-vivid-50 checked:bg-govbr-green-cool-vivid-50 checked:hover:bg-govbr-green-cool-vivid-50",
      "warning-solid": "border-govbr-yellow-vivid-20 hover:bg-govbr-yellow-vivid-5 outline-govbr-yellow-vivid-20 from-govbr-pure-0 !to-govbr-yellow-vivid-20 checked:!border-govbr-yellow-vivid-20 checked:bg-govbr-yellow-vivid-20 checked:hover:bg-govbr-yellow-vivid-20",
      dark: "border-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/20 from-govbr-blue-warm-20 outline-govbr-blue-warm-20",
      "dark-solid": "border-govbr-blue-warm-20 hover:bg-govbr-blue-warm-20/20 outline-govbr-blue-warm-20 from-govbr-blue-warm-vivid-90 !to-govbr-blue-warm-20  checked:bg-govbr-blue-warm-20 checked:hover:bg-govbr-blue-warm-20 ",
    },
    density: {
      lowest: "size-10",
      low: "size-8",
      default: "size-6",
      high: "size-4",
      
    },
    checkType:{
        dot:"from-45% to-50% to-transparent checked:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]",
        icon:"",
        intermediate:""

    }
  },
  defaultVariants: {
    variant: "default",
    density: "default",
    checkType:"dot"
  },
});

export default variants;



