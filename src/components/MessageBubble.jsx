import React from "react";
import moment from "moment";

const MessageBubble = ({ msg, currentUser }) => {
  // const isSender = msg.senderId === currentUser?._id;
  // ⭐ CHANGE HERE: backend me sender field use ho raha hai, senderId nahi
      const isSender = msg.sender === currentUser?._id;

  return (
    <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isSender ? "bg-green-500 text-white" : "bg-white"
        }`}
      >
        { msg.message}

        {/* ⭐ ADD THIS BLOCK */}
          {msg.files && msg.files.length > 0 && (
            <div className="mt-2">
              {msg.files.map((file, index) => (

                <img
                  key={index}
                  src={file}   // ⭐ Cloudinary URL
                  alt="attachment"
                  className="w-40 rounded-lg mt-2"
                />

              ))}
            </div>
          )}


        <p className="text-xs opacity-70 text-right">
          {moment(msg.createdAt).format("hh:mm A")}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;


// import moment from "moment";

// const MessageBubble = ({ msg, currentUser }) => {

//   // ⭐ Highlight 1: senderId ko safely compare karo (object ya string dono handle)
//   const senderId = msg.senderId?._id || msg.senderId || msg.sender;
//   const isSender = senderId === currentUser._id;

//   return (
//     <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
//       {/* ⭐ Highlight 2: Message bubble styling like WhatsApp */}
//       <div
//         className={`px-4 py-2 rounded-lg max-w-xs
//         ${isSender ? "bg-green-500 text-white" : "bg-white text-black"} 
//         break-words`} // ⭐ break long words
//       >
//         {/* ⭐ Highlight 3: show text, image or video */}
//         {msg.text || msg.message}

//         {/* ⭐ Highlight 4: Timestamp */}
//         <div className="text-xs text-gray-400 mt-1 text-right">
//           {moment(msg.createdAt).format("h:mm A")}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageBubble;



// import moment from "moment";

// const MessageBubble = ({ msg, currentUser }) => {

//   // ⭐ senderId normalize
//   const senderId = msg.senderId?._id || msg.senderId || msg.sender;
//   const isSender = senderId === currentUser._id;

//   return (
//     <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>

//       {/* <div
//         className={`px-4 py-2 rounded-lg max-w-xs
//         ${isSender ? "bg-green-500 text-white" : "bg-white text-black"} 
//         wrap-break-word`}   // ⭐ FIXED (wrap-break-words → break-words)
//       > */}
//       <div
//         className={`px-4 py-2 rounded-lg max-w-xs w-fit
//         ${isSender ? "bg-green-500 text-white" : "bg-white text-black"} 
//         wrap-break-word`}
//       >

//         {/* ⭐ TEXT MESSAGE */}
//         {msg.text || msg.message}

//         {/* ⭐ IMAGE */}
//         {msg.file && msg.file.match(/\.(jpeg|jpg|png|gif|webp)$/) && (
//           <img
//             src={msg.file}
//             alt="chat-img"
//             className="mt-2 rounded-lg max-w-55"
//           />
//         )}

//         {/* ⭐ VIDEO */}
//         {msg.file && msg.file.match(/\.(mp4|webm|ogg)$/) && (
//           <video controls className="mt-2 rounded-lg max-w-55">
//             <source src={msg.file} />
//           </video>
//         )}

//         {/* ⭐ FILE (pdf/doc etc) */}
//         {msg.file && msg.file.match(/\.(pdf|doc|docx|txt)$/) && (
//           <a
//             href={msg.file}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block mt-2 text-blue-500 underline"
//           >
//             Open File
//           </a>
//         )}

//         {/* ⭐ TIME */}
//         <div className="text-xs text-white mt-1 text-right">
//           {moment(msg.createdAt).format("h:mm A")}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MessageBubble;