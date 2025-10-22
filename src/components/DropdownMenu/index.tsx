import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import {
  dropdownMenuCheckboxItemVariants,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuRadioItemVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuSubTriggerVariants,
} from "./variants";

type DropdownMenuTriggerOption = "click" | "rightclick";

interface DropdownMenuInteractionContextValue {
  openTrigger: DropdownMenuTriggerOption;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuInteractionContext =
  React.createContext<DropdownMenuInteractionContextValue | undefined>(undefined);

const useDropdownMenuInteractionContext = () => {
  return React.useContext(DropdownMenuInteractionContext);
};

const composeEventHandlers =
  <E extends React.SyntheticEvent>(
    theirHandler?: (event: E) => void,
    ourHandler?: (event: E) => void
  ) =>
  (event: E) => {
    theirHandler?.(event);
    if (!event.defaultPrevented) {
      ourHandler?.(event);
    }
  };

type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
> & {
  openTrigger?: DropdownMenuTriggerOption;
};

const DropdownMenu = ({
  openTrigger = "click",
  open: controlledOpenProp,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: DropdownMenuProps) => {
  const isCustomTrigger = openTrigger !== "click";
  const isControlled = controlledOpenProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false
  );
  const open = controlledOpenProp ?? uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const contextValue = React.useMemo<DropdownMenuInteractionContextValue>(
    () => ({
      openTrigger,
      open,
      setOpen: handleOpenChange,
    }),
    [
      openTrigger,
      open,
      handleOpenChange,
    ]
  );

  const rootProps =
    {
      ...props,
    } as React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

  if (isCustomTrigger) {
    rootProps.open = open;
    rootProps.onOpenChange = handleOpenChange;
  } else {
    if (isControlled) {
      rootProps.open = controlledOpenProp;
    } else if (defaultOpen !== undefined) {
      rootProps.defaultOpen = defaultOpen;
    }
    if (onOpenChange) {
      rootProps.onOpenChange = onOpenChange;
    }
  }

  return (
    <DropdownMenuInteractionContext.Provider value={contextValue}>
      <DropdownMenuPrimitive.Root {...rootProps}>
        {children}
      </DropdownMenuPrimitive.Root>
    </DropdownMenuInteractionContext.Provider>
  );
};
DropdownMenu.displayName =
  DropdownMenuPrimitive.Root.displayName ?? "DropdownMenu";

const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(
  (
    {
      className,
      onClick,
      onDoubleClick,
      onContextMenu,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const context = useDropdownMenuInteractionContext();

    if (!context) {
      return (
        <DropdownMenuPrimitive.Trigger
          ref={ref}
          className={cn(className, BASE_CLASSNAMES.dropdownMenu.trigger)}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onContextMenu={onContextMenu}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
      );
    }

    const { openTrigger, open, setOpen } = context;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (openTrigger === "rightclick") {
        event.preventDefault();
      }
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (openTrigger !== "rightclick") {
        return;
      }
      event.preventDefault();
      if (!open) {
        setOpen(true);
      }
    };

    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        className={cn(className, BASE_CLASSNAMES.dropdownMenu.trigger)}
        onClick={composeEventHandlers(onClick, handleClick)}
        onContextMenu={composeEventHandlers(
          onContextMenu,
          handleContextMenu
        )}
        onDoubleClick={onDoubleClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    );
  }
);
DropdownMenuTrigger.displayName =
  DropdownMenuPrimitive.Trigger.displayName ?? "DropdownMenuTrigger";

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> &
  VariantProps<typeof dropdownMenuContentVariants>;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(
  (
    {
      className,
      sideOffset = 8,
      side = "bottom",
      align,
      avoidCollisions,
      ...props
    },
    ref
  ) => {
    const resolvedAlign =
      align ?? (side === "left" || side === "right" ? "start" : "center");
    const resolvedAvoidCollisions = avoidCollisions ?? false;

    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          side={side}
          align={resolvedAlign}
          avoidCollisions={resolvedAvoidCollisions}
          className={cn(
            dropdownMenuContentVariants({ side }),
            BASE_CLASSNAMES.dropdownMenu.content,
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  }
);
DropdownMenuContent.displayName =
  DropdownMenuPrimitive.Content.displayName ?? "DropdownMenuContent";

type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
> & {
  placement?: VariantProps<typeof dropdownMenuContentVariants>["side"];
};

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, sideOffset = 8, placement = "right", ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      dropdownMenuContentVariants({ side: placement }),
      BASE_CLASSNAMES.dropdownMenu.subContent,
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName ?? "DropdownMenuSubContent";

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> &
  VariantProps<typeof dropdownMenuItemVariants>;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      dropdownMenuItemVariants({ inset }),
      BASE_CLASSNAMES.dropdownMenu.item,
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName =
  DropdownMenuPrimitive.Item.displayName ?? "DropdownMenuItem";

type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
> &
  VariantProps<typeof dropdownMenuCheckboxItemVariants>;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      dropdownMenuCheckboxItemVariants({ inset }),
      BASE_CLASSNAMES.dropdownMenu.checkboxItem,
      className
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <FontAwesomeIcon
          icon={faCheck}
          className="h-3 w-3 text-govbr-blue-warm-vivid-80"
        />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName ?? "DropdownMenuCheckboxItem";

type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
> &
  VariantProps<typeof dropdownMenuRadioItemVariants>;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      dropdownMenuRadioItemVariants({ inset }),
      BASE_CLASSNAMES.dropdownMenu.radioItem,
      className
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <FontAwesomeIcon
          icon={faCheck}
          className="h-3 w-3 text-govbr-blue-warm-vivid-80"
        />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName =
  DropdownMenuPrimitive.RadioItem.displayName ?? "DropdownMenuRadioItem";

type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> &
  VariantProps<typeof dropdownMenuLabelVariants>;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      dropdownMenuLabelVariants({ inset }),
      BASE_CLASSNAMES.dropdownMenu.label,
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName =
  DropdownMenuPrimitive.Label.displayName ?? "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      dropdownMenuSeparatorVariants(),
      BASE_CLASSNAMES.dropdownMenu.separator,
      className
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName =
  DropdownMenuPrimitive.Separator.displayName ?? "DropdownMenuSeparator";

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-xs uppercase tracking-wide text-govbr-gray-60",
      BASE_CLASSNAMES.dropdownMenu.shortcut,
      className
    )}
    {...props}
  />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> &
  VariantProps<typeof dropdownMenuSubTriggerVariants>;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      dropdownMenuSubTriggerVariants({ inset }),
      BASE_CLASSNAMES.dropdownMenu.subTrigger,
      className
    )}
    {...props}
  >
    {children}
    <FontAwesomeIcon icon={faChevronRight} className="ml-auto h-3 w-3 opacity-60" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName ?? "DropdownMenuSubTrigger";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
