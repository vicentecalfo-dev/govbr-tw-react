import {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { VariantProps } from "class-variance-authority";

import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import { Button } from "../Button";
import { carouselSliderVariants, navigationButtonVariants } from "./variants";

type CarouselSliderBaseProps = ComponentPropsWithoutRef<"div">;

export interface CarouselSliderProps
  extends CarouselSliderBaseProps,
    VariantProps<typeof carouselSliderVariants> {
  itemsPerView?: number;
  loop?: boolean;
  showIndicators?: boolean;
  floatingControls?: boolean;
  border?: boolean;
}

const chunkChildren = (children: ReactNode[], size: number) => {
  const chunkSize = Math.max(1, Math.floor(size));
  if (chunkSize === 1) {
    return children.map((child) => [child]);
  }
  const chunks: ReactNode[][] = [];
  for (let index = 0; index < children.length; index += chunkSize) {
    chunks.push(children.slice(index, index + chunkSize));
  }
  return chunks;
};

export const CarouselSlider = ({
  className,
  children,
  itemsPerView = 1,
  loop = false,
  showIndicators = true,
  floatingControls = true,
  variant = "light",
  density = "comfortable",
  border = true,
  ...props
}: CarouselSliderProps) => {
  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const safeItemsPerView = useMemo(() => {
    const totalItems = Math.max(childrenArray.length, 1);
    const desired = Math.floor(itemsPerView ?? 1);
    if (!Number.isFinite(desired) || desired <= 0) return 1;
    return Math.min(desired, totalItems);
  }, [childrenArray.length, itemsPerView]);

  const slides = useMemo(
    () => chunkChildren(childrenArray, safeItemsPerView),
    [childrenArray, safeItemsPerView]
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = slides.length || 1;
  const canGoPrev = loop || currentSlide > 0;
  const canGoNext = loop || currentSlide < totalSlides - 1;

  useEffect(() => {
    setCurrentSlide((previous) => Math.min(previous, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = () => {
    if (!totalSlides) return;
    if (currentSlide === 0) {
      if (loop) {
        setCurrentSlide(totalSlides - 1);
      }
      return;
    }
    setCurrentSlide((value) => Math.max(0, value - 1));
  };

  const goNext = () => {
    if (!totalSlides) return;
    if (currentSlide === totalSlides - 1) {
      if (loop) {
        setCurrentSlide(0);
      }
      return;
    }
    setCurrentSlide((value) => Math.min(totalSlides - 1, value + 1));
  };

  return (
    <div
      className={cn(
        carouselSliderVariants({ variant, density }),
        BASE_CLASSNAMES.carouselSlider.root,
        border ? "" : "!border-none !rounded-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-normal uppercase tracking-wide ml-3">
          {currentSlide + 1} / {totalSlides}
        </span>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            density={density === "compact" ? "high" : "default"}
            variant={variant === "dark" ? "ghost-dark" : "ghost"}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Slide anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button
            size="icon"
            density={density === "compact" ? "high" : "default"}
            variant={variant === "dark" ? "ghost-dark" : "ghost"}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Proximo slide"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "group/viewport overflow-hidden rounded-xl",
            BASE_CLASSNAMES.carouselSlider.viewport
          )}
        >
          <div
            className={cn(
              "flex w-full transition-transform duration-500 ease-in-out"
            )}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            role="list"
            aria-live="polite"
          >
            {slides.map((group, slideIndex) => (
              <div
                key={`carousel-slider-${slideIndex}`}
                className={cn(
                  "w-full flex-shrink-0 px-1",
                  BASE_CLASSNAMES.carouselSlider.slide
                )}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${slideIndex + 1} de ${totalSlides}`}
              >
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(
                      safeItemsPerView,
                      group.length
                    )}, minmax(0, 1fr))`,
                  }}
                >
                  {group.map((item, itemIndex) => {
                    return (
                      <div
                        key={`carousel-slider-item-${slideIndex}-${itemIndex}`}
                        className={cn(
                          "h-full transition",
                        )}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          size="icon"
          density={density === "compact" ? "high" : "default"}
          variant={variant === "dark" ? "ghost-dark" : "ghost"}
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Slide anterior"
          className={cn(
            "-left-3 hidden opacity-0 transition group-hover/viewport:flex group-hover/viewport:opacity-100",
            navigationButtonVariants({ floating: floatingControls })
          )}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          size="icon"
          density={density === "compact" ? "high" : "default"}
          variant={variant === "dark" ? "ghost-dark" : "ghost"}
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Proximo slide"
          className={cn(
            "-right-3 hidden opacity-0 transition group-hover/viewport:flex group-hover/viewport:opacity-100",
            navigationButtonVariants({ floating: floatingControls })
          )}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>

      {showIndicators && totalSlides > 1 && (
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            BASE_CLASSNAMES.carouselSlider.dots
          )}
        >
          {slides.map((_, slideIndex) => (
            <button
              key={`indicator-${slideIndex}`}
              type="button"
              className={cn(
                "h-2 w-2 rounded-full transition",
                slideIndex === currentSlide
                  ? variant === "dark"
                    ? "bg-govbr-pure-0"
                    : "bg-govbr-blue-warm-vivid-70"
                  : variant === "dark"
                  ? "bg-govbr-blue-warm-20/40"
                  : "bg-govbr-blue-warm-vivid-70/40"
              )}
              onClick={() => setCurrentSlide(slideIndex)}
              aria-label={`Ir para o slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselSlider;
