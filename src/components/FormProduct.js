import React, { Component } from 'react';

class FormProduct extends Component {
  render() {
    return (
      <div>

        <h1>Avaliaçoes</h1>
        <form>
          <label htmlFor="email">
            Email:
            <input name="email" type="text" />
          </label>
          <label htmlFor="nota">
            5
            <input type="radio" value="5" name="nota" />
            4
            <input type="radio" value="4" name="nota" />
            3
            <input type="radio" value="3" name="nota" />
            2
            <input type="radio" value="2" name="nota" />
            1
            <input type="radio" value="1" name="nota" />
          </label>
          <textarea
            placeholder="Mensagem (optional)"
            data-testid="product-detail-evaluation"
            rows="5"
            cols="30"
          />
          <button type="submit">Avaliar</button>
        </form>
      </div>
    );
  }
}

export default FormProduct;
