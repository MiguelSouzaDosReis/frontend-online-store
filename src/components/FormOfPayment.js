import React, { Component } from 'react';
import Boleto from './imgcard-boleto/boleto.png';
import Visa from './imgcard-boleto/visa.png';
import Master from './imgcard-boleto/mastercard.png';
import Elo from './imgcard-boleto/elo.png';
import Pix from './imgcard-boleto/pix.jpg';

class FormOfPayment extends Component {
  render() {
    return (
      <div className="form-of-payment">
        <h2> Método de Pagamento</h2>
        <form>
          <label htmlFor="input-boleto">
            <h3>Boleto Bancário:</h3>
            boleto
            <input type="radio" name="cardPayment" />
            <img src={ Boleto } alt="boleto" />
          </label>
          <h3>Cartão de Crédito:</h3>
          <div className="credcard">
            <label htmlFor="input-visa">
              Visa
              <input type="radio" name="cardPayment" />
              <img src={ Visa } alt="Visa" />
            </label>
            <label htmlFor="input-master">
              Master Card:
              <input type="radio" name="cardPayment" />
              <img src={ Master } alt="Master" />
            </label>
            <label htmlFor="input-elo">
              Elo
              <input type="radio" name="cardPayment" />
              <img src={ Elo } alt="Elo" />
            </label>
          </div>
          <h3>PIX:</h3>
          <label htmlFor="input-pix">
            Pix
            <input type="radio" name="cardPayment" />
            <img src={ Pix } alt="Pix" />
          </label>
        </form>
      </div>
    );
  }
}

export default FormOfPayment;
