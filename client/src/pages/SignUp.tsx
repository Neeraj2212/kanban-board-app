import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle sign up and redirect to login page
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    if (username.includes(" ")) {
      toast.error("Username cannot contain spaces!");
      return;
    }

    const response = await axios
      .post("/api/auth/signup", {
        username,
        password,
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    if (response && response.data) {
      toast.success("Account created successfully!");
      setUsername("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <div className="h-screen min-h-screen signup-page">
      <form
        onSubmit={(e) => handleSignUp(e)}
        className="grid place-content-center h-screen w-[40vw] min-w-[400px] max-w-[600px] bg-[#b2beed]"
      >
        <h1 className="mb-5 text-3xl">Sign Up</h1>
        <div className="flex mb-5 flex-col">
          <label htmlFor="username" className="text-xl mb-1">
            Username:
          </label>
          <input
            type="text"
            value={username}
            className="p-2 text-lg rounded-md border-solid border-gray-300 shadow-sm"
            required
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex mb-5 flex-col">
          <label htmlFor="password" className="text-xl mb-1">
            Password:
          </label>
          <input
            type="password"
            className="p-2 text-lg rounded-md border-solid border-gray-300 shadow-sm"
            required
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-lg rounded-md border-none bg-[#0077ff] 
          text-white cursor-pointer shadow-md"
        >
          Sign Up
        </button>
        <p className="mt-4 text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1900ff] hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
