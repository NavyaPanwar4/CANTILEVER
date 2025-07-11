// src/pages/CreateEdit.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateEdit.css";

function CreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    cover: "",
    content: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title,
            summary: data.summary,
            cover: data.cover,
            content: data.content,
          });
        })
        .catch(() => toast.error("Failed to load blog"));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.token) return toast.error("You must be logged in");

    const method = isEditMode ? "PUT" : "POST";
    const endpoint = isEditMode
      ? `http://localhost:5000/api/blogs/${id}`
      : "http://localhost:5000/api/blogs"; // 

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData), // 
      });

      if (res.ok) {
        toast.success(isEditMode ? "Blog updated!" : "Blog published!");
        navigate("/");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="create-edit-container">
      <h2>{isEditMode ? "Edit Blog" : "Create New Blog"}</h2>
      <form onSubmit={handleSubmit} className="create-edit-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cover"
          placeholder="Image URL"
          value={formData.cover}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your content here..."
          value={formData.content}
          onChange={handleChange}
          rows="10"
          required
        />
        <button type="submit">
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreateEdit;
