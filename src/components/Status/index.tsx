import { ComponentProps, FC } from "react";
import statusVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";


interface StatusProps
  extends ComponentProps<"span">,
    VariantProps<typeof statusVariants> {
  pulse?: boolean;
}

const Status: FC<StatusProps> = ({
  className,
  children,
  variant = "default",
  size = "small",
  role = "status",
  pulse = false,
  ...props
}) => {
  return (
    <span className={cn("flex gap-2 items-center relative")}>
      <span
        className={cn(
          statusVariants({ variant, size }),
          className,
          BASE_CLASSNAMES.status.root
        )}
        {...props}
        role={role}
      ></span>
      {pulse && (
        <span
          className={cn(
            "absolute animate-ping opacity-75",
            statusVariants({ variant, size }),
            className,
            BASE_CLASSNAMES.status.pulse
          )}
        ></span>
      )}
      {children}
    </span>
  );
};

export default Status;
