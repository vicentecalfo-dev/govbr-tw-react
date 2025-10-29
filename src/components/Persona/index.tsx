import React, { ReactNode, forwardRef } from "react";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";

interface PersonaProps extends React.HTMLAttributes<HTMLDivElement> {}

const PersonaRoot = forwardRef<HTMLDivElement, PersonaProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3",
        BASE_CLASSNAMES.persona.root,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

PersonaRoot.displayName = "Persona";

interface PersonaAvatarProps {
  children: ReactNode;
  className?: string;
}

const PersonaAvatar = ({ children, className }: PersonaAvatarProps) => (
  <div
    className={cn("flex-shrink-0", BASE_CLASSNAMES.persona.avatar, className)}
  >
    {children}
  </div>
);

PersonaAvatar.displayName = "PersonaAvatar";

interface PersonaInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryText: string;
  secondaryText?: string;
}

const PersonaInfo = ({
  className,
  primaryText,
  secondaryText,
  children,
  ...props
}: PersonaInfoProps) => (
  <div
    className={cn(
      "min-w-0 flex-1",
      BASE_CLASSNAMES.persona.info,
      className
    )}
    {...props}
  >
    <p className="truncate text-sm font-semibold text-govbr-gray-90">
      {primaryText}
    </p>
    {secondaryText ? (
      <p className="truncate text-xs text-govbr-gray-60">{secondaryText}</p>
    ) : null}
    {children}
  </div>
);

PersonaInfo.displayName = "PersonaInfo";

interface PersonaActionProps {
  children: ReactNode;
  className?: string;
}

const PersonaAction = ({ children, className }: PersonaActionProps) => (
  <div
    className={cn(
      "flex h-full items-center justify-end gap-2",
      BASE_CLASSNAMES.persona.action,
      className
    )}
  >
    {children}
  </div>
);

PersonaAction.displayName = "PersonaAction";

const Persona = Object.assign(PersonaRoot, {
  Avatar: PersonaAvatar,
  Info: PersonaInfo,
  Action: PersonaAction,
});

export { Persona };
export type { PersonaProps, PersonaAvatarProps, PersonaInfoProps, PersonaActionProps };
