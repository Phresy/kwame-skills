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

    let skills = await db.skills.findAll();

    // Apply filters
    if (category && category !== "All") {
      skills = skills.filter((skill: any) => skill.category === category);
    }
    
    if (userId) {
      // FIX: Use user_id instead of userId
      skills = skills.filter((skill: any) => skill.user_id === userId);
    }

    // Get user details for each skill
    const skillsWithUsers = await Promise.all(skills.map(async (skill: any) => {
      // FIX: Use user_id instead of userId
      const user = await db.users.findById(skill.user_id);
      return {
        ...skill,
        user: user ? { name: user.name, location: user.location, rating: user.rating } : null,
      };
    }));

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

    const user = await db.users.findByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // FIX: Use snake_case to match database schema
    const newSkill = {
      id: randomBytes(16).toString("hex"),
      title,
      category,
      description,
      hourly_rate: parseFloat(hourlyRate),      // Changed from hourlyRate
      experience: experience || "",
      availability: availability || "Full-time",
      user_id: user.id,                         // Changed from userId
      user_name: user.name,                     // Changed from userName
      user_location: user.location,             // Changed from userLocation
      is_active: true,                          // Changed from isActive
      created_at: new Date().toISOString(),     // Changed from createdAt
      updated_at: new Date().toISOString(),     // Changed from updatedAt
    };

    const createdSkill = await db.skills.create(newSkill);
    
    return NextResponse.json(createdSkill, { status: 201 });
  } catch (error) {
    console.error("Skill creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}