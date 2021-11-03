import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowCircleLeft, FaShoppingCart } from 'react-icons/fa';
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
      <section className="product-details">
        <div className="back-link">
          <Link
            to="/"
          >
            <FaArrowCircleLeft size="30" />
            <p size="30">Voltar </p>
          </Link>
        </div>
        <div className="title-thumb-price-productdetail">
          <h3 data-testid="product-detail-name">{ title }</h3>
          <img
            className="img-cart-product"
            src={ thumbnail }
            alt={ title }
          />
          <p>
            R$
            { price }
          </p>
        </div>
        <div className="attributes">
          <h3> Especificações Técnicas</h3>
          <ul>
            { attributes && attributes.map((product, index) => (
              <li key={ index }>
                { `${product.name}:${product.value_name}` }
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-and-add-item">
          <Link
            to={ { pathname: '/cart', state: cartList } }
            data-testid="shopping-cart-button"
            type="button"
          >
            <FaShoppingCart size={ 30 } />
            <span
              className="number-cart-list"
              data-testid="shopping-cart-size"
            >
              { cartList.length }
            </span>
          </Link>
          <button
            className="add-cart-button"
            id={ id }
            type="button"
            onClick={ this.handlePurchaseClick }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
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
