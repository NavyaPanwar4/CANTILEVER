import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log("storedUser from localStorage:", storedUser);

  if (!storedUser || !storedUser.username) {
    navigate("/login");
    return;
  }

  setUser(storedUser);

  fetch(`http://localhost:5000/api/blogs/user/${storedUser.username}`)
    .then((res) => res.json())
    .then((data) => setUserBlogs(data))
    .catch((err) => console.error("Error fetching user blogs:", err));
}, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <h2>👤 {user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <h3>Your Blog Posts</h3>
      {userBlogs.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="user-blog-list">
          {userBlogs.map((blog) => (
            <li key={blog._id} onClick={() => navigate(`/post/${blog._id}`)}>
              📌 {blog.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
