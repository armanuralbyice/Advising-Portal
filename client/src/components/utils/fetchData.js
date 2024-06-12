import axios from "axios";

export const fetchSemesterData = async () => {
    try {
        const res = await axios.get('http://localhost:4000/api/v1/semesters/all');
        return res.data;
    }catch (err){
        console.error(err);
        return []
    }
}
export const fetchDepartmentData = async ()=>{
    try {
        const res = await axios.get('http://localhost:4000/api/v2/departments/all')
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}
export const fetchClassRooms = async () =>{
    try{
        const res = await axios.get('http://localhost:4000/api/v6/classroom/all');
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}

export const fetchCourses = async (selectedDepartment) =>{
    try {
        const res = await axios.get(`http://localhost:4000/api/v4/courses/filter?department=${selectedDepartment}`)
        return res.data;
    }catch (err){
        console.log(err);
        return []
    }
}
export const fetchFaculties = async (selectedDepartment) => {
    try{
        const res = await axios.get(`http://localhost:4000/api/v3/department/${selectedDepartment}/faculties`)
        return res.data
    }catch (err){
        console.log(err)
        return[]
    }
}

export const fetchOfferCourses = async (semesterId, departmentId) =>{
    try {
        const res = await axios.get (`http://localhost:4000/api/v5/get/offerCourses?semesterId=${semesterId}&departmentId=${departmentId}`)
        return res.data
    }catch (err){
        console.log(err)
        return []
    }
}