import Credentials from 'next-auth/providers/credentials'
import { NextAuthConfig } from 'next-auth'
import bcrypt from "bcryptjs";

import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFiels = LoginSchema.safeParse(credentials)

        if (validatedFiels.success) {
          const { email, password } = validatedFiels.data
          
          const user = await getUserByEmail(email)
          if (!user || !user.password) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) {
            return user
          }
        }

        return null
      }
    })
  ]
} satisfies NextAuthConfig