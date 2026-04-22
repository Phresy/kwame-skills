import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

// GET - Fetch all skills
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const userId = searchParams.get("userId");

    let skills = db.skills.findAll();

    // Apply filters
    if (category && category !== "All") {
      skills = skills.filter((skill: any) => skill.category === category);
    }
    
    if (userId) {
      skills = skills.filter((skill: any) => skill.userId === userId);
    }

    // Get user details for each skill
    const skillsWithUsers = skills.map((skill: any) => {
      const user = db.users.findById(skill.userId);
      return {
        ...skill,
        user: user ? { name: user.name, location: user.location, rating: user.rating } : null,
      };
    });

    return NextResponse.json(skillsWithUsers);
  } catch (error) {
    console.error("Skills fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new skill listing
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, hourlyRate, experience, availability } = body;

    // Validation
    if (!title || !category || !description || !hourlyRate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = db.users.findByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newSkill = {
      id: randomBytes(16).toString("hex"),
      title,
      category,
      description,
      hourlyRate: parseFloat(hourlyRate),
      experience: experience || "",
      availability: availability || "Full-time",
      userId: user.id,
      userName: user.name,
      userLocation: user.location,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdSkill = db.skills.create(newSkill);
    
    return NextResponse.json(createdSkill, { status: 201 });
  } catch (error) {
    console.error("Skill creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}