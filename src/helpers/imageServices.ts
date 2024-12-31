import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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
      Bucket: process.env.BUCKET_NAME!,
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

export const uploadImageToS3 = async (fileBuffer: any, fileName: any, type: any) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: fileName,
    Body: fileBuffer,
    ContentType: type
  });
  await newclient.send(command);
};
