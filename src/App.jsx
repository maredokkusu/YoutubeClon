import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import SearchResults from "./components/SearchResults";
import Watch from "./components/Watch"
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="sticky flex min-h-screen bg-zinc-900 text-white">
          <SideBar />
          <main className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/results" element={<SearchResults />}></Route>
              <Route path="/watch" element={<Watch />}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
