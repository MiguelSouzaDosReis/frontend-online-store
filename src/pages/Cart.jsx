import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        <div key={ product.id }>
          <p data-testid="shopping-cart-product-name">{product.title}</p>
          <p>{ product.id }</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{ product.price }</p>
          <p data-testid="shopping-cart-product-quantity">1</p>
        </div>
      ))
    );
  }

  backButton = (event) => {
    event.preventDefault();
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
