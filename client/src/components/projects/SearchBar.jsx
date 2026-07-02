function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white placeholder:text-slate-500 outline-none focus:border-violet-500"
      />
    </div>
  );
}

export default SearchBar;