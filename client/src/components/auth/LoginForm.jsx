import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import Input from "../common/Input";
import Button from "../common/Button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(139,92,246,.15)]"
    >
      <h2 className="text-4xl font-bold text-white">
        Welcome Back 👋
      </h2>

      <p className="mt-2 mb-8 text-slate-400">
        Login to continue
      </p>

      <Input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<FaEnvelope />}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<FaLock />}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between text-sm text-slate-400">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Remember me
        </label>

        <button
          type="button"
          className="text-violet-400 hover:text-violet-300"
        >
          Forgot Password?
        </button>
      </div>

      <Button type="submit">
        Login
      </Button>

      <p className="mt-8 text-center text-slate-400">
        Don't have an account?{" "}
        <span className="cursor-pointer text-violet-400 hover:underline">
          Register
        </span>
      </p>
    </form>
  );
}

export default LoginForm;