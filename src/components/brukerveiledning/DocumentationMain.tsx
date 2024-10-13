import React, { useState } from "react";
import Image from "next/image";
import PostningSection from "./PostningSection";
import CreatePostSection from "./CreatePostSection";
import ScreenSection from "./ScreenSection";
import AltUtfyllingSection from "./AltUtfyllingSection";
import DivideRingsSection from "./DivideRingsSection";
import CreateEditList from "./CreateEditList";
import SearchSection from "./SearchSection";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  return (
    <div className="mx-40 mt-20 flex min-h-screen bg-gray-100 3xl:mx-[50rem]">
      <aside className="w-64  p-5">
        <div>
          <h1 className="mb-2 font-bold text-black">Postoppsett</h1>
          <nav className="w-96 space-y-4 ">
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
                activeTab === "createPost" ? "font-bold" : ""
              }`}
            >
              Lag/rediger post
            </button>

            <button
              onClick={() => setActiveTab("rawMeasure")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "rawMeasure" ? " font-bold" : ""
              }`}
            >
              Del opp Ringer
            </button>

            <button
              onClick={() => setActiveTab("alt")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "alt" ? " font-bold" : ""
              }`}
            >
              Alternativ utfylling
            </button>
            <button
              onClick={() => setActiveTab("screen")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "screen" ? " font-bold" : ""
              }`}
            >
              Skjerm/nettleser
            </button>
          </nav>
        </div>
        <div>
          <h1 className="mb-2 mt-5 font-bold text-black">Skurlister og søk</h1>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("list")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200 ${
                activeTab === "list" ? "font-bold" : ""
              }`}
            >
              Lag/rediger skurliste
            </button>

            <button
              onClick={() => setActiveTab("search")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "search" ? " font-bold" : ""
              }`}
            >
              Søk etter poster
            </button>
            <button
              onClick={() => setActiveTab("buffer")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "creat" ? " font-bold" : ""
              }`}
            >
              Buffer
            </button>
            <button
              onClick={() => setActiveTab("buffer")}
              className={`block w-full rounded-lg px-5 text-left text-gray-500 hover:bg-gray-200  ${
                activeTab === "creat" ? " font-bold" : ""
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
                activeTab === "editPost" ? "font-bold" : ""
              }`}
            >
              Definer ringer
            </button>
          </nav>
        </div>
      </aside>

      {/* Hovedinnhold */}
      <main className="flex-1 bg-white pl-10">
        {activeTab === "introduction" && <PostningSection />}
        {activeTab === "createPost" && <CreatePostSection />}
        {activeTab === "alt" && <AltUtfyllingSection />}
        {activeTab === "rawMeasure" && <DivideRingsSection />}
        {activeTab === "screen" && <ScreenSection />}
        {activeTab === "list" && <CreateEditList />}
        {activeTab === "search" && <SearchSection />}
      </main>
    </div>
  );
};

export default Documentation;
