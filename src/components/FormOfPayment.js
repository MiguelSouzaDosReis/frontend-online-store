import React, { Component } from 'react';

class FormOfPayment extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="input-boleto">
            Boleto:
            <input type="radio" name="cardPayment" />
          </label>
          <h3>Cartão de credito</h3>
          <label htmlFor="input-visa">
            Visa
            <input type="radio" name="cardPayment" />
          </label>
          <label htmlFor="input-master">
            Master Card:
            <input type="radio" name="cardPayment" />
          </label>
          <label htmlFor="input-elo">
            Elo
            <input type="radio" name="cardPayment" />
          </label>
        </form>
      </div>
    );
  }
}

export default FormOfPayment;
