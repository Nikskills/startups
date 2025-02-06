import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const posts = await prisma.startup.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                author: true,
                views: true,
                category: true,
                image: true,
            },
            orderBy: { 
                views: 'desc' 
            },
            take: 5
        })

        return NextResponse.json(
            { posts },
            { 
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
                }
            }
        )
    } catch (error) {
        console.error('Failed to fetch popular posts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch popular posts' },
            { status: 500 }
        )
    }
}