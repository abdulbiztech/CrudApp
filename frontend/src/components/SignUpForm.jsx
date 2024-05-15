import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";
function SignUpForm({ handleCloseSignUpForm, fetchUserDetails }) {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        dob: "",
        phone: "",
        gender: ""
    });

    const handleFormChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/items/", newUser)
            .then((response) => {
                console.log("User signed up successfully:", response.data);
                handleCloseSignUpForm();
                fetchUserDetails();
                toast.success("Create user successfully");
            })
            .catch((error) => {
                console.error("Error signing up:", error);
                toast.error("Error creating user");
            });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md form-popup">
                <h2 className="text-lg font-semibold mb-4">Add User</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newUser.name}
                            onChange={handleFormChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleFormChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="dob"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={newUser.dob}
                            onChange={handleFormChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={newUser.phone}
                            onChange={handleFormChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Gender
                        </label>
                        <select className="form-select" name="gender" value={newUser.password} onChange={handleFormChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCloseSignUpForm}
                            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
