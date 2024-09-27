import React from 'react';
import { motion } from 'framer-motion';
import './signup.css';

function SignUp() {
  return (
    <div className="signup-container">
      {/* Larger and more visible Cloud animations */}
      <motion.div
        className="cloud"
        initial={{ x: -250 }}
        animate={{ x: [0, 1000, 0] }} // Cloud moves from left to right, then resets
        transition={{
          repeat: Infinity,
          duration: 40, // Slower movement
          ease: 'easeInOut', // Smoother animation
        }}
      />

      <motion.div
        className="cloud"
        initial={{ x: 250 }}
        animate={{ x: [-1000, 0, -1000] }} // Cloud moves from right to left, then resets
        transition={{
          repeat: Infinity,
          duration: 45,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="cloud"
        initial={{ x: -350 }}
        animate={{ x: [0, 800, 0] }} // Another cloud moving with a different speed
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: 'easeInOut',
        }}
      />

      {/* Signup box */}
      <div className="signup-box">
        <div className="signup-header">
          <div className="cloud-icon" />
          <h1>Create Your CloudCube Account</h1>
          <p>Join the CloudCube community and get access to your personal cloud storage for free!</p>
        </div>
        <form className="signup-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
