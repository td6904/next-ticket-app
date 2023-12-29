import ArticleForm from "@/app/(components)/ArticleForm";
import React from "react";

const getArticleById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Articles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get article");
  }

  return res.json();
};

const ArticlePage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateArticleData = {};

  if (EDITMODE) {
    updateArticleData = await getArticleById(params.id);
    updateArticleData = updateArticleData.foundArticle;
  } else {
    updateArticleData = {
      _id: "new",
    };
  }

  return <ArticleForm article={updateArticleData} />;
};

export default ArticlePage;
