import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { productDetails: {} };
  }

  componentDidMount() {
    this.requiredProducts();
  }

  async requiredProducts() {
    const { match: { params: { categoryId, inputValue } } } = this.props;
    const response = await getProductsFromCategoryAndQuery(categoryId, '');
    const filterProduct = (response.results).find((element) => element.id === inputValue);
    console.log(filterProduct);
    this.setState({
      productDetails: filterProduct,
    });
  }

  render() {
    const { productDetails, productDetails: { attributes } } = this.state;
    console.log(productDetails);
    return (
      <section>
        <h3 data-testid="product-detail-name">{ productDetails.title }</h3>
        <img src={ productDetails.thumbnail } alt={ productDetails.title } />
        <p>{ productDetails.price }</p>
        <ul>
          { attributes && attributes.map((product, index) => (
            <li key={ index }>
              { `${product.name}:${product.value_name}` }
            </li>
          ))}
        </ul>
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      </section>
    );
  }
}

export default ProductDetails;
