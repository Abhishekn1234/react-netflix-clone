import './Home.css';
import { useNavigate } from 'react-router-dom';
function Home(){
  const navigate=useNavigate();
  function Getstarted(){
    navigate('/register');
  }
    return(
        <div>
           <div className="container-fluid-xl">
           
             <div className="home-banner">
             
             
           <div className="our-story"><br/><br/><br/><br/><br/>
                 
           <h1 className="our-story-card-title" data-uia="hero-title">
                 Enjoy big movies, hit series and more<br/> from ₹ 149.</h1>
                 <h2 className="our-story-card-subtitle" data-uia="our-story-card">
                Join today. Cancel anytime.</h2><br/><p className="email-form-title">
                    Ready to watch? Enter your email to create or restart your membership.</p> 
                    <div className="input-group">
                        <input type="email" className="form-control" placeholder="Email address"/>
                        <button className="input-group-button btn-danger text-white" onClick={Getstarted} required>Get started</button>
                       
                    </div>
                    </div> 
                    
            </div>
          </div>
          </div>
        
    )
}
export default Home;