"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ArticleForm = ({ article }) => {
  const EDITMODE = article._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Articles/${article._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to update article");
      }
    } else {
      const res = await fetch("/api/Articles", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });

      if (!res.ok) {
        throw new Error("Failed to create new article");
      }
    }

    router.refresh();
    router.push("/");
  };

  const startingArticleData = {
    title: "",
    description: "",
    category: "categoryHere",
    priority: 1,
    progress: 0,
    status: "not started",
  };

  if (EDITMODE) {
    startingArticleData["title"] = article.title;
    startingArticleData["description"] = article.description;
    startingArticleData["priority"] = article.priority;
    startingArticleData["progress"] = article.progress;
    startingArticleData["status"] = article.status;
    startingArticleData["category"] = article.category;
  }

  const [formData, setFormData] = useState(startingArticleData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update your article" : "Create your article"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <input
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="categoryHere">categoryHere</option>
          <option value="categoryHere2">categoryHere2</option>
          <option value="categoryHere3">categoryHere3</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update article" : "Create article"}
        />
      </form>
    </div>
  );
};

export default ArticleForm;
