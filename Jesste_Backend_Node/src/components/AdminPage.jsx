import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { PuffLoader } from 'react-spinners';
import Cinema from '../assets/Cinema3.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash} from "@fortawesome/free-solid-svg-icons";
import Typed from 'react-typed'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function AdminPage() {

  const [loading, setLoading]=useState();

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    }, 3000)
  }, []);

  const [user, setUser] = useState(false);

  const handleClick = ()=>{
    setUser(true);
  };

  const handleLeave = ()=>{
    setUser(false);
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

    const handleLogin = async(event)=>{
      event.preventDefault()
      let data = {
        email: email,
        password: password
      };
      let result = await fetch('http://localhost:6570/jesste/api/users/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let value = await result.json(); 

    if(email || password){
        if(value.success){
          localStorage.setItem('token', value.token)
          toast.success('Login successful')
          navigate('/dash', {email})
        }
        else{
          toast.error("Invalid email or password")
        }
      }
      else{
        toast.error("Email or password must be provided")
        return false;
      }
    }

    const handleSignup = async (event) => {
      event.preventDefault();
  
      let data = {
        fullname: fullname,
        email: email,
        password: password,
      };
      let result = await fetch('http://localhost:6570/jesste/api/users/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let value = await result.json();
      console.warn(value);
      if(fullname|| email|| password)
      {
        if(value.success){
          toast.success('Signup successful!');
        }else{
          toast.error(value.message);
        }
      }
      else{
        toast.error('Please fill all fields');
        return false;
      }
    }

  return (
    <Container>
      {
        loading ?
        <div className='loader'>
          <PuffLoader 
            color={"#FFD39F"} 
            loading={loading} size={200} 
            className='pulseloader'
          />
        </div>
        :
        <header>
          <img src={Cinema} alt=""  className='background'/>
          <div className='main-background'>
            <div className='logo'>
              <Link to='/'><FontAwesomeIcon icon={faVideoSlash} className='icon'/></Link>
              <p>RendShow</p>
            </div>
            <main>
              <div className='title'>
                <Typed strings= {["RendShow"]} typeSpeed={80} backSpeed={80} loop className='typed'/>
                <p>
                  In id enim odio. Nunc aliquet diam tortor, at venenatis urna sagittis non. Suspendisse sodales nulla sit amet sem 
                  condimentum, ac euismod nibh elementum. Praesent eu urna at sem sodales venenatis. Mauris efficitur dapibus enim in posuere
                </p>
              </div>
              <div className='main-login'>
                <div className='login-form'>
                    <h1>Login</h1>
                    <form onClick={handleLogin}>
                    
                          <div className='field'>
                            <label>Email:</label>
                            <br />
                            <input type='email' name='Email' id='username' placeholder='Enter username' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <br />
                            <label>Password:</label>
                            <br />
                            <input type='password' name='Password' id='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                          </div>
                          <button className='login-button'>Login</button>
                    </form>

                    <div className='extra'>
                        <p>New to RendShow? <span onClick={handleClick}>Register Now</span></p>
                    </div>
                    <div className='sign'>
                    {
                      user && (
                        <div className='sign-form'>
                          <h1>Sign Up</h1>
                          <form onClick={handleSignup}>
                            <div className='field'>
                              <label>Fullname:</label>
                              <br />
                              <input type='text' name='Fullname' id='fullname' placeholder='Enter fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                              <br />
                              <label>Email:</label>
                              <br />
                              <input type='email' name='Email' id='username' placeholder='Enter username' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                              <br />
                              <label>Password:</label>
                              <br />
                              <input type='password' name='Password' id='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <button className='login-button'>Sign Up</button>
                          </form>
                          <div className='extra'>
                          <p>New to RendShow? <span onClick={handleLeave}>Sign In Now</span></p>
                          </div>
                        </div>
                      )
                    }
                    </div>
                    
                    
                </div>
              </div>
            </main>
          </div>
        </header>
      }
    </Container>
  )
}

const Container = styled.div`
.loader{
  padding: 15% 42%;
}
.background{
  position: absolute;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.main-background{
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.56);
}
.logo{
  display: flex;
  padding: 1%;
}
.icon{
  width: 40px;
  height: 40px;
  color: gold;
}
.logo p{
  font-size: 30px;
  color: white;
}
main{
  display: flex;
}
.title{
  padding: 8% 5%;
  width: 40%;
}
.typed{
  font-size: 90px;
  background: linear-gradient(97.24deg, #FFE6C8 44.37%, rgba(243, 193, 95, 0) 113.02%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.title p{
  color: white;
}
.main-login{
  width: 60%;
  padding-left: 15%;
}
.login-form{
  background-color: white;
  width: 70%;
  height: 70vh;
  border-radius: 10px;
  padding-top: 3%;
}
.login-form h1{
  text-align: center;
  text-decoration: underline;
  font-family: sans-serif;
  font-weight: 700;
  color: #FFD39F;
}
form{
  padding: 3% 8%;
}
.field{
  padding: 1% 0%;
}
label{
  font-size: 17px;
  padding: 2% 0%;
  color: grey;
}
input{
  width: 400px;
  height: 50px;
  padding-left: 2%;
  padding-bottom: 2%;
  border: 3px solid rgba(128, 128, 128, 0.271);
  border-radius: 10px;
  outline: none;
}
.login-button{
  width: 400px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  background-color: #FFD39F;
  font-family: sans-serif;
}
.extra{
  color: grey;
  text-align: center;
}
span{
  color: #FFD39F;
  cursor: pointer;
}
.sign-form{
  position: absolute;
  top: 0;
  display flex;
  margin-top: 6%;
  background-color: white;
  width: 31.5%;
  height: 70vh;
  border-radius: 10px;
  padding-top: 1%;
}
`
export default AdminPage
