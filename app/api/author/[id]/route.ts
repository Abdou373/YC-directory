import { prisma } from "@/utils/db";
import { AuthorType } from "@/utils/type";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const user = await prisma.author.findUnique({ where: { id: parseInt(id) }, include: { startup: { include: { Author: true } } } }) as AuthorType;

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 })
  }
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const body = await request.json()

    await prisma.author.update({
      where: { id: parseInt(id) }, data: {
        username: body.username,
      }
    })

    return NextResponse.json({ message: "Updating secc" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}