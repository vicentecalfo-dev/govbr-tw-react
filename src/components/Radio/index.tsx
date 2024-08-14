import { VariantProps } from "class-variance-authority";
import { ComponentProps, FC, forwardRef } from "react";
import radioVariants from "./variants";
import labelVariant from "./label-variants";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn, getUIDClassName } from "../../libs/utils";

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
      id = `${BASE_CLASSNAMES.radio.label}-${getUIDClassName()}`,
      value,
      variant = "default",
      density = "default",
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          labelVariant({ variant, disabled }),
          BASE_CLASSNAMES.radio.root
        )}
        htmlFor={id}
      >
        <input
          className={cn(
            radioVariants({ variant, density }),
            className,
            BASE_CLASSNAMES.radio.root
          )}
          type="radio"
          id={id}
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
