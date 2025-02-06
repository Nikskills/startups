"use server"

import prisma from "@/lib/prisma"
import { auth } from "../auth"
import { z } from "zod"

interface StartupResponse {
  success?: string;
  error?: string;
}

const startupSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2).max(100),
  category: z.string(),
  imageurl: z.string().optional(),
  pitch: z.string().min(2).max(10000)
})

export default async function create_startup(
  values: z.infer<typeof startupSchema>
): Promise<StartupResponse> {
  try {
    const validatedData = startupSchema.parse(values)
    const { title, description, category, imageurl, pitch } = validatedData
    
    const session = await auth()
    if (!session?.user?.email) {
      return { error: "Not authenticated" }
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user?.username) {
      return { error: "User profile incomplete" }
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    const existingStartup = await prisma.startup.findFirst({
      where: { title }
    })

    if (existingStartup) {
      return { error: "Title already taken" }
    }

    await prisma.startup.create({
      data: {
        title,
        slug,
        description,
        category,
        image: imageurl || '',
        pitch,
        views: 0,
        author: user.username
      }
    })

    return { success: "Startup created successfully" }
  } catch (error) {
    console.error("Create startup error:", error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: "Failed to create startup" }
  }
}