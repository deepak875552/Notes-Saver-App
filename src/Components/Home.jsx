import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 min-h-screen">
      <div className="flex flex-row gap-4 items-center justify-center w-full max-w-2xl">
        <input
          className="p-3 rounded-xl w-2/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-md"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-500"
        >
          {pasteId ? "Update My Notes" : "Create Note"}
        </button>
      </div>
      <div className="mt-6 w-full max-w-2xl">
        <textarea
          className="w-full p-4 rounded-xl text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md resize-none transition-shadow duration-200 ease-in-out"
          value={value}
          placeholder="Enter your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={10}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
