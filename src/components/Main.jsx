import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Categories from './Categories';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductList from './ProductList';
import Cart from './Cart';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      query: '',
      productList: [],
      categoryQuery: '',
      cartItem: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickButton = this.clickButton.bind(this);
    this.HandleCategory = this.HandleCategory.bind(this);
    this.addToCartCallback = this.addToCartCallback.bind(this);
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({ query: value });
  }

  getCategoriesList = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  HandleCategory({ target }) {
    this.setState({ categoryQuery: target.value }, () => {
      this.clickButton();
    });
  }

  clickButton() {
    const { query, categoryQuery } = this.state;
    let listagem = '';
    getProductsFromCategoryAndQuery(categoryQuery, query)
      .then((x) => {
        listagem = x;
        this.setState({ productList: listagem.results });
      });
  }

  addToCartCallback(item) {
    const { cartItem } = this.state;
    if (cartItem.some((x) => x.title === item.title)) {
      //
    } else {
      const NewObject = [...cartItem, item];
      this.setState({ cartItem: NewObject }, () => {
      });
    }
  }

  render() {
    const { categories, productList, cartItem } = this.state;

    return (
      <div className="all-content">
        <div className="container-main">
          <form className="form-main">
            <input
              type="text"
              className="input-search"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
            <button
              className="search-button"
              type="button"
              data-testid="query-button"
              onClick={ this.clickButton }
            >
              Search
            </button>
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
            <BrowserRouter>
              <Route path="/Cart" render={ () => <Cart items={ cartItem } /> } />
              <Link data-testid="shopping-cart-button" to="/Cart">Carrinho</Link>
            </BrowserRouter>
          </form>
        </div>
        <div className="main-store">
          <Categories categories={ categories } callback={ this.HandleCategory } />
          <ProductList Lista={ productList } callback={ this.addToCartCallback } />
        </div>
      </div>
    );
  }
}

export default Main;
