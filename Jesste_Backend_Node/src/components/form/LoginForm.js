import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import  {Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated") || false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/customer/authenticate", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        // setauthenticated(true);
        // localStorage.setItem("authenticated", true);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error){
      console.error(error);
    }

  };
  

  // useEffect(() => {
  //   if (data && data.success) {
  //     // Navigate to the Trailer page if authentication is successful
  //     navigate('/dashboard');
  //   }
  // }, [data, navigate]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Call backend API to authenticate user
  //   fetch("http://localhost:1001/api/customer/authenticate", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email, password })
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch(error => console.log(error))
  // };
 

  return (

    <Form className="log-form" onSubmit={handleSubmit}>
   
    <Form.Group controlId="email">
      <Form.Label className="log-label" >Email address</Form.Label>
      <Form.Control className="log-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
    </Form.Group>

    <Form.Group controlId="password">
      <Form.Label className="log-label" >Password</Form.Label>
      <Form.Control className="log-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
    </Form.Group>

    <Button className="log-button" variant="primary" type="submit">Login</Button>
    <Form.Label className="log-label">Not registered? <a  href='/register'>SignUp here</a> </Form.Label>
    <Form.Label className="log-label"><Link to='/admin'>Click here if you are an administrator</Link></Form.Label>

  </Form>

  );
}

export default LoginForm;
