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

        const plan = await prismadb.plan.create({ data: { name: planByUser.name, description: planByUser.description, userId: planByUser.userId, clientId: clientId, status: "ASSIGNED" } })
        planByUser.activityList.map(async (activity) => {
            await prismadb.activity.create({ data: { name: activity.name, description: activity.description, planId: plan.id, videoUrl: activity.videoUrl, userId } })
        })
        //   const client = await prismadb.client.update({
        //     where: {
        //       id: clientId,
        //     },
        //     data: {
        //       name,
        //       description, 
        //       email
        //     }
        //   });

        return NextResponse.json(plan);
    } catch (error) {
        console.log('[CLIENT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}