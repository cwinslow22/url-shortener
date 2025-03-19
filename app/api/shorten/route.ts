import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// generate a random string
function generateSlug(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    let slug = generateSlug();
    // Check for collisions in the database
    while (await prisma.url.findUnique({ where: { slug } })) {
      slug = generateSlug();
    }

    const newUrl = await prisma.url.create({
      data: {
        slug,
        original: url,
      },
    });

    return NextResponse.json({ slug: newUrl.slug });
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    return NextResponse.error();
  }
}
