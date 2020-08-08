import React, {Component} from 'react';
import {PENDING, REJECTED} from '../../../../../constants/ActionTypes';
import {connect} from 'react-redux';
import {postProfile, postCurrentSport} from '../../../../../actions';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import SaveLink from '../DashboardSaveLink';

/* eslint react/no-array-index-key: 0 */
class SaveButton extends Component {
  render() {
    return (
      <div>
        <div className="uk-grid">
          <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-2  uk-width-small-1-2"/>
          <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-2  uk-width-small-1-1">
            <SaveLink {...this.props}/>
          </div>
        </div>
        {this.props.profileUpdateStatus.status === REJECTED &&
        <div className="uk-grid">
          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
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
          </div>
        </div>
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      profile: PropTypes.object,
      postProfile: PropTypes.func.isRequired,
      valid: PropTypes.bool,
      userIDs: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
      profileUpdateStatus: PropTypes.object
    };
  }
}

SaveButton.defaultProps = {
  valid: true,
  profile: {
    status: PENDING
  },
  userIDs: {},
  profileUpdateStatus: {
    status: null
  }
};

const mapStateToProps = state => {
  const {userIDs, profile, profileUpdateStatus, sport} = state;
  return {
    userIDs,
    profile,
    profileUpdateStatus,
    sport
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postProfile: (data, userID) => dispatch(postProfile(data, userID)),
    postCurrentSport: (data, params) => dispatch(postCurrentSport(data, params))
  };
};

const SaveButtonPage = translate(connect(mapStateToProps, mapDispatchToProps)(SaveButton));
export default SaveButtonPage;
