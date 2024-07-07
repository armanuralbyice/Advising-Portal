import axios from "axios";
import {toast} from "react-toastify";

export const fetchSemesterData = async () => {
    try {
        const res =
            await axios.get('http://localhost:4000/semester/all',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
        return res.data;
    }catch (err){
        console.error(err);
        return []
    }
}
export const fetchDepartmentData = async ()=>{
    try {
        const res = await axios.get('http://localhost:4000/department/all',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}
export const fetchClassRooms = async () =>{
    try{
        const res = await axios.get('http://localhost:4000/classroom/all',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}

export const fetchCourses = async (selectedDepartment) =>{
    try {
        const res = await axios.get(`http://localhost:4000/course/filter?department=${selectedDepartment}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        return res.data;
    }catch (err){
        console.log(err);
        return []
    }
}
export const fetchFaculties = async (selectedDepartment) => {
    try{
        const res = await axios.get(`http://localhost:4000/user/department/${selectedDepartment}/faculties`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        return res.data
    }catch (err){
        console.log(err)
        return[]
    }
}

export const fetchOfferCourses = async (semesterId, departmentId) =>{
    try {
        const res = await axios.get (`http://localhost:4000/offer-course/?semesterId=${semesterId}&departmentId=${departmentId}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}

export const facultyCourseListBySemester = async (selectedSemester) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in localStorage');
            return [];
        }
        const response = await axios.get(`http://localhost:4000/api/v7/faculty-course-list/${selectedSemester}`, {
         headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
           toast.warning(error.response.data.message);
        } else {
            console.error('Error message:', error.message);
        }
        return [];
    }
};

export const studentListByCourse = async (selectedSemester, selectedCourse) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v7/faculty-course-list/${selectedCourse}/${selectedSemester}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            if(error.response.status === 404){
                toast.warning(error.response.data.message);
            }
        } else {
            console.error('Error message:', error.message);
        }
        return [];
    }
}
export const fetchOfferCoursesForAdvising = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.get('http://localhost:4000/api/v7/advising/offerCourses', config);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                toast.warning(error.response.data.message);
            } else if (error.response.status === 401) {
                toast.error('Unauthorized access. Please log in again.');
            }
        } else {
            console.error('Error message:', error.message);
        }
        return [];
    }
};
export const fetchAdvisingCourses = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.get('http://localhost:4000/api/v7/advising/course', config);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                toast.warning(error.response.data.message);
            } else if (error.response.status === 401) {
                toast.error('Unauthorized access. Please log in again.');
            }
        } else {
            console.error('Error message:', error.message);
        }
        return [];
    }
};