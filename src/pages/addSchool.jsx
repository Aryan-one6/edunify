import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddSchool = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('city', data.city);
        formData.append('state', data.state);
        formData.append('contact', data.contact);
        formData.append('email_id', data.email_id);

        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        } else {
            formData.append('image', '');
        }

        try {
            await axios.post('/api/schools', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("School added successfully!");
        } catch (error) {
            console.error("Error adding school:", error);
            alert("Failed to add school. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl text-center mb-4">Add School</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-white-800">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter school name"
                        {...register('name', { required: 'Name is required' })}
                        className="input text-gray-900"
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-white-800">Address</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Enter address"
                        {...register('address', { required: 'Address is required' })}
                        className="input text-gray-900"
                    />
                    {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-white-800">City</label>
                    <input
                        id="city"
                        type="text"
                        placeholder="Enter city"
                        {...register('city', { required: 'City is required' })}
                        className="input text-gray-900"
                    />
                    {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-white-800">State</label>
                    <input
                        id="state"
                        type="text"
                        placeholder="Enter state"
                        {...register('state', { required: 'State is required' })}
                        className="input text-gray-900"
                    />
                    {errors.state && <span className="text-red-500">{errors.state.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-sm font-medium text-white-800">Contact</label>
                    <input
                        id="contact"
                        type="text"
                        placeholder="Enter contact number"
                        {...register('contact', { 
                            required: 'Contact is required',
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: 'Contact must be a valid number (10-15 digits)'
                            }
                        })}
                        className="input text-gray-900"
                    />
                    {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email_id" className="block text-sm font-medium text-white-800">Email ID</label>
                    <input
                        id="email_id"
                        type="email"
                        placeholder="Enter email address"
                        {...register('email_id', { 
                            required: 'Email ID is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address'
                            }
                        })}
                        className="input text-gray-900"
                    />
                    {errors.email_id && <span className="text-red-500">{errors.email_id.message}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-white-800">Image</label>
                    <input
                        id="image"
                        type="file"
                        placeholder='Select School Image'
                        {...register('image', { 
                            validate: {
                                required: value => value.length > 0 || 'Image is required',
                                fileType: value => !value[0] || ['image/jpeg', 'image/png'].includes(value[0].type) || 'Only JPEG and PNG formats are allowed',
                                fileSize: value => !value[0] || value[0].size <= 2 * 1024 * 1024 || 'File size must be less than 2MB'
                            }
                        })}
                        className="input text-white-700"
                    />
                    {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                </div>
                <button type="submit" className="btn w-full">Submit</button>
            </form>
        </div>
    );
};

export default AddSchool;
