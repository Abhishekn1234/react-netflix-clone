import React from 'react';
import './App.scss';
import  {BrowserRouter as Router,Routes,Route} from'react-router-dom';
import Header from './components/Header';
import Home from './components/HomeBanner';
import Login from './components/Login';
import Movie from './components/List';
import Pie from './components/Pie';
function App() {
  return (
    <div>
      <React.Fragment>
        <Router>
          <Routes>
            <Route path="/" element={
              <React.Fragment>
              <Header bg="dark" variant="dark" expand="lg" fixed="top"/>
              <Home/>
              <Pie/>
              </React.Fragment>
            } />
            <Route path="/Login" element={
              <React.Fragment>
                <Header/>
              <Login page={true}/>
              </React.Fragment>
              
            } />
            <Route path="/register" element={
              <React.Fragment>
              <Header/>
              <Login page={false}/>
              </React.Fragment>
              
            } />
             <Route path="/dashboard" element={
              <React.Fragment>
                
                <Movie/>
                
              </React.Fragment>
            } />
          </Routes>
        </Router>
      
      
      </React.Fragment>
    </div>
  );
}

export default App;
