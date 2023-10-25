import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { ActivityStatus, PlanStatus } from "@prisma/client"
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
      where: { id: planId, userId }, include: {activityList: true}
    })
    if (!planByUser) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const { name, description, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } = planByUser
    const plan = await prismadb.plan.create({
      data: {
        name: `${name} - copy`,
        description,
        tag_1,
        tag_2,
        tag_3,
        tag_4,
        tag_5,
        tag_6,
        userId,
        status: PlanStatus.DRAFT
      }
    })
    const activityPromises = planByUser.activityList.map(async (activity) => {
      await prismadb.activity.create({
        data: {
          name: activity.name,
          description: activity.description, 
          planId: plan.id, 
          videoUrl: activity.videoUrl, 
          userId, 
          status: "IN_PLAN",
          tag_1: activity.tag_1,
          tag_2: activity.tag_2,
          tag_3: activity.tag_3,
          tag_4: activity.tag_4,
          tag_5: activity.tag_5,
          tag_6: activity.tag_6,
        }
      })
    })
    await Promise.all(activityPromises);
    return NextResponse.json(plan)
  } catch (error) {
    console.log('[PLAN_CLONE_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}