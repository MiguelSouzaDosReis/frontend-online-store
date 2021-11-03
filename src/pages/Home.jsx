import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Categories from '../components/Categories';
import CardProduct from '../components/CardProduct';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
      inputValue: '',
      categoryId: '',
      inicialPage: true,
      cartList: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.requiredCategories();
    this.restoreCartList();
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  filterByCategory = (event) => {
    this.setState(
      {
        categoryId: event.target.value,
      },
      this.requiredProducts,
    );
  };

  handlePurchaseClick = (event) => {
    const { products, cartList } = this.state;
    const { id } = event.target;
    const filterClick = products.filter((product) => product.id === id);
    this.setState(
      {
        cartList: [...cartList, ...filterClick],
      },
      () => this.addLocalStorage(),
    );
  };

  conditionRenderProducts = (inicialPage, products) => {
    const { cartList } = this.state;

    if (inicialPage) {
      return (
        <p className="text-home" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    if (products.length === 0) {
      return <p>Nenhum produto foi encontrado</p>;
    }
    return (
      <div>
        {products.map((card) => (
          <CardProduct
            key={ card.id }
            card={ card }
            handlePurchaseClick={ this.handlePurchaseClick }
            cartList={ cartList }
          />
        ))}
      </div>
    );
  };

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

  async requiredCategories() {
    const response = await getCategories();
    this.setState({
      categories: [...response],
    });
  }

  async requiredProducts() {
    const { inputValue, categoryId } = this.state;
    const response = await getProductsFromCategoryAndQuery(
      categoryId,
      inputValue,
    );
    this.setState({
      products: response.results,
      inicialPage: false,
    });
  }

  render() {
    const { categories, inputValue, products, inicialPage, cartList } = this.state;
    return (
      <div className="body">
        <aside className="aside">
          <h3>ESCOLHA UMA CATEGORIA:</h3>
          <ul>
            {categories.map((category) => (
              <Categories
                key={ category.id }
                category={ category }
                filterByCategory={ this.filterByCategory }
              />
            ))}
          </ul>
        </aside>
        <div className="Search-box">
          <label className="divbusca" htmlFor="input">
            <input
              className="input-search"
              data-testid="query-input"
              onChange={ this.handleChange }
              value={ inputValue }
              id="input"
              type="text"
              name="inputValue"
            />
          </label>
          <button
            className="search-button"
            onClick={ (event) => {
              event.preventDefault();
              this.requiredProducts();
            } }
            data-testid="query-button"
            type="submit"
          >
            Buscar
          </button>
          <Link
            className="cart-icon-link"
            to={ { pathname: '/cart', state: cartList } }
            data-testid="shopping-cart-button"
            type="button"
          >
            <FaShoppingCart size={ 30 } />
            <span className="number-cart-list" data-testid="shopping-cart-size">
              {cartList.length}
            </span>
          </Link>
          {this.conditionRenderProducts(inicialPage, products)}
        </div>
      </div>
    );
  }
}

export default Home;
