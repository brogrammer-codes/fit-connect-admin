import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { ActivityStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { planId: string } }) {
  try {
    const { userId } = auth()
    const { planId } = params
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!planId) {
      return new NextResponse("Plan ID is required", { status: 400 });
    }
    const planByUser = await prismadb.plan.findFirst({
      where: { id: planId, userId }
    })
    if (!planByUser) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const activity = await prismadb.activity.create({ data: { name: '', description: '', planId, userId, videoUrl: '', status: ActivityStatus.IN_PLAN } })
    return NextResponse.json(activity)
  } catch (error) {
    console.log('[PLANS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}