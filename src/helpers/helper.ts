import crypto from "crypto";

export const randomString = (length = 5) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};
