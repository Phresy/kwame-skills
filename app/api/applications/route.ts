import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

// GET - Fetch applications for a user
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const user = await db.users.findByEmail(session.user.email);
    
    let allApplications = await db.applications.findAll();

    // Filter applications
    if (jobId) {
      allApplications = allApplications.filter((app: any) => app.job_id === jobId);
    } else {
      // Get applications where user is either the job poster or the skiller
      const userJobs = await db.jobs.findByPoster(user?.id);
      const userJobIds = userJobs.map((job: any) => job.id);
      
      allApplications = allApplications.filter(
        (app: any) => app.skiller_id === user?.id || userJobIds.includes(app.job_id)
      );
    }

    // Enrich with job and user details
    const enrichedApplications = await Promise.all(
      allApplications.map(async (app: any) => {
        const job = await db.jobs.findById(app.job_id);
        const skiller = await db.users.findById(app.skiller_id);
        return {
          ...app,
          job,
          skiller: { name: skiller?.name, email: skiller?.email }
        };
      })
    );

    return NextResponse.json(enrichedApplications);
  } catch (error) {
    console.error("Applications fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Apply for a job
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { jobId, proposal, bidAmount } = body;

    if (!jobId || !proposal || !bidAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await db.users.findByEmail(session.user.email);
    const job = await db.jobs.findById(jobId);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if already applied
    const allApplications = await db.applications.findAll();
    const existingApplication = allApplications.find(
      (app: any) => app.job_id === jobId && app.skiller_id === user?.id
    );

    if (existingApplication) {
      return NextResponse.json(
        { error: "Already applied for this job" },
        { status: 400 }
      );
    }

    const newApplication = {
      id: randomBytes(16).toString("hex"),
      job_id: jobId,
      job_title: job.title,
      skiller_id: user?.id,
      skiller_name: user?.name,
      proposal: proposal,
      bid_amount: parseFloat(bidAmount),
      status: "PENDING",
      created_at: new Date().toISOString(),
    };

    const createdApplication = await db.applications.create(newApplication);
    
    return NextResponse.json(createdApplication, { status: 201 });
  } catch (error) {
    console.error("Application creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}