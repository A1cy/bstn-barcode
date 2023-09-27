import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [currentSku, setCurrentSku] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleNavigateToProduct = (sku) => {
    setCurrentSku(sku);
    setCurrentPage('product');
  };

  return (
    <div>
      {currentPage === 'login' && !isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {currentPage === 'home' && isLoggedIn && <HomePage onNavigateToProduct={handleNavigateToProduct} />}
      {currentPage === 'product' && isLoggedIn && <ProductPage sku={currentSku} />}
    </div>
  );
};

export default App;
