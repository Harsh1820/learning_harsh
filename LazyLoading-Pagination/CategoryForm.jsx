import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Category.css';

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
});

function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ name: '', description: '' });
  const [error, setError] = useState(null);
  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/categories/${id}`);
          setInitialValues(response.data);
        } catch (err) {
          setError("Error fetching category."); 
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/v1/categories/${id}`, values);
      } else {
        await axios.post('http://localhost:3000/api/v1/categories', values);
      }
      navigate('/categories');
    } catch (err) {
      setError("Error saving category.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="category-form">
      <h1>{isEditing ? 'Edit Category' : 'Add Category'}</h1>
      {error && <p className="error">{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isEditing ? 'Update Category' : 'Add Category'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CategoryForm;
