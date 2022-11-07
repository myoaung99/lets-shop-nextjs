import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../model/User";
import db from "../../../utils/db";
import bcrypt from "bcrypt";

export const authOptions = {
  //*=============== Fire after doing an action =================
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  //*================ Option to Login ==================
  providers: [
    CredentialsProvider({
      type: "credentials",
      async authorize(credentials) {
        await db.connect();
        const { email: requestedEmail, password: requestedPassword } =
          credentials;
        const user = await User.findOne({
          email: requestedEmail,
        });
        await db.disconnect();
        if (user && bcrypt.compareSync(requestedPassword, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
};

export default NextAuth(authOptions);
