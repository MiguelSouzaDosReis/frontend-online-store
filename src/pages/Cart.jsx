import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

class Cart extends Component {
  conditionRenderCart = () => {
    const { location: { state } } = this.props;
    if (state.length === 0) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    }

    return (
      state && state.map((product) => (
        <CartItem
          key={ product.id }
          product={ product }
        />
      ))
    );
  }

  render() {
    return (
      <>
        { this.conditionRenderCart() }
        <Link
          to="/"
        >
          <button type="button">Voltar</button>
        </Link>
      </>
    );
  }
}

Cart.propTypes = PropTypes.shape({
  location: PropTypes.objectOf,
  state: PropTypes.objectOf,
}).isRequired;

export default Cart;
