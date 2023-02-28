import React from 'react';
import PropTypes from 'prop-types';
import AddCartButtonDetails from './AddCartButtonDetails';

// PARA A IMPLEMENTAÇAO DE REQUISITOS FUTUROS, ESSA SERA A PAGINA DE DETALHES DO PRODUTO

class ProductsCards extends React.Component {
  render() {
    const { product: {
      title,
      thumbnail,
      price,
      shipping,
    }, callback } = this.props;
    const { product } = this.props;
    const { free_shipping: free } = shipping;
    return (
      <div>
        <h3 data-testid="product-detail-name">{ title }</h3>
        <img
          src={ thumbnail }
          alt={ title }
          width="60px"
        />
        <p>{`R$ ${price}`}</p>
        <p>{ free ? 'Frete Gratis' : 'Frete à combinar'}</p>
        <AddCartButtonDetails item={ product } callback={ callback } />
      </div>
    );
  }
}

ProductsCards.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
};

export default ProductsCards;
