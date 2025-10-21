import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import type { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { itemVariants } from "./variants";

export interface ItemProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof itemVariants> {
  icon?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      children,
      icon,
      meta,
      actions,
      variant,
      density,
      bordered,
      ...props
    },
    ref
  ) => {
    const isDark = variant === "dark";

    return (
      <div
        ref={ref}
        className={cn(
          itemVariants({ variant, density, bordered }),
          BASE_CLASSNAMES.item.root,
          className
        )}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center size-7",
              BASE_CLASSNAMES.item.icon
            )}
          >
            {icon}
          </div>
        )}
        <div className={cn("flex min-w-0 flex-1 flex-col gap-2", BASE_CLASSNAMES.item.content)}>
          <div className="flex flex-col gap-1">{children}</div>
          {meta && (
            <div
              className={cn(
                "text-xs opacity-70",
                isDark ? "text-govbr-blue-warm-20" : "text-govbr-gray-80",
                BASE_CLASSNAMES.item.meta
              )}
            >
              {meta}
            </div>
          )}
        </div>
        {actions && (
          <div
            className={cn(
              "flex shrink-0 flex-col items-center gap-2 self-center",
              BASE_CLASSNAMES.item.actions
            )}
          >
            {actions}
          </div>
        )}
      </div>
    );
  }
);

Item.displayName = "Item";

export default Item;
