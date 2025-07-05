import React from "react";
import PostCard from "../components/PostCard";
import "./Home.css";

const mockPosts = [
  {
    _id: "1",
    title: "10 Tips to Learn React Effectively",
    summary: "Master React faster with these proven learning strategies and tools recommended by professionals.",
    cover: "https://images.unsplash.com/photo-1604145559206-e3bce0040e2d",
    createdAt: "2024-07-01",
    author: "Navya"
  },
  {
    _id: "2",
    title: "Building a Full-Stack Blog Platform",
    summary: "Explore how I developed a full-stack blog using React, Node.js, MongoDB, and deployed it on Netlify.",
    cover: "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700",
    createdAt: "2024-06-28",
    author: "Navya"
  },
  {
    _id: "3",
    title: "Top JavaScript Best Practices in 2024",
    summary: "Clean, optimized, and modern JavaScript is the backbone of any great web app. Here's how to write it.",
    cover: "https://images.unsplash.com/photo-1613490900233-141c5560d75d",
    createdAt: "2024-06-20",
    author: "Navya"
  },
  {
    _id: "4",
    title: "CSS Grid vs Flexbox: Which Should You Use?",
    summary: "A clear comparison to help you decide whether to use Grid or Flexbox in your layouts.",
    cover: "https://images.unsplash.com/photo-1634634465913-5bb5600942f2",
    createdAt: "2024-06-15",
    author: "Navya"
  },
  {
    _id: "5",
    title: "Top 5 Frontend Tools Developers Love",
    summary: "From VSCode extensions to testing frameworks — here are the tools frontend devs are using most in 2024.",
    cover: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1",
    createdAt: "2024-06-10",
    author: "Navya"
  },
  {
    _id: "6",
    title: "How to Make Your Portfolio Stand Out",
    summary: "Recruiters see hundreds of portfolios. Here's how to make yours shine with style and substance.",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    createdAt: "2024-06-02",
    author: "Navya"
  }
];

const Home = () => {
  return (
    <div className="page-container">
      <div className="home">
        {mockPosts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;