import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

// GET - Fetch single job
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const job = db.jobs.findById(params.id);
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Job fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update job
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const job = db.jobs.findById(params.id);
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const user = db.users.findByEmail(session.user.email);
    
    // Check if user owns the job
    if (job.posterId !== user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const updatedJob = db.jobs.update(params.id, {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Job update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete job
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const job = db.jobs.findById(params.id);
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const user = db.users.findByEmail(session.user.email);
    
    // Check if user owns the job
    if (job.posterId !== user?.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    db.jobs.delete(params.id);

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Job deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}