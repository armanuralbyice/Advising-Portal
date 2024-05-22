import React, {useState} from 'react';
import '../../layout/header/Header.css';
import '../User.css'
import MetaData from "../../layout/MetaData";
import axios from "axios";
import {toast} from "react-toastify";
const Faculty = ({ isSidebarClosed }) => {
    const [faculty, setFaculty] = useState({
        name: '',
        email:'',
        phone:'',
        gender:'',
        dateOfBirth:'',
        department:'',
        address:{
            presentAddress:{
                district:'',
                thana:'',
                postCode:''
            },
            permanentAddress:{
                district:'',
                thana:'',
                postCode:''
            }
        }
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        const updatedFaculty = { ...faculty };

        if (name.startsWith("address.")) {
            const [addressType, field] = name.split('.').slice(1);
            updatedFaculty.address[addressType][field] = value;
        } else {
            updatedFaculty[name] = value;
        }

        setFaculty(updatedFaculty);
    };
    const handelSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/api/v3/faculty/register',faculty,{
            headers:{
                method: "post",
                "Content-Type":"application/json"
            }
        })
            .then((res)=>{
                if (res.status === 201){
                    toast.success(res.data.message)
                    console.log(res.data)
                }
            })
            .catch((err)=> {
                if (err.response && err.response.status === 400) {
                    toast.warning(err.response.data.message);
                    console.log(err)
                } else {
                    toast.error('An error occurred');
                    console.log(err);
                }
            })
    }
    const [departments, setDepartments] = React.useState([]);
    const fetchDepartments = () => {
        axios
            .get('http://localhost:4000/api/v2/departments/all')
            .then((res) => {
                setDepartments(res.data.department);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
            });

    }
    React.useEffect(() => {
        fetchDepartments();
    }, []);
    return (
        <div className={`home-section ${isSidebarClosed ? 'sidebar-close' : ''}`}>
            <MetaData title={'Faculty Registration'} />
            <div className="home-content">
                <div className='title'>
                    <h2>Faculty Registration</h2>
                </div>
                <div className="container">
                    <form onSubmit={handelSubmit}>
                        <div className="form first">
                            <div className="details personal">
                                <span className="title">Personal Details</span>
                                <div className="fields">
                                    <div className="input-field">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            name="name"
                                            value={faculty.name}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            placeholder="Enter your birthday"
                                            name="dateOfBirth"
                                            value={faculty.dateOfBirth}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={faculty.email}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Mobile Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter mobile number"
                                            name="phone"
                                            value={faculty.phone}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Department</label>
                                        <select
                                            name="department"
                                            value={faculty.department}
                                            onChange={onChange}
                                            required
                                        >
                                            <option value="">Select</option>
                                            {departments.map(department => (
                                                <option key={department._id} value={department._id}>
                                                    {department.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-field">
                                        <label>Gender</label>
                                        <select
                                            name='gender'
                                            value={faculty.gender}
                                            onChange={onChange}
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="details ID">
                                <span className="title">Present Address</span>
                                <div className="fields">
                                    <div className="input-field">
                                        <label>District</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your District"
                                            name="address.presentAddress.district"
                                            value={faculty.address.presentAddress.district}
                                            onChange={onChange}
                                            required
                                        />

                                    </div>
                                    <div className="input-field">
                                        <label>Thana</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Thana"
                                            name="address.presentAddress.thana"
                                            value={faculty.address.presentAddress.thana}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Postal Code</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Postal Code"
                                            name='address.presentAddress.postCode'
                                            value={faculty.address.presentAddress.postCode}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="details ID">
                                <span className="title">Permanent Address</span>
                                <div className="fields">
                                    <div className="input-field">
                                        <label>District</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your District"
                                            name='address.permanentAddress.district'
                                            value={faculty.address.permanentAddress.district}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Thana</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Thana"
                                            name='address.permanentAddress.thana'
                                            value={faculty.address.permanentAddress.thana}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Postal Code</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Postal Code"
                                            name='address.permanentAddress.postCode'
                                            value={faculty.address.permanentAddress.postCode}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='btn'>
                                <button className="button" >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Faculty;

