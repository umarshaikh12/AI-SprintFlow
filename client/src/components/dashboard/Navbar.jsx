import { Bell, Search, CheckCircle2, Sparkles, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-300">
          {greeting},{" "}
          <span className="font-semibold text-violet-400">
            {user?.name || "User"}
          </span>{" "}
          👋
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative rounded-xl bg-slate-800 p-3 text-white transition hover:bg-violet-600"
          >
            <Bell size={20} />

            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-3 w-96 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

              <div className="border-b border-slate-700 p-5">

                <h3 className="text-lg font-bold text-white">
                  Notifications
                </h3>

              </div>

              <div className="divide-y divide-slate-800">

                <div className="flex gap-4 p-5 hover:bg-slate-800">

                  <Sparkles className="mt-1 text-violet-400" />

                  <div>

                    <p className="font-semibold text-white">
                      AI Sprint Summary Generated
                    </p>

                    <p className="text-sm text-slate-400">
                      AI analyzed your sprint successfully.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4 p-5 hover:bg-slate-800">

                  <Rocket className="mt-1 text-emerald-400" />

                  <div>

                    <p className="font-semibold text-white">
                      Sprint Started
                    </p>

                    <p className="text-sm text-slate-400">
                      Your latest sprint is now active.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4 p-5 hover:bg-slate-800">

                  <CheckCircle2 className="mt-1 text-blue-400" />

                  <div>

                    <p className="font-semibold text-white">
                      Task Completed
                    </p>

                    <p className="text-sm text-slate-400">
                      Great job! Keep up the progress.
                    </p>

                  </div>

                </div>

              </div>

              <button className="w-full border-t border-slate-700 p-4 font-medium text-violet-400 hover:bg-slate-800">
                View All Notifications
              </button>

            </div>

          )}

        </div>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-lg font-bold text-white">

            {user?.name?.charAt(0).toUpperCase() || "U"}

          </div>

          <div>

            <p className="font-semibold text-white">
              {user?.name || "User"}
            </p>

            <p className="text-sm text-slate-400">
              {user?.email || "Project Manager"}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;