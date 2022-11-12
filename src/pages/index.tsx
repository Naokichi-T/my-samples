import { Carousel1 } from "components/carousel/Carousel1";
import Head from "next/head";
import Image from "next/image";

// https://nextjs.org/docs/api-reference/next/image#loader
// https://zenn.dev/catnose99/articles/883f7dbbe21632a5254e
const loader = () => {
  const url = new URL("https://via.placeholder.com/1600x300");
  return url.href;
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Samples</title>
        <meta name="description" content="Next.js sample components" />
      </Head>

      <main className="max-w-[1200px] ml-auto mr-auto mt-16">
        <Carousel1>
          <Image loader={loader} priority={true} src="placeholder.png" alt="placeholder" width={1600} height={300} className="w-full flex-shrink-0 flex-grow" />
          <Image loader={loader} priority={true} src="placeholder.png" alt="placeholder" width={1600} height={300} className="w-full flex-shrink-0 flex-grow" />
          <Image loader={loader} priority={true} src="placeholder.png" alt="placeholder" width={1600} height={300} className="w-full flex-shrink-0 flex-grow" />
        </Carousel1>
      </main>
    </div>
  );
}
