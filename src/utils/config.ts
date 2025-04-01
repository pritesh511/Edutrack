// utils/config.js or utils/config.ts

// Switches between different environments
const configSwitcher = (environmentType: string) => {
  let configuration;

  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `http://localhost:3000/api/`,
        ImageUrl: `http://localhost:3000`,
      };
      break;
    case "edutrack-pritesh511s-projects.vercel.app":
      configuration = {
        API_URL: `https://edutrack-pritesh511s-projects.vercel.app/api/`,
        ImageUrl: `https://edutrack-pritesh511s-projects.vercel.app`,
      };
      break;
    default:
      configuration = {
        // Default configuration (can be updated as needed)
        API_URL: `http://localhost:3000/api/`,
        ImageUrl: `http://localhost:3000`,
      };
  }

  return configuration;
};

// When on the server, provide a default hostname such as "localhost"
export const config = 
  typeof window !== "undefined"
    ? configSwitcher(window.location.hostname)
    : configSwitcher("localhost");
