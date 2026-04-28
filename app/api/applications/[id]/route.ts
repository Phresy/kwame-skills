import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

// PUT - Update application status (accept/reject)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();

    const application = await db.applications.findById(id);
    
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Verify the user owns the job this application is for
    const job = await db.jobs.findById(application.job_id);
    const user = await db.users.findByEmail(session.user.email);
    
    if (job?.poster_id !== user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedApplication = await db.applications.update(id, { 
      status, 
      updated_at: new Date().toISOString() 
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Application update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}