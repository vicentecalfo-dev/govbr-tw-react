import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { ComponentProps, FC } from "react";

interface CardProps extends ComponentProps<"div"> {
  disabled?: boolean;
}

interface CardHeaderProps extends ComponentProps<"header"> {}

interface CardMainProps extends ComponentProps<"main"> {}

interface CardFooterProps extends ComponentProps<"footer"> {}

interface CardComponent {
  Header: FC<CardHeaderProps>;
  Main: FC<CardMainProps>;
  Footer: FC<CardFooterProps>;
}

const Card = ({
  className,
  children,
  disabled = false,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col shadow relative",
        className,
        BASE_CLASSNAMES.card.root
      )}
      {...props}
    >
      {children}
      {disabled && (
        <div
          className={cn(
            "size-full absolute top-0 left-0 cursor-not-allowed bg-govbr-pure-0/60 z-10",
            BASE_CLASSNAMES.card.disabled
          )}
        ></div>
      )}
    </div>
  );
};

const CardHeader: FC<CardHeaderProps> = ({ className, children, ...props }:CardHeaderProps) :JSX.Element => {
  return (
    <header
      className={cn(
        "p-6 font-semibold text-lg",
        className,
        BASE_CLASSNAMES.card.header
      )}
      {...props}
    >
      {children}
    </header>
  );
};

const CardMain: FC<CardMainProps> = ({ className, children, ...props }:CardMainProps): JSX.Element => {
  return (
    <main
      className={cn("px-6", className, BASE_CLASSNAMES.card.main)}
      {...props}
    >
      {children}
    </main>
  );
};

const CardFooter: FC<CardFooterProps> = ({ className, children, ...props }:CardFooterProps):JSX.Element => {
  return (
    <footer
      className={cn("p-6", className, BASE_CLASSNAMES.card.footer)}
      {...props}
    >
      {children}
    </footer>
  );
};

Card.Header = CardHeader;
Card.Main = CardMain;
Card.Footer = CardFooter;

export default Card;
