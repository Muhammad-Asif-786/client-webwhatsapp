import React from "react";

const ContactItem = ({ contact, setSelectedUser, selectedUser, userId  }) => {

  const isSelected = selectedUser?._id === contact._id;

  return (
    <div
      onClick={() => setSelectedUser(contact)}
      className={`flex items-center p-2 cursor-pointer my-4 round  ed-lg
      ${isSelected ? "bg-gray-100" : "hover:bg-gray-100"}`}
    >
      <img
        src={contact.avatar || "/default-avatar.png"}
        alt={contact.name}
        className="w-10 h-10 rounded-full mr-2 object-cover"
      />

      <div>
        <p>{contact.name} {contact._id === userId && "(You)"}</p>
        <p className="text-xs text-gray-500">{contact.status}</p>
      </div>
    </div>
  );
};

export default ContactItem;