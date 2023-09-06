import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function DELETE(
  req: Request,
  { params }: { params: { clientId: string} }
) {
  const { clientId } = params

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!clientId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const clientByUserId = await prismadb.client.findFirst({
      where: {
        id: clientId,
        userId,
      }
    });

    if (!clientByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prismadb.client.delete({
      where: {
        id: clientId,
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

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