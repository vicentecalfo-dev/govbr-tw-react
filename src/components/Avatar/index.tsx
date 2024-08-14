import { VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import avatarVariants from "./variants";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";


interface AvatarProps
  extends ComponentProps<"span">,
    VariantProps<typeof avatarVariants> {
  initialsSize?: number;
  title?: string;
  src?: string;
}

const Avatar: FC<AvatarProps> = ({
  className,
  children,
  variant = "initials",
  initialsSize = 1,
  size = "small",
  title = "",
  src = "",
  ...props
}) => {
  const initials = title
    .trim()
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, initialsSize);
  return (
    <span
      className={cn(
        avatarVariants({ variant, size }),
        className,
        BASE_CLASSNAMES.avatar.root
      )}
      {...props}
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      {src === "" ? (children === undefined ? initials : children) : ""}
    </span>
  );
};

export { Avatar };
