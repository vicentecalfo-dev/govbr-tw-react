import React, {
  CSSProperties,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  faChevronDown,
  faChevronRight,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

interface TreeBranchRenderParams {
  type: "branch";
  level: number;
  label: ReactNode;
  icon?: TreeIconProp;
  collapsedIcon?: TreeIconProp;
  expandedIcon?: TreeIconProp;
  iconClassName: string;
  defaultNode: ReactNode;
  expanded: boolean;
  hasChildren: boolean;
  disabled: boolean;
  toggle: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  density: TreeDensity;
  variant: TreeVariant;
  iconNode: ReactNode;
  collapsedIconNode: ReactNode;
  expandedIconNode: ReactNode;
  toggleIconNode: ReactNode;
  content: ReactNode;
  group: ReactNode | null;
  containerProps: React.LiHTMLAttributes<HTMLLIElement>;
}

interface TreeLeafRenderParams {
  type: "leaf";
  level: number;
  label: ReactNode;
  icon?: TreeIconProp;
  iconClassName: string;
  defaultNode: ReactNode;
  disabled: boolean;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  density: TreeDensity;
  variant: TreeVariant;
  iconNode: ReactNode;
  content: ReactNode;
  containerProps: React.LiHTMLAttributes<HTMLLIElement>;
}

type TreeRenderItem = (
  params: TreeBranchRenderParams | TreeLeafRenderParams,
) => ReactNode;

interface TreeContextValue {
  density: TreeDensity;
  variant: TreeVariant;
  iconClassName: string;
  indent: number;
  renderToggleIcon: IconRenderer;
  renderItem?: TreeRenderItem;
  branchCollapsedIcon: TreeIconProp;
  branchExpandedIcon: TreeIconProp;
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
  renderItem?: TreeRenderItem;
  branchCollapsedIcon?: TreeIconProp;
  branchExpandedIcon?: TreeIconProp;
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
  iconClassName = "text-govbr-blue-warm-vivid-70 text-lg",
  indent = 16,
  renderToggleIcon = defaultToggleIcon,
  renderItem,
  branchCollapsedIcon = faFolder,
  branchExpandedIcon = faFolderOpen,
  className,
  children,
  ...props
}: TreeProps) => {
  const resolvedDensity = density ?? "default";
  const resolvedVariant = variant ?? "default";
  const contextValue = useMemo<TreeContextValue>(
    () => ({
      density: resolvedDensity,
      variant: resolvedVariant,
      iconClassName,
      indent,
      renderToggleIcon,
      renderItem,
      branchCollapsedIcon,
      branchExpandedIcon,
    }),
    [
      resolvedDensity,
      resolvedVariant,
      iconClassName,
      indent,
      renderToggleIcon,
      renderItem,
      branchCollapsedIcon,
      branchExpandedIcon,
    ],
  );

  return (
    <TreeConfigContext.Provider value={contextValue}>
      <TreeLevelContext.Provider value={0}>
        <ul
          role="tree"
          className={cn(
            treeVariants({ density: resolvedDensity, variant: resolvedVariant }),
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

  if (isValidElement<{ className?: string }>(icon)) {
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
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "children" | "onSelect"> {
  label: ReactNode;
  children?: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onToggle?: (expanded: boolean) => void;
  toggleIconClassName?: string;
  icon?: TreeIconProp;
  iconCollapsed?: TreeIconProp;
  iconExpanded?: TreeIconProp;
  iconClassName?: string;
  labelClassName?: string;
  toggleIcon?: IconRenderer;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  expandOnLabelClick?: boolean;
  renderItem?: (params: TreeBranchRenderParams) => ReactNode;
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
  iconCollapsed,
  iconExpanded,
  iconClassName,
  labelClassName,
  toggleIcon,
  onSelect,
  disabled = false,
  expandOnLabelClick = true,
  renderItem,
  className,
  ...props
}: TreeBranchProps) => {
  const {
    density,
    variant,
    iconClassName: contextIconClass,
    indent,
    renderToggleIcon,
    renderItem: contextRenderItem,
    branchCollapsedIcon: contextBranchCollapsedIcon,
    branchExpandedIcon: contextBranchExpandedIcon,
  } = useTreeConfig();
  const level = useTreeLevel();
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = isControlled ? !!expanded : internalExpanded;
  const hasChildren = React.Children.count(children) > 0;

  const contentRef = useRef<HTMLUListElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

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

  const measureHeight = useCallback(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    const previous = node.style.maxHeight;
    node.style.maxHeight = "none";
    const height = node.scrollHeight;
    node.style.maxHeight = previous;
    setContentHeight(height);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!hasChildren) {
      setContentHeight(0);
      return;
    }
    measureHeight();
  }, [measureHeight, hasChildren, children, isExpanded, density]);

  useEffect(() => {
    if (!hasChildren || typeof window === "undefined") {
      return;
    }
    const handleResize = () => measureHeight();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasChildren, measureHeight]);

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

  const collapsedIcon =
    iconCollapsed ?? icon ?? (hasChildren ? contextBranchCollapsedIcon : undefined);
  const expandedIcon =
    iconExpanded ?? icon ?? (hasChildren ? contextBranchExpandedIcon : undefined);

  const collapsedIconNode = renderIcon(collapsedIcon, mergedItemIconClass);
  const expandedIconNode = renderIcon(expandedIcon, mergedItemIconClass);
  const iconNode = isExpanded
    ? expandedIconNode ?? collapsedIconNode
    : collapsedIconNode ?? expandedIconNode;
  const toggleIconNode = toggleRenderer({
    expanded: isExpanded,
    iconClassName: mergedToggleIconClass,
  });

  const content = (
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
        {toggleIconNode}
      </button>
      <span
        className={cn(
          treeIconWrapperVariants({ density }),
          BASE_CLASSNAMES.tree.icon
        )}
      >
        {iconNode}
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
  );

  const group = hasChildren ? (
    <TreeLevelContext.Provider value={level + 1}>
      <ul
        ref={contentRef}
        role="group"
        data-expanded={isExpanded}
        className={cn(
          "flex flex-col overflow-hidden transition-all duration-250 ease-in-out",
          isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
          BASE_CLASSNAMES.tree.group
        )}
        style={{
          maxHeight: isExpanded
            ? contentHeight
              ? `${contentHeight}px`
              : "999px"
            : "0px",
          opacity: isExpanded ? 1 : 0,
          willChange: "max-height, opacity",
        }}
        aria-hidden={!isExpanded}
      >
        {children}
      </ul>
    </TreeLevelContext.Provider>
  ) : null;

  const containerProps: React.LiHTMLAttributes<HTMLLIElement> = {
    role: "treeitem",
    "aria-expanded": isExpanded,
    className: "list-none",
    ...props,
  };

  const defaultNode = (
    <li {...containerProps}>
      {content}
      {group}
    </li>
  );

  const renderItemFn =
    (renderItem as TreeRenderItem | undefined) ?? contextRenderItem;

  const rendered =
    renderItemFn?.({
      type: "branch",
      level,
      label,
      icon,
      collapsedIcon,
      expandedIcon,
      iconClassName: mergedItemIconClass,
      iconNode,
      collapsedIconNode,
      expandedIconNode,
      toggleIconNode,
      defaultNode,
      expanded: isExpanded,
      hasChildren,
      disabled,
      toggle: handleToggle,
      onSelect,
      density,
      variant,
      content,
      group,
      containerProps,
    }) ?? null;

  return rendered ?? defaultNode;
};

interface TreeLeafProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "children" | "onSelect"> {
  label: ReactNode;
  icon?: TreeIconProp;
  iconClassName?: string;
  labelClassName?: string;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  renderItem?: (params: TreeLeafRenderParams) => ReactNode;
}

const TreeLeaf = ({
  label,
  icon,
  iconClassName,
  labelClassName,
  onSelect,
  disabled = false,
  renderItem,
  className,
  ...props
}: TreeLeafProps) => {
  const {
    density,
    variant,
    iconClassName: contextIconClass,
    indent,
    renderItem: contextRenderItem,
  } =
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

  const iconNode = renderIcon(icon, mergedIconClass);

  const content = (
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
        {iconNode}
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
  );

  const containerProps: React.LiHTMLAttributes<HTMLLIElement> = {
    role: "treeitem",
    "aria-expanded": false,
    className: "list-none",
    ...props,
  };

  const defaultNode = (
    <li {...containerProps}>
      {content}
    </li>
  );

  const renderItemFn =
    (renderItem as TreeRenderItem | undefined) ?? contextRenderItem;

  const rendered =
    renderItemFn?.({
      type: "leaf",
      level,
      label,
      icon,
      iconClassName: mergedIconClass,
      defaultNode,
      disabled,
      onSelect,
      density,
      variant,
      iconNode,
      content,
      containerProps,
    }) ?? null;

  return rendered ?? defaultNode;
};

TreeBranch.displayName = "TreeBranch";
TreeLeaf.displayName = "TreeLeaf";

const TreeNamespace = Object.assign(Tree, {
  Branch: TreeBranch,
  Leaf: TreeLeaf,
});

export { TreeNamespace as Tree };
export type {
  TreeBranchProps,
  TreeLeafProps,
  TreeBranchRenderParams,
  TreeLeafRenderParams,
  TreeRenderItem,
};
