import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

// GET - Fetch all jobs (with filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const status = searchParams.get("status");

    let jobs = db.jobs.findAll();

    // Apply filters
    if (category && category !== "All") {
      jobs = jobs.filter((job: any) => job.category === category);
    }
    
    if (location) {
      jobs = jobs.filter((job: any) => 
        job.location?.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (status) {
      jobs = jobs.filter((job: any) => job.status === status);
    }

    // Sort by newest first
    jobs.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new job
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, budget, location, deadline } = body;

    // Validation
    if (!title || !category || !description || !budget || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = db.users.findByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newJob = {
      id: randomBytes(16).toString("hex"),
      title,
      category,
      description,
      budget: parseFloat(budget),
      location,
      deadline: deadline || null,
      posterId: user.id,
      posterName: user.name,
      posterEmail: user.email,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applications: [],
    };

    const createdJob = db.jobs.create(newJob);
    
    return NextResponse.json(createdJob, { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}