import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Todo from './components/Todo';
import Counter from './components/Counter';
import ParamExample from './components/ParamExample';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/todo">Todo</Link>
          <Link className="nav-link" to="/counter">Counter</Link>
          <Link className="nav-link" to="/param/test-id">ParamExample</Link>
        </nav>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/param/:id" element={<ParamExample />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
