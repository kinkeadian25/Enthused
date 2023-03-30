import { observer } from "mobx-react-lite";
import React, { useState, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer(function PostList() {
  const {postStore} = useStore();
  const { deletePost, postsByDate, loading} = postStore;

  const [target, setTarget] = useState(''); 

  function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deletePost(id);
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="w-2/3">
          <div className="grid grid-cols-1 gap-4">
            {postsByDate.map((post) => (
              <div
                key={post.id}
                className="bg-indigo-300 overflow-hidden shadow-lg rounded-lg relative"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gray-100 rounded-md p-2">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5m14-2h-4l-1-3h-6l-1 3H5v-4a2 2 0 012-2h10a2 2 0 012 2v4z"
                        />
                      </svg>
                    </div>
                    <NavLink to={`/posts/${post.id}`} className="ml-5 w-0 flex-1" >
                      <dl>
                        <dt className="text-lg font-medium text-gray-500 truncate hover:underline hover:text-black">
                          {post.title}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-sm font-semibold text-gray-900 hover:underline hover:text-black">
                            {post.summary.split(" ").slice(0, 20).join(" ")}
                          </div>
                        </dd>
                        <dd className="mt-1 text-sm text-gray-500">
                          Created on {post.date.split("T")[0]}
                          
                        </dd>
                        <dd className="mt-1 text-sm text-gray-500">
                          <div className="mt-2 flex-shrink-0 flex">
                            <div className="px-2 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                              {post.category}
                            </div>
                          </div>
                        </dd>
                      </dl>
                    </NavLink>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0">
                  <button name={post.id} onClick={(e) => handlePostDelete(e, post.id)} disabled={loading && target === post.id} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
})

