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

    const user = db.users.findByEmail(session.user.email);
    const messages = db.messages.findByUser(user.id);
    
    // Get unique conversations
    const conversations = new Map();
    messages.forEach((msg: any) => {
      const otherId = msg.fromId === user.id ? msg.toId : msg.fromId;
      if (!conversations.has(otherId)) {
        const otherUser = db.users.findById(otherId);
        conversations.set(otherId, {
          userId: otherId,
          userName: otherUser?.name,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          unread: msg.toId === user.id && !msg.read
        });
      }
    });
    
    return NextResponse.json(Array.from(conversations.values()));
  } catch (error) {
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
    const fromUser = db.users.findByEmail(session.user.email);
    
    const message = {
      id: randomBytes(16).toString("hex"),
      fromId: fromUser.id,
      toId: toId,
      content: content,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    const newMessage = db.messages.create(message);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}