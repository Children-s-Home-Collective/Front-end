import React, { useEffect, useState } from 'react';

const ContactInfo = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this with your actual API URL
    fetch('https://api.example.com/contact-info')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch contact info');
        return res.json();
      })
      .then(data => {
        setContact(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load contact information.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading contact info...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{
      maxWidth: '400px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      color: '#333',
      lineHeight: '1.6'
    }}>
      <h2>Contact Info</h2>

      <div style={{ marginBottom: '15px' }}>
        <strong>Phone:</strong><br />
        <a href={`tel:${contact.phone}`} style={{ textDecoration: 'none', color: '#000' }}>
          {contact.phone}
        </a><br />
        <span style={{ fontSize: '0.9em', color: '#666' }}>{contact.phoneLabel}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Email:</strong><br />
        <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none', color: '#000' }}>
          {contact.email}
        </a><br />
        <span style={{ fontSize: '0.9em', color: '#666' }}>{contact.emailLabel}</span>
      </div>

      <div>
        <strong>Address:</strong><br />
        {contact.address}<br />
        <span style={{ fontSize: '0.9em', color: '#666' }}>{contact.addressLabel}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
