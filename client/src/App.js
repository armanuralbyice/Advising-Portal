import './App.css'
import {BrowserRouter as Router, Outlet, Route, Routes} from "react-router-dom";
import Header from "./components/layout/header/Header";
import Student from "./components/user_registation/Student/Student";
import {useState} from "react";
import Home from "./components/Home/Home";
import Faculty from "./components/user_registation/Faculty/Faculty";
import Admin from "./components/user_registation/Admin/Admin";
import Users from "./components/user/Users";
import Semester from "./components/create/Semester";
import Department from "./components/create/Department";
import Course from "./components/create/Course";
import OfferCourses from "./components/create/offerCourses/OfferCourses";
import Classroom from "./components/create/Classroom";

function App() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(prevState => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarClosed(prevState => !prevState);
  };

  const handleDropdownClick = (e) => {
    e.preventDefault();
    toggleSubMenu();
  };
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={(<><Header
                toggleSubMenu={toggleSubMenu}
                toggleSidebar={toggleSidebar}
                handleDropdownClick={handleDropdownClick}
                isSubMenuOpen={isSubMenuOpen}
                isSidebarClosed={isSidebarClosed}
            /><Outlet /></>)}>
              <Route path="/" element={<Home isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/student/registation" element={<Student isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/faculty/registation" element={<Faculty isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/admin/registation" element={<Admin isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/users" element={<Users isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/semester" element={<Semester isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/department" element={<Department isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/course" element={<Course isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/offerCourse" element={<OfferCourses isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/classroom" element={<Classroom isSidebarClosed={isSidebarClosed}/>} />
            </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
