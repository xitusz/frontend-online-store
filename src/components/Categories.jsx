import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categories, callback } = this.props;

    return (
      <section className="categories">
        {categories.map(({ id, name }) => (
          <div key={ id }>
            <label htmlFor={ id } data-testid="category">
              <button
                className="categories-btn"
                type="submit"
                name="categorySearch"
                id={ id }
                value={ id }
                onClick={ callback }
              >
                { name }
              </button>
            </label>
            <hr />
          </div>
        ))}
      </section>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  callback: PropTypes.func.isRequired,
};

export default Categories;
