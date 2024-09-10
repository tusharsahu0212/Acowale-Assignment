import React, {useState} from 'react'

function ImageWithPlaceholder({ src, alt, placeholder }) {
    const [imageLoaded, setImageLoaded] = useState(true);
  
    const handleError = (event) => {
      // Check if the error is due to access denial
      if (event.target.src === src) {
        setImageLoaded(false);
      }
    };
  
    return (
      <img
        className="w-[100%] h-56 rounded"
        src={imageLoaded ? src : placeholder}
        alt={alt}
        onError={handleError}
      />
    );
  }

export default ImageWithPlaceholder