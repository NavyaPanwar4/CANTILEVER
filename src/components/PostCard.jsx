import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <img src={post.cover} alt={post.title} />
      <div className="content">
        <h2>{post.title}</h2>
        <p className="summary">{post.summary}</p>
        <div className="meta">
          <span>{post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <Link to={`/post/${post._id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
