/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        };

        try {
            const response = await loginUser(data).unwrap();
            const { token, user } = response;
            dispatch(setUser({ user }));
            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate("/");
            }, 2000); // Chuyển hướng sau 2 giây
        } catch (error) {
            toast.error("Please provide a valid email and password", {
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
                <h2 className="text-2xl font-semibold pt-5">Login here</h2>
                <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" name="email" id="email"
                        placeholder="Email Address" required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3" />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" name="password" id="password"
                        placeholder="Password" required
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
                    
                    <button type="submit" className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 
                    font-medium py-3 rounded-md" disabled={loginLoading}>
                        {loginLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="my-5 italic text-sm text-center">Don't have an account?
                    <Link to="/register" className="text-red-700 px-1 underline">Register</Link> here.
                </p>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Login;
