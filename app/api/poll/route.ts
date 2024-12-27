import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreatePollSchema = z.object({
  creatorId: z.string(),
  title: z.string(),
  description: z.string(),
  options: z.array(z.object({ text: z.string() })),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const data = CreatePollSchema.parse(body);

    const poll = await prisma.poll.create({
      data: {
        title: data.title,
        description: data.description,
        creatorId: data.creatorId,
        options: {
          create: data.options,
        },
      },
    });
    console.log(poll);
    return NextResponse.json(poll);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
