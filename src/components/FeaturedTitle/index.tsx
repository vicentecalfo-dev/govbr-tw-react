import { cn } from "@/src/libs/utils";
import { ComponentProps, FC } from "react";
import featuredTitleVariants from "./variants";
import featuredTitleDivisorVariants from "./divisor-variants";

import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";

interface FeaturedTitleProps
  extends ComponentProps<"header">,
    VariantProps<typeof featuredTitleVariants> {
  align?: "left" | "center" | "right";
}

const FeaturedTitle: FC<FeaturedTitleProps> = ({
  className,
  children,
  variant = "default",
  align = "center",
  ...props
}) => {
  return (
    <header
      className={cn(
        featuredTitleVariants({ variant }),
        className,
        BASE_CLASSNAMES.featuredTitle.root
      )}
      {...props}
    >
      {align === "center" || align === "right" ? (
        <span className={cn(featuredTitleDivisorVariants({ variant }))}></span>
      ) : null}
      <span className="font-semibold flex gap-3 items-center">{children}</span>
      {align === "center" || align === "left" ? (
        <span className={cn(featuredTitleDivisorVariants({ variant }))}></span>
      ) : null}
    </header>
  );
};

export default FeaturedTitle;
