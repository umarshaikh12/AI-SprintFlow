import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import { User, Lock, LogOut } from "lucide-react";

import {
    updateProfile,
    changePassword,
} from "../api/authApi";

function Settings() {
    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar />

            <div className="ml-64 flex-1">

                <Navbar />

                <div className="mx-auto max-w-5xl p-8">

                    <h1 className="text-4xl font-bold text-white">
                        Settings
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Manage your account and preferences.
                    </p>

                    {/* Profile */}

                    <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-8">

                        <div className="mb-6 flex items-center gap-3">

                            <User className="text-violet-400" />

                            <h2 className="text-2xl font-semibold text-white">
                                Profile Information
                            </h2>

                        </div>

                        <div className="space-y-5">

                            <div>
                                <label className="mb-2 block text-slate-300">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
                                />
                            </div>

                            <div>

                                <label className="mb-2 block text-slate-300">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white"
                                />

                            </div>

                            <button
                                onClick={async () => {
                                    try {
                                        const response = await updateProfile({
                                            name: user.name,
                                        });

                                        localStorage.setItem(
                                            "user",
                                            JSON.stringify(response.data.user)
                                        );

                                        toast.success("Profile updated!");

                                    } catch (error) {
                                        toast.error(
                                            error.response?.data?.message ||
                                            "Update failed"
                                        );
                                    }
                                }}
                                className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-500"
                            >
                                Update Profile
                            </button>

                        </div>

                    </div>

                    {/* Security */}

                    <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-900 p-8">

                        <div className="mb-6 flex items-center gap-3">

                            <Lock className="text-violet-400" />

                            <h2 className="text-2xl font-semibold text-white">
                                Security
                            </h2>

                        </div>

                        <div className="space-y-5">

                            <div>

                                <label className="mb-2 block text-slate-300">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    value={passwords.currentPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-violet-500"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block text-slate-300">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-violet-500"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block text-slate-300">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) =>
                                        setPasswords({
                                            ...passwords,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-violet-500"
                                />

                            </div>

                            <button
                                onClick={async () => {

                                    if (
                                        passwords.newPassword !==
                                        passwords.confirmPassword
                                    ) {
                                        return toast.error(
                                            "Passwords do not match"
                                        );
                                    }

                                    try {

                                        await changePassword({
                                            currentPassword:
                                                passwords.currentPassword,
                                            newPassword:
                                                passwords.newPassword,
                                        });

                                        toast.success(
                                            "Password updated successfully"
                                        );

                                        setPasswords({
                                            currentPassword: "",
                                            newPassword: "",
                                            confirmPassword: "",
                                        });

                                    } catch (error) {

                                        toast.error(
                                            error.response?.data?.message ||
                                            "Failed to update password"
                                        );

                                    }

                                }}
                                className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
                            >
                                Update Password
                            </button>

                        </div>

                    </div>

                    {/* Logout */}

                    <div className="mt-8 rounded-3xl border border-red-700 bg-red-950/20 p-8">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold text-white">
                                    Logout
                                </h2>

                                <p className="mt-2 text-slate-400">
                                    Sign out from your account.
                                </p>

                            </div>

                            <button
                                onClick={() => {
                                    localStorage.clear();

                                    toast.success("Logged out successfully");

                                    navigate("/", { replace: true });
                                }}
                                className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Settings;