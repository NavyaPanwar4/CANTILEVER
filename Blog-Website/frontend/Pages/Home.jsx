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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="brand-name">BlogBrew</span> 📝</h1>
          <p>Where stories come to life. Share your thoughts, explore perspectives, and inspire the world.</p>
          <Link to="/create" className="hero-btn">✍️ Start Writing</Link>
        </div>
      </section>

      {/* Featured Section */}
      {posts.length > 0 && (
        <section className="featured-post">
          <h2>🌟 Featured</h2>
          <div className="featured-card">
            <img src={posts[0].cover} alt="Featured" />
            <div className="featured-content">
              <h3>{posts[0].title}</h3>
              <p>{posts[0].summary.slice(0, 120)}...</p>
              <Link to={`/post/${posts[0]._id}`} className="read-more">Read More →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="posts-section">
        <h2>📝 Latest Posts</h2>
        <div className="posts-grid">
          {posts.length > 1 ? (
            posts.slice(1).map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p>No more posts available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
