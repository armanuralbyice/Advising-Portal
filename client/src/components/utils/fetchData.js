import axios from "axios";
import {toast} from "react-toastify";

export const fetchSemesterData = async () => {
    try {
        const res =
            await axios.get('https://advising-portal-zzm8.vercel.app/api/v1/semesters/all');
        return res.data;
    }catch (err){
        console.error(err);
        return []
    }
}
export const fetchDepartmentData = async ()=>{
    try {
        const res = await axios.get('https://advising-portal-zzm8.vercel.app/api/v2/departments/all')
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}
export const fetchClassRooms = async () =>{
    try{
        const res = await axios.get('https://advising-portal-zzm8.vercel.app/api/v6/classroom/all');
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}

export const fetchCourses = async (selectedDepartment) =>{
    try {
        const res = await axios.get(`https://advising-portal-zzm8.vercel.app/api/v4/courses/filter?department=${selectedDepartment}`)
        return res.data;
    }catch (err){
        console.log(err);
        return []
    }
}
export const fetchFaculties = async (selectedDepartment) => {
    try{
        const res = await axios.get(`https://advising-portal-zzm8.vercel.app/api/v3/department/${selectedDepartment}/faculties`)
        return res.data
    }catch (err){
        console.log(err)
        return[]
    }
}

export const fetchOfferCourses = async (semesterId, departmentId) =>{
    try {
        const res = await axios.get (`https://advising-portal-zzm8.vercel.app/api/v5/get/offerCourses?semesterId=${semesterId}&departmentId=${departmentId}`)
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
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(`https://advising-portal-zzm8.vercel.app/api/v7/faculty-course-list/${selectedSemester}`, {
            headers,
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
        const response = await axios.get(`https://advising-portal-zzm8.vercel.app/api/v7/faculty-course-list/${selectedCourse}/${selectedSemester}`)
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
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.get('https://advising-portal-zzm8.vercel.app/api/v7/advising/offerCourses', config);
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
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await axios.get('https://advising-portal-zzm8.vercel.app/api/v7/advising/course', config);
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