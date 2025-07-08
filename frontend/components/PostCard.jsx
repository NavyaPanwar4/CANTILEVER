// PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="modern-post-card">
      <Link to={`/post/${post._id}`} className="card-link">
        <div className="card-image-container">
          <img src={post.cover} alt={post.title} className="card-image" />
        </div>
        <div className="card-body">
          <h3 className="card-title">{post.title}</h3>
          <p className="card-meta">
            ✍️ {post.author?.username} &nbsp; • &nbsp; 🗓️{" "}
            {new Date(post.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="card-summary">{post.summary.slice(0, 100)}...</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
