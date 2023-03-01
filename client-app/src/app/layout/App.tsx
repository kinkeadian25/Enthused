import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostsDashboard from '../../features/Posts/dashboard/PostDashboard';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>('http://localhost:5000/api/posts').then(response => {
      setPosts(response.data);
    })
  }, [])

  return (
    <div className="App">
        <NavBar />
        <PostsDashboard posts={posts} />
    </div>
  );
}

export default App;
