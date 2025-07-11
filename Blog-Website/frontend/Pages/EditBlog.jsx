import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateEdit.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    cover: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    // Fetch existing blog data
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title,
          summary: data.summary,
          cover: data.cover,
          content: data.content,
          author: data.author,
        });
      })
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("user"));

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Blog updated successfully!");
        navigate(`/post/${id}`);
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error.");
    }
  };

  return (
    <div className="create-edit-container">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Summary"
          required
        />
        <input
          type="text"
          name="cover"
          value={formData.cover}
          onChange={handleChange}
          placeholder="Cover Image URL"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="8"
          placeholder="Content"
          required
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
