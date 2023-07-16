import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Trailer from './components/trailer/Trailer';
import RegistrationForm from './components/form/RegistrationForm';
import LoginForm from './components/form/LoginForm';
import Reviews from './components/reviews/Reviews';
import LandingPage from './components/mainPage/LandingPage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import NavBar from './components/navBar/Navbar';
import SubscriptionForm from './components/form/SubscriptionForm';
import Payments from './components/form/Payments';



function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);

  const getMovies = async () =>{

    try
    {

      const response = await api.get("/api/movies/all");

      // console.log(response.data);
      setMovies(response.data);

    } 
    catch(err)
    {
      console.log(err);
    }
   
  }

  const getMovieData = async (movieId) =>{
    try
    {
      const response = await api.get(`/api/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.setReviews);

    }
    catch(error){

    }
  }

  useEffect(()=>{
    getMovies();
  }, [])


  return (

    <div className="App">
      {/* <LandingPage/> */}
      {/* <SubscriptionForm/> */}
      {/* <Payments/> */}
      
      
     
     {authenticated ? <NavBar /> : <Header />}
      <Routes>
        <Route path="/" element={<Layout/>}>
         <Route path="/" element={<LandingPage/>} ></Route>
          <Route path="/home" element={<Home movies={movies}/>}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews = {reviews} setReviews = {setReviews} />}></Route>
          {!authenticated && <Route path="/register" element={<RegistrationForm />} />}
          {!authenticated && <Route path="/subscribe" element={<SubscriptionForm />} />}
          {!authenticated && <Route path="/pay" element={<Payments />} />}
          {!authenticated && <Route path="/login" element={<LoginForm />} />}
        </Route>
      </Routes>
      
      <Footer/>
    </div>
   
  );
}

export default App;
