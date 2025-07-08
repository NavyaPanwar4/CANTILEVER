import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import "./SinglePost.css";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error("Failed to load blog");
      }
    };

    fetchPost();
  }, [id]);

  const isAuthorOrAdmin =
    user &&
    post &&
    (user.userId === post.author?._id || user.isAdmin);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        toast.success("Blog deleted!");
        navigate("/");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (err) {
      toast.error("Server error");
      console.error("Delete error:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div className="single-post-container">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author?.username}</p>
      <img src={post.cover} alt="Cover" className="post-cover" />
      <p className="post-summary">{post.summary}</p>
      <p className="post-content">{post.content}</p>

      {isAuthorOrAdmin && (
        <div className="post-actions">
          <Link to={`/edit/${post._id}`} className="edit-btn">✏️ Edit</Link>
          <button onClick={handleDelete} className="delete-btn">🗑️ Delete</button>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmModal
          message="Are you sure you want to delete this blog?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default SinglePost;
