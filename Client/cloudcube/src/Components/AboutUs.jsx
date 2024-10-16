import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <header>
        <div className="container">
          <h1 className='p1'>About Cloud<span>Cube</span></h1>
        </div>
      </header>
      
      <div className="container">
        <div className="content">
          <h2>Your Data, Your Way</h2>
          <p>At CloudCube, we believe in empowering individuals and businesses to take control of their digital world. Founded in 2024, our mission is to revolutionize the way you store, manage, and interact with your data.</p>
          
          <h2>Why Choose CloudCube?</h2>
          <ul>
            <li>Customizable Cloud Solutions: Build your own cloud space tailored to your unique needs.</li>
            <li>User-Centric Approach: We put you in control, ensuring your data works for you.</li>
            <li>Cutting-Edge Technology: Leveraging the latest in cloud computing to deliver superior performance.</li>
            <li>Uncompromising Security: Your data's safety is our top priority.</li>
            <li>Scalability: Grow your cloud space as your needs evolve, without limitations.</li>
          </ul>
          
          <h2>Our Vision</h2>
          <p>We envision a world where everyone has access to powerful, personalized cloud computing resources. CloudCube is committed to making this vision a reality by providing intuitive, flexible, and affordable cloud solutions for all.</p>
          
          <h2>Join the CloudCube Community</h2>
          <p>Whether your an individual looking to secure your personal data or a business aiming to streamline operations, CloudCube is here to support your journey. Join us in shaping the future of cloud computing – your way.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;