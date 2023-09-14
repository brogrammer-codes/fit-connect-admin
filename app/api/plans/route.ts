import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { ActivityStatus, PlanStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const plansByUserId = await prismadb.plan.findMany({
      where: {
        userId,
        status: PlanStatus.DRAFT
      }
    });
    return NextResponse.json(plansByUserId);
  } catch (error) {
    console.log('[PLAN_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, clientId } = body
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!name) {
      return new NextResponse("Plan name is required", { status: 400 })
    }
    const plan = await prismadb.plan.create({ data: { name, userId, description, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, clientId, status: clientId ? PlanStatus.ASSIGNED : PlanStatus.DRAFT } })
    const activityPromises = [];
    for (let index = 0; index < 5; index++) {
      const activityPromise = prismadb.activity.create({ data: { name: '', description: '', planId: plan.id, userId, videoUrl: '', status: ActivityStatus.IN_PLAN } })
      activityPromises.push(activityPromise);
    }
    await Promise.all(activityPromises);
    return NextResponse.json(plan)
  } catch (error) {
    console.log('[PLANS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}