import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostsDashboard from '../../features/Posts/dashboard/PostDashboard';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

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

  return (
    <div className="App">
        <NavBar />
        <PostsDashboard 
        posts={posts} 
        selectedPost={selectedPost}
        selectPost={handleSelectPost}
        cancelSelectPost={handleCancelSelectPost}
        />
    </div>
  );
}

export default App;
