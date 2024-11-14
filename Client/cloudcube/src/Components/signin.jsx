import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './signup.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate successful sign-up and redirect to the home page
      console.log('Sign up successful');
      navigate('/'); // Redirect to home page
    }
  };

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
          <h1>Sign in to Your CloudCube Account</h1>
          <p>Join the CloudCube community and get access to your personal cloud storage for free!</p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit" className="signup-button">Sign In</button>
        </form>

        <p className="signin-link">
          Not an existing user? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
