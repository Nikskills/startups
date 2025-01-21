import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import prisma from "@/lib/prisma";
import { compare } from 'bcrypt-ts'
import { signInSchema } from "@/lib/zod";

export default {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedData = await signInSchema.parse(credentials)
                const {email, password} = validatedData
                const user = await prisma.user.findFirst({
                    where: { email }
                })
                if (!user || !user.password) {  // Fixed condition
                    return null
                }
                const passwordsMatch = await compare(password, user.password)
                if (!passwordsMatch) {
                    return null
                }
                return user  
            }
        })
    ]
} satisfies NextAuthConfig