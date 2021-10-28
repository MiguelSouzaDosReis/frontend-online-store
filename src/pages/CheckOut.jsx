import React, { Component } from 'react';
import ClientsData from '../components/ClientsData';
import FormOfPayment from '../components/FormOfPayment';

class CheckOut extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Revise seus produtos</h3>
        </div>
        <ClientsData />
        <FormOfPayment />
      </div>
    );
  }
}

export default CheckOut;
