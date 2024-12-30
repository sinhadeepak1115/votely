import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateVoteSchema = z.object({
  userId: z.string(),
  optionId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const vote = prisma.poll.findUnique({
      where: {
        id: body.optionId,
      },
    });
    console.log(vote);
    return NextResponse.json(vote);
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = CreateVoteSchema.parse(body);
    console.log(data);
    const option = await prisma.option.findUnique({
      where: { id: body.optionId },
    });
    console.log(option);
    if (!option) {
      return NextResponse.json(
        { error: "Option option not found" },
        { status: 201 },
      );
    }
    const vote = await prisma.vote.create({
      data: {
        userId: data.userId,
        optionId: data.optionId,
      },
      include: { option: true },
    });
    return NextResponse.json(vote, { status: 201 });
  } catch (e) {
    return NextResponse.json(e);
  }
}
