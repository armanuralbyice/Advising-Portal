import React, { useEffect, useState } from 'react';
import MetaData from "../layout/MetaData";
import { facultyCourseListBySemester, fetchSemesterData, studentListByCourse } from "../utils/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {generatePDFAdvisingSlip} from "../utils/pdfGenerate";

const ShowFacultyEnrollCourses = ({ isSidebarClosed }) => {
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [courses, setCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);
    const [error, setError] = useState('');

    const fetchInitialData = async () => {
        try {
            const semesterResponse = await fetchSemesterData();
            if (semesterResponse && Array.isArray(semesterResponse.semester)) {
                setSemesters(semesterResponse.semester);
            } else {
                console.error("Semester data is not in the expected format", semesterResponse);
            }

            if (selectedSemester) {
                const facultyCourseData = await facultyCourseListBySemester(selectedSemester);
                if (facultyCourseData && Array.isArray(facultyCourseData.courseNames)) {
                    setCourses(facultyCourseData.courseNames);
                    console.log(facultyCourseData.courseNames);
                } else {
                    console.error("Faculty course data is not in the expected format", facultyCourseData);
                }
            }
        } catch (err) {
            console.error('Error fetching data', err);
            setError('Failed to fetch data');
        }
    };

    const handleCourseClick = async (courseId) => {
        try {
            setSelectedCourseId(courseId);
        } catch (err) {
            console.error('Error setting selected course', err);
            setError('Failed to set selected course');
        }
    };

    const fetchStudentList = async (courseId, semesterId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await studentListByCourse(courseId, semesterId, config)
                .then(response => {
                    if (response && Array.isArray(response.enrollments)) {
                        setCourseDetails(response.enrollments);
                    } else {
                        console.error("Student list data is not in the expected format", response);
                        setError('Failed to fetch student list');
                    }
                })
        } catch (error) {
            if (error.response) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchInitialData();
        if (selectedCourseId && selectedSemester) {
            fetchStudentList(selectedCourseId, selectedSemester);
        }
    }, [selectedCourseId, selectedSemester]);

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    return (
        <div className={`home-section ${isSidebarClosed ? 'sidebar-close' : ''}`}>
            <MetaData title={'Faculty Enroll Courses'} />
            <div className='title'>
                <h2>Faculty Course List</h2>
            </div>
            <div>
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
                </div>
                <div className='CourseInformation' style={{ border: '1px solid' }}>
                    <div className='faculty-routine' style={{ border: '1px solid' }}>
                        <div className='course-list'>
                            <table>
                                <thead>
                                <tr>
                                    <th>Course Code</th>
                                    <th>Section</th>
                                    <th>Class Time</th>
                                    <th>Class Room</th>
                                    <th>Lab Time</th>
                                    <th>Lab Room</th>
                                    <th>Available Seat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map(course => (
                                    <tr key={course._id} onClick={() => handleCourseClick(course.courseName._id)} style={{ cursor: 'pointer' }}>
                                        <td>{course.courseName.courseCode}</td>
                                        <td>{course.section}</td>
                                        <td>{`${course.classRoom.building}-${course.classRoom.classroomNo}`}</td>
                                        <td>{`${course.classRoom.building}-${course.classRoom.classroomNo}`}</td>
                                        <td>{`${course.classRoom.building}-${course.classRoom.classroomNo}`}</td>
                                        <td>{`${course.classRoom.building}-${course.classRoom.classroomNo}`}</td>
                                        <td>{course.seat}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='studentList' id="pdf-content">
                        <div className='student-List'>
                            <div className='course-title'>
                                <h4>Course Code: ICE103</h4>
                                <FontAwesomeIcon icon={faPenToSquare} onClick={generatePDFAdvisingSlip}/>
                            </div>
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Student ID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{courseDetails.map((student, index) => (*/}
                                        <tr>
                                            <td>ICE101</td>
                                            <td>1</td>
                                        </tr>
                                    {/*))}*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowFacultyEnrollCourses;
