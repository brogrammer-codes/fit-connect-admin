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
        const planByUser = await prismadb.plan.findFirst({ where: { id: planId, userId } })
        if (!clientByUser || !planByUser) {
            return new NextResponse("Unauthorized", { status: 405 });
        }

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

        return NextResponse.json({ planId, clientId });
    } catch (error) {
        console.log('[CLIENT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}