import { ComponentProps, FC } from "react";
import { VariantProps } from "class-variance-authority";
import buttonVariants from "./variants";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant = "default",
  density = "default",
  size = "auto",
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, density, size }),
        className,
        BASE_CLASSNAMES.button.root
      )}
      {...props}
      role="button"
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };
