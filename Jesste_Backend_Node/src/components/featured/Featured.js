// import { PlayArrow, InfoOutlined } from '@mui/icons-material';
import './Featured.css';

const Featured = () =>{
    return (
        <div className="featured">
            <div className="container">
                <h1 style={{fontSize:'50px'}}>Unlimited movies, shows and more.</h1>
                <h2 style={{fontSize:'20px'}}>Watch anywhere. Cancel anytime</h2>
                <p style={{fontSize:'20px'}}>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                <div className="inputs">
                    <input className='inp' type="email" placeholder="email address" />
                    <button className='regButs'>Get Started</button>
                </div>
            </div>
        </div>
        
    );
}

export default Featured;