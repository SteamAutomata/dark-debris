import { db, ScpDescription } from "astro:db";

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  try {
    const descriptions = await db.select().from(ScpDescription).limit(10);

    return Response.json(descriptions, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
