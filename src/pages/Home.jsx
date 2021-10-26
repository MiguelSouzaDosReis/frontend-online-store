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
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.requiredCategories();
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  filterByCategory = (event) => {
    this.setState({
      categoryId: event.target.value,
    }, this.requiredProducts);
  }

  conditionRenderProducts = () => {
    const { products } = this.state;
    if (products.length === 0) {
      return (
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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
    });
  }

  render() {
    const { categories, inputValue } = this.state;
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
          { this.conditionRenderProducts() }
        </div>
      </div>

    );
  }
}

export default Home;
