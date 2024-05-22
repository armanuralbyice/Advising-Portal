import React, { useEffect, useState } from 'react';
import axios from "axios";
import MetaData from "../../layout/MetaData";
import './offerCourses.css';
import {toast} from "react-toastify";

const OfferCourses = ({ isSidebarClosed }) => {
    const [offerCourses, setOfferCourses] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [conflictWarning, setConflictWarning] = useState('');

    console.log(courses)
    const fetchSemesters = () => {
        axios.get('http://localhost:4000/api/v1/semesters/all')
            .then((res) => {
                setSemesters(res.data.semester);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchDepartments = () => {
        axios.get('http://localhost:4000/api/v2/departments/all')
            .then((res) => {
                setDepartments(res.data.department);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchClassrooms = () => {
        axios.get('http://localhost:4000/api/v6/classroom/all')
            .then((res) => {
                setClassrooms(res.data.classrooms);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchFaculties = () => {
        axios.get(`http://localhost:4000/api/v3/department/${selectedDepartment}/faculties`)
            .then((res) => {
                setFaculties(res.data.faculties);
                console.log(res.data.faculties);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchCourses = () => {
        axios.get(`http://localhost:4000/api/v4/courses/filter?department=${selectedDepartment}`)
            .then((res) => {
                setCourses(res.data.courses);
                console.log(res.data.courses);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchDepartments();
        fetchSemesters();
        fetchClassrooms();
        if (selectedDepartment) {
            fetchCourses();
            fetchFaculties();
        }
    }, [selectedDepartment]);

    const handleInputChange = (courseId, field, value) => {
        setOfferCourses(offerCourses?.map(course =>
            course._id === courseId
                ? { ...course, [field]: value }
                : course
        ));
    };


    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };
    const handleCourseSelection = (event) => {
        const courseId = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            const selectedCourse = courses.find(course => course._id === courseId);
            if (selectedCourse) {
                setOfferCourses([...offerCourses, selectedCourse]);
            }
        } else {
            setOfferCourses(offerCourses?.filter(course => course._id !== courseId));
        }
    };
    const handleCreateSection = (courseId, event) => {
        event.preventDefault();
        setOfferCourses(offerCourses.map(course =>
            course._id === courseId ? { ...course, sections: [ {
                    facultyName: '',
                    seat: '',
                    section: '',
                    classTime: '',
                    labTime: '',
                    classRoom: '',
                    labRoom: ''
                }] } : course
        ));
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedCourses = offerCourses?.filter(course => courses.some(c => c._id === course._id));

        const dataToSend = {
            semester: selectedSemester,
            department: selectedDepartment,
            courses: selectedCourses.map(course => ({
                courseName: course._id,
                seat: course.seat,
                section: course.section,
                classTime: course.classTime,
                labTime: course.labTime,
                classRoom: course.classRoom,
                labRoom: course.labRoom,
                facultyName: course.facultyName,
            }))

        };
        console.log(dataToSend)

        axios.post('http://localhost:4000/api/v5/offerCourse/add', dataToSend)
            .then((res) => {
                console.log('Courses offered successfully:', res.data);
            })
            .catch((err) => {
                console.error('Error offering courses:', err);
            });
    };
    const checkForConflicts = () => {
        const roomSchedule = {}; // Map to store room schedules
        const facultySchedule = {}; // Map to store faculty schedules
        let conflictFound = false;

        offerCourses?.forEach(course => {
            const { classTime, labTime, classRoom, labRoom, facultyName } = course;

            // Check for class conflicts
            if (classTime && classRoom) {
                const classKey = `${classTime}-${classRoom}`;
                if (roomSchedule[classKey]) {
                    toast.warning(`Two classes are scheduled in room at the same time!`);
                    conflictFound = true;
                    setConflictWarning(`Two classes are scheduled in room at the same time!`);
                    return;
                }
                roomSchedule[classKey] = true;
            }

            // Check for lab conflicts
            if (labTime && labRoom) {
                const labKey = `${labTime}-${labRoom}`;
                if (roomSchedule[labKey]) {
                    toast.warning(`Two labs are scheduled in room at the same time!`);
                    conflictFound = true;
                    setConflictWarning(`Two labs are scheduled in room at the same time!`);
                    return;
                }
                roomSchedule[labKey] = true;
            }

            // Check for faculty conflicts
            if (facultyName) {
                if (classTime) {
                    if (facultySchedule[facultyName] && facultySchedule[facultyName].includes(classTime)) {
                        toast.warning(`Faculty is teaching multiple classes at the same time!`);
                        conflictFound = true;
                        setConflictWarning(`Faculty is teaching multiple classes at the same time!`);
                        console.log(facultyName)
                        return;
                    }
                    facultySchedule[facultyName] = facultySchedule[facultyName] ? [...facultySchedule[facultyName], classTime] : [classTime];
                }

                if (labTime) {
                    if (facultySchedule[facultyName] && facultySchedule[facultyName].includes(labTime)) {
                        toast.warning(`Faculty is teaching multiple labs at the same time!`);
                        conflictFound = true;
                        setConflictWarning(`Faculty is teaching multiple labs at the same time!`);
                        return;
                    }
                    facultySchedule[facultyName] = facultySchedule[facultyName] ? [...facultySchedule[facultyName], labTime] : [labTime];
                }
            }
        });

        if (!conflictFound) {
            setConflictWarning('');
        }
    };

    // useEffect to call checkForConflicts whenever offerCourses or their schedules change
    useEffect(() => {
        checkForConflicts();
    }, [offerCourses]);
    return (
        <div className={`home-section ${isSidebarClosed ? 'sidebar-close' : ''}`}>
            <MetaData title={'Offer Courses'} />
            <div className="home-content">
                <div className='title'>
                    <h2>Offer Courses</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='description-and-offerCourseShow-Box'>
                        <div className='description'>
                            <div className="input-field" style={{ marginRight: '20px' }}>
                                <label>Semester</label>
                                <select
                                    style={{ width: '250px' }}
                                    name="semester"
                                    value={selectedSemester}
                                    onChange={handleSemesterChange}
                                >
                                    <option value=''>Select</option>
                                    {semesters.map(semester => (
                                        <option key={semester._id} value={semester._id}>
                                            {`${semester.season}-${semester.year}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-field" style={{ marginRight: '20px' }}>
                                <label>Department</label>
                                <select
                                    style={{ width: '250px' }}
                                    name="department"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    required
                                >
                                    <option value=''>Select</option>
                                    {departments.map(department => (
                                        <option key={department._id} value={department._id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='offerCoursesShow'>
                            <h4>{offerCourses?.length} courses added</h4>
                            <div className='showCourse'>
                                <ul>
                                    {/*{offerCourses.map(course => (*/}
                                    {/*    <li key={course._id}>{course.courseCode}</li>*/}
                                    {/*))}*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='offerCoursesContainer'>
                        <div className='selectOfferCourses'>
                            <div className='course-list-box'>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Seat</th>
                                        <th>Section</th>
                                        <th>Class Time</th>
                                        <th>Lab Time</th>
                                        <th>Class Room</th>
                                        <th>Lab Room</th>
                                        <th>Faculty Name</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {courses.map(course => {
                                        const isSelected = offerCourses?.length>0 && offerCourses?.some(c => c._id === course._id);
                                        return (
                                            <tr key={course._id}>
                                                <td>
                                                    <div className='input-field-checkBox'>
                                                        <input
                                                            type='checkbox'
                                                            value={course._id}
                                                            onChange={handleCourseSelection}
                                                        />
                                                        <label>{course.courseCode}</label>
                                                    </div>
                                                </td>
                                                {isSelected && (
                                                    <>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <input
                                                                    type="text"
                                                                    placeholder="seat?"
                                                                    value={offerCourses.find(c => c._id === course._id)?.seat || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'seat', e.target.value)}
                                                                    required
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <select
                                                                    value={offerCourses.find(c => c._id === course._id)?.section || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'section', e.target.value)}
                                                                    disabled={!!conflictWarning}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <select
                                                                    value={offerCourses.find(c => c._id === course._id)?.classTime || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'classTime', e.target.value)}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="ST 8:30-9:30">ST 8:30-9:30</option>
                                                                    <option value="MW 8:30-9:30">MW 8:30-9:30</option>
                                                                    <option value="TR 8:30-9:30">TR 8:30-9:30</option>
                                                                    <option value="ST 9:40-10:40">ST 9:40-10:40</option>
                                                                    <option value="MW 9:40-10:40">MW 9:40-10:40</option>
                                                                    <option value="TR 9:40-10:40">TR 9:40-10:40</option>
                                                                    <option value="ST 10:50-11:50">ST 10:50-11:50</option>
                                                                    <option value="MW 12:00-1:00">MW 12:00-1:00</option>
                                                                    <option value="TR 12:00-1:00">TR 12:00-1:00</option>
                                                                    <option value="ST 12:00-1:00">ST 12:00-1:00</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <select
                                                                    value={offerCourses.find(c => c._id === course._id)?.labTime || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'labTime', e.target.value)}
                                                                    // disabled={course.credit < 4}
                                                                >
                                                                    <option value="">Select</option>
                                                                    <option value="S 2:00-3:30">S 2:00-3:30</option>
                                                                    <option value="S 4:00-5:30">S S 4:00-5:30</option>
                                                                    <option value="M 2:00-3:30">M 2:00-3:30</option>
                                                                    <option value="M 4:00-5:30">M 4:00-5:30</option>
                                                                    <option value="T 2:00-3:30">T 2:00-3:30</option>
                                                                    <option value="T 4:00-5:30">T 4:00-5:30</option>
                                                                    <option value="R 2:00-3:30">R 2:00-3:30</option>
                                                                    <option value="R 4:00-5:30">R 4:00-5:30</option>
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <select
                                                                    value={offerCourses.find(c => c._id === course._id)?.classRoom || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'classRoom', e.target.value)}
                                                                >
                                                                    <option value="">Select</option>
                                                                    {classrooms.map(room => (
                                                                        <option key={room._id} value={room._id}>
                                                                            {room.building}-{room.classroomNo}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <select
                                                                    value={offerCourses.find(c => c._id === course._id)?.labRoom || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'labRoom', e.target.value)}
                                                                    // disabled={course.credit < 4}
                                                                >
                                                                    <option value="">Select</option>
                                                                    {classrooms.map(room => (
                                                                        <option key={room._id} value={room._id}>
                                                                            {room.building}-{room.classroomNo}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-field-offerCourses">
                                                                <select
                                                                    value={offerCourses.find(c => c._id === course._id)?.facultyName || ''}
                                                                    onChange={(e) => handleInputChange(course._id, 'facultyName', e.target.value)}
                                                                    disabled={!!conflictWarning}
                                                                >
                                                                    <option value="">Select</option>
                                                                    {faculties.map(faculty => (
                                                                        <option key={faculty._id} value={faculty._id}>
                                                                            {faculty.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className='button-create-section'
                                                                onClick={(event)=>handleCreateSection(course._id,event)}>
                                                                Create section
                                                            </button>
                                                        </td>
                                                    </>
                                                )}

                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className='btn'>
                                <button type='submit' className="button">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OfferCourses;
