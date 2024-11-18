import { prisma } from "@/utils/db";
import { CreatingStartupType, StartupType } from "@/utils/type";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
  try {
    const SearchText = request.nextUrl.searchParams.get("query") as string;

    let startups: StartupType[];
    if (SearchText) {
      const startups1 = await prisma.startup.findMany({
        where: {
          title: {
            contains: SearchText,
            mode: "insensitive"
          }
        },
        include: {
          Author: true
        }
      }) as StartupType[]
      // if (!startups) {
      const startups2 = await prisma.startup.findMany({
        where: {
          category: {
            contains: SearchText,
            mode: "insensitive"
          }
        },
        include: {
          Author: true
        }
      }) as StartupType[]
      // }
      startups = [...startups1, ...startups2]

    } else {
      startups = await prisma.startup.findMany({ include: { Author: true } })
    }

    return NextResponse.json(startups, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal Searver Error" }, { status: 500 })
  }
}


export async function POST(request: NextRequest) {
  try {
    const Body = await request.json() as CreatingStartupType;

    const newstartup = await prisma.startup.create({
      data: {
        title: Body.title,
        description: Body.description,
        image: Body.image,
        category: Body.category,
        authorid: Body.authorid,
      }
    })

    return NextResponse.json(newstartup, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 })
  }


}