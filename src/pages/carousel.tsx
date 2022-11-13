import Image from "next/image";
import { Carousel1 } from "components/carousel/Carousel1";
import { Carousel2 } from "components/carousel/Carousel2";

// https://nextjs.org/docs/api-reference/next/image#loader
// https://zenn.dev/catnose99/articles/883f7dbbe21632a5254e
const loader1 = () => {
  const url = new URL("https://via.placeholder.com/1600x300");
  return url.href;
};

const loader2 = () => {
  const url = new URL("https://via.placeholder.com/300");
  return url.href;
};

const items = [1, 2, 3, 4, 5, 6, 7, 8];

const displayCount = 3; // Carousel2で1つのカルーセルに表示するアイテムの数

export default function Carousel() {
  const carousel1Props = {
    itemsCount: items.length,
  };

  const carousel2Props = {
    itemsCount: items.length,
    displayCount: displayCount,
    infiniteLoop: true,
  };

  return (
    <main>
      <h1>Carousel</h1>

      <h2>タッチイベントのみ, ループなし, 1つのカルーセルに1つのアイテムを表示</h2>
      <div className="max-w-[1200px] mt-2 ml-auto mr-auto">
        <Carousel1 {...carousel1Props}>
          {items.map((item) => (
            <Image key={item} loader={loader1} priority={true} src="placeholder.png" alt="placeholder" width={1600} height={300} className="w-full flex-shrink-0 flex-grow" />
          ))}
        </Carousel1>
      </div>

      <h2>タッチイベントのみ, ループなし, 1つのカルーセルに複数のアイテムを表示</h2>
      <div className="max-w-[1200px] mt-2 ml-auto mr-auto">
        <Carousel2 {...carousel2Props}>
          {items.map((item) => (
            <div className="p-2" style={{ minWidth: `${100 / displayCount}%` }} key={item}>
              <Image loader={loader2} priority={true} src="placeholder.png" alt="placeholder" width={300} height={300} className="w-full" />
            </div>
          ))}
        </Carousel2>
      </div>
    </main>
  );
}
