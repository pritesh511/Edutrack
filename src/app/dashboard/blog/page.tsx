"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BlogType } from "@/utils/types";
import FormDialog from "@/components/common/form/FormDialog";
import { useFormOperations } from "@/helpers/hooks/useFormOperations";
import PageLayout from "@/components/common/PageLayout";
import { useDeleteEntity } from "@/helpers/hooks/useDeleteEntity";
import {
  useDeleteBlogMutation,
  useEditBlogMutation,
  useGetBlogsQuery,
  usePostBlogMutation,
} from "@/redux/query/blog";
import { blogFormConfig, blogIntialValues } from "@/utils/mocks/blog.mock";

export default function Blog() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditBlog, setIsEditBlog] = useState<BlogType | null>(null);
  const [deleteBlog] = useDeleteBlogMutation();
  const [postBlog] = usePostBlogMutation();
  const [editBlog] = useEditBlogMutation();
  const { data, isLoading } = useGetBlogsQuery("");

  const { formValues, handleSubmit, isSubmitting } = useFormOperations({
    postMutation: (values) => postBlog(values).unwrap(),
    editMutation: (id, values) => editBlog({ id, form: values }).unwrap(),
    entityName: "Blog",
    initialValues: blogIntialValues,
    onSuccessCall: () => {
      setOpenModal(false);
    },
    editData: isEditBlog
      ? { id: isEditBlog._id, values: isEditBlog }
      : undefined,
  });

  const { handleDelete } = useDeleteEntity({
    entityName: "Blog",
    successMessage: "Blog deleted successfully!",
    errorMessage: "Could not delete blog",
  });

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setIsEditBlog(null);
  }, []);

  return (
    <>
      <PageLayout
        headerButtonText="Add Blog"
        headerTitle="Blogs"
        onButtonClick={() => setOpenModal(true)}
        isDataLoading={isLoading}
        isNoData={data?.data.length == 0}
      >
        {data?.data.map((blog) => (
          <div
            key={blog._id}
            className="p-4 border rounded-lg shadow-sm transition duration-300 flex flex-row items-center justify-between"
          >
            <div className="mr-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm">{blog.description}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                onClick={() => {
                  setIsEditBlog(blog);
                  setOpenModal(true);
                }}
                size={"icon"}
              >
                <FaEdit />
              </Button>
              <Button
                size={"icon"}
                variant="destructive"
                onClick={() => handleDelete(blog._id, deleteBlog)}
              >
                <MdDelete />
              </Button>
            </div>
          </div>
        ))}
      </PageLayout>
      <FormDialog
        isOpen={openModal}
        onClose={handleCloseModal}
        title={isEditBlog ? "Edit Blog" : "Add Blog"}
        formConfig={blogFormConfig()}
        initialValues={formValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
