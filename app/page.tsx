import Link from "next/link";
import { getAllPosts } from "@/api/posts";
import type { TypePost } from "@/api/posts";

const HomePage = async () => {
  const allPosts = await getAllPosts();

  return (
    <ul>
      {allPosts.map(({ id, title }: TypePost) => (
        <li key={id}>
          <Link href={`/posts/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
