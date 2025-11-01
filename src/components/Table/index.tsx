import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useMemo,
  Ref,
} from "react";
import { VariantProps } from "class-variance-authority";
import {
  tableCellVariants,
  tableHeaderCellVariants,
  tableRowVariants,
  tableVariants,
} from "./variants";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";

type Alignment = "left" | "center" | "right";

interface TableCellContext<T extends Record<string, unknown>> {
  value: unknown;
  row: T;
  rowIndex: number;
  columnIndex: number;
  column: TableColumn<T>;
}

interface TableColumn<T extends Record<string, unknown>> {
  key: string;
  header: ReactNode;
  accessor?:
    | keyof T
    | ((row: T, context: { rowIndex: number; columnIndex: number }) => unknown);
  cell?: (context: TableCellContext<T>) => ReactNode;
  align?: Alignment;
  headerAlign?: Alignment;
  headerClassName?: string;
  cellClassName?: string;
}

interface TableProps<T extends Record<string, unknown>>
  extends Omit<ComponentPropsWithoutRef<"table">, "children">,
    VariantProps<typeof tableVariants>,
    Omit<VariantProps<typeof tableCellVariants>, "align"> {
  data: T[];
  columns: TableColumn<T>[];
  striped?: boolean;
  zebra?: boolean;
  emptyMessage?: ReactNode;
  rowKey?: (row: T, context: { rowIndex: number }) => string | number;
  className?: string;
  sum?: (keyof T & string)[];
  sumLabel?: ReactNode;
  sumFormatter?: (value: number, key: string) => ReactNode;
}

const TableComponent = <T extends Record<string, unknown>>(
  {
    className,
    data,
    columns,
    variant = "default",
    bordered = false,
    rounded = true,
    density = "default",
    striped = false,
    zebra,
    lined = true,
    emptyMessage,
    rowKey,
    sum,
    sumLabel = "Total",
    sumFormatter,
    ...props
  }: TableProps<T>,
  ref: Ref<HTMLTableElement>,
) => {
  const columnCount = columns.length;
  const isStriped = zebra ?? striped;

  const resolvedEmptyMessage = useMemo(() => {
    if (emptyMessage !== undefined) {
      return emptyMessage;
    }
    return "Nenhum dado disponível";
  }, [emptyMessage]);

  const sumValues = useMemo(() => {
    if (!sum?.length || data.length === 0) {
      return null;
    }

    return sum.reduce<Record<string, number>>((acc, key) => {
      const stringKey = String(key);
      const total = data.reduce((currentTotal, row) => {
        const rawValue = (row as Record<string, unknown>)[stringKey];
        let numericValue: number | null = null;

        if (typeof rawValue === "number") {
          numericValue = rawValue;
        } else if (typeof rawValue === "string") {
          const parsed = Number(rawValue);
          numericValue = Number.isFinite(parsed) ? parsed : null;
        }

        if (numericValue === null) {
          return currentTotal;
        }

        return currentTotal + numericValue;
      }, 0);

      acc[stringKey] = total;
      return acc;
    }, {});
  }, [data, sum]);

  const hasSumRow = sumValues !== null;

  return (
    <table
      className={cn(
        tableVariants({ variant, bordered, rounded }),
        className,
        BASE_CLASSNAMES.table.root,
      )}
      ref={ref}
      {...props}
    >
      <thead className={BASE_CLASSNAMES.table.head}>
        <tr className={BASE_CLASSNAMES.table.headerRow}>
          {columns.map(
            (
              {
                key,
                header,
                align,
                headerAlign,
                headerClassName,
              }: TableColumn<T>,
              columnIndex,
            ) => (
              <th
                key={key}
                scope="col"
                className={cn(
                  tableHeaderCellVariants({
                    variant,
                    align: headerAlign ?? align ?? "left",
                    lined,
                  }),
                  headerClassName,
                  rounded
                    ? cn(
                        columnIndex === 0 ? "rounded-tl-lg" : undefined,
                        columnIndex === columnCount - 1
                          ? "rounded-tr-lg"
                          : undefined,
                      )
                    : undefined,
                  BASE_CLASSNAMES.table.headerCell,
                )}
              >
                {header}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody className={BASE_CLASSNAMES.table.body}>
        {data.length === 0 ? (
          <tr className={BASE_CLASSNAMES.table.row}>
            <td
              colSpan={columnCount || 1}
              className={cn(
                tableCellVariants({
                  variant,
                  density,
                  align: "center",
                  lined,
                }),
                rounded ? "rounded-b-lg" : undefined,
                BASE_CLASSNAMES.table.cell,
              )}
            >
              {resolvedEmptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => {
            const computedKey = String(
              rowKey?.(row, { rowIndex }) ?? `${rowIndex}`,
            );
            return (
              <tr
                key={computedKey}
                className={cn(
                  tableRowVariants({ variant, striped: isStriped }),
                  BASE_CLASSNAMES.table.row,
                )}
              >
                {columns.map((column, columnIndex) => {
                  const {
                    key,
                    cell,
                    accessor,
                    align,
                    cellClassName,
                  } = column;

                  const value =
                    typeof accessor === "function"
                      ? accessor(row, { rowIndex, columnIndex })
                      : accessor
                        ? (row as Record<string, unknown>)[
                            accessor as keyof T
                          ]
                        : (row as Record<string, unknown>)[key];

                  const cellContent =
                    cell?.({
                      value,
                      row,
                      rowIndex,
                      columnIndex,
                      column,
                    }) ?? value;

                  return (
                    <td
                      key={key}
                      className={cn(
                        tableCellVariants({
                          variant,
                          density,
                          align: align ?? "left",
                          lined,
                        }),
                        cellClassName,
                        rounded
                          ? cn(
                              !hasSumRow &&
                                rowIndex === data.length - 1 &&
                                columnIndex === 0
                                ? "rounded-bl-lg"
                                : undefined,
                              !hasSumRow &&
                                rowIndex === data.length - 1 &&
                                columnIndex === columnCount - 1
                                ? "rounded-br-lg"
                                : undefined,
                            )
                          : undefined,
                        BASE_CLASSNAMES.table.cell,
                      )}
                    >
                      {cellContent as ReactNode}
                    </td>
                  );
                })}
              </tr>
            );
          })
        )}
        {hasSumRow ? (
          <tr
            className={cn(
              tableRowVariants({ variant, striped: false }),
              "font-semibold",
              BASE_CLASSNAMES.table.row,
            )}
          >
            {columns.map(({ key, accessor, align, cellClassName }, columnIndex) => {
              const resolvedKey =
                typeof accessor === "string" ? accessor : key;
              const sumValue = sumValues?.[resolvedKey];
              const cellContent =
                sumValue !== undefined
                  ? (sumFormatter?.(sumValue, resolvedKey) ?? sumValue)
                  : columnIndex === 0
                    ? sumLabel
                    : undefined;

              return (
                <td
                  key={key}
                  className={cn(
                    tableCellVariants({
                      variant,
                      density,
                      align: align ?? "left",
                      lined,
                    }),
                    cellClassName,
                    rounded
                      ? cn(
                          columnIndex === 0 ? "rounded-bl-lg" : undefined,
                          columnIndex === columnCount - 1
                            ? "rounded-br-lg"
                            : undefined,
                        )
                      : undefined,
                    BASE_CLASSNAMES.table.cell,
                  )}
                >
                  {cellContent as ReactNode}
                </td>
              );
            })}
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

const Table = forwardRef(TableComponent) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReturnType<typeof TableComponent>;

export type { TableColumn, TableProps };
export default Table;
