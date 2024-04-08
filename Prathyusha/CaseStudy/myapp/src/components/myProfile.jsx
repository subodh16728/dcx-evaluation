import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        // Fetch user data when component mounts
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Fetch user data from backend API
            const response = await axios.get('http://localhost:4000/api/myprofile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Set user data in state
            setUserData({
                username: response.data.username,
                email: response.data.email
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            
        }
    };

    const handleChange = e => {
        
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Send updated user data to backend API
            await axios.put('http://localhost:4000/api/profile', userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            // Optionally, show success message or redirect to another page
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle error
        }
    };

    return (
        <div className="profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
