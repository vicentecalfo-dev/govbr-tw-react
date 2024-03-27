import { ComponentProps, FC, forwardRef } from "react";
import inputVariants from "./variants";
import inputHintVariants from "./hint-variants";
import inputIconVariants from "./icon-variants";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/src/libs/utils";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";
import React from "react";

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  hint?: string;
}

const Input: FC<InputProps> = forwardRef(
  (
    {
      children,
      className,
      density = "default",
      variant = "default",
      iconPosition = "none",
      hint = "",
      ...props
    },
    ref
  ) => {
    const [firstIcon, lastIcon] = React.Children.toArray(children);

    return (
      <div>
        <div className="relative w-full flex items-center">
          {firstIcon && (
            <span
              className={cn(
                inputIconVariants({ variant }),
                iconPosition !== "right" ? "left-3" : "right-3"
              )}
            >
              {firstIcon}
            </span>
          )}
          {lastIcon && (
            <span className={cn(inputIconVariants({ variant }), "right-3")}>
              {lastIcon}
            </span>
          )}
          <input
            className={cn(
              inputVariants({ variant, density, iconPosition }),
              className,
              BASE_CLASSNAMES.input.root
            )}
            {...props}
            ref={ref}
          />
        </div>
        {hint && (
          <span className={cn(inputHintVariants({ variant, density }))}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
