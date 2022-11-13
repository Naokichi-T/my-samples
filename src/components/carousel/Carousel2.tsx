// タッチイベントのみ 1つのカルーセルに複数のアイテムを表示

import { ReactNode, TouchEvent, useState } from "react";

type CarouselProps = {
  children: ReactNode;
  itemsCount: number;
  displayCount: number;
};

export const Carousel2 = (props: CarouselProps) => {
  const { children, itemsCount, displayCount } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoNext = currentIndex < itemsCount - displayCount;
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
    displayCount,
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
  displayCount: number;
  currentIndex: number;
  next: () => void;
  prev: () => void;
};

const CarouselItem = (props: CarouselItemProps) => {
  const { children, displayCount, currentIndex, next, prev } = props;
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
      <div className="flex transition-all duration-200 ease-linear hidden-scrollbar" style={{ transform: `translateX(-${currentIndex * (100 / displayCount)}%)` }}>
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
      &lt;
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
      &gt;
    </button>
  );
};
