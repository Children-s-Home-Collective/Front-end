import React, { useEffect, useState } from 'react';

function Gallery({ name }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('https://your-api.com/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery');

        const data = await response.json();
        const matched = data.find((item) => item.name === name);

        if (matched && matched.images) {
          setImages(matched.images);
        } else {
          setImages([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [name]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>Error: {error}</p>;
  if (images.length === 0) return <p>No images found for <strong>{name}</strong>.</p>;

  return (
    <div className='gallery'>
      <h3>Gallery for {name}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Gallery image ${idx + 1}`}
             />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
