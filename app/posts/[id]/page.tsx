import Link from "next/link";
import { getPostById } from "@/api/posts";

const PostsSlugPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const { title, subTitle, content } = await getPostById(id);

  return (
    <div>
      <p>{title}</p>
      <p>{content}</p>
      <p>{subTitle}</p>
      <Link href={`/write/${id}`}>Edit</Link>
    </div>
  );
};

export default PostsSlugPage;
