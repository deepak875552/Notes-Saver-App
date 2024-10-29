import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-green-400 to-blue-500 min-h-screen">
      {paste ? (
        <div className="bg-white/20 backdrop-blur-lg border border-gray-300 p-6 rounded-xl shadow-lg w-full max-w-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">{paste.title}</h2>
          <textarea
            className="w-full rounded-xl p-4 bg-gray-100 text-gray-800 border border-gray-300 resize-none min-h-[200px] max-h-[500px] overflow-y-auto"
            value={paste.content}
            placeholder="Enter your content here..."
            disabled
            rows={1} // Set rows to 1 for responsive resizing
          ></textarea>
          <p className="mt-4 text-xs text-gray-300">
            Created at: {new Date(paste.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-white text-lg">Paste not found</p>
      )}
    </div>
  );
};

export default ViewPaste;
