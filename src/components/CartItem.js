import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor() {
    super();

    this.state = {
      count: 1,
    };
  }

  handleIncrease = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  handleDecrease = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }

  render() {
    const { count } = this.state;
    const { product } = this.props;
    return (
      <>
        <div key={ product.id }>
          <p data-testid="shopping-cart-product-name">{ product.title }</p>
          <p>{ product.id }</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{ product.price }</p>
        </div>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ this.handleIncrease }
        >
          +
        </button>
        <p data-testid="shopping-cart-product-quantity">{ count }</p>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ count > 0 && this.handleDecrease }
        >
          -
        </button>
      </>
    );
  }
}

CartItem.propTypes = PropTypes.shape({
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
}).isRequired;

export default CartItem;
