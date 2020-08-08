import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {fetchWalletSummary} from '../../../actions/index';
import {FULFILLED, REJECTED, PENDING} from '../../../constants/ActionTypes';

class WalletSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    if (this.props.fetchWalletSummary.status !== FULFILLED && this.props.fetchWalletSummary.status !== PENDING && this.props.fetchWalletSummary.status !== REJECTED) {
      this.props.fetchWalletSummary();
    }
  }

  render() {
    const {walletSummary, p} = this.props;
    const {data} = walletSummary;
    return (
      <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
        <div className="cl-sd-trainingLocationInner cl-sd-order-history cl-sd-wallet-current-outer">
          <h1 className="uk-padding-remove">{p.t('accountWallet.wallet')}</h1>
          <p>{p.t('accountWallet.description')}</p>
          <div className="cl-sd-order-history-price cl-sd-wallet-current">
            <p>{p.t('accountWallet.currentBalance')}</p>
            <h1 className="pb25"><span>{p.t('accountWallet.currencyType')}</span>{data.balance ? data.balance : 0}</h1>
            {/*     <a href="#">{p.t('accountWallet.withdraw')}</a>
          <a href="#" className="mr0">{p.t('accountWallet.add')}</a> */}
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      fetchWalletSummary: PropTypes.func.isRequired,
      walletSummary: PropTypes.object.isRequired
    };
  }
}
WalletSummary.defaultProps = {

};
const mapDispatchToProps = dispatch => {
  return {
    fetchWalletSummary: () => dispatch(fetchWalletSummary())
  };
};
const mapStateToProps = state => {
  const {walletSummary} = state;

  return {
    walletSummary
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(WalletSummary)));
