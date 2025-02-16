import Earth from "./components/Earth/Earth";
import Info from "./components/Info/Info";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null, place: null })
  const [search, setSearch] = useState({lat: null, lon: null})

  return (
    <>
      <Earth 
      setLocation={setLocation} 
      search={search}
      />
      <SearchBar 
      setLocation={setLocation}
      setSearch={setSearch}
      />
      <Info 
      location={location}
      />
    </>
  );
}

export default App;
