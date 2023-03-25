import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostsDashboard from '../../features/Posts/dashboard/PostDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { v4 as uuid } from 'uuid';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
const {postStore} = useStore();

  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore])

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

  function handleCreateOrEditPost(post: Post): void {
    setSubmitting(true);
    if (post.id) {
      agent.Posts.update(post).then(() => {
        setPosts([...posts.filter(x => x.id !== post.id), post]);
        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else {
      post.id = uuid();
      agent.Posts.create(post).then(() => {
        setPosts([...posts, post]);
        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeletePost(id: string) {
    setDeletePost(true);
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(() => {
      setPosts([...posts.filter(x => x.id !== id)]);
    })
  }

  if (postStore.loadingInitial) return <LoadingComponent content=''/>

  return (
    <div className="App">
        <NavBar openForm={handleFormOpen} />
        <PostsDashboard 
        posts={postStore.posts} 
        selectedPost={selectedPost}
        selectPost={handleSelectPost}
        cancelSelectPost={handleCancelSelectPost}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEditPost={handleCreateOrEditPost}
        deletePost={handleDeletePost}
        submitting={submitting}
        />
    </div>
  );
}

export default observer(App);
