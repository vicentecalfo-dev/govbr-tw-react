import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { cn } from "../../libs/utils";
import { Button, type ButtonProps } from "../Button";
import Input from "../Input";
import Skeleton from "../Skeleton";
import Tooltip from "../Tooltip";
import {
  sidebarContainerVariants,
  sidebarContentVariants,
  sidebarFooterVariants,
  sidebarGroupActionVariants,
  sidebarGroupLabelVariants,
  sidebarHeaderVariants,
  sidebarMenuActionVariants,
  sidebarMenuBadgeVariants,
  sidebarMenuButtonVariants,
  sidebarMenuSubButtonVariants,
  sidebarMenuSubVariants,
  sidebarRailVariants,
  sidebarSeparatorVariants,
  type SidebarMenuButtonVariantProps,
  type SidebarMenuSubButtonVariantProps,
} from "./variants";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3.5rem";
const SIDEBAR_MEDIA_QUERY = "(max-width: 1023px)";

type SidebarTheme = "light" | "dark";
type SidebarVariant = "sidebar" | "floating" | "inset";
type SidebarSide = "left" | "right";
type SidebarCollapsible = "offcanvas" | "icon" | "none";
type SidebarStateValue = "expanded" | "collapsed";

type SidebarContextValue = {
  state: SidebarStateValue;
  open: boolean;
  setOpen: (value: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (value: boolean | ((value: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  theme: SidebarTheme;
  side: SidebarSide;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
  isIconCollapsed: boolean;
  showRail: boolean;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within <SidebarProvider>.");
  }
  return ctx;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

function useIsMobile() {
  return useMediaQuery(SIDEBAR_MEDIA_QUERY);
}

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  theme?: SidebarTheme;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  showRail?: boolean;
  style?: React.CSSProperties;
}

export const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange,
      theme = "light",
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      showRail = true,
      className,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = useState(false);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const open = collapsible === "none" ? true : openProp ?? internalOpen;

    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        if (collapsible === "none") {
          return;
        }
        const next = typeof value === "function" ? value(open) : value;
        onOpenChange?.(next);
        if (openProp === undefined) {
          setInternalOpen(next);
        }
      },
      [collapsible, onOpenChange, open, openProp]
    );

    const toggleSidebar = useCallback(() => {
      if (isMobile) {
        setOpenMobile((prev) => !prev);
        return;
      }
      if (collapsible === "none") {
        return;
      }
      setOpen((prev) => !prev);
    }, [collapsible, isMobile, setOpen]);

    useEffect(() => {
      if (!isMobile) {
        setOpenMobile(false);
      }
    }, [isMobile]);

    const state: SidebarStateValue = open ? "expanded" : "collapsed";
    const isIconCollapsed = !isMobile && collapsible === "icon" && state === "collapsed";

    const contextValue = useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
        theme,
        side,
        variant,
        collapsible,
        isIconCollapsed,
        showRail,
      }),
      [
        collapsible,
        isIconCollapsed,
        isMobile,
        open,
        openMobile,
        showRail,
        setOpen,
        side,
        state,
        theme,
        toggleSidebar,
        variant,
      ]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("group/sidebar flex min-h-dvh w-full", className)}
          data-state={state}
          data-side={side}
          data-theme={theme}
          data-variant={variant}
          data-collapsible={collapsible}
          style={{
            ["--sidebar-width" as any]: SIDEBAR_WIDTH,
            ["--sidebar-width-mobile" as any]: SIDEBAR_WIDTH_MOBILE,
            ["--sidebar-width-icon" as any]: SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

export function useSidebar() {
  return useSidebarContext();
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  theme?: SidebarTheme;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, children, style, theme: themeProp, side: sideProp, variant: variantProp, collapsible: collapsibleProp, ...rest }, ref) => {
    const context = useSidebarContext();
    const theme = themeProp ?? context.theme;
    const side = sideProp ?? context.side;
    const variant = variantProp ?? context.variant;
    const collapsible = collapsibleProp ?? context.collapsible;
    const { state, openMobile, isMobile } = context;

    const isIconCollapsed = !isMobile && collapsible === "icon" && state === "collapsed";
    const isOffCanvasCollapsed = !isMobile && collapsible === "offcanvas" && state === "collapsed";

    const width = isMobile
      ? "var(--sidebar-width-mobile)"
      : isIconCollapsed
        ? "var(--sidebar-width-icon)"
        : "var(--sidebar-width)";

    const verticalInset = !isMobile && variant !== "sidebar" ? "top-4 bottom-4" : "top-0 bottom-0";
    const horizontalInset =
      !isMobile && variant !== "sidebar"
        ? side === "left"
          ? "left-4"
          : "right-4"
        : side === "left"
          ? "left-0"
          : "right-0";

    const containerClasses = sidebarContainerVariants({ theme, variant, side });

    let translateClass = "translate-x-0";
    if (isMobile) {
      translateClass =
        side === "left"
          ? openMobile
            ? "translate-x-0"
            : "-translate-x-full"
          : openMobile
            ? "translate-x-0"
            : "translate-x-full";
    } else if (isOffCanvasCollapsed) {
      translateClass = side === "left" ? "-translate-x-full" : "translate-x-full";
    }

    const pointerEventsClass = isMobile && !openMobile ? "pointer-events-none" : "pointer-events-auto";

    return (
      <aside
        ref={ref}
        data-sidebar="container"
        data-state={state}
        data-side={side}
        data-variant={variant}
        data-theme={theme}
        data-collapsible={collapsible}
        aria-hidden={isMobile && !openMobile ? true : undefined}
        className={cn(
          containerClasses,
          verticalInset,
          horizontalInset,
          translateClass,
          pointerEventsClass,
          className
        )}
        style={{
          width,
          ["--sidebar-current-width" as any]: width,
          ...style,
        }}
        {...rest}
      >
        <div className="flex h-full flex-col overflow-hidden">{children}</div>
      </aside>
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarOverlay: React.FC = () => {
  const { openMobile, setOpenMobile, isMobile } = useSidebarContext();
  if (!isMobile) {
    return null;
  }
  return (
    <div
      data-sidebar="overlay"
      className={cn(
        "fixed inset-0 z-30 transition-opacity duration-300",
        openMobile ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={() => setOpenMobile(false)}
    />
  );
};

export const SidebarRail = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...rest }, ref) => {
    const { toggleSidebar, collapsible, isMobile, side, state, theme, showRail } = useSidebarContext();
    if (isMobile || collapsible !== "icon" || !showRail) {
      return null;
    }
    return (
      <button
        ref={ref}
        type="button"
        data-sidebar="rail"
        data-state={state}
        className={cn(
          "absolute top-1/2 z-50",
          side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2",
          sidebarRailVariants({ theme }),
          className
        )}
        onClick={toggleSidebar}
        aria-label="Alternar largura da barra lateral"
        {...rest}
      />
    );
  }
);
SidebarRail.displayName = "SidebarRail";

export const SidebarContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { isIconCollapsed, theme } = useSidebarContext();
    const contentClasses = sidebarContentVariants({ theme });
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          contentClasses,
          isIconCollapsed && "items-center overflow-hidden",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarContent.displayName = "SidebarContent";

export const SidebarHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { theme, isIconCollapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn(
          sidebarHeaderVariants({ theme }),
          isIconCollapsed && "items-center justify-center p-4",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

export const SidebarFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { theme, isIconCollapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn(
          sidebarFooterVariants({ theme }),
          isIconCollapsed && "items-center px-2 py-4",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";

export const SidebarSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { theme } = useSidebarContext();
    return (
      <div
        ref={ref}
        data-sidebar="separator"
        className={cn(sidebarSeparatorVariants({ theme }), className)}
        {...rest}
      />
    );
  }
);
SidebarSeparator.displayName = "SidebarSeparator";

export const SidebarGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col", className)}
      {...rest}
    />
  )
);
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { collapsible, isIconCollapsed, theme } = useSidebarContext();
    return (
      <div
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          sidebarGroupLabelVariants({ theme }),
          collapsible === "icon" && isIconCollapsed && "-mt-8 opacity-0",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarGroupAction = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...rest }, ref) => {
    const { theme, isIconCollapsed } = useSidebarContext();
    return (
      <button
        ref={ref}
        type="button"
        data-sidebar="group-action"
        className={cn(
          sidebarGroupActionVariants({ theme }),
          isIconCollapsed && "hidden",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarGroupAction.displayName = "SidebarGroupAction";

export const SidebarGroupContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("flex w-full flex-col gap-1", className)}
      {...rest}
    />
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";

type CollapsibleMenuContextValue = {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
};

const SidebarMenuCollapsibleContext = createContext<CollapsibleMenuContextValue | null>(null);

function useSidebarMenuCollapsible() {
  return useContext(SidebarMenuCollapsibleContext);
}

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export const SidebarMenuItem = forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  (
    {
      collapsible = false,
      defaultOpen = false,
      open: openProp,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const { isIconCollapsed } = useSidebarContext();
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const open = openProp ?? internalOpen;
    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const next = typeof value === "function" ? value(open) : value;
        onOpenChange?.(next);
        if (openProp === undefined) {
          setInternalOpen(next);
        }
      },
      [onOpenChange, open, openProp]
    );

    useEffect(() => {
      if (isIconCollapsed) {
        if (open) {
          setOpen(false);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIconCollapsed]);

    const collapsibleContext = collapsible
      ? {
          open,
          toggle: () => setOpen((prev) => !prev),
          disabled,
        }
      : null;

    const content = (
      <li
        ref={ref}
        data-sidebar="menu-item"
        data-state={collapsible ? (open ? "open" : "closed") : undefined}
        data-collapsible={collapsible ? "true" : undefined}
        className={cn("group/menu-item relative", className)}
        {...rest}
      >
        {children}
      </li>
    );

    if (!collapsibleContext) {
      return content;
    }

    return (
      <SidebarMenuCollapsibleContext.Provider value={collapsibleContext}>
        {content}
      </SidebarMenuCollapsibleContext.Provider>
    );
  }
);
SidebarMenuItem.displayName = "SidebarMenuItem";

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SidebarMenuButtonVariantProps {
  isActive?: boolean;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  collapsedIconVariant?: ButtonProps["variant"];
  collapsedIconActiveVariant?: ButtonProps["variant"];
}

export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  (
    {
      className,
      children,
      icon,
      isActive,
      tooltip,
      size = "md",
      variant = "default",
      onClick,
      collapsedIconVariant = "ghost",
      collapsedIconActiveVariant = "default",
      ...rest
    },
    ref
  ) => {
    const { collapsible, isIconCollapsed, theme } = useSidebarContext();
    const collapsibleContext = useSidebarMenuCollapsible();
    const { ["aria-label"]: ariaLabelProp, ...buttonRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    const accessibleLabel =
      ariaLabelProp ?? (typeof children === "string" ? String(children) : undefined);
    const collapsedAriaLabel = accessibleLabel ?? "Abrir item do menu";

    const buttonClasses = cn(
      sidebarMenuButtonVariants({
        size,
        variant,
        iconOnly: isIconCollapsed ? true : false,
        theme,
        active: isActive ? true : false,
      }),
      "group-has-[data-sidebar=menu-action]/menu-item:pr-12"
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }
      if (collapsibleContext && !isIconCollapsed && !collapsibleContext.disabled) {
        event.preventDefault();
        collapsibleContext.toggle();
      }
    };

    const resolvedTooltip = tooltip ?? (typeof children === "string" ? children : undefined);

    if (isIconCollapsed) {
      const collapsedVariant = isActive ? collapsedIconActiveVariant : collapsedIconVariant;
      const iconButton = (
        <Button
          ref={ref}
          type="button"
          size="icon"
          variant={collapsedVariant}
          className={cn("h-10 w-10", className)}
          onClick={handleClick}
          aria-expanded={collapsibleContext ? collapsibleContext.open : undefined}
          aria-disabled={collapsibleContext?.disabled}
          aria-label={collapsedAriaLabel}
          {...buttonRest}
        >
          {icon ?? (
            <span className="sr-only">
              {collapsedAriaLabel}
            </span>
          )}
        </Button>
      );

      if (!resolvedTooltip) {
        return iconButton;
      }

      const tooltipContent = typeof resolvedTooltip === "string" ? (
        <span className="text-xs">{resolvedTooltip}</span>
      ) : (
        resolvedTooltip
      );

      return (
        <Tooltip position="right" className="z-[999]">
          {iconButton}
          {tooltipContent}
        </Tooltip>
      );
    }

    const buttonContent = (
      <button
        ref={ref}
        type="button"
        className={cn(buttonClasses, className)}
        aria-expanded={collapsibleContext ? collapsibleContext.open : undefined}
        aria-disabled={collapsibleContext?.disabled}
        aria-label={ariaLabelProp}
        onClick={handleClick}
        {...buttonRest}
      >
        {icon ? <span className="inline-flex size-5 items-center justify-center">{icon}</span> : null}
        {!isIconCollapsed && <span className="flex-1 truncate">{children}</span>}
        {collapsibleContext ? (
          <span
            className={cn(
              "ml-auto inline-flex size-4 items-center justify-center transition-transform",
              collapsibleContext.open ? "rotate-180" : "rotate-0",
              (collapsible === "icon" && isIconCollapsed) && "hidden"
            )}
            aria-hidden
          >
            <FontAwesomeIcon icon={faChevronDown} className="size-3" />
          </span>
        ) : null}
      </button>
    );

    return buttonContent;
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export const SidebarMenu = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...rest }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...rest}
    />
  )
);
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuAction = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...rest }, ref) => {
    const { theme, isIconCollapsed } = useSidebarContext();
    return (
      <button
        ref={ref}
        type="button"
        data-sidebar="menu-action"
        className={cn(
          sidebarMenuActionVariants({ theme }),
          isIconCollapsed && "hidden",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarMenuAction.displayName = "SidebarMenuAction";

export const SidebarMenuBadge = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { theme, isIconCollapsed } = useSidebarContext();
    return (
      <div
        ref={ref}
        data-sidebar="menu-badge"
        className={cn(
          sidebarMenuBadgeVariants({ theme }),
          isIconCollapsed && "hidden",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

export const SidebarMenuSkeleton = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { showIcon?: boolean }>(
  ({ className, showIcon = false, ...rest }, ref) => {
    const width = useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
    return (
      <div
        ref={ref}
        data-sidebar="menu-skeleton"
        className={cn("flex h-9 items-center gap-2 rounded-md px-4", className)}
        {...rest}
      >
        {showIcon ? <Skeleton className="size-5 rounded-md" /> : null}
        <Skeleton className="h-4 flex-none rounded-md" style={{ width }} />
      </div>
    );
  }
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

export const SidebarMenuSub = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...rest }, ref) => {
    const { theme, isIconCollapsed } = useSidebarContext();
    const collapsibleContext = useSidebarMenuCollapsible();
    const hidden = collapsibleContext ? !collapsibleContext.open : false;
    return (
      <ul
        ref={ref}
        data-sidebar="menu-sub"
        data-state={collapsibleContext ? (collapsibleContext.open ? "open" : "closed") : undefined}
        className={cn(
          sidebarMenuSubVariants({ theme }),
          (hidden || isIconCollapsed) && "hidden",
          className
        )}
        {...rest}
      />
    );
  }
);
SidebarMenuSub.displayName = "SidebarMenuSub";

export const SidebarMenuSubItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...rest }, ref) => (
    <li ref={ref} data-sidebar="menu-sub-item" className={cn("relative", className)} {...rest} />
  )
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export interface SidebarMenuSubButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  size?: SidebarMenuSubButtonVariantProps["size"];
}

export const SidebarMenuSubButton = forwardRef<HTMLButtonElement, SidebarMenuSubButtonProps>(
  ({ className, children, isActive, size = "md", ...rest }, ref) => {
    const { theme } = useSidebarContext();
    return (
      <button
        ref={ref}
        type="button"
        data-sidebar="menu-sub-button"
        className={cn(
          sidebarMenuSubButtonVariants({
            theme,
            size,
            active: isActive ? "true" : "false",
          }),
          className
        )}
        {...rest}
      >
        <span className="truncate">{children}</span>
      </button>
    );
  }
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export const SidebarMenuSubAction = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      data-sidebar="menu-sub-action"
      className={cn("ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md text-xs", className)}
      {...rest}
    />
  )
);
SidebarMenuSubAction.displayName = "SidebarMenuSubAction";

export interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode;
}

export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, variant, onClick, icon, ...rest }, ref) => {
    const { toggleSidebar, theme, isMobile, collapsible } = useSidebarContext();
    const resolvedVariant = variant ?? (theme === "dark" ? "ghost-dark" : "ghost");

    return (
      <Button
        ref={ref}
        size="icon"
        variant={resolvedVariant}
        className={cn(className)}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (!isMobile && collapsible === "none") {
            return;
          }
          toggleSidebar();
        }}
        {...rest}
      >
        {icon ?? <FontAwesomeIcon icon={faBars} />}
        <span className="sr-only">Alternar barra lateral</span>
      </Button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarInput = forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...rest }, ref) => (
    <Input
      ref={ref}
      className={cn("h-9 w-full bg-transparent shadow-none focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-50", className)}
      density="default"
      {...rest}
    />
  )
);
SidebarInput.displayName = "SidebarInput";

export const SidebarInset = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...rest }, ref) => {
    const { side, variant, collapsible, state, isMobile, isIconCollapsed } = useSidebarContext();

    const baseWidth = isMobile
      ? "0px"
      : collapsible === "offcanvas" && state === "collapsed"
        ? "0px"
        : isIconCollapsed
          ? "var(--sidebar-width-icon)"
          : "var(--sidebar-width)";

    const extraGap = !isMobile && variant !== "sidebar" ? "1.5rem" : "0px";
    const total = extraGap !== "0px" ? `calc(${baseWidth} + ${extraGap})` : baseWidth;

    const insetStyle: React.CSSProperties =
      side === "left"
        ? { marginLeft: total }
        : { marginRight: total };

    return (
      <div
        ref={ref}
        data-sidebar="inset"
        className={cn("min-h-dvh w-full transition-[margin] duration-300 ease-in-out", className)}
        style={{
          ...insetStyle,
          ...style,
        }}
        {...rest}
      />
    );
  }
);
SidebarInset.displayName = "SidebarInset";

export {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SIDEBAR_WIDTH_MOBILE,
};
