import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const contactAPI = {
  getAllContacts: () => axios.get(`${API_URL}/contacts`),
  
  getContactsByCategory: (category) => 
    axios.get(`${API_URL}/contacts/category/${category}`),
  
  searchContacts: (query) => 
    axios.get(`${API_URL}/contacts/search?query=${query}`),
  
  addContact: (contactData) => 
    axios.post(`${API_URL}/contacts`, contactData)
};
export const facultyAPI = {
  getAllFaculty: () => axios.get(`${API_URL}/faculty`),
  getFacultyByInitial: (initial) => axios.get(`${API_URL}/faculty/${initial}`),
  getFacultyByDepartment: (department) => 
    axios.get(`${API_URL}/faculty/department/${department}`),
  searchFaculty: (query) => 
    axios.get(`${API_URL}/faculty/search?query=${query}`),
  addFaculty: (facultyData) => 
    axios.post(`${API_URL}/faculty`, facultyData),
  addReview: (initial, reviewData) => 
    axios.post(`${API_URL}/faculty/${initial}/reviews`, reviewData),
  getReviews: (initial) => 
    axios.get(`${API_URL}/faculty/${initial}/reviews`)
};