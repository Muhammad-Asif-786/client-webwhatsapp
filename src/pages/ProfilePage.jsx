import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {  fetchUserDetails, updateProfile } from "../redux/userSlice.js";
import toast from "react-hot-toast";



export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  // const [status, setStatus] = useState(user.status);
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(user.avatar);


  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
 

  useEffect(() => {
    setPreview(user.avatar);
    setName(user.name);
    // setStatus(user.status);
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    // const result = await dispatch(updateProfile({ name, status, avatarFile }));
    const result = await dispatch(updateProfile({ name, avatarFile }));
    if (updateProfile.rejected.match(result)) {
      toast.error(result.payload);
    } else {
      toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full max-w-md mx-2 sm:mx-0">

        <h2 className="text-2xl font-semibold text-center">Profile</h2>

        {/* Avatar Preview */}
        <div className="flex justify-center">
        <label htmlFor="avatarInput" className="cursor-pointer">
            {preview ? (
            <img
                src={preview}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
            />
            ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
               {loading ? "Loading..." : "No Avatar"}
            </div>
            )}
        </label>
        </div>

        {/* Hidden Upload Avatar */}
        <input
        id="avatarInput"
        type="file"
        accept="image/*,video/*"
        onChange={handleAvatarChange}
        className="hidden"
        />

        {/* Avatar Preview
        <div className="flex justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              No Avatar
            </div>
          )}
        </div>

        {/* Upload Avatar */}
        {/* <input
          type="file"
          accept="image/*,video/*"
          onChange={handleAvatarChange}
          className="w-full"/> 
          */} 

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Status */}
        {/* <div className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
          <div className="font-bold"><p>Select Status:</p></div>
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={status === "Active"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Active
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Inactive
            </label>
          </div>
        </div>   */}

        {/* Save */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
          {loading ? "Loading..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}