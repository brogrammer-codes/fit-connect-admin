import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { clientId: string, planId: string } }) {
    try {
        const { clientId, planId } = params
        // const client = await prismadb.client.findUnique({ where: { id: clientId }, include: {planList: {include: {activityList: true}}} })
        const clientPlan = await prismadb.plan.findFirst({ where: { clientId, id: planId }, include:{ activityList: true} })
        if (clientPlan) return NextResponse.json(clientPlan)
        else return new NextResponse("Client Plan Not Found", { status: 404 })
    } catch (error) {
        console.log('[CLIENT_PLAN_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}