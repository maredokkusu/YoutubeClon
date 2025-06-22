import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Feed from "./components/Feed";
import SearchResults from "./components/SearchResults";
function App() {


  return (
    <>
      <BrowserRouter>
          <NavBar />
        <div className="flex-1 p-2">
          <SideBar />

          </div>
        <Routes>
          <Route path="/" element={<Feed/>}></Route>
          <Route
            path="/results"
            element={<SearchResults/>}
            ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
