import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { PuffLoader } from 'react-spinners';
import DashHome from './DashHome';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

let navigate = useNavigate()

const [loading, setLoading]=useState();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/admin')
    }
    else{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false)
        }, 3000)
    }
    
  }, []);

  const [pages, setPages] = useState('home');

  const toggle = (page) => {
    setPages(page);
  };

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

           <div className='description'>
            <DashHome />
           </div>
        }
    </Container>
  )
}

const Container = styled.div`
.loader{
    padding: 15% 42%;
}

`
export default Dashboard
