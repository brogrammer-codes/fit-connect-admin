import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request,
  { params }: { params: { planId: string } }) {
  const { planId } = params

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!planId) {
      return new NextResponse("Plan id is required", { status: 400 });
    }

    const planByUserId = await prismadb.plan.findFirst({
      where: {
        id: planId,
        userId,
      }, include: {
        activityList: { orderBy: { createdAt: "desc" } }, client: true
      }
    });
    if (!planByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    return NextResponse.json(planByUserId);
  } catch (error) {
    console.log('[PLAN_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { planId: string } }
) {
  const { planId } = params

  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!planId) {
      return new NextResponse("Plan id is required", { status: 400 });
    }

    const planByUserId = await prismadb.plan.findFirst({
      where: {
        id: planId,
        userId,
      },
      include: { activityList: true }
    });

    if (!planByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }


    const activityPromises = planByUserId?.activityList.map(async (activity) => {
      await prismadb.activity.delete({ where: { id: activity.id } })
    })
    await Promise.allSettled(activityPromises).then(async () => {
      const plan = await prismadb.plan.delete({
        where: {
          id: planId,
        }
      });
      return NextResponse.json(plan);
    })


  } catch (error) {
    console.log('[PLAN_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { planId: string } }
) {
  const { planId } = params
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, description, tag_1, tag_2, tag_3, tag_4, tag_5, tag_6 } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!planId) {
      return new NextResponse("Plan ID is required", { status: 400 });
    }
    const planByUser = await prismadb.plan.findFirst({
      where: { id: planId, userId }
    })
    if (!planByUser) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const plan = await prismadb.plan.update({
      where: {
        id: planId,
      },
      data: {
        name,
        description,
        tag_1,
        tag_2,
        tag_3,
        tag_4,
        tag_5,
        tag_6
      }
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.log('[PLAN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}