import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateEdit.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    cover: "",
    content: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
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
      .catch((err) => {
        console.error("Failed to load post", err);
        toast.error("Failed to load blog data");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser?.token) return toast.error("You must be logged in!");

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Post updated successfully!");
        navigate(`/post/${id}`);
      } else {
        const data = await res.json();
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      toast.error("Server error");
    }
  };

  return (
    <div className="create-edit-container">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleUpdate} className="blog-form">
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
          placeholder="Cover Image URL"
          value={formData.cover}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          rows="8"
          required
        ></textarea>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditPost;
