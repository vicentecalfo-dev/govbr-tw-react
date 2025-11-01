import { ComponentProps, FC } from "react";
import { Avatar } from "../Avatar";
import { cn } from "../../libs/utils";
import BASE_CLASSNAMES from "../../config/baseClassNames";

const CATEGORY_PRESETS = {
  EX: {
    label: "Extinct",
    className: "bg-govbr-pure-100 text-red-500",
  },
  EW: {
    label: "Extinct in the Wild",
    className: "bg-govbr-pure-100 text-govbr-pure-0",
  },
  CR: {
    label: "Critically Endangered",
    className: "bg-red-600 text-red-200",
  },
  EN: {
    label: "Endangered",
    className: "bg-orange-500 text-orange-200",
  },
  VU: {
    label: "Vulnerable",
    className: "bg-yellow-400 text-yellow-200",
  },
  NT: {
    label: "Near Threatened",
    className: "bg-emerald-700 text-emerald-200",
  },
  LC: {
    label: "Least Concern",
    className: "bg-emerald-700 text-govbr-pure-0",
  },
  DD: {
    label: "Data Deficient",
    className: "bg-neutral-400 text-neutral-600",
  },
  NE: {
    label: "Not Evaluated",
    className: "bg-neutral-200 text-neutral-400",
  },
} as const;

type IucnCategoryCode = keyof typeof CATEGORY_PRESETS;

const isIucnCategoryCode = (value: string): value is IucnCategoryCode =>
  Object.prototype.hasOwnProperty.call(CATEGORY_PRESETS, value);

type AvatarProps = ComponentProps<typeof Avatar>;

interface IucnCategoryProps extends AvatarProps {
  category: string;
  label?: string;
  labels?: Partial<Record<IucnCategoryCode, string>>;
  showLabel?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

const IucnCategory: FC<IucnCategoryProps> = ({
  category,
  label,
  labels,
  showLabel = false,
  className,
  children,
  title,
  labelClassName,
  wrapperClassName,
  ...avatarProps
}) => {
  const normalizedCategory = String(category).toUpperCase();
  const resolvedCategory = isIucnCategoryCode(normalizedCategory)
    ? normalizedCategory
    : "NE";

  const preset = CATEGORY_PRESETS[resolvedCategory];
  const resolvedLabel = label ?? labels?.[resolvedCategory] ?? preset.label;
  const finalTitle = title ?? resolvedLabel;
  const content = children ?? resolvedCategory;
  const { ["aria-label"]: ariaLabel, ...restAvatarProps } = avatarProps;
  const finalAriaLabel = ariaLabel ?? resolvedLabel;

  const avatarElement = (
    <Avatar
      {...restAvatarProps}
      className={cn(
        preset.className,
        BASE_CLASSNAMES.iucnCategory?.root,
        className,
      )}
      title={finalTitle}
      aria-label={finalAriaLabel}
    >
      {content}
    </Avatar>
  );

  if (!showLabel) {
    return avatarElement;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        BASE_CLASSNAMES.iucnCategory?.wrapper,
        wrapperClassName,
      )}
    >
      {avatarElement}
      <span
        className={cn(
          "text-xs text-govbr-gray-80",
          BASE_CLASSNAMES.iucnCategory?.label,
          labelClassName,
        )}
      >
        {resolvedLabel}
      </span>
    </span>
  );
};

export type { IucnCategoryCode, IucnCategoryProps };
export { IucnCategory };
export default IucnCategory;
