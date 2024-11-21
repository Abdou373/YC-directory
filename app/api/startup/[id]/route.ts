import { prisma } from "@/utils/db";
import { StartupType } from "@/utils/type";
import { NextRequest, NextResponse } from "next/server";





export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const startup = await prisma.startup.findUnique({
      where: {
        id: id
      },
      include: {
        Author: true
      }
    }) as StartupType | null;
    if (!startup) {
      return NextResponse.json({ message: "Startup not found" }, { status: 404 })
    }

    await prisma.startup.update({
      where: { id: id }, data: {
        views: startup.views + 1
      }
    })

    return NextResponse.json(startup, { status: 200 })
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}