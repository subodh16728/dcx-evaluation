import React, { useEffect, useState } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';

import axios from 'axios';

 
function Userprofile() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])
    const [data1, setData] = useState({
        name: "",
        email: "",
        age:0,
        gender:"",
       
    });
 
    
     const userId = localStorage.getItem('userId');
     console.log(userId);
   
   
    
 
    const ProfileHandler = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId)
            const response = await axios.get(`http://localhost:3000/api/${userId}` );
           
            setData(response.data);
           
           
 
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
        }
    };
 
    
    useEffect(() => {
        ProfileHandler();
    }, []);
 
    return (
        <>
       
            <section>
                <div class="container shadow-lg p-3 mb-5 mt-5 bg-white rounded p-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="book-header">
                                        <div className="row">
                                            <div className=" col xs={6} sm={6} md={6} lg={6}">
                                                <i className="glyphicon glyphicon-file"></i> Welcome {data1.name}
                                            </div>
                                            <div className="col xs={6} sm={6} md={6} lg={6} d-flex flex-row-reverse">
                                                <NavLink to={`/edit/${data1._id}`}><button type="button" className="btn btn-primary shadow-lg"><i className="bi bi-pencil-square"></i> Edit</button></NavLink>  </div>
                                        </div>
                                    </h1>
                                </div>
                                <div className="row">
 
                                    <div className="col-md-6">
 
                                        <p><strong>Name:</strong> {data1.name}</p>
                                        <p><strong>Email:</strong> {data1.email}</p>
 
                                        <p><strong>Gender:</strong> {data1.gender}</p>
                                        <p><strong>Age:</strong> {data1.age}</p>
 
                                    </div>
 
 
                                </div>
 
 
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
 
export default Userprofile;