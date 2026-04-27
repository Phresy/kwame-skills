import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

// GET - Get user's conversations
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.users.findByEmail(session.user.email);
    const messages = await db.messages.findByUser(user.id);
    
    // Get unique conversations
    const conversations = new Map();
    for (const msg of messages) {
      // FIX: Use snake_case (from_id, to_id)
      const otherId = msg.from_id === user.id ? msg.to_id : msg.from_id;
      if (!conversations.has(otherId)) {
        const otherUser = await db.users.findById(otherId);
        conversations.set(otherId, {
          userId: otherId,
          userName: otherUser?.name,
          lastMessage: msg.content,
          lastMessageTime: msg.created_at,  // FIX: Use created_at
          unread: msg.to_id === user.id && !msg.read  // FIX: Use to_id
        });
      }
    }
    
    return NextResponse.json(Array.from(conversations.values()));
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Send a message
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toId, content } = await request.json();
    const fromUser = await db.users.findByEmail(session.user.email);
    
    // FIX: Use snake_case to match database schema
    const message = {
      id: randomBytes(16).toString("hex"),
      from_id: fromUser.id,                    // Changed from fromId
      to_id: toId,                             // Changed from toId
      content: content,
      read: false,
      created_at: new Date().toISOString()     // Changed from createdAt
    };
    
    const newMessage = await db.messages.create(message);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Message send error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}