import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowSchools = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('/api/schools');
                setSchools(response.data);
            } catch (err) {
                setError('Failed to fetch schools. Please try again later.');
                console.error('Error fetching schools:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Schools List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schools.map((school) => {
                    const imagePath = `/schoolImages/${school.image}`;

                    return (
                        <div
                            key={school.id}
                            className="border rounded-lg overflow-hidden shadow-md"
                        >
                            <div className="relative overflow-hidden">
                                {/* Image container with aspect ratio */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={imagePath}
                                        alt={school.name}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.src = '/fallback-image.jpg'; // Fallback image path
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-2xl text-center uppercase font-bold-700">{school.name}</h3>
                                <p className='text-center'>{school.address}</p>
                                <p className='text-center'>{school.city}</p>
                                {/* Apply Now Button */}
                                <a
                                    href={`#`} // Adjust the URL as needed
                                    className="mt-4 block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 text-center"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShowSchools;
