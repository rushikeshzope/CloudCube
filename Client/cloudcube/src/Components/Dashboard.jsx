import React from 'react';
import './Dashboard.css';
import photo from '../assets/logo.png';
import pic from "../assets/folder.png";
import photo2 from '../assets/cloud.png';
import photo3 from '../assets/comp.png';
import photo4 from '../assets/computer.png';
import photo5 from '../assets/data.png';
import photo6 from '../assets/multiple.png';
import photo7 from '../assets/storage.png';


const Dashboard = () => {
    const marqueeImages = [photo2, photo3, photo4, photo5, photo6, photo7,];


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img src={photo} alt="CloudCube Logo" />
        </div>
        <ul>
          <li>Create</li>
          <li>Upload</li>
          <li>Trash</li>
          <li>Storage</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1 className='user-entry'>Hello <span className="username">Aditya</span></h1>
          <p>CLOUD UP!</p>
        </div>
        <div className="file-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="file-item">
              <img src={pic} alt="Folder" />
              <p>Files</p>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-icons">
        <img src={photo2} alt="Icon1" />
        <img src={photo3} alt="Icon2" />
        <img src={photo4} alt="Icon3" />
        <img src={photo5} alt="Icon4" />
        <img src={photo6} alt="Icon5" />
      </div>
    </div>
  );
};

export default Dashboard;
