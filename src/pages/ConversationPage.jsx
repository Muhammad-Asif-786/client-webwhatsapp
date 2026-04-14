import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import { useSelector } from "react-redux";
import ChatBox from "../components/ChatBox.jsx";

const ConversationPage = () => {
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchConversations() {
      if (!userId) return;

      try {
        const res = await Axios({
          ...SummaryApi.getConversation(userId),
        });

        // Sort so that self account always on top
        let convs = res.data.data || [];
        convs.sort((a, b) => {
          // self account top
          if (a.members.some((m) => m._id === userId)) return -1;
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        setConversations(convs);
      } catch (err) {
        console.error("Fetch conversations error:", err);
      }
    }

    fetchConversations();
  }, [userId]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-300 overflow-auto p-2">
        <h3 className="p-2 font-semibold text-lg">Chats</h3>
        {conversations.map((conv) => {
          const otherUser = conv.members.find((m) => m._id !== userId);
          const self = conv.members.find((m) => m._id === userId);

          return (
            <div
              key={conv._id}
              onClick={() => setSelectedUser(otherUser)}
              className={`flex items-center p-2 cursor-pointer my-2 rounded-lg
                ${selectedUser?._id === otherUser?._id ? "bg-gray-100" : "hover:bg-gray-100"}`}
            >
              <img
                src={(otherUser?.avatar || self?.avatar) || "/default-avatar.png"}
                alt={otherUser?.name || self?.name}
                className="w-10 h-10 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="font-medium">
                  {otherUser?.name || self?.name}{" "}
                  {self && !otherUser && "(You)"}
                </p>
                <p className="text-xs text-gray-500">
                  {conv.lastMessage || "Say hi!"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ChatBox */}
      <div className="w-2/3">
        <ChatBox selectedUser={selectedUser} currentUser={user} />
      </div>
    </div>
  );
};

export default ConversationPage;