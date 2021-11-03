import React, { Component } from 'react';

class FormProduct extends Component {
  render() {
    return (
      <div className="rating">

        <h1>Avaliações</h1>
        <form className="form-rating">
          <div className="email-rating">
            <label htmlFor="email">
              Email:
              <input size="40" name="email" type="text" />
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
          </div>
          <textarea
            className="textarea"
            placeholder="Mensagem (optional)"
            data-testid="product-detail-evaluation"
            rows="6"
            cols="50"
          />
          <button
            className="button-rate"
            type="submit"
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

export default FormProduct;
