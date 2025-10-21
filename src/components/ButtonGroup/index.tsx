import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { forwardRef } from "react";
import type { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import buttonVariants from "../Button/variants";
import { ButtonGroupProvider, useButtonGroupContext } from "./context";
import buttonGroupVariants from "./variants";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;

export type ButtonGroupProps = PropsWithChildren<
  ComponentPropsWithoutRef<"div"> &
    ButtonGroupVariantProps & {
      variant?: ButtonVariantProps["variant"];
      density?: ButtonVariantProps["density"];
      size?: ButtonVariantProps["size"];
      disabled?: boolean;
    }
>;

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      children,
      orientation,
      separated,
      variant,
      density,
      size,
      disabled,
      role = "group",
      ...props
    },
    ref
  ) => {
    const parentContext = useButtonGroupContext();

    const resolvedOrientation =
      orientation ?? parentContext?.orientation ?? "horizontal";
    const isSeparated = separated ?? false;

    const contextValue = {
      variant: variant ?? parentContext?.variant,
      density: density ?? parentContext?.density,
      size: size ?? parentContext?.size,
      disabled: disabled ?? parentContext?.disabled,
      separated: isSeparated,
      orientation: resolvedOrientation,
      level: (parentContext?.level ?? 0) + 1,
    };

    return (
      <ButtonGroupProvider value={contextValue}>
        <div
          ref={ref}
          role={role}
          data-orientation={resolvedOrientation}
          className={cn(
            buttonGroupVariants({
              orientation: resolvedOrientation,
              separated: isSeparated,
            }),
            BASE_CLASSNAMES.buttonGroup.root,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </ButtonGroupProvider>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
