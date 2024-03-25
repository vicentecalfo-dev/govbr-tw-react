import { ComponentProps, FC } from "react";
import inputVariants from "./variants";
import inputControlVariants from "./control-variants";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/src/libs/utils";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

const Input: FC<InputProps> = ({
  className,
  density = "default",
  variant = "default",
  ...props
}) => {
  return (
    <div
      className={cn(
        inputVariants({ variant, density }),
        BASE_CLASSNAMES.input.control
      )}
    >
      <input
        className={cn(
          inputControlVariants({ variant, density }),
          BASE_CLASSNAMES.input.root
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
