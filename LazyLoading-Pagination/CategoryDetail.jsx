// CategoryDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Category.css';

function CategoryDetail() {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/categories/${id}`);
        setCategory(response.data);
      } catch (err) {
        setError("Error fetching category.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      navigate('/'); // Navigate back to the main page after deletion
    } catch (err) {
      setError("Error deleting category.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!category) return <p>Loading...</p>; // Add a loading state if category is null

  return (
    <div className="category-detail">
      <h1>Category Details</h1>
      <p><b>Name:</b> {category.name}</p>
      <p><b>Description:</b> {category.description}</p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CategoryDetail;
