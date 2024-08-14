import { VariantProps } from "class-variance-authority";
import { ComponentProps, FC, forwardRef } from "react";
import checkboxVariants from "./variants";
import labelVariant from "./label-variants";
import iconVariant from "./icon-variants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn, getUIDClassName } from "../../libs/utils";

interface CheckboxProps
  extends ComponentProps<"input">,
    VariantProps<typeof checkboxVariants> {
        icon?: IconDefinition;
    }

const Checkbox: FC<CheckboxProps> = forwardRef(
  (
    {
      children,
      className,
      checked,
      disabled,
      id = `${BASE_CLASSNAMES.checkbox.label}-${getUIDClassName()}`,
      value,
      variant = "default",
      density = "default",
      checkType = "icon",
      icon = faCheck,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          labelVariant({ variant, disabled }),
          BASE_CLASSNAMES.checkbox.root
        )}
        htmlFor={id}
      >
        <div className={cn("relative flex items-center justify-center")}>
          <input
            className={cn(
              checkboxVariants({ variant, density, checkType }),
              className,
              BASE_CLASSNAMES.checkbox.root,
              "[&:checked+span]:!block"
            )}
            type="checkbox"
            id={id}
            disabled={disabled}
            checked={checked}
            value={value}
            {...props}
            ref={ref}
          />
          {checkType === "icon" ?<span className={cn(iconVariant({variant}))}>
            <FontAwesomeIcon icon={icon} />
          </span> : ""}
        </div>
        {children}
      </label>
    );
  }
);

export default Checkbox;
