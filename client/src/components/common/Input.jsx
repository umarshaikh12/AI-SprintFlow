function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <div className="relative mb-5">

      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border border-slate-700
        bg-slate-800/80 py-4 text-white outline-none
        transition-all duration-300
        focus:border-violet-500
        focus:ring-2 focus:ring-violet-500/30
        ${icon ? "pl-12 pr-4" : "px-4"}`}
      />

    </div>
  );
}

export default Input;