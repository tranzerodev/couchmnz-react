import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import Modal from '../../components/Modal';
import {ToastContainer, toast} from 'react-toastify';
import {getAuthHeader, logout} from '../../auth';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      profileId: '',
      profileType: '',
      deactivateRoleModal: false,
      disableProfileModal: false,
      sportId: '',
      dependentId: '',
      header: getAuthHeader(),
      isProfile: false,
      loaded: false
    };
    this.getUserProfiles = this.getUserProfiles.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleDeactivateRole = this.handleDeactivateRole.bind(this);
    this.handleDisableProfile = this.handleDisableProfile.bind(this);
    this.handleToggleDeactivateRole = this.handleToggleDeactivateRole.bind(this);
    this.handleToggleDisableProfile = this.handleToggleDisableProfile.bind(this);
    this.handleToggleCancelProfile = this.handleToggleCancelProfile.bind(this);
  }
  componentWillMount() {
    this.getUserProfiles();
  }
  handleToggleDeactivateRole(e) {
    e.preventDefault();
    const {id, name} = e.target;
    this.setState({
      deactivateRoleModal: !this.state.deactivateRoleModal,
      profileId: id,
      isActive: name,
      profileType: e.target.getAttribute('profiletype')
    });
  }
  handleDeactivateRole(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.APP_USER_ROLE_DEACTIVATE.replace('{userId}', this.props.userId).replace('{profileId}', this.state.profileId).replace('{profileType}', this.state.profileType),
      {isActive: self.state.isActive},
      {headers: this.state.header})
      .then(response => {
        console.log('response ', response);
        if (response.data.responseCode === 0) {
          toast.dismiss();
          if (self.state.isActive === 'Y') {
            toast.info(config.SUCCESS_ROLE_ACTIVATE);
          } else {
            toast.info(config.SUCCESS_ROLE_DEACTIVATE);
          }
          self.getUserProfiles();
        } else {
          self.setState({loaded: true});
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({loaded: true});
          toast.dismiss();
          toast.error(config.ERROR_MSG);
        }
      });
    this.setState({
      deactivateRoleModal: !this.state.deactivateRoleModal
    });
  }
  handleToggleCancelProfile() {
    this.setState({
      disableProfileModal: !this.state.disableProfileModal});
  }
  handleToggleDisableProfile(e) {
    const profileType = e.target.getAttribute('profiletype');
    if (profileType === 'parent') {
      const {id, name} = e.target;
      this.setState({
        disableProfileModal: !this.state.disableProfileModal,
        profileId: id,
        canEnable: name,
        profileType: e.target.getAttribute('profiletype'),
        dependentId: e.target.getAttribute('dependentid')
      });
    } else if (profileType === 'isp') {
      const {id, name} = e.target;
      this.setState({
        disableProfileModal: !this.state.disableProfileModal,
        profileId: id,
        canEnable: name,
        profileType: e.target.getAttribute('profiletype'),
        sportId: e.target.getAttribute('sportid')
      });
    }
  }
  handleDisableProfile(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    if (this.state.profileType === 'parent') {
      axios.post(config.APP_USER_PARENT_PROFILE_DISABLE.replace('{userId}', this.props.userId).replace('{profileId}', this.state.profileId).replace('{childId}', this.state.dependentId),
        {isActive: self.state.canEnable},
        {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.dismiss();
            if (self.state.canEnable === 'Y') {
              toast.info(config.SUCCESS_PROFILE_ENABLE);
            } else {
              toast.info(config.SUCCESS_PROFILE_DISABLE);
            }
            self.getUserProfiles();
          } else {
            self.setState({loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          console.error('Error---', error);
          if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
            logout();
          } else {
            toast.dismiss();
            self.setState({loaded: true});
            toast.error(config.ERROR_MSG);
          }
        });
    } else if (this.state.profileType === 'isp') {
      axios.post(config.APP_USER_ISP_PROFILE_DISABLE.replace('{userId}', this.props.userId).replace('{profileId}', this.state.profileId).replace('{sportId}', this.state.sportId),
        {isActive: self.state.canEnable},
        {headers: this.state.header})
        .then(response => {
          if (response.data.responseCode === 0) {
            toast.dismiss();
            if (self.state.canEnable === 'Y') {
              toast.info(config.SUCCESS_PROFILE_ENABLE);
            } else {
              toast.info(config.SUCCESS_PROFILE_DISABLE);
            }
            self.getUserProfiles();
          } else {
            self.setState({loaded: true});
            toast.dismiss();
            toast.warn(config.ERROR_MSG);
          }
        })
        .catch(error => {
          console.error('Error---', error);
          if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
            logout();
          } else {
            self.setState({loaded: true});
            toast.dismiss();
            toast.error(config.ERROR_MSG);
          }
        });
    }
    this.setState({
      disableProfileModal: !this.state.disableProfileModal
    });
  }
  openDashboard(token) {
    window.open(config.DASHBOARD_LOGIN_URL + token + '&' + config.LOGIN_AS.KEY + '=' + config.LOGIN_AS.VALUE, '_blank');
  }
  handleLogin(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.DASHBOARD_LOGIN.replace('{userId}', this.props.userId), {}, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({loaded: true});
          self.openDashboard(response.data.payload.token);
        } else {
          toast.dismiss();
          self.setState({loaded: true});
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          toast.dismiss();
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  componentWillReceiveProps() {
    /* Toast.dismiss(); */
  }
  getUserProfiles() {
    const self = this;
    axios.get(config.APP_USER_PROFILES.replace('{userId}', this.props.userId), {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({profiles: response.data.payload, isProfile: true, loaded: true});
        } else {
          self.setState({isProfile: false, loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({isProfile: true, loaded: true});
        }
      });
    /* Const response = [{id: '58ee4723db2529281d7b23e0', type: 'athlete', sections: [{name: 'Athlete Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y', showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'parent', dependents: [{type: 'child', name: 'Child 1', sections: [{name: 'Child Profile', isCompleted: 'Y'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'N'}], showDisable: 'Y'}, {type: 'child', name: 'Child 2', sections: [{name: 'Child Profile', isCompleted: 'N'}, {name: 'Skills & Interest', isCompleted: 'Y'}, {name: 'Account Details', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'Y'}, {id: '58ee4723db2529281d7b24e0', type: 'isp', sports: [{id: '58ee4723db2529281d7b24e0', name: 'Golf', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}, {id: '58ee4723db2529281d7b29e0', name: 'Soccer', sections: [{name: 'Services', isCompleted: 'Y'}, {name: 'Training Preferences', isCompleted: 'Y'}, {name: 'Biography', isCompleted: 'Y'}], showDisable: 'Y'}], showDeactivate: 'N'}];
    this.setState({profiles: response}); */
  }

  render() {
    const {profiles} = this.state;
    console.log('profiles ', profiles);
    let profilesDisp = profiles.map((profile, key) => {
      if (profile.type === 'athlete') {
        return (
          <Col key={key++} xs="12" sm="12" md="12">
            {/* eslint react/forbid-component-props: 0 */}
            <Card>
              <CardHeader>
                {profile.type.toUpperCase()}
                <div className="float-right">
                  <Link to="#" onClick={this.handleLogin}>Login</Link>&nbsp; &nbsp;
                  {profile.canActivate === 'Y' ? <Link to="#" profiletype={profile.type} name="Y" id={profile.id} onClick={this.handleToggleDeactivateRole}> Activate Role</Link> : null}
                  {profile.canDeactivate === 'Y' ? <Link to="#" profiletype={profile.type} name="N" id={profile.id} onClick={this.handleToggleDeactivateRole}>Deactivate Role</Link> : null } {/* <span className="disabled">Can not deactivate</span> */}
                  {profile.canActivate === 'N' && profile.canDeactivate === 'N' ? <span className="disabled">Can not deactivate</span> : null }
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="6" md="4">
                    {profile.sections.map((section, key) => (
                      <p key={key++}>
                        {section.isCompleted === 'Y' ?
                          <i className="fa fa-check-circle-o fa-lg fa-green"/> :
                          <i className="fa fa-times-circle-o fa-lg fa-red"/>}{' '}
                        {section.name}
                      </p>
                    ))}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>);
      } else if (profile.type === 'parent') {
        return (
          <Col key={key++} xs="12" sm="12" md="12">
            <Card>
              <CardHeader>
                {profile.type.toUpperCase()}
                <div className="float-right">
                  <Link to="#" onClick={this.handleLogin}>Login</Link>&nbsp; &nbsp;
                  {profile.canActivate === 'Y' ? <Link to="#" profiletype={profile.type} name="Y" id={profile.id} onClick={this.handleToggleDeactivateRole}> Activate Role</Link> : null}
                  {profile.canDeactivate === 'Y' ? <Link to="#" profiletype={profile.type} name="N" id={profile.id} onClick={this.handleToggleDeactivateRole}>Deactivate Role</Link> : null } {/* <span className="disabled">Can not deactivate</span> */}
                  {profile.canActivate === 'N' && profile.canDeactivate === 'N' ? <span className="disabled">Can not deactivate</span> : null }
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {profile.dependents.map((dependent, key) => (
                    <Col key={key++} md="4" sm="6" xs="12">
                      <p style={{marginBottom: 10}}><b>{dependent.name}  </b>
                        {dependent.canEnable === 'Y' ? <Link id={profile.id} profiletype={profile.type} dependentid={dependent.id} name="Y" to="#" onClick={this.handleToggleDisableProfile}>Enable</Link> : null}
                        {dependent.canDisable === 'Y' ? <Link id={profile.id} profiletype={profile.type} dependentid={dependent.id} name="N" to="#" onClick={this.handleToggleDisableProfile}>Disable</Link> : null}
                      </p>
                      {dependent.sections.map((section, key) => (
                        <p key={key++}>
                          {section.isCompleted === 'Y' ?
                            <i className="fa fa-check-circle-o fa-lg fa-green"/> :
                            <i className="fa fa-times-circle-o fa-lg fa-red"/>}{' '}
                          {section.name}
                        </p>
                      ))}
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>);
      } else if (profile.type === 'isp') {
        return (
          <Col key={key++} xs="12" sm="12" md="12">
            <Card>
              <CardHeader>
                {profile.type.toUpperCase()}
                <div className="float-right">
                  <Link to="#" onClick={this.handleLogin}>Login</Link>&nbsp; &nbsp;
                  {profile.canActivate === 'Y' ? <Link to="#" profiletype={profile.type} name="Y" id={profile.id} onClick={this.handleToggleDeactivateRole}> Activate Role</Link> : null}
                  {profile.canDeactivate === 'Y' ? <Link to="#" profiletype={profile.type} name="N" id={profile.id} onClick={this.handleToggleDeactivateRole}>Deactivate Role</Link> : null } {/* <span className="disabled">Can not deactivate</span> */}
                  {profile.canActivate === 'N' && profile.canDeactivate === 'N' ? <span className="disabled">Can not deactivate</span> : null }
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {profile.sports.map((sport, key) => (
                    <Col key={key++} md="4" sm="6" xs="12">
                      <p style={{marginBottom: 10}}><b>{sport.name}  </b>
                        {sport.canEnable === 'Y' ? <Link id={profile.id} to="#" profiletype={profile.type} sportid={sport.id} name="Y" onClick={this.handleToggleDisableProfile}>Enable</Link> : null}
                        {sport.canDisable === 'Y' ? <Link id={profile.id} to="#" profiletype={profile.type} sportid={sport.id} name="N" onClick={this.handleToggleDisableProfile}>Disable</Link> : null}
                      </p>
                      {sport.sections.map((section, key) => (
                        <p key={key++}>
                          {section.isCompleted === 'Y' ?
                            <i className="fa fa-check-circle-o fa-lg fa-green"/> :
                            <i className="fa fa-times-circle-o fa-lg fa-red"/>}{' '}
                          {section.name}
                        </p>
                      ))}
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>);
      }
    });
    if ((profiles.length === 0 || this.state.isProfile === false) && this.state.loaded === true) {
      profilesDisp = (
        <Alert color="warning">
          User Profile Details Are Not Found !!!.
        </Alert>
      );
    }
    return (
      <Row>
        {profilesDisp}
        <Loader loaded={this.state.loaded} className="spinner"/>
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <Modal
          isOpen={this.state.deactivateRoleModal}
          className="modal-danger"
          onToggle={this.handleToggleDeactivateRole}
          onConfirm={this.handleDeactivateRole}
          onCancel={this.handleToggleDeactivateRole}
          content="Are you sure?"
          header="Activate/Deactivate Role"
          cancelText="No"
          confirmText="Yes"
        />
        <Modal
          isOpen={this.state.disableProfileModal}
          className="modal-danger"
          onToggle={this.handleToggleCancelProfile}
          onConfirm={this.handleDisableProfile}
          onCancel={this.handleToggleCancelProfile}
          content="Are you sure?"
          header="Enable/Disable Profile"
          cancelText="No"
          confirmText="Yes"
        />
      </Row>
    );
  }
}

export default Profiles;
