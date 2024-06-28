import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "./styles/index.css"
import "./styles/components.css"

// pages
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/auth/Login";
import Register from './components/auth/Register';
import ProductPage from './pages/ProductPage';

/**
 * App component
 * @component
 * @return {object} - The UI of the App component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<ErrorPage />} />
            {/* Auth */}
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* Product */}
            <Route path='/product' element={<ProductPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
