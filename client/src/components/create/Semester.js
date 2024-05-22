import React, {useEffect, useState} from 'react';
import '../user/users.css';
import MetaData from '../../components/layout/MetaData';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Pagination from "@mui/material/Pagination";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Semester = ({ isSidebarClosed }) => {
    const [semester, setSemester] = useState({
        semesterName: '',
        year: '',
    });
    const [semesters, setSemesters] = useState([]);
    const handleSemesterSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:4000/api/v1/create/semester', semester, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                if (res.status === 201) {
                    setSemester({
                        semesterName: '',
                        year: currentYear,
                    });
                    fetchSemesters()
                    toast.success(res.data.message);
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    toast.warning(err.response.data.message);
                    console.log(err);
                } else {
                    toast.error('An error occurred');
                    console.log(err);
                }
            });
    };

    // Generate an array of years
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year <= currentYear + 10; year++) {
        years.push(year+1);
    }
    // for pagination
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };
    const indexOfLastItem = page * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const displayedSemesters = semesters ? semesters.slice(indexOfFirstItem, indexOfLastItem) : [];
    const fetchSemesters = () => {
        axios
            .get('http://localhost:4000/api/v1/semesters/all')
            .then((res) => {
                setSemesters(res.data.semester);
            })
            .catch((err) => {
                console.log(err)
            });

    }
    useEffect(() => {
        fetchSemesters();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/v1/semester/delete/${id}`);
            setSemesters(semesters.filter(semester => semester._id !== id));
            toast.success('Semester deleted successfully');
        } catch (error) {
            console.error('Error deleting semester:', error);
            toast.error('An error occurred while deleting semester');
        }
    };

    return (
        <div className={`home-section ${isSidebarClosed ? 'sidebar-close' : ''}`}>
            <MetaData title={'Create Semester'} />
            <div className="home-content">
                <div className='title'>
                    <h2>Create Semester</h2>
                </div>
                <div className="createContainer">
                    <div className='create'>
                        <form onSubmit={handleSemesterSubmit}>
                            <div className="fields">
                                <div className="input-field-semester">
                                    <label>Semester</label>
                                    <select
                                        name="semester"
                                        value={semester.semesterName}
                                        onChange={(e) => setSemester({ ...semester, semesterName: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="spring">Spring</option>
                                        <option value="summer">Summer</option>
                                        <option value="fall">Fall</option>
                                    </select>
                                </div>
                                <div className="input-field-semester">
                                    <label>Year</label>
                                    <select
                                        name="year"
                                        value={semester.year}
                                        onChange={(e) => setSemester({ ...semester, year: e.target.value })}
                                    >
                                        <option value="">{currentYear}</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='btn'>
                                <button className="button">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='tableBox'>
                        <h2>Semester</h2>
                        <div className='table'>
                            <table className="fl-table">
                                <thead>
                                <tr>
                                    <th>Season</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {displayedSemesters && displayedSemesters.length > 0 ? (
                                    displayedSemesters.map((semester, index) => (
                                        <tr key={index}>
                                            <td>{semester.season}</td>
                                            <td>{semester.year}</td>
                                            <td onClick={()=>handleDelete(semester._id)}><FontAwesomeIcon icon={faTrash} /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No Semester found!</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className='pagination-box'>
                            <div>
                                <Pagination
                                            color="primary"
                                            count={semesters ? Math.ceil(semesters.length / rowsPerPage) : 0}
                                            page={page}
                                            onChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </div>
                            <div style={{'marginLeft':'20px'}}>
                                <FormControl>
                                    <InputLabel htmlFor="rowsPerPage">Rows Per Page</InputLabel>
                                    <Select className='formControl'
                                        value={rowsPerPage}
                                        label="Rows Per Page"
                                        onChange={handleChangeRowsPerPage}
                                        inputProps={{
                                            name: 'rowsPerPage',
                                            id: 'rowsPerPage',
                                        }}
                                    >
                                        <MenuItem value={rowsPerPage}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                        <MenuItem value={40}>40</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Semester;
