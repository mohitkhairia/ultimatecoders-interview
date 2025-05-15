import Image from "next/image";
import MovieList from "./components/MovieList";
import Head from "next/head";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Ultimate Coders Interview</title>
        <meta name="Movie list" content="Movie List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <MovieList  />
      </main>
    </div>
  );
}
