import React from "react";
import { Post } from "../../../app/models/post";

interface Props {
    posts: Post[];
}

export default function PostList({ posts }: Props) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white overflow-hidden shadow rounded-lg"
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
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {post.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg font-semibold text-gray-900">
                        {post.summary}
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <div className="px-2 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                          {post.category}
                        </div>
                      </div>
                    </dd>
                    <dd className="mt-1 text-sm text-gray-500">
                      Created on {post.date.split("T")[0]}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}