import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import socket from "./common/socket.js";

const App = () => {
  const userId = useSelector((state) => state.user?._id);
  console.log("userid1234567", userId)

  useEffect(() => {
    if (userId) {
      // ⭐ user room join
      socket.emit("join", userId);
    }
  }, [userId]);

  return (
    <>
      <main className='h-120'>
        <Outlet />
      </main>
      <Toaster/>
    </>
  )
}

export default App;