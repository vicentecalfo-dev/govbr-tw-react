import { VariantProps } from "class-variance-authority";
import { ComponentProps, FC, forwardRef } from "react";
import radioVariants from "./variants";
import labelVariant from "./label-variants";
import { cn, getUIDClassName } from "@/src/libs/utils";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface RadioProps
  extends ComponentProps<"input">,
    VariantProps<typeof radioVariants> {}

const Radio: FC<RadioProps> = forwardRef(
  (
    {
      children,
      className,
      checked,
      disabled,
      value,
      variant = "default",
      density = "default",
      ...props
    },
    ref
  ) => {
    const suffixId = getUIDClassName();
    const radioId = `${BASE_CLASSNAMES.radio.label}-${suffixId}`;
    return (
      <label
        className={cn(
          labelVariant({ variant, disabled }),
          BASE_CLASSNAMES.radio.root
        )}
        htmlFor={radioId}
      >
        <input
          className={cn(
            radioVariants({ variant, density }),
            className,
            BASE_CLASSNAMES.radio.root
          )}
          type="radio"
          id={radioId}
          disabled={disabled}
          checked={checked}
          value={value}
          {...props}
          ref={ref}
        />
        {children}
      </label>
    );
  }
);

export default Radio;
