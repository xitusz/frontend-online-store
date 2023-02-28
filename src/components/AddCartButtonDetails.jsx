import React from 'react';
import PropTypes from 'prop-types';

class AddCartButtonDetails extends React.Component {
  constructor() {
    super();
    this.HandleOnClick = this.HandleOnClick.bind(this);
  }

  HandleOnClick() {
    const { item, callback } = this.props;
    console.log(item);
    callback(item);
  }

  render() {
    return (
      <button
        type="button"
        data-testid="product-detail-add-to-cart"
        className="btn-add-to-cart"
        onClick={ this.HandleOnClick }
      >
        adicionar ao carrinho
      </button>
    );
  }
}

AddCartButtonDetails.propTypes = {
  item: PropTypes.arrayOf(PropTypes.any).isRequired,
  callback: PropTypes.func.isRequired,
};

export default AddCartButtonDetails;
