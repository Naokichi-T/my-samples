import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Samples</title>
        <meta name="description" content="Next.js sample components" />
      </Head>

      <main className="p-8">
        <ul className="list-disc">
          <li>
            <Link href="/carousel">Carousel</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
