import React from 'react';
import './ContactCard.css';

const ContactCard = ({ contact }) => {
  return (
    <div className="contact-card">
      <h3>{contact.department}</h3>
      <span className={`category-badge ${contact.category.toLowerCase().replace(' ', '-')}`}>
        {contact.category}
      </span>
      <div className="contact-details">
        <p><strong>📞 Phone:</strong> {contact.phone}</p>
        <p><strong>✉️ Email:</strong> {contact.email}</p>
        <p><strong>📍 Location:</strong> {contact.location}</p>
        <p><strong>🕒 Hours:</strong> {contact.officeHours}</p>
      </div>
    </div>
  );
};

export default ContactCard;