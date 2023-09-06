import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description = '', tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } = body
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!name) {
      return new NextResponse("Plan name is required", { status: 400 })
    }
    const plan = await prismadb.plan.create({ data: { name, userId, description, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } })
    return NextResponse.json(plan)
  } catch (error) {
    console.log('[PLANS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}