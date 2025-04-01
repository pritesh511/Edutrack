import { BASE_URL } from "@/utils/constant";

export const getPost = async (id: string) => {
  const data = await fetch(BASE_URL + `/dashboard/blog/${id}`);
  const response = await data.json();
  return response.data;
};

export const getPosts = async () => {
  const data = await fetch(BASE_URL + `/dashboard/blog`);
  const response = await data.json();
  return response.data;
};


