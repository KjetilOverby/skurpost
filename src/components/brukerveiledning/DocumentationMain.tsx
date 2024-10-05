import React, { useState } from "react";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="3xl:mx-[60rem] mx-96 mt-20 flex min-h-screen">
      <aside className="w-64  p-5">
        <div>
          <h1 className="mb-2 font-bold text-black">Postoppsett</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("introduction")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "introduction" ? "font-bold" : ""
              }`}
            >
              Postning
            </button>
            <button
              onClick={() => setActiveTab("createPost")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "createPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Lag post
            </button>
            <button
              onClick={() => setActiveTab("editPost")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Rediger post
            </button>
            <button
              onClick={() => setActiveTab("rawMeasure")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Råmål
            </button>
            <button
              onClick={() => setActiveTab("rawMeasure")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Dele opp verdi råmål
            </button>
            <button
              onClick={() => setActiveTab("editPost")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Alternativ utfylling
            </button>
          </nav>
        </div>
        <div>
          <h1 className="mb-2 mt-5 font-bold text-black">Skurlister og søk</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("listCreate")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "introduction" ? "font-bold" : ""
              }`}
            >
              Lag skurliste
            </button>
            <button
              onClick={() => setActiveTab("editList")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Rediger skurliste
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "createPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Søk etter poster
            </button>
            <button
              onClick={() => setActiveTab("buffer")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "createPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Buffer
            </button>
            <button
              onClick={() => setActiveTab("buffer")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "createPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Status
            </button>
          </nav>
        </div>
        <div>
          <h1 className="mb-2 mt-5 font-bold text-black">Innstillinger</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("generelt")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "generelt" ? "font-bold" : ""
              }`}
            >
              Generelt
            </button>
            <button
              onClick={() => setActiveTab("editList")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "editPost" ? "bg-gray-300 font-bold" : ""
              }`}
            >
              Definer ringer
            </button>
          </nav>
        </div>
      </aside>

      {/* Hovedinnhold */}
      <main className="flex-1 bg-white p-10">
        {activeTab === "introduction" && (
          <section>
            <h1 className="mb-4 text-3xl font-bold text-gray-600">Postning</h1>
            <p className="text-gray-500">
              Welcome to the guide for creating and managing posts.
            </p>
            <div className="3xl:w-[50rem] w-[40rem]">
              <img
                className="w-full"
                src="https://lh3.googleusercontent.com/pw/AP1GczMX0FaPoH1x6UoQUxvrB3bN7BLHPhAb0B6MF_wAihBOJSTdlFa_x8YaVOhmWeIJsHBHcPiSrhrxyBRCN_K7rN3Us-yMGg4KeDIA5np0DCZEXZ9co1nPmXRrXgsbfNz4mpbH_NYwoO71TsjGxUfGpFxU=w1170-h729-s-no?authuser=0"
                alt=""
              />
            </div>
          </section>
        )}
        {activeTab === "createPost" && (
          <section>
            <h1 className="mb-4 text-3xl font-bold">Create a New Post</h1>
            <p>
              To create a new post, click on Edit in the header, then select
              Create New Post.
            </p>
          </section>
        )}
        {activeTab === "editPost" && (
          <section>
            <h1 className="mb-4 text-3xl font-bold">Edit an Existing Post</h1>
            <p>
              To edit a post, select the post you wish to modify from the list.
            </p>
          </section>
        )}
        {activeTab === "rawMeasure" && (
          <section>
            <h1 className="mb-4 text-3xl font-bold">Råmål</h1>
            <p>
              To edit a post, select the post you wish to modify from the list.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Documentation;
