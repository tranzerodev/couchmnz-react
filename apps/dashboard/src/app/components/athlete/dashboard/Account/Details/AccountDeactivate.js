import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import config from '../../../../../config';
import {deactivateAccount} from '../../../../../actions';
import {REJECTED} from '../../../../../constants/ActionTypes';

class AccountDeactivate extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClickDeactivateAccount = this.handleClickDeactivateAccount.bind(this);
    this.renderServerErrorMessage = this.renderServerErrorMessage.bind(this);
  }

  handleClickDeactivateAccount() {
    const {profileID} = this.props;
    this.props.deactivateAccount(profileID);
  }

  renderServerErrorMessage() {
    const {p, deactivateAccountStatus} = this.props;
    if (deactivateAccountStatus === REJECTED) {
      return (
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
            <div className="gen_error">
              <div className="tableDiv">
                <div className="lCol">
                  <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                </div>
                <div className="rCol">
                  <p>{p.t('SaveButton.error_message')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {p} = this.props;
    const {firstSupportEmail, secondSupportEmail} = config.supportEmails;
    return (
      <div className="cl-sd-trainingLocationInner">
        <div className="accDetails">
          <h1 className="uk-padding-remove">{p.t('DashboardAccountDeactivate.deactivateAccount')}</h1>
          <p className="mb25">{p.t('DashboardAccountDeactivate.msgWithSupportEmail', {firstSupportEmail, secondSupportEmail})}</p>
          <p className="mb25">{p.t('DashboardAccountDeactivate.msg2')}</p>
          {
            this.renderServerErrorMessage()
          }
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <a className="general_btn" onClick={this.handleClickDeactivateAccount}>{p.t('DashboardAccountDeactivate.deactivateAccount')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccountDeactivate.defaultProps = {

};

AccountDeactivate.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  deactivateAccountStatus: PropTypes.string.isRequired,
  profileID: PropTypes.string.isRequired,
  deactivateAccount: PropTypes.func.isRequired
};

const mapStatetoProps = state => {
  const {profile, deactivateAccount} = state;
  const profileID = profile.data.id;
  const deactivateAccountStatus = deactivateAccount.status;
  return {
    profileID,
    deactivateAccountStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deactivateAccount: profileID => dispatch(deactivateAccount(profileID))
  };
};

export default translate(connect(mapStatetoProps, mapDispatchToProps)(AccountDeactivate));
