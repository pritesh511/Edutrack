"use client";
 
// Switches between different environments
const configSwitcher = (environmentType: string) => {
  let configuration;
 
  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `http://localhost:3000/`,
        ImageUrl: `http://localhost:3000`,
      };
      break;
    case "edutrack-pritesh511s-projects.vercel.app":
      configuration = {
        API_URL: `https://edutrack-pritesh511s-projects.vercel.app/`,
        ImageUrl: `https://edutrack-pritesh511s-projects.vercel.app/`,
      };
      break;
    default:
      configuration = {
        API_URL: `http://localhost:3000/`,
        ImageUrl: `http://localhost:3000`,
      };
  }
 
  return configuration;
};

export const config =
  typeof window !== "undefined"
    ? configSwitcher(window.location.hostname)
    : { API_URL: "", ImageUrl: "" };