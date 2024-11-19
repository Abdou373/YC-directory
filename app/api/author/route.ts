import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await prisma.author.create({
      data: {
        id: body.id,
        name: body.name,
        username: body.username,
        image: body.image,
        email: body.email,
        bio: body.bio
      }
    })

    return NextResponse.json({ message: "Creating Seccessful" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, { status: 500 })
  }
}

