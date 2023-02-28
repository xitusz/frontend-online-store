import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      empty: true,
    };
    this.isEmpty = this.isEmpty.bind(this);
    this.RenderCart = this.RenderCart.bind(this);
    this.add = this.add.bind(this);
    this.minus = this.minus.bind(this);
  }

  componentDidMount() {
    this.isEmpty();
  }

  minus({ target }) {
    // const { parentElement } = target.parentElement;
    const quantity = target.parentElement.children[3].innerHTML;
    target.parentElement.children[3].innerHTML = parseInt(quantity, 10) - 1;
  }

  add({ target }) {
    const quantity = target.parentElement.children[3].innerHTML;
    target.parentElement.children[3].innerHTML = parseInt(quantity, 10) + 1;
  }

  RenderCart() {
    const { items } = this.props;
    return (items.map((x) => {
      const { title, thumbnail, price } = x;
      const quantity = items.filter((y) => y.title === title).length;
      return (
        <div key={ title } className="cartItem">
          <h1 data-testid="shopping-cart-product-name">{ title }</h1>
          <img src={ thumbnail } alt="img do produto" />
          <p>{ price }</p>
          <p data-testid="shopping-cart-product-quantity" id={ title.slice('') }>
            { quantity }
          </p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            value={ quantity }
            onClick={ this.add }
          >
            +
          </button>
          <button
            name={ title.slice('') }
            type="button"
            onClick={ this.minus }
            value={ quantity }
            data-testid="product-decrease-quantity"
          >
            -
          </button>
          <button type="button">x</button>
        </div>);
    }));
  }

  isEmpty() {
    const { items } = this.props;
    if (items.length !== 0) {
      this.setState({ empty: false });
    } else {
      this.setState({ empty: true });
    }
  }

  render() {
    const { empty } = this.state;
    console.log(empty);
    return (
      <div>
        {empty
          ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
          : <div>{ this.RenderCart() }</div> }
      </div>
    );
  }
}

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Cart;
