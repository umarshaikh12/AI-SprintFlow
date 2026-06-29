import { motion } from "framer-motion";

function Button({ children, type = "button", onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className="w-full rounded-xl bg-gradient-to-r
      from-violet-600 via-purple-600 to-indigo-600
      py-4 font-semibold text-white
      shadow-lg transition-all
      hover:shadow-violet-500/40"
    >
      {children}
    </motion.button>
  );
}

export default Button;