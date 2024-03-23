import { ComponentProps, FC } from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/src/libs/utils";
import buttonVariants from "./variants";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

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
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };
