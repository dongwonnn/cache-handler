import Link from "next/link";
import { getPostById } from "@/api/posts";
import { formatDateToKorean } from "@/util/date";

const PostsSlugPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const { title, subTitle, updatedAt, content } = await getPostById(id);

  return (
    <article className="post max-w-3xl my-12">
      <section>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl lg:leading-normal">
          {title}
        </h1>
        <h2 className="pb-2 text-3xl font-semibold tracking-tight my-5">
          {subTitle}
        </h2>
        <div className="pb-5 flex justify-between">
          <div>
            <span className="font-bold mr-4">@User</span>
            <time className="dark:text-gray-300">
              업데이트 시간: {formatDateToKorean(updatedAt)}
            </time>
          </div>
          <Link href={`/write/${id}`}>수정</Link>
        </div>
      </section>

      <div className="content">{content}</div>
    </article>
  );
};

export default PostsSlugPage;
