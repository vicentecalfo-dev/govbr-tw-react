import { ComponentProps, FC, useRef } from "react";
import tooltipVariants from "./variants";
import { VariantProps } from "class-variance-authority";
import React from "react";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn, getUIDClassName } from "../../libs/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [tipTrigger, tipContent] = React.Children.toArray(children);
  const suffixCn = getUIDClassName();
  const tooltipId = `${BASE_CLASSNAMES.tooltip.content}-${suffixCn}`;
  return (
    <span
      ref={containerRef}
      className={cn(
        "group relative flex justify-center align-center",
        BASE_CLASSNAMES.tooltip.root
      )}
      {...props}
      aria-describedby={tooltipId}
    >
      {tipTrigger}
      <span
        ref={tooltipRef}
        className={cn(
          tooltipVariants({ variant, position }),
          className,
          BASE_CLASSNAMES.tooltip.content
        )}
        id={tooltipId}
        role="tooltip"
      >
        {tipContent}
      </span>
    </span>
  );
};

export default Tooltip;
