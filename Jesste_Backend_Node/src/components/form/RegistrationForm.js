import React, { useState, useEffect } from 'react';
import  {Form, Button } from 'react-bootstrap';
import './Form.css';
import { useNavigate } from 'react-router-dom';



function RegistrationForm() {
 
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [ghanaPostGPS, setGhanaPostGPS] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jwt, setJwt] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Token updated:', jwt);
  }, [jwt]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    //Construct the userData
    const userData = {
      firstName,
      lastName,
      phoneNo,
      address:{
        ghanaPostGPS,
        streetName,
        city,
        region
      },
      email,
      password,
      confirmPassword
    };
    // Call backend API to register user 
    fetch('http://localhost:8080/api/customer/register',{
      method: 'POST',
      headers: {
       
        'Content-Type': 'application/json'
      },
      
      body:JSON.stringify(userData)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data); // Handle the response data as needed
  
        // Navigate to the subscription page on successful registration
        navigate('/subscribe');
      })
      .catch(error => console.log(error));

      
  };


  return (
    <Form className="reg-form" onSubmit={handleSubmit}>
      <h2 className='m-5' style={{color: 'black'}} >CREATE AN ACCOUNT</h2>
      <Form.Group controlId="firstName">
        <Form.Label className="reg-label" >First Name</Form.Label>
        <Form.Control className="reg-input" type="text" placeholder="Enter your first name" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label className="reg-label" >Last Name</Form.Label>
        <Form.Control className="reg-input" type="text" placeholder="Enter your last name" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="phoneNo">
        <Form.Label className="reg-label" >Phone Number</Form.Label>
        <Form.Control className="reg-input" type="tel" placeholder="Enter your phone number" value={phoneNo} onChange={(event) => setPhoneNo(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="ghanaPostGPS">
        <Form.Label className="reg-label" >GhanaPostGPS</Form.Label>
        <Form.Control className="reg-input" type="text" placeholder="Enter your GhanaPostGPS code" value={ghanaPostGPS} onChange={(event) => setGhanaPostGPS(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="streetName">
        <Form.Label className="reg-label" >Street Name</Form.Label>
        <Form.Control className="reg-input" type="text" placeholder="Enter your street name" value={streetName} onChange={(event) => setStreetName(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="city">
        <Form.Label className="reg-label" >City</Form.Label>
        <Form.Control className="reg-input" type="text" placeholder="Enter your city" value={city} onChange={(event) => setCity(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="region">
        <Form.Label className="reg-label" >Region</Form.Label>
        <Form.Control className="reg-input" type="text" placeholder="Enter your region" value={region} onChange={(event) => setRegion(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label className="reg-label" >Email address</Form.Label>
        <Form.Control className="reg-input" type="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label className="reg-label" >Password</Form.Label>
        <Form.Control className="reg-input" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label className="reg-label" >Confirm Password</Form.Label>
        <Form.Control className="reg-input" type="password" placeholder="Enter your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
      </Form.Group>

      <Form.Group>
        <Form.Check label="I to agree all statements in Terms of Service"/>
      </Form.Group>

      <Button className="reg-button" variant="primary" type="submit">SignUp</Button>
      {errorMessage && <p>{errorMessage}</p>}
      <Form.Label className="reg-label" >Already registered? <a  href='/login'>Login here</a> </Form.Label>
    </Form>
  );
}

export default RegistrationForm;
