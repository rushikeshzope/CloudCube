import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import photo from '../assets/logo.png';
import photo1 from '../assets/db.png';
import photo2 from '../assets/cloud.png';
import photo3 from '../assets/comp.png';
import photo4 from '../assets/computer.png';
import photo5 from '../assets/data.png';
import photo6 from '../assets/multiple.png';
import photo7 from '../assets/storage.png';

function Home() {
  // Array of image sources for the marquee
  const marqueeImages = [photo2, photo3, photo4, photo5, photo6, photo7, photo1];

  return (
    <div>
      <div className='logo-container'>
        <div className="cloud-logo">
          <img src={photo} alt="Logo" />
        </div>
        <div className="login-options">
          <Link to="/signup"><h3 className="signup">SIGN UP</h3></Link>
          <p className='divider'>|</p>
          <Link to="/signin"><h3 className="signin">SIGN IN</h3></Link>
        </div>
        <div className="database">
          <img src={photo1} alt="Database Icon" height="100px" />
        </div>
      </div>
      <div className="landing">
        <h1 className='p1'><span>WELCOME TO</span> CLOUD<span>CUBE</span></h1>
        <Link to="/aboutUs"><h3 className='signup'>About Us</h3></Link>
        <h2 className='p2'>YOUR DATA, YOUR WAY <br />BUILD YOUR OWN CLOUD SPACE FOR FREE</h2>
        <Link to="/dashboard"><button className='started'>GET STARTED</button></Link>
      </div>
      <hr className='line' />

      <div className="animation">
        <div className="marquee">
          {marqueeImages.map((imgSrc, index) => (
            <div className={`s${index + 1}`} key={index}>
              <img src={imgSrc} alt={`Marquee Icon ${index + 1}`} height="100px" />
            </div>
          ))}
          {/* Repeat the images to create a continuous loop */}
          {marqueeImages.map((imgSrc, index) => (
            <div className={`s${index + 1}`} key={index + marqueeImages.length}>
              <img src={imgSrc} alt={`Marquee Icon ${index + marqueeImages.length + 1}`} height="100px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
