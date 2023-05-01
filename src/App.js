import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage";
import SignUp from "./components/signup";
import Login from "./components/login";
import ReadExperience from "./components/read_experience_page";
import Tips from "./components/tips";
import AddExperience2 from "./components/add_experience2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/add/:username" element={<AddExperience/>}/> */}
        <Route path="/add/:username" element={<AddExperience2/>}/>
        <Route path="/read" element={<ReadExperience/>}/>
        <Route path="/tips" element={<Tips/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
