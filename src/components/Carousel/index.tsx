import { VariantProps } from "class-variance-authority";
import carouselButtonsVariants from "./variants";
import carouselIndicatorActive from "./variants-indicator-active";
import carouselIndicatorDefault from "./variants-indicator-default";
import { ComponentProps, FC, useState } from "react";
import React from "react";
import { cn } from "@/src/libs/utils";
import BASE_CLASSNAMES from "@/src/config/baseClassNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface CarouselProps
  extends ComponentProps<"div">,
    VariantProps<typeof carouselButtonsVariants> {
  height?: string;
  width?: string;
}

const Carousel: FC<CarouselProps> = ({
  children,
  className,
  height = "h-full",
  width = "w-full",
  variant = "light",
}) => {
  const childrenArray = React.Children.toArray(children);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === childrenArray.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? childrenArray.length - 1 : slide - 1);
  };

  return (
    <div
      className={cn(
        BASE_CLASSNAMES.carousel.root,
        "grid grid-rows-[1fr] p-3",
        className
      )}
    >
      <div
        className={cn(
          BASE_CLASSNAMES.carousel.holder,
          "relative overflow-hidden",
          height,
          width
        )}
      >
        <div
          className={cn(
            "flex transition-transform duration-500 ease-in-out",
            height,
            width
          )}
          style={{
            transform: `translateX(-${slide * 100}%)`,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={`carousel-${index}`}
              className={cn(
                BASE_CLASSNAMES.carousel.holder,
                "flex-shrink-0 justify-center items-center flex",
                height,
                width
              )}
            >
              {child}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className={cn(carouselButtonsVariants({ variant }), "left-0")}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextSlide}
          className={cn(carouselButtonsVariants({ variant }), "right-0")}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="flex gap-2 justify-center p-3 absolute bottom-0 w-full bg-gov">
          {childrenArray.map((_, idx) => (
            <button
              key={idx}
              className={`${
                slide === idx
                  ? carouselIndicatorActive({ variant })
                  : carouselIndicatorDefault({ variant })
              }`}
              onClick={() => setSlide(idx)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Carousel };
