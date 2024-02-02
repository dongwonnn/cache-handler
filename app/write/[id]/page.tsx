import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPostById, updatePostById } from "@/api/posts";
const PostWritePage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const { title, subTitle, content } = await getPostById(id);

  const updatePost = async (formData: any) => {
    "use server";

    const { title, subTitle, content } = Object.fromEntries(formData);

    await updatePostById({
      id,
      title,
      subTitle,
      content,
    });

    const tag = `post-${id}`;
    revalidatePath("/posts/1");

    // revalidateTag(tag);
    // revalidateTag("allPosts");
    redirect(`/posts/${id}`);
  };

  return (
    <form className="flex flex-col gap-2" action={updatePost}>
      <textarea
        className="text-4xl flex rounded-md border border-input px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',"
        name="title"
        defaultValue={title}
      />
      <input
        className="text-2xl  flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        name="subTitle"
        defaultValue={subTitle}
      />
      <textarea
        className="h-72 text-4lg flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        name="content"
        defaultValue={content}
      />
      <button
        className="border p-2 flex items-center justify-center rounded-md text-sm font-medium"
        type="submit"
      >
        update content
      </button>
    </form>
  );
};

export default PostWritePage;
