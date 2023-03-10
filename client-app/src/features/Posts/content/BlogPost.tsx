import React from "react";
import { Post } from "../../../app/models/post";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface Props {
  post: Post;
  cancelSelectPost: () => void;
  openForm: (id?: string) => void;
}

export default function BlogPost({ post, cancelSelectPost, openForm }: Props) {
  const contentState = convertFromRaw(JSON.parse(post.content));
  const contentHtml = stateToHTML(contentState);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <article>
        <header>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center">
            <img
              className="h-8 w-8 rounded-full object-cover mr-2"
              src="https://images.unsplash.com/photo-1602525905328-bf40e1a78863?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsOGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Avatar"
            />
            <div className="text-sm text-gray-600">{post.date.split("T")[0]}</div>
          </div>
        </header>
        <div className="mt-6 text-gray-700">
          <p>{post.summary}</p>
        </div>
        <div className="mt-6 text-gray-700" dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
        <footer className="mt-8">
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex justify-end">
              <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Share
              </button>
              <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Remember
              </button>
              <button onClick={cancelSelectPost} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Close
              </button>
              <button onClick={() => openForm(post.id)} className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
