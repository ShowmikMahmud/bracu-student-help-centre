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