import React, {Component} from 'react';

import {
  Elements
} from 'react-stripe-elements';

import CardForm from './NewCardForm.js';

class AddNew extends Component {
  render() {
    return (
      <Elements>
        <CardForm
          {...this.props}
        />
      </Elements>
    );
  }
}

export default AddNew;
