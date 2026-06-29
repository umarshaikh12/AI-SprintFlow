import { motion } from "framer-motion";

function StatsCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-400 text-xs uppercase tracking-wide">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

export default StatsCard;