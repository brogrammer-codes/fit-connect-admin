import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function DELETE(
  req: Request,
  { params }: { params: { activityId: string} }
) {
  const { activityId } = params

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!activityId) {
      return new NextResponse("Activity id is required", { status: 400 });
    }

    const activityByUserId = await prismadb.activity.findFirst({
      where: {
        id: activityId,
        userId,
      }
    });

    if (!activityByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const billboard = await prismadb.activity.delete({
      where: {
        id: activityId,
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[ACTIVITY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { activityId: string } }
) {
  const { activityId } = params
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description, videoUrl } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!activityId) {
      return new NextResponse("Activity ID is required", { status: 400 });
    }
    const activityByUser = await prismadb.activity.findFirst({
      where: {id: activityId, userId}
    })
    if (!activityByUser) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const activity = await prismadb.activity.update({
      where: {
        id: activityId,
      },
      data: {
        name,
        description, 
        videoUrl
      }
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.log('[ACTIVITY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}