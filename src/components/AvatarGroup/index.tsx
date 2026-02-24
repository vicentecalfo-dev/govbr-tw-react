import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
} from "react";
import { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { Avatar } from "../Avatar";
import avatarVariants from "../Avatar/variants";

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;

interface AvatarGroupProps {
  children: ReactNode;
  spacing?: string;
  maxVisible?: number;
  renderOverflowAvatar?: (extraCount: number, size: AvatarSize) => ReactNode;
  className?: string;
  size?: AvatarSize;
}

const getAvatarSize = (
  providedSize: AvatarSize | undefined,
  avatars: ReactElement[]
): AvatarSize => {
  if (providedSize) {
    return providedSize;
  }
  const first = avatars.find((avatar) => avatar.props.size);
  if (first?.props.size) {
    return first.props.size as AvatarSize;
  }
  return "small";
};

const defaultOverflowAvatar = (extraCount: number, size: AvatarSize) => (
  <Avatar
    key="avatar-group-overflow"
    size={size}
    variant="initials"
    className={cn(
      "bg-govbr-gray-20 text-xs font-semibold uppercase text-govbr-gray-80 sm:text-sm",
      BASE_CLASSNAMES.avatarGroup.overflow
    )}
    title={`Mais ${extraCount}`}
  >
    +{extraCount}
  </Avatar>
);

const AvatarGroup = ({
  children,
  spacing,
  maxVisible,
  renderOverflowAvatar = defaultOverflowAvatar,
  className,
  size,
}: AvatarGroupProps) => {
  const avatarChildren = useMemo(
    () =>
      React.Children.toArray(children).filter((child): child is ReactElement =>
        isValidElement(child)
      ),
    [children]
  );

  if (avatarChildren.length === 0) {
    return null;
  }

  const effectiveSize = getAvatarSize(size, avatarChildren);

  const visibleCount =
    typeof maxVisible === "number" && maxVisible >= 0
      ? Math.min(maxVisible, avatarChildren.length)
      : avatarChildren.length;

  const extraCount = Math.max(avatarChildren.length - visibleCount, 0);
  const visibleAvatars = avatarChildren.slice(0, visibleCount);

  const overflowAvatar =
    extraCount > 0 ? renderOverflowAvatar(extraCount, effectiveSize) : null;

  const spacingClasses = spacing?.trim() || "space-x-2";
  const spacingTokens = spacingClasses.split(/\s+/).filter(Boolean);
  const hasNegativeSpace = (token: string) => {
    const parts = token.split(":");
    const base = parts[parts.length - 1];
    return base.startsWith("-space-x");
  };
  const isStacking = spacingTokens.some(hasNegativeSpace);

  const entries: ReactNode[] = overflowAvatar
    ? [...visibleAvatars, overflowAvatar]
    : visibleAvatars;

  const processed = entries.map((entry, index) => {
    if (!isValidElement<{ className?: string; style?: CSSProperties }>(entry)) {
      return entry;
    }

    const elementStyle: CSSProperties = {
      ...(entry.props.style ?? {}),
    };

    const extraClassNames = [BASE_CLASSNAMES.avatarGroup.item];

    if (isStacking) {
      if (!elementStyle.position) {
        elementStyle.position = "relative";
      }
      elementStyle.zIndex = index + 1;
      extraClassNames.push("ring-2 ring-white");
    }

    return cloneElement(entry, {
      key: entry.key ?? `avatar-${index}`,
      className: cn(entry.props.className, extraClassNames),
      style: elementStyle,
    });
  });

  return (
    <div
      className={cn(
        "flex items-center",
        spacingClasses,
        BASE_CLASSNAMES.avatarGroup.root,
        isStacking ? BASE_CLASSNAMES.avatarGroup.stacked : undefined,
        className
      )}
      role="group"
    >
      {processed}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
export type { AvatarGroupProps, AvatarSize };
