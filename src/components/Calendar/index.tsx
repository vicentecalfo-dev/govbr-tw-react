import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { Button } from "../Button";
import NativeSelect from "../NativeSelect";
import { calendarVariants, dayButtonVariants } from "./variants";

type DayMatrixCell = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
};

type CalendarBaseProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange" | "defaultValue"
>;

export interface CalendarProps
  extends CalendarBaseProps,
    VariantProps<typeof calendarVariants> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDate?: (date: Date) => boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: string;
  yearRange?: {
    start: number;
    end: number;
  };
  translations?: {
    weekdaysShort?: string[];
    months?: string[];
  };
}

const toStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toStartOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const monthToIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth();

const clampMonth = (target: Date, min?: Date, max?: Date) => {
  const monthStart = toStartOfMonth(target);
  if (min) {
    const minMonth = toStartOfMonth(min);
    if (monthToIndex(monthStart) < monthToIndex(minMonth)) {
      return minMonth;
    }
  }
  if (max) {
    const maxMonth = toStartOfMonth(max);
    if (monthToIndex(monthStart) > monthToIndex(maxMonth)) {
      return maxMonth;
    }
  }
  return monthStart;
};

const isSameDay = (a: Date | undefined, b: Date | undefined) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isBeforeDay = (a: Date | undefined, b: Date | undefined) => {
  if (!a || !b) return false;
  return a.getTime() < b.getTime();
};

const isAfterDay = (a: Date | undefined, b: Date | undefined) => {
  if (!a || !b) return false;
  return a.getTime() > b.getTime();
};

const clampToRange = (date: Date, min?: Date, max?: Date) => {
  if (min && isBeforeDay(date, min)) {
    return min;
  }
  if (max && isAfterDay(date, max)) {
    return max;
  }
  return date;
};

const getWeekdayLabels = (
  locale: string,
  weekStartsOn: number,
  override?: string[]
) => {
  if (override && override.length === 7) {
    return override
      .slice(weekStartsOn)
      .concat(override.slice(0, weekStartsOn));
  }
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const base = new Date(2021, 0, 3); // Sunday
  return Array.from({ length: 7 }).map((_, index) => {
    const day = (weekStartsOn + index) % 7;
    const target = new Date(base);
    target.setDate(base.getDate() + day);
    return formatter.format(target);
  });
};

const getMonthLabels = (locale: string, override?: string[]) => {
  if (override && override.length === 12) {
    return override;
  }
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
  return Array.from({ length: 12 }).map((_, index) => {
    const date = new Date(2021, index, 1);
    const label = formatter.format(date);
    return label.charAt(0).toUpperCase() + label.slice(1);
  });
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDate,
      variant = "light",
      density = "comfortable",
      weekStartsOn = 0,
      locale = "pt-BR",
      yearRange,
      translations,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const initialSelected = useMemo(
      () =>
        value ??
        defaultValue ??
        clampToRange(new Date(), minDate ? toStartOfDay(minDate) : undefined, maxDate ? toStartOfDay(maxDate) : undefined),
      [value, defaultValue, minDate, maxDate]
    );

    const [internalValue, setInternalValue] = useState<Date | undefined>(
      isControlled ? value : initialSelected
    );

    useEffect(() => {
      if (isControlled) {
        setInternalValue(value);
      }
    }, [isControlled, value]);

    const selectedDate = isControlled ? value : internalValue;

    const [visibleMonth, setVisibleMonth] = useState<Date>(() =>
      toStartOfMonth(selectedDate ?? new Date())
    );

    useEffect(() => {
      if (selectedDate) {
        setVisibleMonth((current) => {
          const target = toStartOfMonth(selectedDate);
          if (current.getFullYear() === target.getFullYear() && current.getMonth() === target.getMonth()) {
            return current;
          }
          return target;
        });
      }
    }, [selectedDate]);

    const handleSelect = useCallback(
      (date: Date) => {
        if (disabledDate?.(date)) return;
        if (minDate && isBeforeDay(date, toStartOfDay(minDate))) return;
        if (maxDate && isAfterDay(date, toStartOfDay(maxDate))) return;

        if (!isControlled) {
          setInternalValue(date);
        }
        onChange?.(date);
      },
      [disabledDate, isControlled, maxDate, minDate, onChange]
    );

    useEffect(() => {
      setVisibleMonth((current) => clampMonth(current, minDate, maxDate));
    }, [minDate, maxDate]);

    const canGoPrev = useMemo(() => {
      if (!minDate) return true;
      const target = addMonths(visibleMonth, -1);
      return monthToIndex(target) >= monthToIndex(minDate);
    }, [visibleMonth, minDate]);

    const canGoNext = useMemo(() => {
      if (!maxDate) return true;
      const target = addMonths(visibleMonth, 1);
      return monthToIndex(target) <= monthToIndex(maxDate);
    }, [visibleMonth, maxDate]);

    const goPrev = useCallback(() => {
      if (!canGoPrev) return;
      setVisibleMonth((current) => addMonths(current, -1));
    }, [canGoPrev]);

    const goNext = useCallback(() => {
      if (!canGoNext) return;
      setVisibleMonth((current) => addMonths(current, 1));
    }, [canGoNext]);

    const monthLabels = useMemo(
      () => getMonthLabels(locale, translations?.months),
      [locale, translations?.months]
    );

    const currentYear = visibleMonth.getFullYear();
    const years = useMemo(() => {
      const inferredStart = yearRange?.start ?? currentYear - 50;
      const inferredEnd = yearRange?.end ?? currentYear + 50;
      const start = minDate
        ? Math.max(inferredStart, minDate.getFullYear())
        : inferredStart;
      const end = maxDate
        ? Math.min(inferredEnd, maxDate.getFullYear())
        : inferredEnd;
      if (start > end) {
        return [currentYear];
      }
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }, [currentYear, yearRange, minDate, maxDate]);

    const weekdays = useMemo(
      () =>
        getWeekdayLabels(locale, weekStartsOn, translations?.weekdaysShort),
      [locale, weekStartsOn, translations?.weekdaysShort]
    );

    const dayMatrix = useMemo<DayMatrixCell[]>(() => {
      const startOfMonth = toStartOfMonth(visibleMonth);
      const startDay = startOfMonth.getDay();
      const diff = (startDay - weekStartsOn + 7) % 7;
      const gridStart = new Date(startOfMonth);
      gridStart.setDate(gridStart.getDate() - diff);

      return Array.from({ length: 42 }).map((_, index) => {
        const cellDate = new Date(gridStart);
        cellDate.setDate(gridStart.getDate() + index);
        const dayDate = toStartOfDay(cellDate);
        const isCurrentMonth = cellDate.getMonth() === visibleMonth.getMonth();
        const disabledByRange =
          (minDate && isBeforeDay(dayDate, toStartOfDay(minDate))) ||
          (maxDate && isAfterDay(dayDate, toStartOfDay(maxDate)));
        const isDisabled = disabledByRange || !!disabledDate?.(dayDate);
        const today = toStartOfDay(new Date());
        const isTodayCell = isSameDay(dayDate, today);
        const isSelected = selectedDate
          ? isSameDay(dayDate, toStartOfDay(selectedDate))
          : false;

        return {
          date: cellDate,
          isCurrentMonth,
          isToday: isTodayCell,
          isSelected,
          isDisabled,
        };
      });
    }, [
      disabledDate,
      maxDate,
      minDate,
      selectedDate,
      visibleMonth,
      weekStartsOn,
    ]);

    const navButtonVariant = variant === "dark" ? "ghost-dark" : "ghost";
    const buttonDensity = density === "compact" ? "high" : "default";
    const selectVariant = variant === "dark" ? "dark" : "default";

    const handleMonthChange = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        const nextMonth = parseInt(event.target.value, 10);
        setVisibleMonth((current) => {
          const updated = new Date(current);
          updated.setMonth(nextMonth);
          return updated;
        });
      },
      []
    );

    const handleYearChange = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        const nextYear = parseInt(event.target.value, 10);
        setVisibleMonth((current) => {
          const updated = new Date(current);
          updated.setFullYear(nextYear);
          return updated;
        });
      },
      []
    );

    return (
      <div
        ref={ref}
        className={cn(
          calendarVariants({ variant, density }),
          BASE_CLASSNAMES.calendar.root,
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-2",
            BASE_CLASSNAMES.calendar.header
          )}
        >
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              density={buttonDensity}
              variant={navButtonVariant}
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Mes anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button
              size="icon"
              density={buttonDensity}
              variant={navButtonVariant}
              onClick={goNext}
              disabled={!canGoNext}
              aria-label="Proximo mes"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <NativeSelect
              className="min-w-[8rem]"
              variant={selectVariant}
              selected={String(visibleMonth.getMonth())}
              onChange={handleMonthChange}
              firstOption="Mes"
              options={monthLabels.map((label, index) => ({
                label,
                value: String(index),
              }))}
            />
            <NativeSelect
              className="min-w-[6rem]"
              variant={selectVariant}
              selected={String(visibleMonth.getFullYear())}
              onChange={handleYearChange}
              firstOption="Ano"
              options={years.map((yearValue) => ({
                label: String(yearValue),
                value: String(yearValue),
              }))}
            />
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-wide",
            density === "compact" ? "gap-1" : "gap-2"
          )}
        >
          {weekdays.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>

        <div
          className={cn(
            "grid grid-cols-7",
            density === "compact" ? "gap-1" : "gap-2",
            BASE_CLASSNAMES.calendar.grid
          )}
        >
          {dayMatrix.map(
            ({ date, isCurrentMonth, isDisabled, isSelected, isToday }) => (
              <button
                key={date.toISOString()}
                type="button"
                className={cn(
                  dayButtonVariants({
                    variant,
                    density,
                    isSelected,
                    isToday,
                    isOutside: !isCurrentMonth,
                  }),
                  BASE_CLASSNAMES.calendar.day
                )}
                onClick={() => {
                  handleSelect(toStartOfDay(date));
                  if (!isCurrentMonth) {
                    setVisibleMonth(toStartOfMonth(date));
                  }
                }}
                disabled={isDisabled}
              >
                {date.getDate()}
              </button>
            )
          )}
        </div>

        {selectedDate && (
          <div className="text-sm opacity-70">
            {new Intl.DateTimeFormat(locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(selectedDate)}
          </div>
        )}
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export default Calendar;
