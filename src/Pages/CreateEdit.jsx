import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CreateEdit.css';

function CreateEdit() {
  const { id } = useParams(); 
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [cover, setCover] = useState('');
  const [content, setContent] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      summary,
      cover,
      content,
      createdAt: new Date().toISOString(),
      author: 'Navya'
    };

    if (isEditing) {
      console.log('Updating Post:', post);
    } else {
      console.log('Creating New Post:', post);
    }
  };

  return (
    <div className="create-edit-container">
      <form className="create-edit-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

export default CreateEdit;
