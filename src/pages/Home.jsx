import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  filterByCategory = async (event) => {
    await this.setState({
      categoryId: event.target.name,
    });
    this.requiredProducts();
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
    const { categories, inputValue, products } = this.state;
    return (
      <div>
        <aside>
          <ul>
            {categories.map((category) => (
              <li key={ category.id }>
                <button
                  data-testid="category"
                  name={ category.id }
                  type="button"
                  onClick={ this.filterByCategory }
                >
                  { category.name }
                </button>
              </li>
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
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <div>
            {products.map((card) => (
              <div data-testid="product" key={ card.id }>
                <h3>{card.title}</h3>
                <img width="100" src={ card.thumbnail } alt={ card.thumbnail_id } />
                <p>
                  Preço:
                  {' '}
                  { card.price }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    );
  }
}

export default Home;
