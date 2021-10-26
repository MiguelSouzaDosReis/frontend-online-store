import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import CardProduct from '../components/CardProduct';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
      inputValue: '',
      categoryId: '',
      inicialPage: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.requiredCategories();
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      inicialPage: false,
    });
  }

  filterByCategory = (event) => {
    this.setState({
      categoryId: event.target.value,
    }, this.requiredProducts);
  }

  conditionRenderProducts = (inicialPage, products) => {
    if (inicialPage) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    if (products.length === 0) {
      return (
        <p>Nenhum produto foi encontrado</p>
      );
    }
    return (
      <div>
        {products.map((card) => (
          <CardProduct key={ card.id } card={ card } />
        ))}
      </div>
    );
  }

  async requiredCategories() {
    const response = await getCategories();
    this.setState({
      categories: [...response],
    });
  }

  async requiredProducts() {
    const { inputValue, categoryId } = this.state;
    const response = await getProductsFromCategoryAndQuery(categoryId, inputValue);
    this.setState({
      products: response.results,
      inicialPage: false,
    });
  }

  render() {
    const { categories, inputValue, products, inicialPage } = this.state;
    return (
      <div>
        <aside>
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
        <div>
          <form action="">
            <label htmlFor="input">
              <input
                data-testid="query-input"
                onChange={ this.handleChange }
                value={ inputValue }
                id="input"
                type="text"
                name="inputValue"
              />
            </label>
            <button
              onClick={ (event) => {
                event.preventDefault();
                this.requiredProducts();
              } }
              data-testid="query-button"
              type="submit"
            >
              Buscar
            </button>
          </form>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
          { this.conditionRenderProducts(inicialPage, products) }
        </div>
      </div>

    );
  }
}

export default Home;
