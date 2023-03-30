import React, { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Post } from "../../../app/models/post";
import { v4 as uuid } from "uuid";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function PostsForm() {
  const {postStore} = useStore();
  const {createPost, updatePost, 
    loading, loadPost, loadingInitial} = postStore;
  const {id} = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    summary: "",
    content: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (id) loadPost(id).then(post => setPost(post!));
  }, [id, loadPost]);


  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
  if (post && post.content) {
    setTitle(post.title);
    setSummary(post.summary);
    setCategory(post.category);
    const contentState = convertFromRaw(JSON.parse(post.content));
    setEditorState(EditorState.createWithContent(contentState));
  }
}, [post]);

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const date = new Date().toISOString();
    const id = post ? post.id : uuid();
    const newPost: Post = {
      title,
      summary,
      content,
      category,
      date,
      id,
    };
    try {
      await post.id ? updatePost(newPost).then(() => navigate(`/posts/${post.id}`)) : createPost(newPost).then(() => navigate(`/posts/${post.id}`));
      setTitle("");
      setSummary("");
      setCategory("");
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingInitial) return <LoadingComponent />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          {post ? "Share" : "Fix"} your thoughts
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="summary"
          >
            Summary
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="summary"
            type="text"
            placeholder="Enter summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </div>
        <div className="flex justify-end">
        <Link to="/posts">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
          >
            Cancel
          </button>
          </Link>
          <Link to="/posts">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
});


