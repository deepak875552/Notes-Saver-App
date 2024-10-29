import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste deleted");
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 min-h-screen">
      <input
        className="p-3 rounded-full w-full max-w-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg transition-transform duration-300 transform hover:scale-105"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-8 items-center">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white/10 backdrop-blur-lg border border-gray-300 p-5 rounded-xl shadow-lg w-full max-w-2xl text-white"
            >
              <h2 className="text-xl font-semibold mb-2">{paste.title}</h2>
              <p className="mb-4">{paste.content}</p>
              <div className="flex gap-4 justify-center mt-4">
                <button className="text-blue-300 hover:text-blue-500">
                  <a href={`/?pasteId=${paste._id}`}>Edit</a>
                </button>
                <button className="text-green-300 hover:text-green-500">
                  <a href={`pastes/${paste._id}`}>View</a>
                </button>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="text-yellow-300 hover:text-yellow-500"
                >
                  Copy
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-200 text-lg">No pastes found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
