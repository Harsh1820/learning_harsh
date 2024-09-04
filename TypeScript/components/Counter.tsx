import React, { useState } from 'react';
import './Counter.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2 className="counter-heading">Counter</h2>
      <div className="counter-display">
        <button className="counter-button" onClick={() => setCount(count - 1)}>-</button>
        <span className="counter-value">{count}</span>
        <button className="counter-button" onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

export default Counter;
