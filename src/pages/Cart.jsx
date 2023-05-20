import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { BsFillCartXFill } from 'react-icons/bs';
import CartItem from '../components/CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.updateTotalPrice();
  }

  updateTotalPrice = () => {
    const { location: { state } } = this.props;
    let totalPrice = 0;

    state.forEach((product) => {
      totalPrice += product.price;
    });

    this.setState({ totalPrice });
  };
  


  calculateTotalPrice = () => {
    const { location: { state } } = this.props;
    let totalPrice = 0;
  
    state.forEach((product) => {
      totalPrice += product.price * product.count;
    });
  
    return totalPrice;
  };


  handleIncreasePrice = (price) => {
    this.setState((prevState) => ({
      totalPrice: prevState.totalPrice + price,
    }));
  };

  handleDecreasePrice = (price) => {
    const { totalPrice } = this.state;
  
    if (totalPrice - price >= 0) {
      this.setState((prevState) => ({
        totalPrice: prevState.totalPrice - price,
      }));
    }
  };

  conditionRenderCart = () => {
    const { location: { state } } = this.props;
    if (state.length === 0) {
      return (
        <div>
          <Link
            to="/"
          >
            <FaArrowCircleLeft size="30" />
            <p size="30">Voltar </p>
          </Link>
          <div className="empty-cart-div">
            <BsFillCartXFill size="300" />
            <p
              className="empty-cart-message"
            >
              Seu carrinho está vazio
            </p>
          </div>
        </div>
      );
    }

    return (
      state &&
      state.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          handleIncreasePrice={this.handleIncreasePrice}
          handleDecreasePrice={this.handleDecreasePrice}
        />
      ))
    );
  };


  render() {
    const { totalPrice } = this.state;

    const formattedTotalPrice = isNaN(totalPrice) ? 0 : totalPrice.toFixed(2);


    return (
      <div className="cart">
        <Link
          to="/"
        >
          <FaArrowCircleLeft size="30" />
          <p size="30">Voltar </p>
        </Link>
        <h2>CARRINHO DE COMPRAS</h2>
        { this.conditionRenderCart() }
        <h3>Valor total da Compra: R$ {formattedTotalPrice} </h3>
        <Link to="/checkout">
          <button
            className="checkout-button"
            type="button"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }
}

Cart.propTypes = PropTypes.shape({
  location: PropTypes.objectOf,
  state: PropTypes.objectOf,
}).isRequired;

export default Cart;
