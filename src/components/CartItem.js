import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItem extends Component {
  constructor() {
    super();

    this.state = {
      count: 1,
      isDisabled: false,
    };
  }

  verifyQuantity = () => {
    const { product } = this.props;
    const { count } = this.state;
    if (count === product.available_quantity) {
      this.setState({
        isDisabled: true,
      });
    }
    this.setState({
      isDisabled: false,
    });
  }

  handleDecrease = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }

  handleIncrease = () => {
    const { product } = this.props;
    const { count } = this.state;
    if (count < product.available_quantity) {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }), () => this.verifyQuantity());
    }
  }

  render() {
    const { count, isDisabled } = this.state;
    const { product } = this.props;
    return (
      <div className="cart-itens-div">
        <div className="cart-itens-div1" key={ product.id }>
          <p data-testid="shopping-cart-product-name">{ product.title }</p>
          <p>{ product.id }</p>
          <img src={ product.thumbnail } alt={ product.title } />
        </div>
        <button
          className="decrease-button"
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ count > 0 && this.handleDecrease }
        >
          -
        </button>
        <div className="quantity">
          <span>Quantidade</span>
          <h2 data-testid="shopping-cart-product-quantity">{ count }</h2>
        </div>
        <button
          disabled={ isDisabled }
          className="increase-button"
          data-testid="product-increase-quantity"
          type="button"
          onClick={ this.handleIncrease }
        >
          +
        </button>
        <h1>
          R$
          { product.price }
        </h1>
      </div>
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
