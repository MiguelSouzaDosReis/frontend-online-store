import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { category, filterByCategory } = this.props;
    return (
      <li key={ category.id }>
        <label htmlFor={ category.id }>
          <input
            className="input-category"
            data-testid="category"
            id={ category.id }
            name="category"
            value={ category.id }
            type="radio"
            onClick={ filterByCategory }
          />
          { category.name }
        </label>
      </li>
    );
  }
}

export default Categories;

Categories.propTypes = {
  category: PropTypes.objectOf(PropTypes.string).isRequired,
  filterByCategory: PropTypes.func.isRequired,
};
