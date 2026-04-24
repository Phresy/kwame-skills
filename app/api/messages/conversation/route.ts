import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

// GET - Get conversation between two users
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const currentUser = await db.users.findByEmail(session.user.email);
    const messages = await db.messages.findByConversation(currentUser.id, userId);
    
    // Mark messages as read
    for (const msg of messages) {
      if (msg.toId === currentUser.id && !msg.read) {
        await db.messages.markAsRead(msg.id);
      }
    }
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Conversation fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}