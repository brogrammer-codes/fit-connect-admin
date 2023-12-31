import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(
  req: Request,
  { params }: { params: { clientId: string, planId: string } }
) {
  const { clientId, planId } = params
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }


    if (!clientId) {
      return new NextResponse("Client ID is required", { status: 400 });
    }
    const clientByUser = await prismadb.client.findFirst({
      where: { id: clientId, userId }
    })
    const planByUser = await prismadb.plan.findFirst({ where: { id: planId, userId }, include: { activityList: true } })
    if (!clientByUser || !planByUser) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const { name, description, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } = planByUser
    const plan = await prismadb.plan.create({ data: { name, description, userId, clientId, status: "ASSIGNED", tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } })    
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
    return NextResponse.json(plan);
  } catch (error) {
    console.log('[CLIENT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}