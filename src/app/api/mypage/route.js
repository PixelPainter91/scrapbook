import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/utils/dbConnections";

export async function GET(req) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return new Response("Unauthorized", { status: 401 });

  try {
    const query = `
      SELECT * FROM mypages
      WHERE user_id = $1
      ORDER BY updated_at DESC
    `;
    const result = await db.query(query, [clerkUserId]);

    const pages = result.rows.map((row) => ({
      ...row,
      images: row.images || [],
      text_boxes: row.text_boxes || [],
    }));

    return new Response(JSON.stringify(pages), { status: 200 });
  } catch (err) {
    console.error("Load pages error:", err);
    return new Response("Database error", { status: 500 });
  }
}