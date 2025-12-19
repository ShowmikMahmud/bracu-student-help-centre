import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import ContactCard from '../components/ContactCard';
import './ContactsPage.css';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Academic', 'Administrative', 'Student Services', 'Emergency', 'Other'];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAllContacts();
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      try {
        const response = await contactAPI.searchContacts(query);
        setContacts(response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      fetchContacts();
    }
  };

  const filterByCategory = async (category) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      fetchContacts();
    } else {
      try {
        const response = await contactAPI.getContactsByCategory(category);
        setContacts(response.data);
      } catch (error) {
        console.error('Filter error:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="contacts-page">
      <header className="page-header">
        <h1>BRAC University Contact Information</h1>
        <p>Find contact details for all departments and offices</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by department or location..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="contacts-grid">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))
        ) : (
          <p className="no-results">No contacts found</p>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;