import React, { useState } from "react";
import { signinApi } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";


export default function SignIn(){
    const navigate = useNavigate()
    const [FormData , setFormData] = useState({
        email: "",
        password: "",
    })
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...FormData,
            [e.target.name] : e.target.value
        })
    }
    const handlesubmit = async() => {
        try {
            const response = await signinApi(FormData)
            console.log("login", response)
            navigate("/home")
        } catch (error) {
            console.log("error: ",error)
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg w-96">
                <h1 className="text-white text-2xl font-bold mb-6">Sign In</h1>
                <input
                    name="email"
                    value={FormData.email}
                    onChange={handlechange}
                    placeholder="Email"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                 />
                <input
                    name="password"
                    value={FormData.password}
                    onChange={handlechange}
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    type="password"
                />
                <button 
                    onClick={handlesubmit}
                    className="w-full bg-indigo-600 text-white p-2 rounded">
                    SignIn
                </button>
                <p className="text-white text-m  mt-2">
                    Don't have an account? <Link to="/Signup" className="text-blue-400">Signup</Link>
                </p>
            </div>

        </div>
    )
}