import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {connect} from 'react-redux';
import {ClipLoader} from 'react-spinners';

import {REJECTED, PENDING} from '../../../../../constants/ActionTypes';

/* eslint react/no-array-index-key: 0 */
class SaveButton extends Component {
  render() {
    const rejected = this.props.profileUpdateStatus.status === REJECTED || this.props.sportUpdateStatus.status === REJECTED;
    const pending = this.props.profileUpdateStatus.status === PENDING || this.props.sportUpdateStatus.status === PENDING;
    const error = (
      <div className="gen_error">
        <div className="tableDiv">
          <div className="lCol">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
          </div>
          <div className="rCol">
            <p>{this.props.p.t('SaveButton.error_message')}</p>
          </div>
        </div>
      </div>
    );
    const loader = (
      <div className="overlayLoader">
        <ClipLoader loading={pending} size={30}/>
      </div>
    );
    const component = rejected ? error : pending ? loader : <div/>;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
          {component}
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      profileUpdateStatus: PropTypes.object,
      sportUpdateStatus: PropTypes.object
    };
  }
}

SaveButton.defaultProps = {
  profileUpdateStatus: {
    status: null
  }
};

const mapStateToProps = state => {
  const {profile, userIDs, profileUpdateStatus, sport, sportUpdateStatus} = state;
  return {
    profile,
    userIDs,
    profileUpdateStatus,
    sportUpdateStatus,
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {
    empty: () => dispatch()
  };
};

const Button = connect(mapStateToProps, mapDispatchToProps)(SaveButton);
export default translate(Button);
