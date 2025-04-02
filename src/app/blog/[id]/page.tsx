import Footer from "@/components/landigPage/Footer";
import LandingPageHeader from "@/components/landigPage/LandingPageHeader";
import React from "react";

const getPost = async (id: string) => {
  const data = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + `/dashboard/blog/${id}`
  );
  const response = await data.json();
  return response.data;
};

const BlogDetails = async ({ params }: { params: any }) => {
  const { id } = await params;
  const blog = await getPost(id);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <LandingPageHeader />
      <div className="py-8 h-full flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {blog.title}
            </h1>
            <p className="text-gray-600">{blog.description}</p>
          </header>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetails;
