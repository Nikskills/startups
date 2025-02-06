import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma' 


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400})
        }

        const user = await prisma.user.findUnique({
            where: {email: email, password: password}
        })

        if (user) {
            return NextResponse.json({user}, {status: 200})
        }
        return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
    }
    catch (err) {
        return NextResponse.json({error: err}, {status: 500})
    }
}