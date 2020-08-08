import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as RouterPaths from '../../../../constants/RouterPaths';
import DashboardMessagesSideNav from '../DashboardMessagesSideNav';
import DashboardMessagesTopMenu from '../DashboardMessagesTopMenu';
import DashboardDraftMessage from '../DashboardDraftMessage';
import DashboardMessageThreadList from '../DashboardMessageThreadList';
import DashboardMessageThreadView from '../DashboardMessageThreadView';
import {changeMessagingProfile, ispFetchServiceProfiles} from '../../../../actions';

import ISPDashboardNav from '../../DashboardNav';
import AthleteNavBar from '../../../athlete/dashboard/NavBar';
import ParentNavBar from '../../../parent/dashboard/NavBar';

import appConstants from '../../../../constants/appConstants';

class DashboardMessages extends Component {
  constructor(props) {
    super(props);
    this.renderProfileSpecificNavBar = this.renderProfileSpecificNavBar.bind(this);
  }
  componentDidMount() {
    const {selectedUserProfiles, changeMessagingProfile} = this.props;
    if (selectedUserProfiles) {
      if (selectedUserProfiles) {
        changeMessagingProfile(selectedUserProfiles);
      }
    }
  }
  renderProfileSpecificNavBar() {
    const {selectedUserProfiles, profile, serviceProfiles} = this.props;
    const {profiles} = appConstants;
    switch (selectedUserProfiles.type) {
      case profiles.isp:
        return <ISPDashboardNav profile={profile} serviceProfiles={serviceProfiles} fetchServiceProfiles={this.props.ispFetchServiceProfiles}/>;
      case profiles.athlete:
        return <AthleteNavBar/>;
      case profiles.parent:
        return <ParentNavBar/>;
      default: return null;
    }
  }

  render() {
    return (
      <div>
        {
          this.renderProfileSpecificNavBar()
        }
        <section className="messagingOuter">
          <div className="uk-container-fluid uk-container-center">
            <div className="uk-grid uk-grid">
              <DashboardMessagesSideNav/>
              <div className="uk-width-xlarge-8-10 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
                <div className="uk-grid uk-grid-collapse uk-grid-match" data-uk-grid-match="{target:'.msg_columns'}">
                  <DashboardMessagesTopMenu/>

                  <Switch>
                    <Redirect exact from={RouterPaths.MESSAGES_ROUTER_PATH} to={RouterPaths.MESSAGES_INBOX_ROUTER_PATH}/>
                    <Route exact path={RouterPaths.MESSAGES_DRAFTS_ROUTER_PATH} name="DashboardDraftMessage" component={DashboardDraftMessage}/>
                    <Route component={DashboardMessageThreadList}/>
                  </Switch>

                  <div className="uk-width-xlarge-7-10 uk-width-large-6-10 uk-width-medium-1-1 uk-width-small-1-1">
                    <div className="msg_messagesDetail msg_columns">
                      <Switch>
                        <Route exact path={RouterPaths.MESSAGES_LABEL_THREAD_VIEW_ROUTER_PATH} component={DashboardMessageThreadView}/>
                        <Route exact path={RouterPaths.MESSAGES_THREAD_VIEW_URL} component={DashboardMessageThreadView}/>
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

DashboardMessages.propTypes = {
  changeMessagingProfile: PropTypes.func.isRequired,
  selectedUserProfiles: PropTypes.object.isRequired,
  serviceProfiles: PropTypes.object.isRequired,
  ispFetchServiceProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {userProfiles, profile, serviceProfiles} = state;

  return {
    selectedUserProfiles: userProfiles.selectedProfile,
    profile,
    serviceProfiles
  };
};

const mapdispatchToProps = dispatch => {
  return {
    changeMessagingProfile: profile => dispatch(changeMessagingProfile(profile)),
    ispFetchServiceProfiles: profileID => dispatch(ispFetchServiceProfiles(profileID))
  };
};
export default connect(mapStateToProps, mapdispatchToProps)(DashboardMessages);
