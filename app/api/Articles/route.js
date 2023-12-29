import Article from "@/app/(models)/Article";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const articleData = body.formData;
    await Article.create(articleData);

    return NextResponse.json({ message: "Article Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const articles = await Article.find();
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
