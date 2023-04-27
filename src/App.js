import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage";
import SignUp from "./components/signup";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
