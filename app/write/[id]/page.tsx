import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getPostById, updatePostById } from "@/api/posts";

const PostWritePage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const { slug, title, subTitle, content } = await getPostById(id);

  const updateContent = async (formData: any) => {
    "use server";

    const { title, subTitle, content } = Object.fromEntries(formData);

    await updatePostById({ id, title, subTitle, content });
    revalidateTag(slug);
    revalidateTag("allPosts");
    redirect(`/post/${id}`); // Navigate to the new post page
  };

  return (
    <form action={updateContent}>
      <input name="title" defaultValue={title} />
      <input name="subTitle" defaultValue={subTitle} />
      <input name="content" defaultValue={content} />
      <button type="submit">update content</button>
    </form>
  );
};

export default PostWritePage;
