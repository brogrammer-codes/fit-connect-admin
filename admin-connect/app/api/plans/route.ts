import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description = '', email = '' } = body
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!name) {
      return new NextResponse("Client name is required", { status: 400 })
    }
    const store = await prismadb.client.create({data: {name, userId, description, email}})
    return NextResponse.json(store)
  } catch (error) {
    console.log('[CLIENTS_POST]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}