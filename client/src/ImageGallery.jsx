import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images from the backend
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/images');
                setImages(response.data.images || []); // Ensure that images is always an array
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="image-gallery">
            <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
            <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                        <img className="object-cover w-full h-full" src={image.url} alt={`Image ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;