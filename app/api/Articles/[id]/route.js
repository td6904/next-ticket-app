import Article from "@/app/(models)/Article";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const foundArticle = await Article.findOne({ _id: id });

    return NextResponse.json({ foundArticle }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Article.findByIdAndDelete(id);
    return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const articleData = body.formData;

    const updateArticleData = await Article.findByIdAndUpdate(id, {
      ...articleData,
    });

    console.log("PUT ran", articleData);
    return NextResponse.json({ message: "Article Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
