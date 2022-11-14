// https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0

// タッチイベント, マウスイベントなし, ループあり, 1つのカルーセルに1つのアイテムを表示, react-swipeable

import React, { Children, cloneElement, ReactNode, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { clsx } from "clsx";

type CarouselItemProps = {
  children: ReactNode;
};

export const CarouselItem = (props: CarouselItemProps) => {
  const { children } = props;

  return <div className="w-full h-48 inline-flex justify-center items-center bg-green-700 text-white">{children}</div>;
};

type CarouselProps = {
  children: ReactNode;
};

export const Carousel3 = (props: CarouselProps) => {
  const { children } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = Children.count(children) - 1;
    } else if (newIndex >= Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div {...handlers} className="overflow-hidden">
      <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {Children.map(children, (child: any) => {
          return cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="flex justify-center">
        <button
          className="carousel3Btn"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (_child, index) => {
          return (
            <button
              className={clsx("carousel3Btn", { "bg-green-700 text-white": index === activeIndex })}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          className="carousel3Btn"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
