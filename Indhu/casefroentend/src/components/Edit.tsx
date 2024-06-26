import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { NavLink } from 'react-router-dom'
const ProfileEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });
    const baseUrl = 'http://localhost:3000/api';
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    //edit mode if id as a parameter
                    const response = await axios.get(`${baseUrl}/${id}`);
                    setFormData(response.data);
                }
            } catch (error) {
                console.error('Error fetching page details:', error.message);
            }
        };
        fetchData()
    }, [])
 
 
    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        }));
    };
 
    const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await axios.put(`${baseUrl}/edit/${id}`, formData);
        toast.success('User updated successfully');
        navigate('/myprofile'); // Redirect to the userprofile page
    };
 
    return (
        <div className='border border dark rounded container-fluid w-50 shadow-lg p-3 mb-5 mt-5 bg-white rounded'>
            <h3 className="text-center mb-4">Edit Profile</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Full Name:</label>
                    <input type="text" className="form-control" value={formData.name} id="name" onChange={handleChange} name="name" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="age" className="col-form-label">Age:</label>
                    <input type="number" className="form-control" value={formData.age} id="age" onChange={handleChange} name="age" />
                </div>
                <div className="form-group">
                    <label htmlFor="gender" className="col-form-label">Gender:</label>
                    <select className="form-control" value={formData.gender} id="gender" onChange={handleChange} name="gender">
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div><br/>
 
                <div className="text-center d-flex flex-row-reverse">
                    <button type="submit" onClick={handleUpdate} className="btn btn-primary">Update</button>
                    <NavLink to='/userprofile'><button type="button" className="btn btn-secondary me-2" data-dismiss="modal">Cancel</button></NavLink>
 
                </div>
            </form>
        </div>
    );
}
 
export default ProfileEdit;