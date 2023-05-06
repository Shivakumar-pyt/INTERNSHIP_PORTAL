import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage";
import SignUp from "./components/signup";
import Login from "./components/login";
import ReadExperience from "./components/read_experience_page";
import Tips from "./components/tips";
import AddExperience2 from "./components/add_experience2";
import CompanyExperience from "./components/company_experience";
import AddCompanyDrive from "./components/add_company_drive";
import UpcomingDrives from "./components/upcoming_drives";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add/:username" element={<AddExperience2/>}/>
        <Route path="/read" element={<ReadExperience/>}/>
        <Route path="/tips" element={<Tips/>}/>
        <Route path="/company/:username/:company_name" element={<CompanyExperience/>}/>
        <Route path="/tnp/company_drive" element={<AddCompanyDrive/>}/>
        <Route path="/upcoming_drives" element={<UpcomingDrives/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
