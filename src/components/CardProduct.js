import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends Component {
  render() {
    const { card, handlePurchaseClick, cartList } = this.props;
    const priceItem = (card.price)
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return (
      <div className="product-card"  key={ card.id }>
        <Link
          to={ { pathname: `/product/${card.category_id}/${card.id}`, state: cartList } }
          className="linkCard"
        >
          <p>{card.title}</p>
          <img width="100" src={ card.thumbnail } alt={ card.title } />
          <p>
            Preço:
            {' '}
            { priceItem }
          </p>
        </Link>
        { card.shipping.free_shipping && <p className="free-shipping">Frete grátis</p>}
        <button
          className="add-item-button"
          id={ card.id }
          type="button"
          onClick={ handlePurchaseClick }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

export default CardProduct;

CardProduct.propTypes = PropTypes.shape({
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
}).isRequired;
