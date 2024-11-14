import React, { useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const addItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/addItem', {
        UserId: "123",
        Name: "Isha",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const getItem = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getItem/123');
      console.log("Item retrieved:", response.data);
    } catch (error) {
      console.error("Error retrieving item:", error);
    }
  };

  useEffect(() => {
    addItem();
    getItem();
  }, []);

  return <div>Welcome to the Dashboard! Check the console for DynamoDB test results.</div>;
};

export default Dashboard;