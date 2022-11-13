// https://dev.to/rakumairu/simple-react-carousel-24m0
// https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0
// https://reactjsexample.com/tag/carousel/
// https://codedamn.com/news/reactjs/top-react-js-carousel-components

// タッチイベントのみ, ループなし, 1つのカルーセルに1つのアイテムを表示

import { ReactNode, TouchEvent, useState } from "react";

type CarouselProps = {
  children: ReactNode;
  itemsCount: number;
};

export const Carousel1 = (props: CarouselProps) => {
  const { children, itemsCount } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoNext = currentIndex < itemsCount - 1;
  const canGoPrev = currentIndex > 0;

  const next = () => {
    if (canGoNext) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (canGoPrev) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const carouselItemProps = {
    currentIndex,
    next,
    prev,
  };

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full flex">
        {canGoPrev && <LeftArrowBtn prev={prev} />}
        <CarouselItem {...carouselItemProps}>{children}</CarouselItem>
        {canGoNext && <RightArrowBtn next={next} />}
      </div>
    </div>
  );
};

type CarouselItemProps = {
  children: ReactNode;
  currentIndex: number;
  next: () => void;
  prev: () => void;
};

const CarouselItem = (props: CarouselItemProps) => {
  const { children, currentIndex, next, prev } = props;
  const [touchPosition, setTouchPosition] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touchDown = touchPosition;
    if (touchDown === 0) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) next();
    if (diff < -5) prev();

    setTouchPosition(0);
  };

  return (
    <div onTouchStart={(e) => handleTouchStart(e)} onTouchMove={(e) => handleTouchMove(e)} className="w-full h-full overflow-hidden">
      <div className="flex transition-all duration-200 ease-linear hidden-scrollbar" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children}
      </div>
    </div>
  );
};

type LeftArrowBtnProps = {
  prev: () => void;
};

const LeftArrowBtn = (props: LeftArrowBtnProps) => {
  const { prev } = props;
  return (
    <button onClick={prev} className="arrowBtn left-6">
      {"<"}
    </button>
  );
};

type RightArrowBtnProps = {
  next: () => void;
};

const RightArrowBtn = (props: RightArrowBtnProps) => {
  const { next } = props;
  return (
    <button onClick={next} className="arrowBtn right-6">
      {">"}
    </button>
  );
};
