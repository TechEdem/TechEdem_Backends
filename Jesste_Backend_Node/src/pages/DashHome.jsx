import React, {useState} from 'react'
import styled from 'styled-components'
import Home from '../assets/home.svg'
import Upload from '../assets/movie.svg'
import Review from '../assets/clients.svg'
import Logout from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'

function DashHome() {

  // const auth = localStorage.getItem('user')
  let navigate = useNavigate()
  const logout =()=>{
    localStorage.removeItem('token')
    navigate('/admin')
  }
  return (
    <Container>
      <div className='navigation'>
        <nav>
            <div className='title'>
            </div>
            <ul>
            <li><img src={Home} alt="" /> Home</li>
            <li ><img src={Upload} alt="" /> Upload</li>
            <li ><img src={Review} alt="" />Reviews</li>
            <li onClick={logout}><img src={Logout} alt="" /> Logout</li>
            </ul>
        </nav>
      </div>
    </Container>
  )
}

const Container = styled.div`
nav{
    width: 30%;
    height: 100vh;
    background: linear-gradient(97.24deg, #FFE6C8 44.37%, rgba(243, 193, 95, 0) 113.02%);
}
.title{
    width: 100%;
    height: 20%;
    background: rgb(231, 231, 231);
}
nav ul{
    list-style: none;
    justify-content: space-around;
    align-items: center;
    padding-top: 10%;
}
nav ul li{
    padding: 3% 10%;
    justify-content: space-around;
}
nav ul li img{
    width: 60px;
    height: 60px;
}
`
export default DashHome
