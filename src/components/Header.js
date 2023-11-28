import './Header.css';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header(){
    const Navigate= useNavigate();
    const Hello =(e)=>{
        e.preventDefault();
        Navigate('./Login');
    }
    return(
     
        
       <header className="top-Nav">
        <div className="container-fluid-xl">
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#"><Link className="navbar-brand" to="/">
            <img src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="sec" className="nav_logo"/>
            </Link>  </Navbar.Brand>  
      
          
            

           <div className="navbar">
            <form className="d-flex" role="search">
            <select>
                <option>
                    English
                </option>
                <option>
                    Hindi
                </option>
            </select>
            <button className="btn btn-danger" onClick={Hello}>
                Signin
            </button>
            </form>
            </div> 
        
            
        
      </Navbar>
    </div>
           
          </header>
          
          
           
          
           
    
)
}
export default Header;