import React, {Component} from 'react';
import {PulseLoader} from 'react-spinners';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import pathToRegExp from 'path-to-regexp';
import config from '../../config/index';

import {
  fetchSportsList,
  fetchUserProfiles,
  changeProfile
} from '../../actions';
import {FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';
import {PROFILE, DASHBOARD_PROFILE, REGISTRATION_PROFILE_TYPE, REGISTRATION} from '../../constants/pathConstants';
import {getReturnUrl, removeReturnUrl} from '../../../auth/auth';
import Header from '../../components/common/Header';
import Dashboard from '../../components/common/Dashboard';
import Footer from '../../components/common/Footer';
import {getProfile} from '../../middlewares/utils/changeProfileUtils';
import appConstsnts from '../../constants/appConstants';
import appConstants from '../../constants/appConstants';
import {isNonEmptyArray} from '../../validators/common/util';
import LoggedInAsModal from '../../components/common/LoggedInAsModal';

function removeStyles() {
  document.body.style = null;
  document.documentElement.style = null;
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {profileLoaded: false,
      isCurrentProfileChanged: false,
      isOpenLoggedInAsModalClose: false,
      canDisplayModal: false
    };
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleFindParent = this.handleFindParent.bind(this);
    this.handleLoggeInaAsModalClose = this.handleLoggeInaAsModalClose.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserProfiles();
    this.props.fetchSportsList();
    window.addEventListener('resize', removeStyles);
  }

  handleFindInactiveChild(child) {
    return child.isActive === appConstants.profileActiveFlages.inactive;
  }

  handleLoggeInaAsModalClose() {
    this.setState({isOpenLoggedInAsModalClose: false});
    localStorage.removeItem(config.showModalLocalStorage);
  }

  handleFindParent(props) {
    const {userProfiles} = props;
    const parentObject = userProfiles.data.find(profile => profile.type === appConstants.userProfileTypes.PARENT);
    if (parentObject) {
      const {dependents} = parentObject;
      if (dependents && isNonEmptyArray(dependents)) {
        const inactiveChild = dependents.find(this.handleFindInactiveChild);
        if (inactiveChild) {
          return ({...parentObject, dependents: [inactiveChild]});
        }
        return ({...parentObject, dependents: [{...dependents[0]}]});
      }
      return parentObject;
    }
  }

  componentWillReceiveProps(nextProps) {
    const {profileLoaded, isCurrentProfileChanged} = this.state;

    const modalStatus = localStorage.getItem(config.showModalLocalStorage);

    if (modalStatus === config.showModalStatus) {
      this.setState({canDisplayModal: true});
    }

    if (nextProps.userProfiles.status === FULFILLED && !profileLoaded) {
      if (nextProps.profile.status !== FULFILLED && nextProps.profile.status !== PENDING && nextProps.profile.status !== REJECTED) {
        if (nextProps.userProfiles.data && nextProps.userProfiles.data.length && !isCurrentProfileChanged) {
          const profile = getProfile(nextProps.userProfiles.data);
          if (profile.type === appConstants.userProfileTypes.PARENT) {
            const parentObject = this.handleFindParent(nextProps);
            if (parentObject && isNonEmptyArray(parentObject.dependents)) {
              this.props.changeProfile({...profile, dependentId: parentObject.dependents[0].id});
              this.setState({isCurrentProfileChanged: true});
            }
          } else {
            this.props.changeProfile(profile);
            this.setState({isCurrentProfileChanged: true});
          }
        } else if (nextProps.userProfiles.data.length < 1) {
          this.setState({profileLoaded: true});
          this.props.history.push(PROFILE);
          removeReturnUrl();
        }
      }
    }

    if (nextProps.profile.status === FULFILLED) {
      if (this.state.profileLoaded === false) {
        this.setState({profileLoaded: true});
        this.setState({isOpenLoggedInAsModalClose: true});
        this.handleNavigation();
      }
    }
  }

  handleNavigation() {
    const pathname = getReturnUrl();
    console.log('pathname', pathname);
    if (pathname && pathname !== '/') {
      this.props.history.push(pathname);
    } else {
      const {userProfiles} = this.props;
      const {selectedProfile} = userProfiles;
      console.log('selectedProfile', selectedProfile);
      if (selectedProfile) {
        let path = REGISTRATION;
        if (selectedProfile.isActive === appConstsnts.profileActiveFlages.active) {
          const toPath = pathToRegExp.compile(DASHBOARD_PROFILE);
          path = toPath({profileType: selectedProfile.type});
        } else {
          const toPath = pathToRegExp.compile(REGISTRATION_PROFILE_TYPE);
          path = toPath({profileType: selectedProfile.type});
        }
        console.log('PATH', path);
        this.props.history.push(path);
      }
    }
    removeReturnUrl();
  }

  render() {
    let userDetails = {};
    if (this.state.profileLoaded && this.props.profile.status === FULFILLED) {
      if (this.props.userProfiles.selectedProfile.type === appConstants.profiles.isp) {
        userDetails = this.props.profile.data.profile;
      } else {
        userDetails = this.props.profile.data;
      }
    }

    return (
      <div className="app">
        <Header {...this.props}/>
        <div className="cl-page-scroll-area-minus-header">
          {
            this.state.profileLoaded ?
              <div/> :
              (
                <div className="cl-loader-center">
                  <div className="cl-loader">
                    <PulseLoader loading={!this.state.profileLoaded} size={10}/>
                  </div>
                </div>
              )
          }
          {this.state.profileLoaded ? <Dashboard/> : <div/> }
          <Footer/>
        </div>
        {
          (this.state.canDisplayModal && this.state.isOpenLoggedInAsModalClose && this.state.profileLoaded) ?
            <LoggedInAsModal
              isModalOpen={this.state.isOpenLoggedInAsModalClose}
              userDetails={userDetails}
              onOk={this.handleLoggeInaAsModalClose}
            /> : null
        }

      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  fetchUserProfiles: PropTypes.func.isRequired,
  fetchSportsList: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  userProfiles: PropTypes.object.isRequired,
  changeProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {profile, userProfiles} = state;
  return {
    profile,
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSportsList: () => dispatch(fetchSportsList()),
    fetchUserProfiles: () => dispatch(fetchUserProfiles()),
    changeProfile: profile => dispatch(changeProfile(profile))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
