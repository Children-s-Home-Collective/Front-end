import React from 'react';

function Gallery({  name,images = [] }) {
  if (!images.length) return <p>No images found for <strong>{name}</strong>.</p>;

  return (
    <div className='gallery'>
      <h3>Gallery for {name}</h3>
      <div className='imagelist'style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((url, idx) => (
          <img
            key={idx}
            src={url.image_url}
            alt={`Gallery image ${idx + 1}`}
            style={{ width: '350px', height: 'auto', borderRadius: '5px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
