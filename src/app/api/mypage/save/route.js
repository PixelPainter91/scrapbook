import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/utils/dbConnections";

export async function POST(req) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { pageTitle, images, textBoxes } = await req.json();

  const client = await db.connect();

  try {
    await client.query(
      `SELECT set_config('request.jwt.claims', $1::text, true)`,
      [JSON.stringify({ sub: clerkUserId, role: "authenticated" })]
    );

    await client.query(
      `INSERT INTO mypages (user_id, page_title, images, text_boxes, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, page_title)
       DO UPDATE SET images = EXCLUDED.images,
                     text_boxes = EXCLUDED.text_boxes,
                     updated_at = NOW()`,
      [clerkUserId, pageTitle, JSON.stringify(images), JSON.stringify(textBoxes)]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Save page error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    client.release();
  }
}