import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  const { clientId } = params
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description, email } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!clientId) {
      return new NextResponse("Client ID is required", { status: 400 });
    }
    const clientByUser = await prismadb.client.findFirst({
      where: {id: clientId, userId}
    })
    if (!clientByUser) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const client = await prismadb.client.update({
      where: {
        id: clientId,
      },
      data: {
        name,
        description, 
        email
      }
    });

    return NextResponse.json(client);
  } catch (error) {
    console.log('[CLIENT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}