/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password
        };
        try {
            await registerUser(data).unwrap();
            toast.success("Registration successful!", {
                position: "top-right",
                autoClose: 2000, // Tự động đóng sau 2 giây
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Điều hướng sau 2 giây
        } catch (error) {
            toast.error("Registration failed. Please try again.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow bg-white mx-auto p-8">
                <h2 className="text-2xl font-semibold pt-5">Register now</h2>
                <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text" name="username" id="username"
                        placeholder="Username" required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3" />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" name="email" id="email"
                        placeholder="Email Address" required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
                
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" name="password" id="password"
                        placeholder="Password" required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
                    
                    <button type="submit" className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 
                    font-medium py-3 rounded-md" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="my-5 italic text-sm text-center">Already have an account?
                    <Link to="/login" className="text-red-700 px-1 underline">Login</Link> here.
                </p>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Register;
