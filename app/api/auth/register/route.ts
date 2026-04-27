import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, location, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // FIX: Use snake_case to match Supabase column names
    const user = {
      id: randomBytes(16).toString("hex"),
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      location: location || "",
      role: role || "BOTH",
      avatar: null,
      bio: "",
      skills: [],
      hourly_rate: null,
      years_of_experience: "",
      rating: 0,
      jobs_completed: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newUser = await db.users.create(user);
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}