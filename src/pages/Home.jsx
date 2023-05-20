import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Categories from '../components/Categories';
import CardProduct from '../components/CardProduct';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

const CARDS_PER_PAGE = 10; // Número de cards a serem exibidos por página


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
      currentPage: 1,
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

  getTotalPages = () => {
    const { products } = this.state;
    return Math.ceil(products.length / CARDS_PER_PAGE);
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
    const { cartList, currentPage } = this.state;
    const totalPages = this.getTotalPages();
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    const currentCards = products.slice(startIndex, endIndex);
  
    if (inicialPage) {
      return (
        <p className="text-home">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    if (currentCards.length === 0) {
      return <p>Nenhum produto foi encontrado</p>;
    }
    return (
      <div>
        {currentCards.map((card) => (
          <CardProduct
            key={card.id}
            card={card}
            handlePurchaseClick={this.handlePurchaseClick}
            cartList={cartList}
          />
        ))}
        {totalPages > 1 && (
          <div>
            <button onClick={this.goToPreviousPage} disabled={currentPage === 1}>
              Página anterior
            </button>
            <button onClick={this.goToNextPage} disabled={currentPage === totalPages}>
              Próxima página
            </button>
          </div>
        )}
      </div>
    );
  };

  goToPreviousPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }));
  };
  
  goToNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
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
            type="submit"
          >
            Buscar
          </button>
          <Link
            className="cart-icon-link"
            to={ { pathname: '/cart', state: cartList } }
            type="button"
          >
            <FaShoppingCart size={ 30 } />
            <span className="number-cart-list">
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
