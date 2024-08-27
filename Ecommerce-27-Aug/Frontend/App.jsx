import React, { useState, useEffect } from 'react';
import { getAllProducts, searchProductsByName, searchProductsByAvailability, searchProductsByPrice, createProduct, deleteProduct, updateProduct } from './api';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [newProduct, setNewProduct] = useState({ name: '', price: '', availability: 'available' });
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = async () => {
        try {
            let response;
            if (searchType === 'name') {
                response = await searchProductsByName(searchQuery);
            } else if (searchType === 'availability') {
                response = await searchProductsByAvailability(searchQuery);
            } else if (searchType === 'price') {
                response = await searchProductsByPrice(searchQuery);
            }
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleNewProductChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await updateProduct(editProductId, newProduct);
                setEditMode(false);
                setEditProductId(null);
            } else {
                await createProduct(newProduct);
            }
            fetchProducts();
            setNewProduct({ name: '', price: '', availability: 'available' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditMode(true);
        setEditProductId(product._id);
        setNewProduct({ name: product.name, price: product.price, availability: product.availability });
    };

    return (
        <div className="App">
            <h1>E-commerce Products</h1>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="availability">Availability</option>
                    <option value="price">Price Greater Than</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Add/Edit Product Form */}
            <div className="add-product-form">
                <h2>{editMode ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleAddProduct}>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Availability: </label>
                        <select
                            name="availability"
                            value={newProduct.availability}
                            onChange={handleNewProductChange}
                        >
                            <option value="available">Available</option>
                            <option value="not available">Not Available</option>
                        </select>
                    </div>
                    <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
                </form>
            </div>

            {/* Product List */}
            <div className="product-list">
                <h2>Product List</h2>
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <div className="products-container">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <p>Availability: {product.availability}</p>
                                <div className="product-actions">
                                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Menu from './Menu'
// import Login from './Login'
// import Container from './Container'
// import Counter from './Counter'
// import ToDo from './ToDo'
// import Task1 from './Task1'
// import Task2 from './Task2'
// import Task3 from './Task3'
// import Task4 from './Task4'
// import ProductList from './ProductList'
// import NameGenerator from './NameGenerator'
// import GetGitURL from './GetGitURL'
// import LoginUser from './LoginUser';
// import LoginUserMenu from './LoginUserMenu';
// import ReduxCounter from './ReduxCounter'
// import ReduxToDo from './ReduxToDo'

// import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
// import Profile from './Profile'

// import { StyledDataTable } from './StyledTable';

// const data = [
//   { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
//   { id: 3, name: 'Sam Green', age: 45, email: 'sam@example.com' },
//   { id: 4, name: 'Alice Johnson', age: 22, email: 'alice@example.com' }
// ];

// const columns = [
//   {
//     name: 'ID',
//     selector: row => row.id,
//     sortable: true
//   },
//   {
//     name: 'Name',
//     selector: row => row.name,
//     sortable: true
//   },
//   {
//     name: 'Age',
//     selector: row => row.age,
//     sortable: true
//   },
//   {
//     name: 'Email',
//     selector: row => row.email,
//     sortable: true
//   }
// ];

// const App = () => {
//   return (
//     // <div style={{ padding: '20px' }}>
//     //   <h1>My Data Table</h1>
//     //   <StyledDataTable
//     //     columns={columns}
//     //     data={data}
//     //     pagination
//     //     highlightOnHover
//     //     striped
//     //   />
//     // </div>
//     <ToDo/>
//   );
// }
// export default App;


// function App() {

//   // let menuData = [{title: "Home", path : "/"},
//   //   {title : "Todos", path : "/todo"},
//   //   {title : "Login", path: "/login"}
//   // ]

//   let [Show , setShow] = useState(true)

//   return (
//     <div className='App'> 
// {/* 
//     Show var = {Show} <br />

//     <select onChange={(e)=>{e.target.value=="show" ? setShow(false) : setShow(false)}}>

//       <option value="show">Show</option>
//       <option value="hide">Hide</option>
//     </select> */}

//     {/* <Menu menuData = {menuData}/> */}

//    {/* <Container/>
//    <Counter/> */}
//    {/* <Tas k1/>
//    <Task2/>
//    <Task3/>
//    <Task4/> */}
//    {/* <ProductList/> */}
//    {/* <NameGenerator/> */}
//    {/* <GetGitURL/> */} 
//   {/* <ReduxCounter/> */}
//   <ReduxToDo/>

//     <BrowserRouter>
//    {/* <Link to = "/login/Lets-Login/123">Login</Link>
//    <Link to="/counter">Counter</Link> */}

//    <Routes>
//     {/* <Route path='/login/:title/:tokenId' element ={<Login/>}></Route>
//     <Route path='/counter' element ={<Counter/>}></Route> */}
     
    
//    </Routes>
   
//    </BrowserRouter> 

//    </div>
//   )
// }

// export default App
// function App() {
//   return (
//     <Profile/>
//     //   <BrowserRouter>
//     //       <Routes>
//     //           <Route path="/*" element={<ReduxToDo />} />
//     //       </Routes>
//     //   </BrowserRouter>
//   );
// }
// export default App;
// import React, { useState } from 'react';
// import LoginUser from './LoginUser';
// import LoginUserMenu from './LoginUserMenu';
// import './App.css'; // Import the CSS file

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <div>
//             <header>
//                 {isLoggedIn && <LoginUserMenu />}
//             </header>
//             <main>
//                 <LoginUser onLogin={handleLogin} onLogout={handleLogout} />
//             </main>
//         </div>
//     );
// };

// export default App;
