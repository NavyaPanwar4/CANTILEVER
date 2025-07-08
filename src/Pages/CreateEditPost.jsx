import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateEditPost.css";

const CreateEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    summary: "",
    cover: "",
    content: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Login required!");
      navigate("/login");
      return;
    }

    if (id) {
      setIsEditMode(true);
      fetch(`http://localhost:5000/api/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.title || "",
            summary: data.summary || "",
            cover: data.cover || "",
            content: data.content || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          toast.error("Failed to load post");
        });
    }
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({ ...prev, cover: data.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.message || "Image upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Server error during upload");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isEditMode
      ? `http://localhost:5000/api/blogs/${id}`
      : `http://localhost:5000/api/blogs`;

    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 403) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("user");
        navigate("/login");
      }

      if (res.ok) {
        toast.success(`Blog ${isEditMode ? "updated" : "created"} successfully!`);
        navigate("/");
      } else {
        toast.error(data.message || "Failed to submit post");
      }
    } catch (err) {
      console.error("Error submitting post:", err);
      toast.error("Server error");
    }
  };

  return (
    <div className="create-edit-container">
      <h2>{isEditMode ? "Edit Blog" : "Write New Post"}</h2>
      <form className="create-edit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="summary"
          placeholder="Short Summary"
          value={form.summary}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {form.cover && (
          <img
            src={form.cover}
            alt="Cover Preview"
            style={{
              width: "100%",
              maxHeight: "250px",
              objectFit: "cover",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        )}

        <textarea
          name="content"
          placeholder="Write your blog content here..."
          value={form.content}
          onChange={handleChange}
          rows="10"
          required
        ></textarea>

        <button type="submit">
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateEditPost;
