import { useParams } from 'react-router-dom';
import './BlogDetail.css';

const mockPosts = [
  {
    _id: '1',
    title: '10 Tips to Learn React Effectively',
    summary: 'React is a powerful tool, but mastering it takes time. Here are 10 tips to boost your learning curve.',
    cover: 'https://source.unsplash.com/800x400/?react,code',
    content: `Learning React can be fun if done right! Start with JSX, props, and components...`,
    createdAt: '2025-07-04',
    author: 'Navya'
  },
  {
    _id: '2',
    title: 'How I Built My First Full-Stack App',
    summary: 'This post walks you through how I created my first full-stack application using MERN stack.',
    cover: 'https://source.unsplash.com/800x400/?programming,laptop',
    content: `It all started when I learned Node.js and MongoDB. Here’s the full story of how I put it all together.`,
    createdAt: '2025-06-28',
    author: 'Navya'
  }
];

function BlogDetail() {
  const { id } = useParams();
  const post = mockPosts.find((p) => p._id === id);

  if (!post) return <p style={{ textAlign: 'center' }}>Post not found</p>;

  return (
    <div className="blog-detail">
      <h1>{post.title}</h1>
      <p className="meta">By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</p>
      <img src={post.cover} alt={post.title} />
      <p className="content">{post.content}</p>
    </div>
  );
}

export default BlogDetail;
