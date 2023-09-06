import prismadb from "@/lib/prismadb"
import { ActivityStatus, PlanStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string, activityId: string } }
) {
  try {
    const { activityId } = params

    const body = await req.json()
    const { note, status } = body;

    const clientActivity = await prismadb.activity.findFirst({ where: { id: activityId }, include:{ childActivityList: true}})

    if(!Object.values(PlanStatus).includes(status)) {
      return new NextResponse("Updated status not found", { status: 409 });
    }
    if(status === ActivityStatus.COMPLETE && clientActivity?.childActivityList) {
        clientActivity.childActivityList.map(async (activity) => {
          await prismadb.activity.update({where:{ id: activity.id}, data: {status: ActivityStatus.COMPLETE}})
        })
      }
    const activity = await prismadb.activity.update({
      where: {
        id: activityId,
      },
      data: {
        note,
        status
      }
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.log('[CLIENT_PLAN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}