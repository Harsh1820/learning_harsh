import React from 'react';
import { useParams } from 'react-router-dom';
import './ParamExample.css';

const ParamExample: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="param-container">
      <h2 className="param-heading">Parameter Example</h2>
      <div className="param-content">
        <p><strong>Parameter ID:</strong> {id}</p>
      </div>
    </div>
  );
}

export default ParamExample;
