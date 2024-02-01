import http from "@/util/http";

export type TypePost = {
  id: number;
  slug: string;
  title: string;
  subTitle: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getAllPosts = async (): Promise<TypePost[]> => {
  return await http.get("/posts", { next: { tags: ["allPosts"] } });
};

export const getPostById = async (id: number): Promise<TypePost> => {
  const tag = `post-${id}`;
  return await http.get(`/posts/${id}`, { next: { tags: [tag] } });
};

export const updatePostById = async ({
  id,
  title,
  subTitle,
  content,
}: Partial<TypePost>): Promise<void> => {
  await http.patch(`/posts/${id}`, {
    title,
    subTitle,
    content,
    updatedAt: new Date(),
  });
};
