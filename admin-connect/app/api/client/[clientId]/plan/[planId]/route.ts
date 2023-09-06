import prismadb from "@/lib/prismadb"
import { ActivityStatus, PlanStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { clientId: string, planId: string } }) {
  try {
    const { clientId, planId } = params
    // const client = await prismadb.client.findUnique({ where: { id: clientId }, include: {planList: {include: {activityList: true}}} })
    const clientPlan = await prismadb.plan.findFirst({ where: { clientId, id: planId }, include: { activityList: true } })
    if (clientPlan) return NextResponse.json(clientPlan)
    else return new NextResponse("Client Plan Not Found", { status: 404 })
  } catch (error) {
    console.log('[CLIENT_PLAN_GET]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string, planId: string } }
) {
  try {
    const { clientId, planId } = params

    const body = await req.json()
    const { note, status } = body;

    const clientPlan = await prismadb.plan.findFirst({ where: { clientId, id: planId }, include:{ activityList: true}})

    if (clientPlan?.status !== "ASSIGNED") {
      return new NextResponse("Only Assigned Plans can be updated", { status: 403 });
    }
    if(!Object.values(PlanStatus).includes(status)) {
      return new NextResponse("Updated status not found", { status: 409 });
    }
    if(status === PlanStatus.COMPLETE) {
      clientPlan.activityList.map(async (activity) => {
        await prismadb.activity.update({where:{ id: activity.id}, data: {status: ActivityStatus.COMPLETE}})
      })
    }
    const client = await prismadb.plan.update({
      where: {
        id: planId,
      },
      data: {
        note,
        status
      }
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log('[CLIENT_PLAN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}