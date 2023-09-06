import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { clientId: string } }) {
    try {
        const {clientId} = params
        const client = await prismadb.client.findUnique({ where: { id: clientId }, include: {planList: {include: {activityList: true}}} })
        if(client) return NextResponse.json(client)
        else return new NextResponse("Client Not Found", { status: 404 })
    } catch (error) {
        console.log('[CLIENT_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}