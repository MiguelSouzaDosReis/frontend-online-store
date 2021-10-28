import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CheckOut from './pages/CheckOut';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route
          path="/product/:categoryId/:inputValue"
          component={ ProductDetails }
        />
        <Route exact path="/checkout" component={ CheckOut } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
