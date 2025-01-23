import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// change id to slug and make sure the slug is unique same as the name of the startup
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
    const slug = (await params).slug
    const startup = await prisma.startup.findUnique({
        where: { slug: slug },
    })

    if (!startup) {
        return NextResponse.json(
        { error: "Startup not found" },
        { status: 404 }
        )
    }

    return NextResponse.json(startup, { status: 200 })
}