import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Here you can handle the data, e.g., send an email or store in DB
    // For now, just return the data as confirmation
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process form." }, { status: 500 });
  }
}
