import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { useButtonGroupContext } from "../ButtonGroup/context";
import buttonVariants from "./variants";

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      density,
      size,
      disabled,
      role = "button",
      ...props
    },
    ref
  ) => {
    const group = useButtonGroupContext();

    const resolvedVariant = variant ?? group?.variant ?? "default";
    const resolvedDensity = density ?? group?.density ?? "default";
    const resolvedSize = size ?? group?.size ?? "auto";
    const isDisabled = disabled ?? group?.disabled ?? false;

    const groupedShapeClasses =
      group && !group.separated
        ? group.orientation === "horizontal"
          ? "!rounded-none first:!rounded-l-full last:!rounded-r-full -ml-[1px] first:ml-0"
          : "!rounded-none first:!rounded-t-full last:!rounded-b-full -mt-[1px] first:mt-0"
        : undefined;

    return (
      <button
        ref={ref}
        role={role}
        disabled={isDisabled}
        className={cn(
          buttonVariants({
            variant: resolvedVariant,
            density: resolvedDensity,
            size: resolvedSize,
          }),
          group && !group.separated ? "focus-visible:z-10" : undefined,
          groupedShapeClasses,
          className,
          BASE_CLASSNAMES.button.root
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
