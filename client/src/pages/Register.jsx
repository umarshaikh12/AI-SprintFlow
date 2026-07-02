import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful 🎉");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Left */}

      <div className="hidden w-1/2 flex-col justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 px-20 lg:flex">

        <p className="font-semibold uppercase tracking-widest text-violet-400">
          🚀 AI SprintFlow
        </p>

        <h1 className="mt-6 text-6xl font-bold leading-tight text-white">
          Start Building.
          <br />
          Smarter.
          <br />
          <span className="text-violet-500">
            With AI.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-xl leading-8 text-slate-400">
          Join AI SprintFlow and manage your projects,
          automate sprint planning and boost your team's productivity.
        </p>

      </div>

      {/* Right */}

      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl"
        >

          <h2 className="text-4xl font-bold text-white">
            Create Account
          </h2>

          <p className="mb-8 mt-2 text-slate-400">
            Register to continue
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none focus:border-violet-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
          >
            Create Account
          </button>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer text-violet-400 hover:underline"
            >
              Login
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;