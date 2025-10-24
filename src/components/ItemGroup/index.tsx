import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Item, { type ItemProps } from "../Item";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const groupVariants = cva(
  // overflow-hidden evita bleed do hover interno
  "w-full overflow-hidden rounded-2xl border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-govbr-pure-0 border-govbr-gray-10 text-govbr-gray-80",
        subtle: "bg-govbr-gray-2 border-govbr-gray-2 text-govbr-gray-80",
        dark: "bg-govbr-blue-warm-vivid-90 border-govbr-blue-warm-20 text-govbr-pure-0",
      },
      density: {
        comfortable: "",
        compact: "",
      },
      bordered: {
        true: "",
        false: "border-transparent",
      },
      divided: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "comfortable",
      bordered: true,
      divided: true,
    },
  }
);

const dividerByVariant: Record<
  NonNullable<VariantProps<typeof groupVariants>["variant"]>,
  string
> = {
  default: "border-govbr-gray-10",
  subtle: "border-govbr-gray-10",
  dark: "border-govbr-blue-warm-20",
};

export type ItemGroupProps = {
  children: ReactNode;
  propagateVariant?: boolean;
  stripChildBorders?: boolean;
  className?: string;
} & VariantProps<typeof groupVariants>;

export default function ItemGroup({
  children,
  className,
  variant,
  density,
  bordered,
  divided = true,
  propagateVariant = true,
  stripChildBorders = true,
}: ItemGroupProps) {
  const items = Children.toArray(children).filter(Boolean);
  const count = items.length;

  return (
    <div className={cn(groupVariants({ variant, density, bordered, divided }), className)}>
      {items.map((child, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === count - 1;
        const isSingle = count === 1;

        // Arredondamento por posição
        const rounding =
          isSingle
            ? "rounded-2xl"
            : isFirst
              ? "rounded-t-2xl rounded-b-none"
              : isLast
                ? "rounded-b-2xl rounded-t-none"
                : "rounded-none";

        // Divisor (apenas entre itens)
        const dividerCls = divided && !isLast ? `border-b ${dividerByVariant[variant ?? "default"]}` : "";

        if (isValidElement(child)) {
          const el = child as ReactElement<ItemProps>;

          // monta overrides do Item
          const nextProps: Partial<ItemProps> = {
            className: cn(el.props?.className, rounding),
          };
          if (stripChildBorders) nextProps.bordered = false;
          if (propagateVariant) {
            if (variant) nextProps.variant = variant as ItemProps["variant"];
            if (density) nextProps.density = density as ItemProps["density"];
          }

          return (
            <div key={idx} className={dividerCls}>
              {cloneElement(el, nextProps)}
            </div>
          );
        }

        // Child não-Item
        return (
          <div key={idx} className={cn(rounding, dividerCls)}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
