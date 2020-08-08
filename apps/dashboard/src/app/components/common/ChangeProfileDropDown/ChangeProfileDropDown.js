import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withRouter} from 'react-router';
import pathToRegExp from 'path-to-regexp';

import {changeProfile} from '../../../actions/index';
import {PROFILE, DASHBOARD_PROFILE_TYPE} from '../../../constants/pathConstants';
import appConstants from '../../../constants/appConstants';
import {notNull, isNonEmptyArray} from '../../../validators/common/util';

class changeProfileComponent extends Component {
  constructor() {
    super();
    this.handleChangeProfile = this.handleChangeProfile.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleAddRole = this.handleAddRole.bind(this);
    this.renderDependents = this.renderDependents.bind(this);
    this.renderProfiles = this.renderProfiles.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleChangeProfile(e) {
    const id = e.currentTarget.getAttribute('id');
    let type = e.currentTarget.getAttribute('type');
    const profileType = e.currentTarget.getAttribute('data-profile');
    const displayName = e.currentTarget.getAttribute('name');
    let state;
    if (profileType === appConstants.switchProfileType.dependent) {
      type = appConstants.userProfileTypes.PARENT;
      state = {
        dependentId: id,
        displayName
      };
    }
    const toPath = pathToRegExp.compile(DASHBOARD_PROFILE_TYPE);
    const path = toPath({profileType: type});
    const editPath = {
      pathname: path,
      state
    };
    this.props.history.push(editPath);
    this.handleDropdown();
  }

  handleDropdown() {
    const isOpen = !this.state.isOpen;
    this.setState({isOpen});
  }

  handleAddRole() {
    this.props.history.push(PROFILE);
  }

  renderProfiles() {
    const {selectedProfile} = this.props.userProfiles;
    if (this.props.userProfiles) {
      return this.props.userProfiles.data.filter(profile => profile.id !== selectedProfile.id && profile.type !== appConstants.userProfileTypes.PARENT).map(profile => {
        return (
          <li key={profile.id}>
            <a
              id={profile.id}
              type={profile.type}
              data-profile={appConstants.switchProfileType.profile}
              name={profile.displayName}
              onClick={this.handleChangeProfile}
            >
              {profile.displayName}
              <span className="cl-sd-icon">
                <i className="fa fa-angle-right"/>
              </span>
            </a>
          </li>
        );
      });
    }
  }

  renderDependents() {
    const {selectedProfile} = this.props.userProfiles;
    if (this.props.userProfiles) {
      return this.props.userProfiles.data.map(profile => {
        if (profile.dependents.length) {
          return profile.dependents.filter(dependent => dependent.id !== selectedProfile.dependentId).map(dependent => {
            return (
              <li key={dependent.id}>
                <a
                  id={dependent.id}
                  type={'Parent'}
                  name={appConstants.displayNames.parent}
                  data-profile={appConstants.switchProfileType.dependent}
                  onClick={this.handleChangeProfile}
                >
                  {notNull(dependent.firstName) ? this.props.p.t('ChangeProfile.displayName', {displayName: appConstants.displayNames.parent, name: dependent.firstName}) : appConstants.displayNames.parent}
                  <span className="cl-sd-icon">
                    <i className="fa fa-angle-right"/>
                  </span>
                </a>
              </li>
            );
          });
        }
      });
    }
  }
  render() {
    const {selectedProfile} = this.props.userProfiles;
    const dependent = isNonEmptyArray(selectedProfile.dependents) ? selectedProfile.dependents[0] : {};
    const displayName = notNull(dependent.firstName) ? this.props.p.t('ChangeProfile.displayName', {displayName: appConstants.displayNames.parent, name: dependent.firstName}) : appConstants.displayNames.parent;
    return (
      <span data-uk-dropdown="{mode:'click'}" className={this.state.isOpen ? 'cl-sd-coach-dropdown uk-open' : 'cl-sd-coach-dropdown'} aria-expanded={this.state.isOpen}>
        <a href="#" className="cl-sd-speciality-link" onClick={this.handleDropdown}>{selectedProfile.type === appConstants.userProfileTypes.PARENT ? displayName : selectedProfile.displayName}<i className="fa fa-angle-down"/></a>
        <ul className="uk-dropdown">
          {this.renderProfiles()}
          {this.renderDependents()}
          <li><a onClick={this.handleAddRole}>{this.props.p.t('ChangeProfile.add_role')}<span className="cl-sd-icon"><i className="fa fa-angle-right"/></span></a></li>
        </ul>
      </span>
    );
  }
  static get propTypes() {
    return {
      userProfiles: PropTypes.object.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {userProfiles, profile} = state;
  return {
    userProfiles,
    profile
  };
};

changeProfile.defaultProps = {

};
const mapDispatchToProps = dispatch => {
  return {
    changeProfile: data => dispatch(changeProfile(data))
  };
};
const changeProfileDropDown = withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(changeProfileComponent)));
export default changeProfileDropDown;
