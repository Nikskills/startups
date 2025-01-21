"use server"

import * as z from "zod"
import prisma from "@/lib/prisma"
import { hash } from "bcrypt-ts"
import { registerSchema } from "@/lib/zod"


export const register = async (data:z.infer<typeof registerSchema>) => {
    try {
        const validatedData = registerSchema.parse(data)
        if (!validatedData) {
            return {error: "Invalid register"}
        }

        const {email, password, name, username} = validatedData
        const pwHash = await hash(password, 10)

        const userExists = await prisma.user.findFirst({ where: { email} })
        if (userExists) {
            return {error: "User already exists"}
        }

        const lowerCaseEmail = email.toLowerCase()
        await prisma.user.create({
            data: {
                email: lowerCaseEmail,
                password: pwHash,
                username: username,
                name: name,
            }
        })

        return {success: "User created successfully"}
    } catch (err) {
        console.log(err)
        return {error: "error occurred"}
    }
}

