import Header from '../components/Header';
import Events from '../components/Events';
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import FakeData from "../FakeDatabase/FakeData";

function ExplorePage() {

    const [filteredEvents, setFilteredEvents] = useState(FakeData);

  const handleSearch = ({ query, sport, status }) => {
    let data = FakeData;

    if (query) {
      data = data.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.address.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (sport) {
      data = data.filter(e => e.sport === sport);
    }

    if (status !== "") {
      data = data.filter(e => String(e.status) === status);
    }

    setFilteredEvents(data);
  };


  return (
    <div className="Explore-Page min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-4 text-center">Explore</h1>

      <div className="p-4 bg-gray-200">
        <SearchBar />
      </div>
      
        <Events data={filteredEvents} />
    </div>
  );
}

export default ExplorePage;