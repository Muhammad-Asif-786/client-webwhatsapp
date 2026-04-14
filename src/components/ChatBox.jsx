import React, { useEffect, useState, useRef } from "react";
import Axios from "../utils/Axios.js";
import MessageBubble from "./MessageBubble.jsx";
import ChatInput from "./ChatInput.jsx";
import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import socket from "../common/socket.js";
import CallContainer from "./CallContainer.jsx";

const ChatBox = ({ selectedUser, currentUser }) => {
  
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("join", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!selectedUser) return;

    async function getMessages() {
      try {
        const res = await Axios({
          ...SummaryApi.getMessages(selectedUser._id),
        });
        setMessages(res.data.data?.reverse() || []);
      } catch (err) {
        AxiosToastError(err);
      }
    }

    getMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      if (
        (newMessage.sender === selectedUser?._id &&
          newMessage.receiver === currentUser?._id) ||
        (newMessage.sender === currentUser?._id &&
          newMessage.receiver === selectedUser?._id)
      ) {
        setMessages((prev) => {
          const exists = prev.find((m) => m._id === newMessage._id);
          if (exists) return prev;
          return [...prev, newMessage];
        });
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser, currentUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="w-7/12 flex justify-center items-center">
        Select chat to start messaging
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#f0f2f5] border-b">

        <div className="flex items-center gap-2">
          <img
            src={selectedUser.avatar || "/default-avatar.png"}
            alt={selectedUser.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{selectedUser.name}</p>
            <p className="text-[11px] text-gray-500">
              {selectedUser.isOnline ? "online" : "offline"}
            </p>
          </div>
        </div>

        <div>
          <CallContainer user={currentUser} selectedUser={selectedUser} />
        </div>

      
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-5 overflow-auto bg-gray-200">
        {messages?.map((msg, index) => (
          <MessageBubble
            key={`${msg._id}-${index}`}
            msg={msg}
            currentUser={currentUser}
          />
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* INPUT */}
      <ChatInput
        selectedUser={selectedUser}
        setMessages={setMessages}
        currentUser={currentUser}
      />

    
    </div>
  );
};

export default ChatBox;






// import React, { useEffect, useState, useRef } from "react";
// import Axios from "../utils/Axios.js";
// import MessageBubble from "./MessageBubble.jsx";
// import ChatInput from "./ChatInput.jsx";
// import SummaryApi from "../common/SummaryApi.js";
// import AxiosToastError from "../utils/AxiosToastError.js";
// import socket from "../common/socket.js";
// import CallModal from "./CallModal.jsx";



// const ChatBox = ({ selectedUser, currentUser }) => {
//   const [messages, setMessages] = useState([]);
//   const chatEndRef = useRef(null);
//   const [showCall, setShowCall] = useState(false);

//   useEffect(() => {
//     if (currentUser?._id) {
//       console.log("Joining socket room:", currentUser._id);
//       socket.emit("join", currentUser._id);
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (!selectedUser) return;

//     async function getMessages() {
//       try {
//         const res = await Axios({
//           ...SummaryApi.getMessages(selectedUser._id)
//         });
//         setMessages(res.data.data?.reverse() || []);
//       } catch (err) {
//         AxiosToastError(err);
//       }
//     }

//     getMessages();
//   }, [selectedUser]);

//   useEffect(() => {
//     socket.on("receive_message", (newMessage) => {
//       if (
//         (newMessage.sender === selectedUser?._id &&
//           newMessage.receiver === currentUser?._id) ||
//         (newMessage.sender === currentUser?._id &&
//           newMessage.receiver === selectedUser?._id)
//       ) {
//         setMessages((prev) => {
//           const exists = prev.find((m) => m._id === newMessage._id);
//           if (exists) return prev;
//           return [...prev, newMessage];
//         });
//       }
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [selectedUser, currentUser]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!selectedUser) {
//     return (
//       <div className="w-7/12 flex justify-center items-center">
//         Select chat to start messaging
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col h-full ">

//       {/* Header */}
//       <div className="flex items-center justify-between p-4 bg-white">

//         {/* LEFT SIDE (USER INFO) */}
//         <div className="flex items-center">
//           <img
//             src={selectedUser.avatar || "/default-avatar.png"}
//             alt={selectedUser.name}
//             className="w-12 h-12 rounded-full object-cover mr-3"
//           />
//           <div>
//             <p className="font-semibold">{selectedUser.name}</p>
//             <p className="text-xs text-gray-500">
//               {selectedUser.isOnline ? "Online" : "Offline"}
//             </p>
//           </div>
          
//         </div>

//         <div className="flex items-center justify-center gap-4 mr-4">
//           <div className=" flex items-center justify-center border border-gray-300 rounded-md px-1">
//             <div>video</div>
//             <div>
//               <button
//               onClick={() => setShowCall(true)}
//               // className="bg-green-500 text-white px-3 py-1 rounded"
//             >
//               📞
//             </button>
//             </div>
//           </div>

//           <div>
//             search
//           </div>

//           <div>
//             dots
//           </div>

//         </div>


//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-5 overflow-auto bg-gray-200">
//         {messages?.map((newMessage, index) => (
//           <MessageBubble
//             key={`${newMessage._id}-${index}`}
//             msg={newMessage}
//             currentUser={currentUser}
//           />
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat input */}
//       <ChatInput
//         selectedUser={selectedUser}
//         setMessages={setMessages}
//         currentUser={currentUser}
//       />
//       {showCall && (
//         <CallModal
//           selectedUser={selectedUser}
//           currentUser={currentUser}
//           setShowCall={setShowCall}
//         />
//       )}
//     </div>
//   );
// };

// export default ChatBox;







// import React, { useEffect, useState, useRef } from "react";
// import Axios from "../utils/Axios.js";
// import MessageBubble from "./MessageBubble.jsx";
// import ChatInput from "./ChatInput.jsx";
// import SummaryApi from "../common/SummaryApi.js";
// import AxiosToastError from "../utils/AxiosToastError.js";
// import socket from "../common/socket.js";

// const ChatBox = ({ selectedUser, currentUser }) => {
//   const [messages, setMessages] = useState([]);
//   const chatEndRef = useRef(null); // ⭐ scroll to bottom

//   // ⭐ socket room join
//   useEffect(() => {
//     if (currentUser?._id) {
//       console.log("Joining socket room:", currentUser._id);
//       socket.emit("join", currentUser._id);
//     }
//   }, [currentUser]);

//   // ⭐ fetch old messages
//   useEffect(() => {
//     if (!selectedUser) return;

//     async function getMessages() {
//       try {
//         const res = await Axios({
//           ...SummaryApi.getMessages(selectedUser._id)
//         });
//         setMessages(res.data.data?.reverse() || []);
//         console.log("getMessages_res", res);
//       } catch (err) {
//         AxiosToastError(err);
//       }
//     }

//     getMessages();
//   }, [selectedUser]);

//   // ⭐ receive messages via socket with duplicate check
//   useEffect(() => {
//     socket.on("receive_message", (newMessage) => {
//       if (
//         (newMessage.sender === selectedUser?._id &&
//           newMessage.receiver === currentUser?._id) ||
//         (newMessage.sender === currentUser?._id &&
//           newMessage.receiver === selectedUser?._id)
//       ) {
//         setMessages((prev) => {
//           const exists = prev.find((m) => m._id === newMessage._id);
//           if (exists) return prev;
//           return [...prev, newMessage];
//         });
//       }
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [selectedUser, currentUser]);

//   // ⭐ scroll to bottom on new message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!selectedUser) {
//     return (
//       <div className="w-7/12 flex justify-center items-center">
//         Select chat to start messaging
//       </div>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col h-full">

//       {/* Header */}
//       <div className="flex items-center p-4 bg-white">
//         <img
//           src={selectedUser.avatar || "/default-avatar.png"}
//           alt={selectedUser.name}
//           className="w-12 h-12 rounded-full object-cover mr-3"
//         />
//         <div>
//           <p className="font-semibold">{selectedUser.name}</p>
//           <p className="text-xs text-gray-500">
//             {selectedUser.isOnline ? "Online" : "Offline"}
//           </p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-5 overflow-auto bg-gray-200">
//         {messages?.map((newMessage, index) => (
//           <MessageBubble
//             key={`${newMessage._id}-${index}`} // safe for duplicates
//             msg={newMessage}
//             currentUser={currentUser}
//           />
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Chat input */}
//       <ChatInput
//         selectedUser={selectedUser}
//         setMessages={setMessages}
//         currentUser={currentUser}   // ✅ MUST
//       />
//     </div>
//   );
// };

// export default ChatBox;