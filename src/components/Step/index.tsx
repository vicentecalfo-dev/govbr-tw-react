import {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  createContext,
} from "react";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import {
  StepOrientation,
  StepStatus,
  stepConnectorVariants,
  stepContentVariants,
  stepIndicatorVariants,
  stepIndicatorWrapperVariants,
  stepItemVariants,
  stepLabelVariants,
  stepVariants,
  stepDescriptionVariants,
} from "./variants";

interface StepContextValue {
  orientation: StepOrientation;
  variant: VariantProps<typeof stepIndicatorVariants>["variant"];
}

const StepContext = createContext<StepContextValue | null>(null);

const useStepContext = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("Step.Item must be used within Step.");
  }
  return context;
};

const LABEL_COLORS: Record<
  NonNullable<VariantProps<typeof stepIndicatorVariants>["variant"]>,
  { active: string; upcoming: string }
> = {
  default: {
    active: "text-govbr-blue-warm-vivid-70",
    upcoming: "text-govbr-gray-60",
  },
  success: {
    active: "text-govbr-green-cool-vivid-50",
    upcoming: "text-govbr-gray-60",
  },
  danger: {
    active: "text-govbr-red-vivid-50",
    upcoming: "text-govbr-gray-60",
  },
  warning: {
    active: "text-govbr-yellow-vivid-20",
    upcoming: "text-govbr-gray-60",
  },
  featured: {
    active: "text-govbr-blue-warm-vivid-80",
    upcoming: "text-govbr-gray-60",
  },
  dark: {
    active: "text-govbr-pure-0",
    upcoming: "text-govbr-blue-warm-30",
  },
};

const getLabelColorClass = (
  variant: VariantProps<typeof stepIndicatorVariants>["variant"],
  status: StepStatus,
) => {
  const palette = LABEL_COLORS[variant ?? "default"];
  return status === "upcoming" ? palette.upcoming : palette.active;
};

type StepProps = ComponentPropsWithoutRef<"ol"> &
  VariantProps<typeof stepVariants> & {
    variant?: VariantProps<typeof stepIndicatorVariants>["variant"];
  };

const Step = forwardRef<HTMLOListElement, StepProps>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const items = useMemo(
      () =>
        Children.toArray(children).filter((child) =>
          isValidElement(child),
        ) as React.ReactElement<StepItemProps & PrivateStepItemProps>[],
      [children],
    );

    const statuses = useMemo(
      () =>
        items.map((item) => {
          const status = item.props.status;
          return status ?? "upcoming";
        }) as StepStatus[],
      [items],
    );

    return (
      <StepContext.Provider value={{ orientation, variant }}>
        <ol
          ref={ref}
          className={cn(
            stepVariants({ orientation }),
            className,
            BASE_CLASSNAMES.step.root,
          )}
          data-orientation={orientation}
          {...props}
        >
          {items.map((child, index) =>
            cloneElement(child, {
              __stepIndex: index,
              __isLast: index === items.length - 1,
              __isFirst: index === 0,
              __previousStatus: index > 0 ? statuses[index - 1] : undefined,
            }),
          )}
        </ol>
      </StepContext.Provider>
    );
  },
);
Step.displayName = "Step";

type PrivateStepItemProps = {
  __stepIndex?: number;
  __isLast?: boolean;
  __isFirst?: boolean;
  __previousStatus?: StepStatus;
};

export interface StepItemProps
  extends ComponentPropsWithoutRef<"li">,
    Pick<VariantProps<typeof stepIndicatorVariants>, "variant"> {
  status?: StepStatus;
  icon?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  step?: number;
}

const StepItem = ({
  className,
  icon,
  label,
  description,
  children,
  status = "upcoming",
  step,
  variant,
  __stepIndex = 0,
  __isLast = false,
  __isFirst = false,
  __previousStatus,
  ...props
}: StepItemProps & PrivateStepItemProps) => {
  const context = useStepContext();
  const orientation = context.orientation;
  const resolvedVariant = variant ?? context.variant ?? "default";
  const displayLabel = label ?? children;

  const indicatorContent =
    icon ??
    (typeof step === "number" ? step : __stepIndex + 1);

  const isHorizontal = orientation === "horizontal";

  const connectorStatus: StepStatus =
    status === "complete" ? "complete" : status === "current" ? "current" : "upcoming";

  const horizontalIndicator = (
    <div className={cn(stepIndicatorWrapperVariants({ orientation }))}>
      {!__isFirst && (
        <span
          aria-hidden
          className={cn(
            "absolute left-0 right-1/2 top-1/2 h-0.5 -translate-y-1/2 pointer-events-none",
            stepConnectorVariants({
              orientation,
              variant: resolvedVariant,
              status: __previousStatus ?? "complete",
            }),
            BASE_CLASSNAMES.step.connectorHorizontal,
          )}
        />
      )}
      {!__isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 right-0 top-1/2 h-0.5 -translate-y-1/2 pointer-events-none",
            stepConnectorVariants({
              orientation,
              variant: resolvedVariant,
              status: connectorStatus,
            }),
            BASE_CLASSNAMES.step.connectorHorizontal,
          )}
        />
      )}
      <span
        className={cn(
          "relative z-10",
          stepIndicatorVariants({
            variant: resolvedVariant,
            status,
          }),
          BASE_CLASSNAMES.step.indicator,
        )}
      >
        {indicatorContent}
      </span>
    </div>
  );

  const verticalIndicator = (
    <div className={cn(stepIndicatorWrapperVariants({ orientation }))}>
      {!__isFirst && (
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-0 bottom-1/2 w-0.5 -translate-x-1/2 pointer-events-none",
            stepConnectorVariants({
              orientation,
              variant: resolvedVariant,
              status: __previousStatus ?? "complete",
            }),
            BASE_CLASSNAMES.step.connectorVertical,
          )}
        />
      )}
      {!__isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-1/2 bottom-0 w-0.5 -translate-x-1/2 pointer-events-none",
            stepConnectorVariants({
              orientation,
              variant: resolvedVariant,
              status: connectorStatus,
            }),
            BASE_CLASSNAMES.step.connectorVertical,
          )}
        />
      )}
      <span
        className={cn(
          "relative z-10",
          stepIndicatorVariants({
            variant: resolvedVariant,
            status,
          }),
          BASE_CLASSNAMES.step.indicator,
        )}
      >
        {indicatorContent}
      </span>
    </div>
  );

  return (
    <li
      className={cn(
        stepItemVariants({ orientation }),
        className,
        BASE_CLASSNAMES.step.item,
      )}
      data-status={status}
      {...props}
    >
      {isHorizontal ? horizontalIndicator : verticalIndicator}
      <div
        className={cn(
          stepContentVariants({ orientation }),
          BASE_CLASSNAMES.step.content,
        )}
      >
        {displayLabel ? (
          <span
            className={cn(
              stepLabelVariants({ orientation }),
              getLabelColorClass(resolvedVariant, status),
              BASE_CLASSNAMES.step.label,
            )}
          >
            {displayLabel}
          </span>
        ) : null}
        {description ? (
          <span
            className={cn(
              stepDescriptionVariants({ orientation }),
              BASE_CLASSNAMES.step.description,
            )}
          >
            {description}
          </span>
        ) : null}
      </div>
    </li>
  );
};
StepItem.displayName = "Step.Item";

const StepNamespace = Object.assign(Step, {
  Item: StepItem,
});

export { StepNamespace as Step };
export type { StepStatus, StepOrientation };

















