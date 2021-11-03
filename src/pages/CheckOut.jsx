import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import ClientsData from '../components/ClientsData';
import FormOfPayment from '../components/FormOfPayment';

class CheckOut extends Component {
  render() {
    return (
      <div className="checkout-main">
        <Link
          to="/"
        >
          <FaArrowCircleLeft size="30" />
          <p size="30">Voltar </p>
        </Link>
        <div className="review-products">
          <h3>Revise seus produtos</h3>
        </div>
        <ClientsData />
        <FormOfPayment />
        <button type="submit" className="buy-button">COMPRAR</button>
      </div>
    );
  }
}

export default CheckOut;
