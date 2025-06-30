import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Search } from "lucide-react";
import "./Components.css";
import Logo from "../assets/YouTTube.svg";
export default function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/results?search_query=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };
  return (
    <header
      className=" flex-1/2 flex items-center justify-between px-10 py-4 bg-zinc-900 text-white 
    shadow-md sticky top-0 z-500"
    >
      <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <img src={Logo} alt="Logo" className="w-39 h-8  contain-content " />
      </Link>
      <form onSubmit={handleSearch} className="flex flex-1 mx-4 max-w-xl">
        <input
          type="text"
          placeholder="Buscar"
          className="self-center flex-grow px-4 py-1.5 rounded-l-full bg-zinc-800 text-white focus:outline-none border-1 border-gray-500"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-zinc-600 px-5 py-1 rounded-r-full hover:bg-zinc-500 border-1 border-gray-500"
        >
          <Search size={20} />
        </button>
      </form>
      <button className="hover:opacity-80 transition ">
        <User className="w-39 " size={24} />
      </button>
    </header>
  );
}
