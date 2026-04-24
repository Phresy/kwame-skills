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

    // ✅ ADD AWAIT HERE
    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
      hourlyRate: null,
      yearsOfExperience: "",
      rating: 0,
      jobsCompleted: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ✅ ADD AWAIT HERE
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