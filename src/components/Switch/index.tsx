import { cn, getUIDClassName } from "@/src/libs/utils";
import { ComponentProps, FC, forwardRef } from "react";
import switchVariants from "./variants";
import labelSwitchVariants from "./label-variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface SwitchProps
  extends ComponentProps<"input">,
    VariantProps<typeof switchVariants> {}

const Switch: FC<SwitchProps> = forwardRef(
  (
    {
      className,
      children,
      variant = "default",
      density = "default",
      labelPosition = "left",
      id = `${BASE_CLASSNAMES.switch.label}-${getUIDClassName()}`,
      ...props
    },
    ref
  ) => {
    return (
      <span className={cn(BASE_CLASSNAMES.switch.root)}>
        <label
          className={cn(labelSwitchVariants({ labelPosition }))}
          htmlFor={id}
        >
          <input
            type="checkbox"
            className="sr-only peer"
            role="switch"
            aria-checked={props.checked}
            ref={ref}
            id={id}
            {...props}
          />
          <div className={cn(switchVariants({ variant, density }))}></div>
          {children}
        </label>
      </span>
    );
  }
);

export default Switch;
