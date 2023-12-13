'use client'
import React, { useState } from 'react';
import CommentForm from './commentForm';
type Props_ = {
  options: any[]
  userId: number
  docsId: number
}
function AdDocComments({options, userId, docsId}: Props_) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <a
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="font-medium text-sm ml-2 text-green-600 dark:text-red-500 hover:underline cursor-pointer"
        onClick={openModal}
      >
        + Add Comment
      </a>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
            <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-white dark:text-white">
                  Add a Any comments
                </h3>
                <CommentForm options={options} docsId={docsId} userId={userId}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdDocComments;