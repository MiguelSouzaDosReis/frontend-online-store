import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import FormProduct from '../components/FormProduct';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productDetails: {},
      cartList: [],
    };
  }

  componentDidMount() {
    this.requiredProducts();
    this.funcSet();
    this.restoreCartList();
  }

  handlePurchaseClick = (event) => {
    const { productDetails, cartList } = this.state;
    const { id } = event.target;
    const filterClick = [productDetails].filter((product) => product.id === id);
    this.setState({
      cartList: [...cartList, ...filterClick],
    }, () => this.addLocalStorage());
  }

  addLocalStorage() {
    const { cartList } = this.state;
    localStorage.setItem('cartLocalStorage', JSON.stringify(cartList));
  }

  restoreCartList() {
    const actualCartList = JSON.parse(localStorage.getItem('cartLocalStorage'));
    if (actualCartList !== null) {
      this.setState({ cartList: actualCartList });
    }
  }

  funcSet() {
    const { location: { state } } = this.props;
    this.setState({
      cartList: [...state],
    });
  }

  async requiredProducts() {
    const { match: { params: { categoryId, inputValue } } } = this.props;
    const response = await getProductsFromCategoryAndQuery(categoryId, '');
    const filterProduct = (response.results).find((element) => element.id === inputValue);
    this.setState({
      productDetails: filterProduct,
    });
  }

  render() {
    const { productDetails: { attributes, id, title, thumbnail, price },
      cartList,
    } = this.state;

    return (
      <section className="cart-item-div">
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img
          className="img-cart-product"
          src={ thumbnail }
          alt={ title }
        />
        <p>{ price }</p>
        <ul>
          { attributes && attributes.map((product, index) => (
            <li key={ index }>
              { `${product.name}:${product.value_name}` }
            </li>
          ))}
        </ul>
        <Link
          to={ { pathname: '/cart', state: cartList } }
        >
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho
          </button>
          <p data-testid="shopping-cart-size">{ cartList.length }</p>
        </Link>
        <button
          id={ id }
          type="button"
          onClick={ this.handlePurchaseClick }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar Item
        </button>
        <FormProduct />
      </section>
    );
  }
}

ProductDetails.propTypes = PropTypes.shape({
  location: PropTypes.objectOf,
  state: PropTypes.objectOf,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}).isRequired;

export default ProductDetails;
