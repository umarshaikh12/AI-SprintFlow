import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-slate-900 border-b border-slate-800 px-8 py-5">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Welcome back, Umar 👋
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white outline-none focus:border-violet-500"
          />

        </div>

        <button className="rounded-xl bg-slate-800 p-3 text-white hover:bg-violet-600 transition">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
            U
          </div>

          <div>
            <p className="font-semibold text-white">
              Umar
            </p>

            <p className="text-sm text-slate-400">
              Project Manager
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;