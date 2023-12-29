import React from "react";
import ArticleCard from "./(components)/ArticleCard";

const getArticles = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Articles", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get Articles", error);
  }
};

const Dashboard = async () => {
  const { articles } = await getArticles();

  const uniqieCategories = [
    ...new Set(articles?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      <div>
        {articles &&
          uniqieCategories?.map((uniqieCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqieCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4"></div>

              {articles
                .filter((article) => article.category === uniqieCategory)
                .map((filteredArticle, _index) => (
                  <ArticleCard
                    id={_index}
                    key={_index}
                    article={filteredArticle}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
