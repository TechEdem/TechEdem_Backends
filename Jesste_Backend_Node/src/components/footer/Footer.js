import './Footer.css';


const Footer = () =>{
    return (
        <footer className='rendShow-footer'>
            <div className='footer-container'>
                <div className='footer-column'>
                    <ul>
                        <li>FAQ</li>
                        <li>Privacy</li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <ul>
                        <li>Help Centre</li>
                        <li>Jobs</li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <ul>
                        <li>Account</li>
                        <li>About Us</li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <ul>
                        <li>Media Centre</li>
                        <li>Contact Us</li>
                    </ul>
                </div> 
            </div>
            <div className='footer-divider'></div>
            <div className='footer-text'>
                <p>&copy; 2023 rendShow. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;