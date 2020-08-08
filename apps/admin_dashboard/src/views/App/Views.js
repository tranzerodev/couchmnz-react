import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, NavLink, Alert, TabPane, TabContent} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import moment from 'moment';
import {ToastContainer, toast} from 'react-toastify';
import {getAuthHeader, logout} from '../../auth';
import {APP_USER, APP_USER_ISP_PROFILE, APP_USER_PROFILES} from '../../constants/pathConstants';
import Loader from 'react-loader';
import classnames from 'classnames';
import changeCase from 'change-case';
import ISPPreview from './ISPPreview';
import AthletePreview from './AthletePreview';
import ParentPreview from './ParentPreview';
import p from '../../locale/enUs.json';
/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class Views extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: getAuthHeader(),
      userId: '',
      profileType: '',
      loaded: false
    };
    this.getProfiles = this.getProfiles.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getPreview = this.getPreview.bind(this);
    this.getTab = this.getTab.bind(this);
  }
  componentWillMount() {
    this.setState({userId: this.props.match.params.id});
  }
  componentDidMount() {
    const {state} = this.props.location;
    if (state) {
      const profiles = JSON.parse(state.profiles);
      this.setState({profiles, loaded: true, activeTab: profiles[0].id, profileType: profiles[0].type});
    } else {
      this.getProfiles();
    }
  }
  getProfiles() {
    const self = this;
    axios.get(config.APP_USER_PROFILES.replace('{userId}', this.state.userId), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          const profiles = response.data.payload;
          if (profiles.length > 0) {
            self.setState({profiles, loaded: true, activeTab: profiles[0].id, profileType: profiles[0].type});
          } else {
            self.setState({profiles, loaded: true});
          }
        } else {
          self.setState({profiles: [], loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({profiles: true, loaded: true});
        }
      });
    /* Const response = [{id: '58ee4723db2529281d7b23e0', type: 'athlete', sections: [{name: 'Athlete Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y', showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'parent', dependents: [{type: 'child', name: 'Child 1', sections: [{name: 'Child Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y'}, {type: 'child', name: 'Child 2', sections: [{name: 'Child Profile', isCompleted: 'N'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'isp', sports: [{id: '58ee4723db2529281d7b24e0', name: 'Golf', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}, {id: '58ee4723db2529281d7b29e0', name: 'Soccer', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'N'}];
    this.setState({profiles: response}); */
  }
  toggle(tab, type) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        profileType: type
      });
    }
  }
  getTab() {
    const {activeTab, profileType} = this.state;
    return (
      <TabPane tabId={activeTab}>
        {this.getPreview(activeTab, profileType)}
      </TabPane>
    );
  }

  getPreview(profileId, profileType) {
    const {userId} = this.state;
    if (this.state.activeTab === profileId) {
      switch (profileType) {
        case config.ISP :
          return <ISPPreview userId={userId} profileId={profileId}/>;
        case config.ATHLETE :
          return <AthletePreview userId={userId} profileId={profileId}/>;
        case config.PARENT :
          return <ParentPreview userId={userId} profileId={profileId}/>;
        default : return '';
      }
    }
    return null;
  }

  render() {
    const {loaded, profiles} = this.state;
    return (
      <div className="animated fadeIn">
        <Loader loaded={this.state.loaded} className="spinner"/>
        {/* eslint react/forbid-component-props: 0 */}
        {/* eslint react/jsx-no-bind: 0 */}
        <Row>
          {(loaded === true && profiles.length > 0) ?
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs>
                {profiles.map((profile, key) => {
                  return (
                    <NavItem key={key++}>
                      <NavLink
                        className={classnames({active: this.state.activeTab === profile.id})}
                        onClick={() => {
                          this.toggle(profile.id, profile.type);
                        }}
                      >
                        {changeCase.upperCase(profile.type)}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {this.getTab()}
              </TabContent>
            </Col> :
            loaded === true && profiles.length === 0 ?
              <Alert color="warning">
                {p.DefaultMessages.ProfileDetailsNotFound}
              </Alert> :
              null}
        </Row>
      </div>
    );
  }
}

export default Views;
