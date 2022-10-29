// Components
import Navbar from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <h1>Hello world</h1>
        <Routes>

        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
