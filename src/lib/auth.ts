import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { query } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // In a real app, you'd have a users table
          // This is a simplified example with hardcoded admin user
          // For production, create a proper users table and authentication system

          // Hardcoded admin user for demo purposes
          const adminUser = {
            id: "1",
            username: "admin",
            // Updated hash for "password123" - compatible with bcrypt v6
            password: "$2a$12$/I2exGuf0zXWiDL2knQo4esYC2wqJYIZb3DjIS3OEpiXsgYLY7sGy",
            name: "Admin User",
            role: "ADMIN",
          };

          if (credentials.username === adminUser.username) {
            const isValid = await bcrypt.compare(
              credentials.password,
              adminUser.password
            );

            if (isValid) {
              return {
                id: adminUser.id,
                name: adminUser.name,
                email: adminUser.username,
                role: adminUser.role,
              };
            }
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
}; 