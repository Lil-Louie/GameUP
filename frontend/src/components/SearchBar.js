import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import CGButton from "./CGButton";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("");
  const [status, setStatus] = useState("");
  const [sportDropdownOpen, setSportDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const sports = [
    "Basketball",
    "Soccer",
    "Tennis",
    "Volleyball",
    "Pickleball",
    "Football",
    "Frisbee",
    "Spikeball",
    "Softball"
  ];

  const statuses = [
    { label: "Ready to Start", value: "true" },
    { label: "Looking for Players", value: "false" }
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ query, sport, status });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSport = (selectedSport) => {
    setSport(selectedSport);
    setSportDropdownOpen(false);
  };

  const selectStatus = (selectedStatus) => {
    setStatus(selectedStatus);
    setStatusDropdownOpen(false);
  };

  return (
    <section className="w-full bg-gray-900 from-slate-50 to-slate-100 p-6 rounded-xl shadow-sm">
      <div className="max-w-6xl mx-auto">
        {/* Search Input Section */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-4 justify-center ">
          {/* Sport Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => {
                setSportDropdownOpen(!sportDropdownOpen);
                setStatusDropdownOpen(false);
              }}
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors shadow-sm flex items-center gap-2 min-w-[150px] justify-between"
            >
              <span className="text-gray-800 font-medium">
                {sport || "All Sports"}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${sportDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {sportDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                <button
                  onClick={() => selectSport("")}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors text-gray-800 border-b border-gray-100"
                >
                  All Sports
                </button>
                {sports.map((s) => (
                  <button
                    key={s}
                    onClick={() => selectSport(s)}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                      sport === s ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>



          {/* Search Button */}
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            onClick={handleSearch}
          >
            Apply Filters
          </button>

          {/* Clear Filters Button */}
          {(query || sport || status) && (
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              onClick={() => {
                setQuery("");
                setSport("");
                setStatus("");
                if (onSearch) {
                  onSearch({ query: "", sport: "", status: "" });
                }
              }}
            >
              Clear
            </button>
          )}
          <section className="justify-end">
            <CGButton/>
          </section>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;