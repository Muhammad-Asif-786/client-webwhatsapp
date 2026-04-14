import React, { useState, useRef } from "react";
import socket from "../common/socket.js";
import { SendHorizontal, Plus, X } from "lucide-react";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";

// ⭐ CHANGE: props add karo
const ChatInput = ({ selectedUser, setMessages, currentUser }) => {

  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fileInputRef = useRef(null);

  // ================= FILE SELECT =================
  const handleFileChange = (e) => {

  const files = Array.from(e.target.files);
      if (!files.length) return;
      setSelectedFiles((prev) => [...prev, ...files]);
      e.target.value = null;
    };

  // ================= REMOVE FILE =================
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {

    if (!text.trim() && selectedFiles.length === 0) return;

    try {

      const formData = new FormData();

      formData.append("receiver", selectedUser._id);
      formData.append("message", text);

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // const res = await Axios({
      //   ...SummaryApi.sendMessages,
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      if (selectedUser._id === currentUser._id) {
        alert("Cannot send message to yourself");
        return;
      }

      const res = await Axios({
        ...SummaryApi.sendMessages,
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const savedMessage = res?.data?.data;

      // UI update
      setMessages((prev) => [...prev, savedMessage]);

      // realtime socket
      socket.emit("send_message", savedMessage);

      // reset
      setText("");
      setSelectedFiles([]);

    } catch (err) {

      console.error("Message send failed:", err);

    }
  };

  return (
    <div className="flex flex-col p-2 bg-gray-200">

      {/* FILE PREVIEW */}
      {selectedFiles.length > 0 && (
        <div className="flex space-x-2 mb-2 overflow-x-auto">

          {selectedFiles.map((file, idx) => (

            <div key={idx} className="relative">

              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md"
              />

              <button
                onClick={() => removeFile(idx)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>

            </div>

          ))}

        </div>
      )}

      {/* INPUT AREA */}
      <div className="flex items-center p-3 bg-white rounded-full">

        {/* FILE BUTTON */}
        <div
          className="flex items-center justify-center w-10 h-10 hover:bg-blue-600 rounded-full bg-white cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <Plus size={18} className="text-black hover:text-white" />
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />

        {/* TEXT INPUT */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type message..."
          className="bg-white focus:outline-none w-full ml-2"
        />

        {/* SEND BUTTON */}
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          <SendHorizontal size={16} />
        </button>

      </div>
    </div>
  );
};

export default ChatInput;