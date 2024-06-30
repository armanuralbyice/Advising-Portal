// const nodemailer = require('nodemailer');
// const Student = require('../model/studentModel/studentSchema')
// const Faculty = require('../model/facultyModel/facultySchema')
// const Admin = require('../model/adminModel/adminSchema')
// const Department = require('../model/departmentModel/departmentSchema')
// const catchAsync = require('../middleware/catchAsyncError')
// const {hash} = require("bcrypt");
// const ErrorHandler = require ('../utils/ErrorHandler')
// const sendEmail = async (to, subject, html) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'capstoneprojecta005@gmail.com',
//             pass: 'royocidbwyhfdwow',
//         },
//     });
//
//     const mailOptions = {
//         from: '"Capstone Project Admin" <noreply@gmail.com>',
//         to,
//         subject,
//         html,
//     };
//
//     return transporter.sendMail(mailOptions);
// };
//
// exports.addStudentAndSendEmail = catchAsync(async (req, res, next) => {
//     const { email, department } = req.body;
//
//     try {
//         const existingDepartment = await Department.findOne({_id: department}).populate('students')
//         if(existingDepartment){
//             const randomPassword = Math.random().toString(36).slice(-8);
//             const hashedPassword = await hash(randomPassword, 10);
//             const student = await new Student({
//                 ...req.body,
//                 password: hashedPassword,
//                 department: existingDepartment._id
//
//             });
//             await student.save();
//             existingDepartment.students.push(student)
//             const updatedDepartment = await existingDepartment.save()
//             const emailHtml = `
//             <p>Congratulations! ${student['name']}</p>
//             <p>Your Student ID: ${student['studentID']}</p>
//             <p>Your Password: ${randomPassword}</p>
//             <br>
//             <h5>Register</h5>
//         `;
//             await sendEmail(email, 'login your student portal', emailHtml);
//             res.status(201).json({
//                 success: true,
//                 student,
//                 updatedDepartment,
//                 message: 'Registration successful.',
//             });
//         }
//         else{
//             return next (new ErrorHandler('Department not founded', 404))
//         }
//     }
//     catch (error) {
//         console.error('Error sending email:', error);
//         return next (new ErrorHandler('Internal server error. Registration failed', 500))
//     }
// });
//
// exports.addFacultyAndSendEmail = catchAsync(async (req, res, next) => {
//     const { email, department } = req.body;
//
//     try {
//         const existingDepartment = await Department.findOne({_id:department}).populate('faculties')
//         if(existingDepartment){
//             const randomPassword = Math.random().toString(36).slice(-8);
//             const hashedPassword = await hash(randomPassword, 10);
//             const faculty = await new Faculty({
//                 ...req.body,
//                 password: hashedPassword,
//                 department: existingDepartment._id
//             });
//             await faculty.save()
//             existingDepartment.faculties.push(faculty)
//             const updatedDepartment = await existingDepartment.save()
//             const emailHtml = `
//             <p>Congratulations! ${faculty['name']}</p>
//             <p>Your Faculty ID: ${faculty['facultyID']}</p>
//             <p>Your Password: ${randomPassword}</p>
//             <br>
//             <h3>Register</h3>
//         `;
//             await sendEmail(email, 'login EWU portal', emailHtml);
//
//             res.status(201).json({
//                 success: true,
//                 faculty,
//                 updatedDepartment,
//                 message: 'Registration successful.',
//             });
//         }
//         else {
//             return next (new ErrorHandler('Department not founded', 404))
//         }
//
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error. Registration failed.',
//         });
//     }
// });
//
// exports.addAdminAndSendEmail = catchAsync(async (req, res) => {
//     const { email } = req.body;
//
//     try {
//         const randomPassword = Math.random().toString(36).slice(-8);
//         const hashedPassword = await hash(randomPassword, 10);
//         const admin = await Admin.create({
//             ...req.body,
//             password: hashedPassword
//         });
//         const emailHtml = `
//             <p>Congratulations! ${admin['name']}</p>
//             <p>Your Admin ID: ${admin['adminID']}</p>
//             <p>Your Password: ${randomPassword}</p>
//             <br>
//             <h3>Register</h3>
//         `;
//         await sendEmail(email, 'login EWU portal', emailHtml);
//
//         res.status(201).json({
//             success: true,
//             admin,
//             message: 'Registration successful.',
//         });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error. Registration failed.',
//         });
//     }
// });