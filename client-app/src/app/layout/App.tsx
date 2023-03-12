import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostsDashboard from '../../features/Posts/dashboard/PostDashboard';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [deletePost, setDeletePost] = useState(false);

  useEffect(() => {
    axios.get<Post[]>('http://localhost:5000/api/posts').then(response => {
      setPosts(response.data);
    })
  }, [])

  function handleSelectPost(id: string) {
    setSelectedPost(posts.find(x => x.id === id));
  }

  function handleCancelSelectPost() {
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectPost(id) : handleCancelSelectPost();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeletePost(id: string) {
    setDeletePost(true);
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(() => {
      setPosts([...posts.filter(x => x.id !== id)]);
    })
  }

  return (
    <div className="App">
        <NavBar openForm={handleFormOpen} />
        <PostsDashboard 
        posts={posts} 
        selectedPost={selectedPost}
        selectPost={handleSelectPost}
        cancelSelectPost={handleCancelSelectPost}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        deletePost={handleDeletePost}
        />
    </div>
  );
}

export default App;
