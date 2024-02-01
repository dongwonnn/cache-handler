import Link from "next/link";
import { getAllPosts } from "@/api/posts";
import type { TypePost } from "@/api/posts";
import { formatDateToKorean } from "@/util/date";

const HomePage = async () => {
  const allPosts = await getAllPosts();

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mt-20">
        포스트
      </h1>
      <section className="flex flex-col">
        {allPosts.map((post: TypePost) => {
          const { id, title, subTitle, updatedAt } = post;

          return (
            <article className="pt-7 pb-3 border-b">
              <time className="text-gray-600 dark:text-gray-400 text-sm">
                {formatDateToKorean(updatedAt)}
              </time>
              <h2 className="pb-2 text-2xl font-semibold tracking-tight">
                <Link href={`/posts/${id}`}>{title}</Link>
              </h2>
              <h3 className="mb-5">
                <Link href={`/posts/${id}`}>{subTitle}</Link>
              </h3>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default HomePage;
