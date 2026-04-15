import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios.js";
import ContactItem from "./ContactItem.jsx";
import SummaryApi from "../common/SummaryApi.js";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

const Sidebar = ({ setSelectedUser, selectedUser }) => {
  const user = useSelector((state) => state.user);
  const userId = user?._id; // ✅ logged-in user id

  const [contacts, setContacts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function getContacts() {
      try {
        // backend returns all users including self
        const res = await Axios({ ...SummaryApi.getAllUsers });
        setContacts(res.data.data || []);
      } catch (err) {
        console.error("Contacts fetch error:", err);
      }
    }

    getContacts();
  }, []);

  // Filter contacts based on search text
  const filteredContactsWithoutMe = contacts
    .filter((contact) => contact._id !== userId) // ✅ remove self
    .filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );

  return (
    <div className="w-1/3 border-r border-gray-300 overflow-auto">
      <h3 className="p-2 font-semibold text-lg">Chat's</h3>

      <div className="flex mx-2 p-2">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search here..."
            className="w-full pl-10 p-2 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring focus:ring-green-400"
          />
        </div>
      </div>

      {/* Render contacts (without self) */}
      {filteredContactsWithoutMe.map((contact) => (
        <ContactItem
          key={contact._id}
          contact={contact}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          userId={userId} // optional: for "(You)" display if needed elsewhere
        />
      ))}
    </div>
  );
};

export default Sidebar;