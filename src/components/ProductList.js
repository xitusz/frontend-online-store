import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ProductsCards from './ProductsCards';
import AddCartButton from './AddCartButton';

export default class ProductList extends Component {
  constructor() {
    super();
    this.rProduct = this.rProduct.bind(this);
  }

  rProduct(product) {
    const { title, thumbnail, shipping } = product;
    const { free_shipping: free } = shipping;
    const { callback } = this.props;
    return (
      <div data-testid="product" className={ `listagem ${product.category_id}` }>
        <BrowserRouter>
          <Route path="/product-details">
            <ProductsCards product={ product } callback={ callback } />
          </Route>
          <Link
            data-testid="product-detail-link"
            to={ `/product-details/${title}&${thumbnail}` }
          >
            <h1>{ product.title }</h1>
            { free ? <h2 data-testid="free-shipping">Frete Gratis</h2> : null}
            <img src={ product.thumbnail } alt="img do produto" />
            <p>{ product.price }</p>
          </Link>
        </BrowserRouter>
        <AddCartButton item={ product } callback={ callback } />
      </div>
    );
  }

  render() {
    const { Lista } = this.props;
    if (Lista === undefined) {
      return (
        <div />
      );
    }
    if (Lista.length === 0) {
      return (
        <div className="empty-search">
          Nenhum produto foi encontrado
        </div>
      );
    }
    return (
      <div className="produtos">
        {
          Lista.map((product, key) => (<div key={ key }>{ this.rProduct(product) }</div>))
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  Lista: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};
