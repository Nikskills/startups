import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"
import { Startup } from "@/types/types"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    try {
        if (query) {
            const startups: Startup[] = await prisma.startup.findMany({
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    description: true,
                    author: true,
                    views: true,
                    category: true,
                    pitch: true,
                    image: true,
                },
                where: query ? {
                    title: { contains: query }
                  } : undefined,
            })

            if (!startups) {
                return NextResponse.json({status: 404, message: "No startup found"})
            }

            return NextResponse.json(
                { startups }, 
                { 
                    status: 200,
                    headers: {
                        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
                    }
                }
            )
        }
        const startups: Startup[] = await prisma.startup.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                author: true,
                views: true,
                category: true,
                pitch: true,
                image: true,
            },
        })
        return NextResponse.json(
            { startups }, 
            { 
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
                }
            }
        )
    } catch (error) {
        console.error('Failed to fetch startups:', error)
        return NextResponse.json(
            { error: 'Failed to fetch startups' },
            { status: 500 }
        )
    }
}