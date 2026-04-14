import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar.jsx";
import ChatBox from "../components/ChatBox.jsx";

const Home = () => {
  const user = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar
        currentUser={user}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      
      <ChatBox 
       currentUser={user} 
       selectedUser={selectedUser} 
      />
    </div>
  );
};

export default Home;