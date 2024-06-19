import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from 'react-router-dom';
import Loginposter from '../Assetes/loginposter.jpg';
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            
            const data = await response.json();
             console.log(data); 

             
                if (response.ok) {
                setLoginSuccess(true);
               
                } else {
                setLoginSuccess(false);
                
             }
                } catch (error) {
                    console.error('Error:', error);
                
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>
                    <MDBCol md='4'>
                        <MDBCardImage src={Loginposter} alt="login form" className='rounded-start w-100' />
                    </MDBCol>
                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>
                            <div className='d-flex flex-row mt-2'>
                            {/* <img src={pawlogo} alt="Login Icon" class="fa-3x me-3" style={{ width:'50px' ,height:'50px'}} /> */}
                                <span className="h1 fw-bold mb-0">SIGN UP</span>
                            </div>
                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Register your account</h5>
                            <form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4' label='Name' id='name' type='text' size="lg" value={name} onChange={(e) => setName(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <MDBBtn type="submit" className="mb-4 px-5" color='dark' size='lg'>Sign Up</MDBBtn>
                            </form>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>  <Link to="/login" style={{ color: '#393f81' }}> have an account?Login here</Link></p>
                            {loginSuccess && <p className="text-success">Register successful!</p>}
                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
}

export default Register;
