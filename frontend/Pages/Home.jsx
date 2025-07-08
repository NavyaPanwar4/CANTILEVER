import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>✨ Welcome to <span>BlogBrew</span></h1>
          <p>Your space to explore, write, and inspire.</p>
          <Link to="/create" className="cta-button">✍️ Start Writing</Link>
        </div>
      </section>

      {/* Blog List */}
      <section className="posts-section">
        <h2 className="section-title">📚 Latest Posts</h2>
        <div className="posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
