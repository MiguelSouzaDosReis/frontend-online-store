import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.requiredCategories();
  }

  async requiredCategories() {
    const response = await getCategories();
    this.setState({
      categories: [...response],
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <aside>
          <ul>
            {categories.map((category) => (
              <li key={ category.id }>
                <label htmlFor={ category.id }>
                  <input
                    data-testid="category"
                    id={ category.id }
                    type="radio"
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <label htmlFor="input">
            <input id="input" type="text" />
          </label>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
      </div>

    );
  }
}

export default Home;
