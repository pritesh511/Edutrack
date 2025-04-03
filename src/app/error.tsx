"use client";
import { useRouter } from "next/navigation";

export default function GlobalError() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        An unexpected error occurred. Please try again later.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
