import { ComponentProps, FC, useRef } from "react";
import tooltipVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/src/libs/utils";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";
import React from "react";

interface TooltipProps
  extends ComponentProps<"span">,
    VariantProps<typeof tooltipVariants> {}

const Tooltip: FC<TooltipProps> = ({
  className,
  children,
  variant = "default",
  position = "bottom",
  ...props
}) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [tipTrigger, tipContent] =  React.Children.toArray(children);

  return (
    <span
      ref={container}
      className={cn("group relative flex justify-center align-center", BASE_CLASSNAMES.tooltip.root)}
    >
      {tipTrigger}
      <span
        ref={tooltipRef}
        className={cn(
          tooltipVariants({ variant, position }),
          className,
          BASE_CLASSNAMES.tooltip.content
        )}
      >{tipContent}</span>
    </span>
  );
};

export default Tooltip;
