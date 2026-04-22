import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

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

    const user = db.users.findByEmail(session.user.email);
    const job = db.jobs.findById(jobId);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if already applied
    const existingApplication = db.applications
      .findAll()
      .find((app: any) => app.jobId === jobId && app.skillerId === user?.id);

    if (existingApplication) {
      return NextResponse.json(
        { error: "Already applied for this job" },
        { status: 400 }
      );
    }

    const newApplication = {
      id: randomBytes(16).toString("hex"),
      jobId,
      jobTitle: job.title,
      skillerId: user?.id,
      skillerName: user?.name,
      proposal,
      bidAmount: parseFloat(bidAmount),
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    const createdApplication = db.applications.create(newApplication);
    
    return NextResponse.json(createdApplication, { status: 201 });
  } catch (error) {
    console.error("Application creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch applications for a user
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const user = db.users.findByEmail(session.user.email);
    
    let applications = db.applications.findAll();

    // Filter applications
    if (jobId) {
      applications = applications.filter((app: any) => app.jobId === jobId);
    } else {
      // Get applications where user is either the job poster or the skiller
      const userJobs = db.jobs.findAll().filter((job: any) => job.posterId === user?.id);
      const userJobIds = userJobs.map((job: any) => job.id);
      
      applications = applications.filter(
        (app: any) => app.skillerId === user?.id || userJobIds.includes(app.jobId)
      );
    }

    // Enrich with job details
    const enrichedApplications = applications.map((app: any) => {
      const job = db.jobs.findById(app.jobId);
      return {
        ...app,
        job,
      };
    });

    return NextResponse.json(enrichedApplications);
  } catch (error) {
    console.error("Applications fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}