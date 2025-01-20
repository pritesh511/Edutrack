import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Token is missing in the request");
    }

    const currentUser: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    return currentUser.id;
  } catch (error: any) {
    throw new Error(`JWT Verification failed: ${error.message}`);
  }
}
