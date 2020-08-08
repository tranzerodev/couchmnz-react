import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';
import {fetchCountries, fetchPaymentDeatils} from '../../../../../actions/index';
import AddCardModal from './AddCardModal';
import Card from './Card';
import PropTypes from 'prop-types';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import {shoppingCartProfileType} from '../../../../../validators/common/shoppingCart';

class CardsList extends Component {
  constructor(props) {
    super(props);
    this.handleAddModalClose = this.handleAddModalClose.bind(this);
    this.handleAddModalOpen = this.handleAddModalOpen.bind(this);
    this.handleRenderCard = this.handleRenderCard.bind(this);
    this.handleList = this.handleList.bind(this);
    this.state = {
      isAddModalOpen: false,
      isDeleteModalOpen: false,
      cards: []
    };
  }

  componentDidMount() {
    const {paymentDetails, profileType} = this.props;
    if (paymentDetails.status !== FULFILLED && paymentDetails.status !== PENDING) {
      this.props.fetchPaymentDeatils(profileType);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.paymentDetails.status === PENDING && nextProps.paymentDetails.status === FULFILLED) {
      this.handleList(nextProps.paymentDetails.data);
    }
  }
  handleList(payment) {
    this.setState({cards: payment.savedCards});
  }
  handleAddModalClose() {
    this.setState({isAddModalOpen: false});
  }
  handleAddModalOpen() {
    this.setState({isAddModalOpen: true});
  }
  handleRenderCard(card) {
    return (
      <Card card={card} onDeleteModalOpen={this.handleDeleteModalOpen}/>
    );
  }
  render() {
    const {isAddModalOpen, cards} = this.state;
    const {t} = this.props.p;
    return (
      <div className="cl-sd-trainingLocationInner mb30">
        <h1>{t('CardsList.savedCards')}</h1>
        <div className="cl-sd-cardDetailOuter">
          {
            cards.map(this.handleRenderCard)
          }
          <div className="cl-sd-cardDetailInner">
            <a onClick={this.handleAddModalOpen}>
              <svg className="cl-icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="-449.75 -5235.75 24.127 24.127">
                <g transform="translate(-2154.186 -5769.772)">
                  <g data-name="Group 2726" transform="translate(945.047 -998.235) rotate(45)">
                    <line data-name="Line 230" className="cl-icon-plus-1" x2={16} y2={16} transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-plus-1" x1={16} y2={16} transform="translate(1629.5 538.5)"/>
                  </g>
                </g>
              </svg>
              {t('CardsList.addCard')}
            </a>
          </div>
        </div>
        <AddCardModal isModalOpen={isAddModalOpen} onClose={this.handleAddModalClose}/>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profileType: PropTypes.string,
      paymentDetails: PropTypes.object.isRequired,
      fetchPaymentDeatils: PropTypes.func.isRequired
    };
  }
}

CardsList.defaultProps = {
  profileType: ''
};

const mapStateToProps = state => {
  const {userProfiles, countries, payment} = state;
  const {paymentDetails} = payment;
  return {
    profileType: shoppingCartProfileType(userProfiles.data),
    countries,
    paymentDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchPaymentDeatils: type => dispatch(fetchPaymentDeatils(type))
  };
};

const PaymentPreferencesClass = connect(mapStateToProps, mapDispatchToProps)(CardsList);
export default (withRouter(translate(PaymentPreferencesClass)));
/* eslint react/no-deprecated: 0 */
