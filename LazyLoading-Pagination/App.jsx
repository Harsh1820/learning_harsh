// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import AddProducts from './AddProducts'
// import ShowProducts from './ShowProducts'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import ProductDetails from './ProductDetails'
// import CategoryManagement from './CategoryManagement'; // Adjust the path as necessary
// import CategoryEdit from './CategoryEdit';
// import CategoryDetail from './CategoryDetail';

// import CategoryForm from './CategoryForm';
// import CategoryList from './CategoryList';
// import Navbar from './Navbar';


// import './Category.css'
// import ShowUsers from './ShowUsers'
// import AddUsers from './AddUsers'
// import Login from "./Login";
// import LazyHome from './LazyHome'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       {/* <Link to="/">Add Products</Link> */}
//       <BrowserRouter>
      

//       <Navbar />

//         <Routes>
//           <Route path='/' element={<AddProducts />}> </Route>
//           <Route path="/show" element={<ShowProducts />}> </Route>
//           <Route path='/products/:id' element={<ProductDetails />}> </Route>
//           <Route path="/admin/category" element={<CategoryManagement />} />

//           <Route path="/admin/category" element={<CategoryManagement />} />
//           <Route path="/lazyhome" element={<LazyHome />} />
//           <Route path="/" element={<CategoryList />} />
//           <Route path="/add" element={<CategoryForm />} />
//           <Route path="/categories" element={<CategoryList />} />
//           <Route path="/view/:id" element={<CategoryDetail />} />
//           <Route path="/edit/:id" element={<CategoryForm />} />


//           {/* <Route path='/admin/users' element ={<AddUsers/>}></Route>
//        <Route path='/show' element ={<ShowUsers/>}></Route> */}

//           {/* <Route path="/login" element={<Login />} />
//           <Route path="/add-user" element={<AddUsers />} />
//           <Route path="/show" element={<ShowUsers />} /> */}



//         </Routes>
//       </BrowserRouter>
//     </div>

//   )
// }

// export default App;


import React from 'react';
import RoleForm from './RoleForm'; // Import the RoleForm component
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddProducts from './AddProducts';
import AddUsers from './AddUsers';
import CategoryForm from './CategoryForm';
import CategoryDetail from './CategoryDetail';
import CategoryList from './CategoryList';
import ShowProducts from './ShowProducts';
const App = () => {
  return (
    <div>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path="/products" element={<AddProducts />} />
          <Route path="/users" element={<AddUsers />} />
          <Route path="/role" element={<RoleForm />} />
          <Route path="/addcategories" element={<CategoryForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/view/:id" element={<CategoryDetail />} />
          <Route path="/edit/:id" element={<CategoryForm />} />
          <Route path="/show" element={<ShowProducts />}> </Route>
          <Route path='/products/:id' element={<ShowProducts />}> </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
};

export default App;
