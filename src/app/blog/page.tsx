import type { Metadata } from "next";
import Footer from "@/components/landigPage/Footer";
import LandingPageHeader from "@/components/landigPage/LandingPageHeader";
import MainBlogPosts from "@/components/landigPage/MainBlogPost";

export const dynamic = "force-dynamic";

const getPosts = async () => {
  const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `dashboard/blog`);
  const response = await data.json();
  return response.data;
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <LandingPageHeader />
      <div className="py-8 h-full flex-1">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Blog</h1>
            <p className="text-gray-600">Latest posts from our blog</p>
          </header>
          {/* Main Blog Posts */}
          <MainBlogPosts posts={posts} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog page",
  description: "This is school management system blog page",
};
