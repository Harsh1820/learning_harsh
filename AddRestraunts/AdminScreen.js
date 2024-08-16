import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminScreen.css';

const API_URL = 'http://localhost:1337/api/restraunts'; // Correct URL

function AdminScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [newRestaurantEmail, setNewRestaurantEmail] = useState('');
  const [newRestaurantStatus, setNewRestaurantStatus] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(API_URL);
      setRestaurants(response.data.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const addRestaurant = async () => {
    if (!newRestaurantName || !newRestaurantEmail || !newRestaurantStatus) {
      console.error('All fields are required');
      return;
    }
    try {
      await axios.post(API_URL, {
        data: {
          name: newRestaurantName,
          email: newRestaurantEmail,
          status: newRestaurantStatus === 'Active', // Convert to boolean
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setNewRestaurantName('');
      setNewRestaurantEmail('');
      setNewRestaurantStatus('');
      fetchRestaurants();
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      const { name, email, status } = response.data.data.attributes;
      setSelectedRestaurant(response.data.data);
      setEditName(name);
      setEditEmail(email);
      setEditStatus(status ? 'Active' : 'Inactive'); // Convert boolean to string
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedRestaurant) return;

    try {
      await axios.put(`${API_URL}/${selectedRestaurant.id}`, {
        data: {
          name: editName,
          email: editEmail,
          status: editStatus === 'Active', // Convert string back to boolean
        },
      });
      setSelectedRestaurant(null);
      setEditName('');
      setEditEmail('');
      setEditStatus('');
      fetchRestaurants();
    } catch (error) {
      console.error('Error editing restaurant:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSelectedRestaurant(null);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Screen</h1>

      <div className="input-container">
        <input
          type="text"
          value={newRestaurantName}
          onChange={(e) => setNewRestaurantName(e.target.value)}
          placeholder="New Restaurant Name"
        />
        <input
          type="email"
          value={newRestaurantEmail}
          onChange={(e) => setNewRestaurantEmail(e.target.value)}
          placeholder="New Restaurant Email"
        />
        <select
          value={newRestaurantStatus}
          onChange={(e) => setNewRestaurantStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={addRestaurant}>Add Restaurant</button>
      </div>

      <div>
        <h2>All Restaurants</h2>
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              {restaurant.attributes.name}
              <button onClick={() => handleDetails(restaurant.id)}>Details</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedRestaurant && (
        <div className="details-container">
          <h2>Restaurant Details</h2>
          <p><strong>Name:</strong> {selectedRestaurant.attributes.name}</p>
          <p><strong>Email:</strong> {selectedRestaurant.attributes.email}</p>
          <p><strong>Status:</strong> {selectedRestaurant.attributes.status ? 'Active' : 'Inactive'}</p>
          <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Edit Name"
            />
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="Edit Email"
            />
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Save</button>
          </form>
          <button onClick={() => handleDelete(selectedRestaurant.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default AdminScreen;


