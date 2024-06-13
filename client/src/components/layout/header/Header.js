import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faBars,
    faHouse,
    faPersonCirclePlus,
    faPlus,
    faShapes,
    faUsersGear
} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Link } from 'react-router-dom';
import MetaData from '../MetaData';

const Header = ({ isSidebarClosed, toggleSidebar }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState({
        create: false,
        registration: false
    });

    // Function to toggle the state of a specific dropdown menu
    const toggleSubMenu = (menu) => {
        setIsSubMenuOpen(prevState => ({
            ...prevState,
            [menu]: !prevState[menu]
        }));
    };

    return (
        <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
            <MetaData title={'Home'} />
            <div className="dropdown-icon">
                <i style={{ 'cursor': 'pointer' }}>
                    <FontAwesomeIcon icon={faBars} className='bx bx-menu' onClick={toggleSidebar} />
                </i>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to='/'>
                        <i><FontAwesomeIcon icon={faHouse}/></i>
                        <span className="link_name">Home</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li>
                            <Link to='/dashboard' className="link_name">
                                Home
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link to='' onClick={() => toggleSubMenu('create')}>
                            <i><FontAwesomeIcon icon={faPlus}/></i>
                            <span className="link_name">Create</span>
                        </Link>
                        {!isSidebarClosed && (
                            <i>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={`arrow ${isSubMenuOpen['create'] ? 'up' : ''}`}
                                    onClick={() => toggleSubMenu('create')}
                                />
                            </i>
                        )}
                    </div>
                    <ul className={`sub-menu ${isSubMenuOpen['create'] ? 'showMenu' : ''}`}>
                        <li><h2 className="link_name">Create</h2></li>
                        <li><Link to="create/semester">Semester</Link></li>
                        <li><Link to="create/department">Department</Link></li>
                        <li><Link to="create/offerCourse">Offer Course</Link></li>
                        <li><Link to="create/course">Add New Course</Link></li>
                        <li><Link to="create/classroom">Add New ClassRoom</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="icon-link">
                        <Link to='' onClick={() => toggleSubMenu('registration')}>
                            <i><FontAwesomeIcon icon={faPersonCirclePlus}/></i>
                            <span className="link_name">Registration</span>
                        </Link>
                        {!isSidebarClosed && (
                            <i>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={`arrow ${isSubMenuOpen['registration'] ? 'up' : ''}`}
                                    onClick={() => toggleSubMenu('registration')}
                                />
                            </i>
                        )}
                    </div>
                    <ul className={`sub-menu ${isSubMenuOpen['registration'] ? 'showMenu' : ''}`}>
                        <li><h2 className="link_name">Registration</h2></li>
                        <li><Link to="student/registation">Student</Link></li>
                        <li><Link to="faculty/registation">Faculty</Link></li>
                        <li><Link to="admin/registation">Admin</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/showOfferCourses'>
                        <i><FontAwesomeIcon icon={faShapes}/></i>
                        <span className="link_name">Offer Courses</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li>
                            <Link to='showOfferCourses' className="link_name">
                                Offer Courses
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/advising'>
                        <i><FontAwesomeIcon icon={faUsersGear}/></i>
                        <span className="link_name">Advising</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li>
                            <Link to='/users' className="link_name">
                                Advising
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/faculty/show-enroll-course'>
                        <i><FontAwesomeIcon icon={faUsersGear}/></i>
                        <span className="link_name">Faculty Course List</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li>
                            <Link to='/faculty/show-enroll-course' className="link_name">
                                Faculty Course List
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to='/users'>
                        <i><FontAwesomeIcon icon={faUsersGear}/></i>
                        <span className="link_name">Users</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li>
                            <Link to='/users' className="link_name">
                                Users
                            </Link>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    );
};

export default Header;
