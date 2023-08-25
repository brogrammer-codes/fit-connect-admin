import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const clients = await prismadb.client.findMany({ take: 5, where: { userId } })
    const plans = await prismadb.plan.findMany({ take: 5, where: { userId, status: "DRAFT" } })
    const activities = await prismadb.activity.findMany({ take: 5, where: { userId, status: "DRAFT" } })
    return NextResponse.json({ clientList: clients, planList: plans, activityList: activities })
  } catch (error) {
    console.log('[CLIENTS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}