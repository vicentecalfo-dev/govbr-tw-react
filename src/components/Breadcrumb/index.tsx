import { ComponentProps, FC } from "react";
import breadcrumbVariants from "./variants";
import iconBreadcrumbVariants from "./icon-variants";
import itemBreadcrumbVariants from "./item-variants";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { v4 as uuidv4 } from "uuid";

interface BreadcrumbProps
  extends ComponentProps<"nav">,
    VariantProps<typeof breadcrumbVariants> {}

const Breadcrumb: FC<BreadcrumbProps> = ({
  className,
  children,
  variant = "default",
  ...props
}) => {
  const navItems = React.Children.toArray(children);
  return (
    <nav
      className={cn(
        breadcrumbVariants({ variant }),
        className,
        BASE_CLASSNAMES.breadcrumb.root
      )}
      {...props}
    >
      {navItems.map((navItem, index) => {
        return (
          <span key={uuidv4()}>
            <span
              className={cn(
                itemBreadcrumbVariants({ variant }),
                index === navItems.length - 1 ? "font-semibold" : ""
              )}
            >
              {navItem}
            </span>
            {index < navItems.length - 1 ? (
              <span className="mx-3">
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={cn(iconBreadcrumbVariants({ variant }))}
                />
              </span>
            ) : (
              ""
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
