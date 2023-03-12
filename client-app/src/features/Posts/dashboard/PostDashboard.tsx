import React from "react";
import { Post } from "../../../app/models/post";
import BlogPost from "../content/BlogPost";
import PostsForm from "../postsform/PostsForm";
import PostList from "./PostList";

interface Props {
  posts: Post[];
  selectedPost: Post | undefined;
  selectPost: (id: string) => void;
  cancelSelectPost: () => void;
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  deletePost: (id: string) => void;
}

export default function PostsDashboard({ posts, selectedPost, selectPost, cancelSelectPost, editMode, closeForm, openForm, deletePost }: Props) {
  return (
    <>
    <PostList posts={posts} selectPost={selectPost} deletePost={deletePost}/>
    {selectedPost && !editMode &&
    <BlogPost 
    post={selectedPost} 
    cancelSelectPost={cancelSelectPost} 
    openForm={openForm}
    />}
    {editMode && <PostsForm closeForm={closeForm} post={selectedPost} createPost={function (post: Post): Promise<void> {
        throw new Error("Function not implemented.");
      } } />}
    </>
  );
}
