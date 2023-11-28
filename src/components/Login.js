import './Login.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import {initializeApp} from'firebase/app';
import {getAuth, signInWithEmailAndPassword ,createUserWithEmailAndPassword} from'firebase/auth'; 
import { firebaseConfig } from './firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Login = ()=>{
initializeApp(firebaseConfig);
 const navigate=useNavigate();
 const location=useLocation();
 console.log(location);
const page=location.pathname==='/Login'?true:false;
 const[email,setEmail]= useState('');
 const[password,setPassword]=useState('');
 const auth=getAuth();
 const [isUserExist,setUserExist]= useState(false);
 const[isEmailUsed,setIsEmailUsed]= useState(false);
 
 const[emailValid,setEmailValid]=useState(true);
 const[passwordValid,setpasswordValid]=useState(true);
 const validation =(fieldName, value)=>{
    switch(fieldName){
    case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    case 'password':
        return value.length>=6;
    default :
       break;
    }
 };
    const ctaClickHandler =(e)=>{
        e.preventDefault();
        if(!validation('email',email)||!validation('password',password)){
         setEmailValid(validation('email',email));
         setpasswordValid(validation('password',password));
         return;   
        }
    
        if(page){
        signInWithEmailAndPassword(auth,email,password)
            .then (auth =>{
                if(auth){
                    navigate('/dashboard');
                }
            })
        .catch(error =>setUserExist(true));
        //user not found
    }else{
        createUserWithEmailAndPassword(auth,email,password)
        .then(
            auth =>{
                if(auth){
                    navigate('/dashboard');
                }
            }
        )
        .catch(error=>setIsEmailUsed(true));
    }
}
useEffect(()=>{
 setIsEmailUsed(false);
 setUserExist(false);
},[location])
 const emailOnchangeHandler =(e)=>{
   setEmail(e.target.value)
 }
 

    return(
        <div>
            <Header/>
            <div className="container-fluid-xl">
             <div className="login">
            <div className="shadow">
                    <img className="concord-img viv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="se"/>
                    </div>
                </div> 
                    
            <div className="card">
                <div className="card-body">
            <h1 className="text-white">
               {page ?'Sign In':'Register'}
            </h1>
            <br/>
            <form>
                <input className="form-control" value={email} onChange={emailOnchangeHandler} type="email" placeholder="Email Address" required/>
                { !emailValid &&<p className="text-danger">Email is invalid/blank</p>}
                <br/>
                <input className="form-control" value={password} type="password" onChange={ (e)=>setPassword(e.target.value)} placeholder="Password" required/>
               { !passwordValid &&<p className="text-danger">Password is invalid/blank</p>}<br/>
                <button className="btn btn-danger" style={{width:"100px"}} onClick={ctaClickHandler}>{page ?'Sign In':'Register'}</button>
                <br/>
                {
                    page && <div className="form-check">
                    <input type="checkbox" className="form-check-input" value="" id="checkbox" required />
                    <label className="form-check-label text-white" htmlFor="flexCheck">Remember Me</label>
                </div>
                }
            </form>
            <br/>
            <br/>
            { isUserExist && <p className="text-white">User does not exist| Go for signup</p>}
            { isEmailUsed && <p className="text-white">email-already-in-use| Go for Sign In</p>}
            <div className="login-form-other">
                <div className="login-signup-now text-white">
                {page ?'New to Netflix?':'Existing User'}
                     &nbsp;
                    <Link className=" " to={page ? '/register':'/Login'}>
                    {page ?'Sign Up now':'Sign In'}
                    </Link>
                
            </div>
            </div>
            </div>
                    
         </div>
         </div>
         </div>
         
       
    )
}
export default Login;