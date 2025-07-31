import React, { useEffect, useState } from 'react';

const ContactInfo = ({contact}) => {

  return (
    <div style={{
      width: '400px',
      backgroundColor: '#EEECFB',
      padding: '20px',
      border:'2px solid black',
      borderRadius: '10px',
      fontFamily: 'sans-serif',
      color: '#333'
    }}>
      <h2>Contact Info</h2>

      <div style={{ marginBottom: '15px' }}>
        <strong>Phone:</strong><br />
        <a href={`tel:${contact.phone_number}`} style={{ textDecoration: 'none', color: '#000' }}>
          {contact.phone_number}
        </a><br />
        <span style={{ fontSize: '0.9em', color: '#666' }}>{contact.phoneLabel}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Email:</strong><br />
        <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none', color: '#000' }}>
          {contact.email}
        </a><br />
        <span style={{ fontSize: '0.9em', color: '#666' }}>{contact.email}</span>
      </div>

      <div>
        <strong>Address:</strong><br />
        {contact.location}<br />
        <span style={{ fontSize: '0.9em', color: '#666' }}>{contact.location}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
