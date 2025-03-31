// components/MainBlogPosts.jsx
import React from "react";
import Link from "next/link";

interface Props {
  posts: Array<{
    _id: string;
    title: string;
    description: string;
    author: string;
    date: string;
  }>;
}

const MainBlogPosts = (props: Props) => {
  const { posts } = props;
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {posts.map((post) => (
        <article
          key={post._id}
          className="relative p-8 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white">{post.title}</h2>
            <div className="mt-2 text-sm text-gray-200">
              By <span className="font-medium">{post.author}</span> on{" "}
              {post.date}
            </div>
            <p className="mt-4 text-gray-100">{post.description}</p>
            <Link
              href={`/blog/${post._id}`}
              className="mt-4 inline-block text-white underline font-semibold"
            >
              Read more
              {/* <a className="mt-4 inline-block text-white underline font-semibold">
              </a> */}
            </Link>
          </div>
          {/* Background overlay for extra effect */}
          <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        </article>
      ))}
    </main>
  );
};

export default MainBlogPosts;
