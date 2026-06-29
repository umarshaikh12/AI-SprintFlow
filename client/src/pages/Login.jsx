import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const response = await loginUser({
      email,
      password,
    });

    console.log(response.data);

    // Save JWT Token
    localStorage.setItem(
      "token",
      response.data.token
    );

    // Save User
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert("Login Successful 🚀");

    navigate("/dashboard");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950">

        <p className="text-violet-400 font-semibold uppercase tracking-widest">
          🚀 AI SprintFlow
        </p>

        <h1 className="text-6xl font-bold text-white leading-tight mt-6">
          Build Better.
          <br />
          Ship Faster.
          <br />
          <span className="text-violet-500">
            With AI.
          </span>
        </h1>

        <p className="text-slate-400 text-xl mt-8 leading-8 max-w-xl">
          Manage projects, automate sprint planning, generate tasks with AI,
          and collaborate with your team in one place.
        </p>

      </div>

      {/* Right Section */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl"
        >

          <h2 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Login to continue
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
          >
            Login
          </button>

          <p className="text-center text-slate-400 mt-8">
            Don't have an account?{" "}
            <span className="text-violet-400 cursor-pointer hover:underline">
              Register
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;