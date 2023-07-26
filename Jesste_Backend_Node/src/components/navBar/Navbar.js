import { Search, Notifications, AccountCircle, Devices  } from '@mui/icons-material';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash, faUser, faSignOutAlt, faEdit, faCog, faUsers} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

const NavBar = () => {
    //change the color of the navbar background color to black when it's scrolled
    const [isScrolled, setIsScrolled] = useState(false);
   window.onscroll = () =>{
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
   };
   console.log(isScrolled);
    return (
        <div className={isScrolled ? "navbarscrolled" : "navbar"}>
            <div className='container'>
                <div className='left'>
                    <Navbar.Brand className="my-brand" href="/" style={{color:"gold"}}>
                        <FontAwesomeIcon icon={faVideoSlash}/>rendShow
                    </Navbar.Brand>
                    <span>Homepage</span>
                    <span>Series</span>
                    <span>Movies</span>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className='right'>
                    <Search className="icons" />
                    <span>KID</span>
                    <Notifications className="icons"/>
                    <Dropdown alignRight>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      <AccountCircle/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                         <Dropdown.Item href="#/action-1"><FontAwesomeIcon icon={faUser} /> My Profile</Dropdown.Item>
                         <Dropdown.Item href="#/action-4"><FontAwesomeIcon icon={faUsers} />Add Users</Dropdown.Item>
                         <Dropdown.Item href="#/action-5" ><Devices/>Connected Devices</Dropdown.Item>
                         <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faEdit} /> Edit Profile</Dropdown.Item>
                         <Dropdown.Item href="#/action-3"><FontAwesomeIcon icon={faCog} /> Settings</Dropdown.Item>
                         <Dropdown.Divider />
                         <Dropdown.Item href="#/action-3"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
                

            </div>
        </div>
    );
}

export default NavBar;