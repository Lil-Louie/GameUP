import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ query, sport, status });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search & Filters</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        className="w-full p-2 mb-3 text-black rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Sport Filter */}
      <label className="block mb-1 font-semibold">Sport</label>
      <select
        className="w-full p-2 mb-3 text-black rounded"
        value={sport}
        onChange={(e) => setSport(e.target.value)}
      >
        <option value="">All</option>
        <option value="Basketball">Basketball</option>
        <option value="Soccer">Soccer</option>
        <option value="Tennis">Tennis</option>
        <option value="Volleyball">Volleyball</option>
        <option value="Pickleball">Pickleball</option>
        <option value="Football">Football</option>
        <option value="Frisbee">Frisbee</option>
        <option value="Spikeball">Spikeball</option>
        <option value="Softball">Softball</option>
      </select>

      {/* Status Filter */}
      <label className="block mb-1 font-semibold">Status</label>
      <select
        className="w-full p-2 mb-4 text-black rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Any</option>
        <option value="true">Ready</option>
        <option value="false">Open</option>
      </select>

      {/* Search Button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded"
        onClick={handleSearch}
      >
        Apply Filters
      </button>
    </div>
  );
}

export default SearchBar;
