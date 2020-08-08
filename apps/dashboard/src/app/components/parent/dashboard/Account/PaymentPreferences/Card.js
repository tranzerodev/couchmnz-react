import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {fetchCountries} from '../../../../../actions/index';
import PropTypes from 'prop-types';
import appConstants from '../../../../../constants/appConstants';
import DeleteCardModal from './DeleteCardModal';

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteModalOpen = this.handleDeleteModalOpen.bind(this);
    this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
    this.state = {
      isDeleteModalOpen: false
    };
  }
  handleDeleteModalClose() {
    this.setState({isDeleteModalOpen: false});
  }
  handleDeleteModalOpen() {
    this.setState({isDeleteModalOpen: true});
  }
  handleRenderDefault() {
    return (
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 8">
          <path fill="none" fillRule="evenodd" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 3.793l2.095 2.794L9.38 1"/>
        </svg>
        {this.props.p.t('Card.default')}
      </span>
    );
  }
  handleSetAsDefault() {}
  handleRenderSetDefault() {
    return null;
    // Const {card} = this.props;
    // return (
    //   <a value={card.id} onClick={this.handleSetAsDefault}>{this.props.p.t('Card.setAsDefault')}</a>
    // );
  }
  handleRenderVisa() {
    return (
      <div className="uk-text-right">
        <img className="visa" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"/>
      </div>
    );
  }
  handleRenderMasterCard() {
    return (
      <div className="uk-text-right">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"/>
      </div>
    );
  }
  render() {
    const {card, p} = this.props;
    const {id, last4, expMonth, expYear, name, isDefault, brand} = card;
    const {isDeleteModalOpen} = this.state;
    return (
      <div className={isDefault === appConstants.yes ? 'cl-sd-cardDetailInner active' : 'cl-sd-cardDetailInner'}>
        <div className="cl-sd-cardDetailInnersec">
          {brand === 'Visa' ? this.handleRenderVisa() : this.handleRenderMasterCard()}
          <h4>{p.t('Card.cardNumber')}</h4>
          <h2>{p.t('Card.cardNumberPlaceholder', {digits: last4})}</h2>
          <div className="tableDiv">
            <div className="lCol">
              <h4>{/* Card Holder's Name */}</h4>
            </div>
            <div className="rCol">
              <h4>{p.t('Card.expires')}</h4>
            </div>
          </div>
          <div className="tableDiv">
            <div className="lCol">
              <h2>{name}</h2>
            </div>
            <div className="rCol">
              <h2>{p.t('Card.expirationDate', {expMonth: expMonth > 9 ? expMonth : '0' + expMonth, expYear: (expYear % 100)})}</h2>
            </div>
          </div>
        </div>
        <div className="cl-sd-cardDetailInnersec borderClassSec">
          <div className="tableDiv">
            <div className="lCol">
              {isDefault === appConstants.yes ? this.handleRenderDefault() : this.handleRenderSetDefault()}
            </div>
            <div className="rCol">
              <a onClick={this.handleDeleteModalOpen} data-uk-modal>{p.t('Card.deleteCard')}</a>
            </div>
          </div>
        </div>
        {isDeleteModalOpen && <DeleteCardModal source={id} isModalOpen onClose={this.handleDeleteModalClose}/>}
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      card: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, countries} = state;
  return {
    profile,
    countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries())
  };
};

const CardClass = connect(mapStateToProps, mapDispatchToProps)(Card);
export default (withRouter(translate(CardClass)));
