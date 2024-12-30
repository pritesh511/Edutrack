import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const newclient = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_USER_ACCESSKEY!,
    secretAccessKey: process.env.AWS_USER_SECRETKEY!,
  },
});

export const generateUrl = async (key: string) => {
    try {
      const command = new GetObjectCommand({
        Bucket: "edutrack-pm",
        Key: key,
      });
      const url = await getSignedUrl(newclient, command, { expiresIn: 3600 });
      return url;
    } catch (error) {
      console.error("Error generating URL:", error);
      throw error;
    }
  };
  
  export const getImageUrl = async (key: string) => {
    try {
      const newUrl = await generateUrl(key);
      return newUrl;
    } catch (error) {
      console.error("Error in getImageUrl:", error);
      throw error;
    }
  };
  
