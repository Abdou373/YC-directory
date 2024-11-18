import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    console.log("from api get author")
    const { id } = await params;

    const user = await prisma.author.findUnique({ where: { id: parseInt(id) } })

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 200 })
  }
}


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const body = await request.json()

    const user = await prisma.author.update({
      where: { id: parseInt(id) }, data: {
        username: body.username,
      }
    })
    console.log(user)

    return NextResponse.json({ message: "Updating secc" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, { status: 500 })
  }
}