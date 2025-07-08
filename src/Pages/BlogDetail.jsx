import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch blog data
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching blog:", err));

    // Load current user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, [id]);

  const handleDelete = async () => {
    if (!currentUser?.token) {
      toast.error("You must be logged in!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`
        },
      });

      if (res.ok) {
        toast.success("Blog deleted successfully!");
        navigate("/");
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to delete.");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Server error.");
    }
  };

  if (!blog) return <div className="loading">Loading blog...</div>;

  const isAuthorOrAdmin =
    currentUser &&
    (currentUser.username === blog.author || currentUser.isAdmin === true);

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p className="author">By {blog.author || "Anonymous"}</p>
      <img
        src={blog.cover || "https://via.placeholder.com/800x400"}
        alt={blog.title}
        className="blog-image"
      />
      <p className="summary">{blog.summary}</p>
      <div className="content">{blog.content}</div>

      {isAuthorOrAdmin && (
        <div className="action-buttons">
          <button className="delete-btn" onClick={handleDelete}>
            🗑️ Delete Post
          </button>
          <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>
            ✏️ Update Post
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
