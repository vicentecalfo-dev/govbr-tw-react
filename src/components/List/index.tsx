import { ComponentProps, FC, createContext, useContext, useRef } from "react";
import listVariants from "./variants";
import listItemVariants from "./item-variants";
import listItemLocatorVariants from "./locator-variants";
import listItemLabelVariants from "./label-variants";
import { VariantProps } from "class-variance-authority";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";

interface ListProps
  extends ComponentProps<"ul">,
    VariantProps<typeof listVariants> {
  locatorPosition?: "top" | "bottom";
}

interface ListItemProps
  extends ComponentProps<"li">,
    VariantProps<typeof listItemVariants> {}

interface ListItemLabelProps
  extends ComponentProps<"span">,
    VariantProps<typeof listItemLabelVariants> {
  locator?: string;
}

const ListContext: any = createContext(null);

const List = ({
  className,
  children,
  variant = "default",
  locatorPosition = "top",
  ref,
  ...props
}: ListProps) => {
  ref = ref === undefined ? useRef<HTMLUListElement>(null) : ref;
  return (
    <ListContext.Provider value={{ variant, locatorPosition }}>
      <ul
        className={cn(
          listVariants({ variant }),
          className,
          BASE_CLASSNAMES.list.root
        )}
        {...props}
        ref={ref}
      >
        {children}
      </ul>
    </ListContext.Provider>
  );
};

const ListItem = ({ className, children, ...props }: ListItemProps) => {
  const { variant }: any = useContext(ListContext);
  return (
    <li
      className={cn(
        listItemVariants({ variant }),
        className,
        BASE_CLASSNAMES.list.item
      )}
      {...props}
    >
      {children}
    </li>
  );
};

const ListItemLabel = ({
  className,
  children,
  locator,
  ...props
}: ListItemLabelProps) => {
  const { variant, locatorPosition }: any = useContext(ListContext);
  return (
    <span
      className={cn(
        listItemLabelVariants({ variant, locatorPosition }),
        className,
        BASE_CLASSNAMES.list.label
      )}
      {...props}
    >
      {locator && (
        <span className={cn(listItemLocatorVariants({ variant }))}>
          {locator}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

List.Item = ListItem;
List.Label = ListItemLabel;

export default List;
