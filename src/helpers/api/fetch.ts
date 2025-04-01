import { BASE_URL } from "@/utils/constant";

export const getPost = async (id: string) => {
    console.log("BASE_URL", BASE_URL);
  const data = await fetch(BASE_URL + `/dashboard/blog/${id}`);
  const response = await data.json();
  return response.data;
};
