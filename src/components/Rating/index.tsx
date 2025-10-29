import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { ratingStarsVariants, ratingVariants } from "./variants";

type RatingSize = "sm" | "md" | "lg";
type RatingAlignment = "left" | "center" | "right";

type RatingValue = number | null | undefined;

const DEFAULT_MAX = 5;

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: RatingValue;
  max?: number;
  size?: RatingSize;
  alignment?: RatingAlignment;
  activeClassName?: string;
  inactiveClassName?: string;
  showValue?: boolean;
}

const clampValue = (value: RatingValue, max: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }
  return Math.min(Math.max(value, 0), max);
};

const Rating = ({
  value = 0,
  max = DEFAULT_MAX,
  size = "md",
  alignment = "left",
  activeClassName = "text-yellow-400",
  inactiveClassName = "text-gray-300",
  showValue = false,
  className,
  ...props
}: RatingProps) => {
  const safeMax = max > 0 ? Math.floor(max) : DEFAULT_MAX;
  const clampedValue = clampValue(value, safeMax);

  return (
    <div
      className={cn(
        ratingVariants({ alignment }),
        BASE_CLASSNAMES.rating.root,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          ratingStarsVariants({ size }),
          BASE_CLASSNAMES.rating.stars
        )}
        role="img"
        aria-label={`${clampedValue} de ${safeMax}`}
      >
        {Array.from({ length: safeMax }).map((_, index) => {
          const starIndex = index + 1;
          const isActive = starIndex <= clampedValue;
          return (
            <FontAwesomeIcon
              key={starIndex}
              icon={faStar}
              aria-hidden="true"
              className={cn(
                "h-[1em] w-[1em] shrink-0 transition-colors duration-150",
                isActive ? activeClassName : inactiveClassName
              )}
              fixedWidth
            />
          );
        })}
      </div>
      {showValue ? (
        <span
          className={cn(
            "text-xs font-medium text-govbr-gray-80",
            BASE_CLASSNAMES.rating.value
          )}
        >
          {clampedValue}/{safeMax}
        </span>
      ) : null}
    </div>
  );
};

Rating.displayName = "Rating";

export { Rating };
