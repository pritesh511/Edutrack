import Footer from "@/components/landigPage/Footer";
import LandingPageHeader from "@/components/landigPage/LandingPageHeader";
import MainBlogPosts from "@/components/landigPage/MainBlogPost";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/dashboard/blog", {
    // This setting ensures the fetched data is cached and revalidated every 60 seconds.
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

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
          <MainBlogPosts posts={posts.data} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
