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
import Login from "./components/login/Login";
import ShowOfferCourses from "./components/show courses/ShowOfferCourses";
import ShowFacultyEnrollCourses from "./components/show courses/ShowFacultyEnrollCourses";
import {AuthProvider} from "./components/router/AuthProvider";
import PrivateRoute from "./components/router/PrivateRoute";
import AdvisingCourse from "./components/Advising/AdvisingCourse";

function App() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(true);

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
            <Route path="/login" element={<Login/>} />
            <Route element={(<><Header
                toggleSubMenu={toggleSubMenu}
                toggleSidebar={toggleSidebar}
                handleDropdownClick={handleDropdownClick}
                isSubMenuOpen={isSubMenuOpen}
                isSidebarClosed={isSidebarClosed}
            /><Outlet /></>)}>
              <Route path="/dashboard" element={<PrivateRoute><Home isSidebarClosed={isSidebarClosed}/></PrivateRoute>} />
              <Route path="/" element={<PrivateRoute><Home isSidebarClosed={isSidebarClosed}/></PrivateRoute>} />
              <Route path="/student/registation" element={<Student isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/faculty/registation" element={<Faculty isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/admin/registation" element={<Admin isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/users" element={<Users isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/semester" element={<Semester isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/department" element={<Department isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/course" element={<Course isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/offerCourse" element={<OfferCourses isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/create/classroom" element={<Classroom isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/showOfferCourses" element={<ShowOfferCourses isSidebarClosed={isSidebarClosed}/>} />
              <Route path="/faculty/show-enroll-course" element={<PrivateRoute><ShowFacultyEnrollCourses isSidebarClosed={isSidebarClosed}/></PrivateRoute>} />
              <Route path="/advising" element={<PrivateRoute><AdvisingCourse isSidebarClosed={isSidebarClosed}/></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
