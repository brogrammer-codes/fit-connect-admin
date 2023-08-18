import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description = '', videoUrl = '' } = body
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!name) {
      return new NextResponse("Activity name is required", { status: 400 })
    }
    const store = await prismadb.activity.create({data: {name, userId, description, videoUrl}})
    return NextResponse.json(store)
  } catch (error) {
    console.log('[ACTIVITY_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}