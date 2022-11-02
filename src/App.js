// Components & pages
import Navbar from "./components/Navbar";

import Home from "./pages/home/Home";
import Gallery from "./pages/gallery/Gallery";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Drawing from "./pages/Drawing/Drawing";

// Hooks 
import { useAuthContext } from "./hooks/useAuthContext";

// Routing
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  const { authIsReady, user } = useAuthContext();

  if (!authIsReady) return (<div>...</div>);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/drawing/:id" element={<Drawing />} />

          <Route path="/login" element={!user ? (<Login />) : (<Navigate to='/' replace />)} />

          <Route path="/signup" element={!user ? (<Signup />) : (<Navigate to='/' replace />)} />

          <Route path="/create" element={user ? (<Create />) : (<Navigate to='/login' replace />)} />

          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>

      </BrowserRouter >
    </div>
  );
}

export default App;
