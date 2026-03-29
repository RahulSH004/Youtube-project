import React, { useState } from "react"
import { signupApi } from "../api/auth"
import { Link } from "react-router-dom"

export default function Signup(){

    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        channelName: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setformData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async () => {
        try {
            const response = await signupApi(formData)
            console.log("success", response)
        } catch (error) {
            console.log("Error:", error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg w-96">
                <h1 className="text-white text-2xl font-bold mb-6">Sign Up</h1>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />
                <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    type="password"
                />
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 mb-4 rounded bg-gray-600 text-white">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                <input
                    name="channelName"
                    value={formData.channelName}
                    onChange={handleChange}
                    placeholder="Channel Name"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 text-white p-2 rounded"
                >
                    Sign Up
                </button>
                <p className="text-white items-center justify-center text-m  mt-2">
                    Already have an account? <Link to="/SignIn" className="text-blue-400">SignIn</Link>
                </p>
            </div>
        </div>
    )
}