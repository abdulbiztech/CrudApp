import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import UpdateForm from "./components/UpdateForm";
import UserList from "./components/UserList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const fetchUserDetails = () => {
    axios
      .get("http://localhost:5000/items/")
      .then((response) => {
        console.log(response);
        setUsers(response.data?.items);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSignUp = () => {
    setShowSignUpForm(true);
  };

  const handleCloseSignUpForm = () => {
    setShowSignUpForm(false);
  };

  const handleUpdate = (userId) => {
    console.log("userId", userId);
    const user = users.find((user) => user._id === userId);
    if (user) {
      setUserToUpdate(user);
      setShowUpdateForm(true);
    } else {
      console.error("User not found");
    }
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setUserToUpdate(null);
  };

  const handleDelete = (userId) => {
    console.log("userId", userId);
    axios
      .delete(`http://localhost:5000/items/${userId}`)
      .then((response) => {
        setUsers(users.filter((user) => user.userId !== userId));
        fetchUserDetails();
        toast.error("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-lg font-semibold">
            CRUD OPERATION
          </span>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignUp}
          >
            Add User
          </button>
        </div>
      </nav>
      {showSignUpForm && (
        <SignUpForm
          handleCloseSignUpForm={handleCloseSignUpForm}
          fetchUserDetails={fetchUserDetails}
        />
      )}

      {showUpdateForm && (
        <UpdateForm
          userToUpdate={userToUpdate}
          handleCloseUpdateForm={handleCloseUpdateForm}
          fetchUserDetails={fetchUserDetails}
        />
      )}

      <UserList
        users={users}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
