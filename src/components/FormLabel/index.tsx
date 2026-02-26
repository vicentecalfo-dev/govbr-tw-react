import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { Children, forwardRef, isValidElement } from "react";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import formLabelHintVariants from "./hint-variants";
import formLabelLabelVariants from "./label-variants";
import formLabelVariants from "./variants";

export interface FormLabelProps extends ComponentPropsWithoutRef<"div"> {
  htmlFor?: string;
  labelClassName?: string;
  hintClassName?: string;
}

function isSpanElement(
  node: ReactNode
): node is ReactElement<ComponentPropsWithoutRef<"span">> {
  return isValidElement(node) && node.type === "span";
}

const FormLabel = forwardRef<HTMLDivElement, FormLabelProps>(
  (
    {
      className,
      children,
      htmlFor,
      labelClassName,
      hintClassName,
      ...props
    },
    ref
  ) => {
    const childArray = Children.toArray(children);
    const firstChild = childArray[0];
    const lastChild = childArray[childArray.length - 1];

    const hasLabel = isSpanElement(firstChild);
    const hasHint =
      childArray.length > (hasLabel ? 1 : 0) && isSpanElement(lastChild);

    const labelSlot = hasLabel ? firstChild : undefined;
    const hintSlot = hasHint ? lastChild : undefined;

    const controlStart = hasLabel ? 1 : 0;
    const controlEnd = hasHint ? childArray.length - 1 : childArray.length;
    const controlSlots = childArray.slice(controlStart, controlEnd);

    const firstControl = controlSlots[0];
    const controlId = isValidElement<{ id?: unknown }>(firstControl)
      ? firstControl.props.id
      : undefined;
    const resolvedHtmlFor =
      typeof htmlFor === "string"
        ? htmlFor
        : typeof controlId === "string"
          ? controlId
          : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          formLabelVariants(),
          className,
          BASE_CLASSNAMES.formLabel.root
        )}
        {...props}
      >
        {labelSlot && (
          <label
            htmlFor={resolvedHtmlFor}
            className={cn(
              formLabelLabelVariants(),
              labelClassName,
              labelSlot.props.className,
              BASE_CLASSNAMES.formLabel.label
            )}
          >
            {labelSlot.props.children}
          </label>
        )}
        {controlSlots}
        {hintSlot && (
          <span
            className={cn(
              formLabelHintVariants(),
              hintClassName,
              hintSlot.props.className,
              BASE_CLASSNAMES.formLabel.hint
            )}
          >
            {hintSlot.props.children}
          </span>
        )}
      </div>
    );
  }
);

FormLabel.displayName = "FormLabel";

export default FormLabel;
