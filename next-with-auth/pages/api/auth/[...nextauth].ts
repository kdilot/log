import NextAuth from "next-auth";
import KakaoProviders from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";

const nextAuth: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  providers: [
    KakaoProviders({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};
export default nextAuth;
