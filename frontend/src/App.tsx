import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

function App() {
  return (
    <div className="max-w-6xl m-auto p-5">
      <Routes>
        <Route path="/" element ={<HomePage/>} />
        <Route path="/create" element ={<CreatePage/>}/>
        <Route path="/note/:id" element = {<NoteDetailPage/>} />
      </Routes>
     
    </div>
  );
}

export default App;
