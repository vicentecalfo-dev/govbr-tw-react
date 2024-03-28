import { cn } from "@/src/libs/utils";
import { ComponentProps, FC } from "react";
import badgeVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

const Badge: FC<BadgeProps> = ({
  className,
  children,
  variant = "default-light",
  size = "small",
  type = "default",
  ...props
}) => {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size, type }),
        className,
        BASE_CLASSNAMES.badge.root,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
