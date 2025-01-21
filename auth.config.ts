import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import prisma from "@/lib/prisma";
import { compare } from 'bcrypt-ts'
import { signInSchema } from "@/lib/zod";

export default { 
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedData = await signInSchema.parseAsync(credentials)
                const {email, password} = validatedData
                const user = await prisma.user.findFirst({
                    where: {email: email}
                })
                if (!user || !user.password || user.email) {
                    return null
                }
                const passwordsMatch = await compare(password, user.password)
                if (!passwordsMatch) {
                    return null
                }
                return validatedData
            }
        })
    ] 
} satisfies NextAuthConfig