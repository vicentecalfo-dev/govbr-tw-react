import React, {
  CSSProperties,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import {
  treeIconWrapperVariants,
  treeItemVariants,
  treeLabelVariants,
  treeToggleVariants,
  treeVariants,
} from "./variants";

type TreeDensity = NonNullable<VariantProps<typeof treeVariants>["density"]>;
type TreeVariant = NonNullable<VariantProps<typeof treeVariants>["variant"]>;

type IconRenderer = (params: {
  expanded: boolean;
  iconClassName: string;
}) => ReactNode;

type TreeIconProp =
  | IconDefinition
  | ReactNode
  | ((iconClassName: string) => ReactNode);

interface TreeContextValue {
  density: TreeDensity;
  variant: TreeVariant;
  iconClassName: string;
  indent: number;
  renderToggleIcon: IconRenderer;
}

const TreeConfigContext = React.createContext<TreeContextValue | undefined>(
  undefined
);
const TreeLevelContext = React.createContext<number>(0);

const useTreeConfig = () => {
  const context = useContext(TreeConfigContext);
  if (!context) {
    throw new Error("Tree components must be used within <Tree>.");
  }
  return context;
};

const useTreeLevel = () => useContext(TreeLevelContext);

export interface TreeProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof treeVariants> {
  iconClassName?: string;
  indent?: number;
  renderToggleIcon?: IconRenderer;
}

const defaultToggleIcon: IconRenderer = ({ expanded, iconClassName }) => (
  <FontAwesomeIcon
    icon={expanded ? faChevronDown : faChevronRight}
    className={iconClassName}
  />
);

const Tree = ({
  density = "default",
  variant = "default",
  iconClassName = "text-govbr-gray-60",
  indent = 16,
  renderToggleIcon = defaultToggleIcon,
  className,
  children,
  ...props
}: TreeProps) => {
  const contextValue = useMemo<TreeContextValue>(
    () => ({
      density,
      variant,
      iconClassName,
      indent,
      renderToggleIcon,
    }),
    [density, variant, iconClassName, indent, renderToggleIcon]
  );

  return (
    <TreeConfigContext.Provider value={contextValue}>
      <TreeLevelContext.Provider value={0}>
        <ul
          role="tree"
          className={cn(
            treeVariants({ density, variant }),
            BASE_CLASSNAMES.tree.root,
            className
          )}
          {...props}
        >
          {children}
        </ul>
      </TreeLevelContext.Provider>
    </TreeConfigContext.Provider>
  );
};

const renderIcon = (icon: TreeIconProp | undefined, iconClassName: string) => {
  if (!icon) {
    return null;
  }

  if (typeof icon === "function") {
    return icon(iconClassName);
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      className: cn(icon.props.className, iconClassName),
    });
  }

  if (
    typeof icon === "object" &&
    icon !== null &&
    "iconName" in icon &&
    "prefix" in icon
  ) {
    return <FontAwesomeIcon icon={icon as IconDefinition} className={iconClassName} />;
  }

  return icon;
};

interface TreeBranchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label: ReactNode;
  children?: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onToggle?: (expanded: boolean) => void;
  toggleIconClassName?: string;
  icon?: TreeIconProp;
  iconClassName?: string;
  labelClassName?: string;
  toggleIcon?: IconRenderer;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  expandOnLabelClick?: boolean;
}

const TreeBranch = ({
  label,
  children,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  onToggle,
  toggleIconClassName,
  icon,
  iconClassName,
  labelClassName,
  toggleIcon,
  onSelect,
  disabled = false,
  expandOnLabelClick = true,
  className,
  ...props
}: TreeBranchProps) => {
  const { density, variant, iconClassName: contextIconClass, indent, renderToggleIcon } =
    useTreeConfig();
  const level = useTreeLevel();
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isControlled ? !!expanded : internalExpanded;

  const handleToggle = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      const next = !isExpanded;
      if (!isControlled) {
        setInternalExpanded(next);
      }
      onExpandedChange?.(next);
      onToggle?.(next);
      if (expandOnLabelClick && event) {
        event.stopPropagation();
      }
    },
    [
      disabled,
      isExpanded,
      isControlled,
      onExpandedChange,
      onToggle,
      expandOnLabelClick,
    ]
  );

  const paddingStyle: CSSProperties =
    level > 0 ? { marginLeft: level * indent } : {};

  const mergedToggleIconClass = cn(contextIconClass, toggleIconClassName);
  const mergedItemIconClass = cn(contextIconClass, iconClassName);

  const toggleRenderer = toggleIcon ?? renderToggleIcon;

  const labelContent = (
    <span
      className={cn(
        treeLabelVariants({ variant }),
        labelClassName,
        disabled ? "opacity-60" : undefined
      )}
    >
      {label}
    </span>
  );

  return (
    <li
      role="treeitem"
      aria-expanded={isExpanded}
      className="list-none"
      {...props}
    >
      <div
        className={cn(
          treeItemVariants({ variant, density, disabled }),
          BASE_CLASSNAMES.tree.item,
          className
        )}
        style={paddingStyle}
      >
        <button
          type="button"
          className={cn(
            treeToggleVariants({ variant, density }),
            BASE_CLASSNAMES.tree.toggle
          )}
          onClick={handleToggle}
          disabled={disabled}
          aria-label={isExpanded ? "Recolher" : "Expandir"}
        >
          {toggleRenderer({
            expanded: isExpanded,
            iconClassName: mergedToggleIconClass,
          })}
        </button>
        <span
          className={cn(
            treeIconWrapperVariants({ density }),
            BASE_CLASSNAMES.tree.icon
          )}
        >
          {renderIcon(icon, mergedItemIconClass)}
        </span>
        {onSelect ? (
          <button
            type="button"
            className="flex flex-1 items-center gap-2 text-left"
            onClick={(event) => {
              if (expandOnLabelClick) {
                handleToggle(event);
              }
              onSelect(event);
            }}
            disabled={disabled}
          >
            {labelContent}
          </button>
        ) : (
          <span
            className="flex flex-1 items-center gap-2"
            onClick={(event) => {
              if (expandOnLabelClick) {
                handleToggle(event as React.MouseEvent<HTMLButtonElement>);
              }
            }}
          >
            {labelContent}
          </span>
        )}
      </div>
      {isExpanded && children ? (
        <TreeLevelContext.Provider value={level + 1}>
          <ul role="group" className={cn("flex flex-col", BASE_CLASSNAMES.tree.group)}>
            {children}
          </ul>
        </TreeLevelContext.Provider>
      ) : null}
    </li>
  );
};

interface TreeLeafProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label: ReactNode;
  icon?: TreeIconProp;
  iconClassName?: string;
  labelClassName?: string;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const TreeLeaf = ({
  label,
  icon,
  iconClassName,
  labelClassName,
  onSelect,
  disabled = false,
  className,
  ...props
}: TreeLeafProps) => {
  const { density, variant, iconClassName: contextIconClass, indent } =
    useTreeConfig();
  const level = useTreeLevel();

  const paddingStyle: CSSProperties =
    level > 0 ? { marginLeft: level * indent } : {};

  const mergedIconClass = cn(contextIconClass, iconClassName);

  const labelContent = (
    <span
      className={cn(
        treeLabelVariants({ variant }),
        labelClassName,
        disabled ? "opacity-60" : undefined
      )}
    >
      {label}
    </span>
  );

  return (
    <li
      role="treeitem"
      aria-expanded={false}
      className="list-none"
      {...props}
    >
      <div
        className={cn(
          treeItemVariants({ variant, density, disabled }),
          BASE_CLASSNAMES.tree.item,
          className
        )}
        style={paddingStyle}
      >
        <span
          className={cn(
            treeToggleVariants({ variant, density }),
            "pointer-events-none opacity-0",
            BASE_CLASSNAMES.tree.toggle
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            treeIconWrapperVariants({ density }),
            BASE_CLASSNAMES.tree.icon
          )}
        >
          {renderIcon(icon, mergedIconClass)}
        </span>
        {onSelect ? (
          <button
            type="button"
            className="flex flex-1 items-center gap-2 text-left"
            onClick={onSelect}
            disabled={disabled}
          >
            {labelContent}
          </button>
        ) : (
          <span className="flex flex-1 items-center gap-2">{labelContent}</span>
        )}
      </div>
    </li>
  );
};

TreeBranch.displayName = "TreeBranch";
TreeLeaf.displayName = "TreeLeaf";

const TreeNamespace = Object.assign(Tree, {
  Branch: TreeBranch,
  Leaf: TreeLeaf,
});

export { TreeNamespace as Tree };
export type { TreeBranchProps, TreeLeafProps };
