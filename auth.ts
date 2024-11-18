import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import axios from "axios"
import { DOMAIN } from "./utils/constant"



export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async signIn({ profile, user }) {

      const response = await axios.get(`${DOMAIN}/api/author/${profile?.id}`)
      const existingUser = await response.data

      if (!existingUser) {

        await axios.post(`${DOMAIN}/api/author`, {
          id: profile?.id,
          name: user.name,
          username: profile?.login,
          image: user.image,
          email: user.email,
          bio: profile?.bio
        })

      }

      return true;
    },
    async jwt({ profile, account, token }) {
      if (profile && account) {
        const response = await axios.get(`${DOMAIN}/api/author/${profile?.id}`)
        const user = await response.data
        token.id = user.id
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id })

      return session;
    },
  }
})