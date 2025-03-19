import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function RedirectPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  const urlEntry = await prisma.url.findUnique({
    where: { slug },
  });

  if (urlEntry) {
    // Redirect to the original URL
    redirect(urlEntry.original);
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-red-400 mb-4">URL Not Found</h1>
        <p className="text-lg mb-8">
          Sorry, the shortened URL <strong>{slug}</strong> does not exist.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    );
  }
}
