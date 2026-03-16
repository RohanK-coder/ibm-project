import jwt from "jsonwebtoken";

export interface JwtPayload {
  id: number;
  email: string;
  role: "student" | "professor" | "admin";
}

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d"
  });
};