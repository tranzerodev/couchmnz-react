import React, {Component} from 'react';
import {Row, Col, Table, Alert, UncontrolledTooltip} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import moment from 'moment';
import {ToastContainer, toast} from 'react-toastify';
import {getAuthHeader, logout} from '../../auth';
import {APP_USER, APP_USER_PROFILE} from '../../constants/pathConstants';
import p from '../../locale/enUs.json';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      header: getAuthHeader(),
      nameOrderBy: true,
      regOrderBy: false,
      emailVerOrderBy: true,
      lastLoginOrderBy: true,
      isActiveName: false,
      isActiveReg: true,
      isActiveEmailVer: false,
      isActiveLastLogin: false
    };
    this.displayUsers = this.displayUsers.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNameToggle = this.handleNameToggle.bind(this);
    this.handleRegToggle = this.handleRegToggle.bind(this);
    this.handleEmailVerifiedToggle = this.handleEmailVerifiedToggle.bind(this);
    this.handleLastLoginToggle = this.handleLastLoginToggle.bind(this);
  }
  componentWillMount() {
    // This.props.onSort('regDate', 'desc');
  }
  openDashboard(token) {
    window.open(config.DASHBOARD_LOGIN_URL + token + '&' + config.LOGIN_AS.KEY + '=' + config.LOGIN_AS.VALUE, '_blank');
  }
  handleLogin(e) {
    e.preventDefault();
    console.log('Login', e.target.id);
    const self = this;
    axios.post(config.FETCH_JWT_TOKEN.replace('{userId}', e.target.id), {}, {headers: this.state.header})
      .then(response => {
        console.log('response ', response);
        if (response.data.responseCode === 0 && response.data.payload) {
          window.open(config.SSR_LOGIN_URL + `login?token=${response.data.payload.token}&refreshToken=${response.data.payload.code}`)
        } else {
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        // Toast.error(config.ERROR_MSG);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      });    
    /*axios.post(config.DASHBOARD_LOGIN.replace('{userId}', e.target.id), {}, {headers: this.state.header})
      .then(response => {
        console.log('response ', response);
        if (response.data.responseCode === 0 && response.data.payload) {
          self.openDashboard(response.data.payload.token);
        } else {
          toast.warn(config.ERROR_MSG);
        }
      })
      .catch(error => {
        console.error('Error---', error);
        // Toast.error(config.ERROR_MSG);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        }
      }); */
  }
  handleNameToggle(e) {
    const sortBy = e.target.id;
    let orderBy;
    if (!this.state.nameOrderBy === true) {
      orderBy = 'asc';
    } else {
      orderBy = 'desc';
    }
    this.setState({
      nameOrderBy: !this.state.nameOrderBy,
      isActiveName: true,
      isActiveReg: false,
      isActiveEmailVer: false,
      isActiveLastLogin: false});
    this.props.onSort(sortBy, orderBy);
  }
  handleRegToggle(e) {
    const sortBy = e.target.id;
    let orderBy;
    if (!this.state.regOrderBy === true) {
      orderBy = 'asc';
    } else {
      orderBy = 'desc';
    }
    this.setState({regOrderBy: !this.state.regOrderBy,
      isActiveName: false,
      isActiveReg: true,
      isActiveEmailVer: false,
      isActiveLastLogin: false});
    this.props.onSort(sortBy, orderBy);
  }
  handleEmailVerifiedToggle(e) {
    const sortBy = e.target.id;
    let orderBy;
    if (!this.state.emailVerOrderBy === true) {
      orderBy = 'asc';
    } else {
      orderBy = 'desc';
    }
    this.setState({emailVerOrderBy: !this.state.emailVerOrderBy,
      isActiveName: false,
      isActiveReg: false,
      isActiveEmailVer: true,
      isActiveLastLogin: false});
    this.props.onSort(sortBy, orderBy);
  }
  handleLastLoginToggle(e) {
    const sortBy = e.target.id;
    let orderBy;
    if (!this.state.lastLoginOrderBy === true) {
      orderBy = 'asc';
    } else {
      orderBy = 'desc';
    }
    this.setState({lastLoginOrderBy: !this.state.lastLoginOrderBy,
      isActiveName: false,
      isActiveReg: false,
      isActiveEmailVer: false,
      isActiveLastLogin: true});
    this.props.onSort(sortBy, orderBy);
  }
  displayUsers() {
    const {users, currentPage, dataError, loaded} = this.props;
    const notNull = val => val && val != null ? val : ''
    return (
      (((dataError === true || users.length === 0) && loaded === true) ?
        <tbody>
          <tr>
            <td colSpan="12">
              <Alert color="warning">
          Users Details Are Not Found !!!.
              </Alert>
            </td>
          </tr>
        </tbody> :
        <tbody>
          {
            users.map((user, key) =>
              (
                <tr key={user.id} className="usertable">
                  <td>{((currentPage - 1) * 10) + (key + 1)}</td>
                  <td id={'email' + user.id}>
                    {user.profiles && user.profiles.length > 0 ? <Link to={{pathname: APP_USER_PROFILE.replace(':id', user.id), state: {profiles: JSON.stringify(user.profiles)}}}>{user.email}</Link> : user.email }
                    {/* {(user.profiles && user.profiles.filter(e => e.type === config.ISP).length > 0) ? <Link to={APP_USER_PROFILE.replace(':id', user.id).replace(':profileId', user.profiles.filter(e => e.type === config.ISP)[0].id)}>{user.email}</Link> : user.email } */}
                    <UncontrolledTooltip target={'email' + user.id}>  View Profile             </UncontrolledTooltip>
                  </td>
                  <td id={'name' + user.id}>
                    {user.profiles && user.profiles.length > 0 ? <Link to={{pathname: APP_USER_PROFILE.replace(':id', user.id), state: {profiles: JSON.stringify(user.profiles)}}}>{user.name}</Link> : user.name }
                    {/* {(user.profiles && user.profiles.filter(e => e.type === config.ISP).length > 0) ? <Link to={APP_USER_PROFILE.replace(':id', user.id).replace(':profileId', user.profiles.filter(e => e.type === config.ISP)[0].id)}>{user.name}</Link> : user.name } */}
                    <UncontrolledTooltip target={'name' + user.id}>  View Profile             </UncontrolledTooltip>
                  </td>
                  <td>{user.registeredOn ? moment(user.registeredOn).format('DD-MM-YYYY HH:mm') : '-'}</td>
                  <td align="center">{user.profiles.map( r => 
                    `${r.mobileNumber && r.mobileNumber != null ? notNull(r.mobileNumber) : notNull(r.phoneNumber) } \n` ) 
                  }</td>
                  <td align="center" style={{wordBreak: 'break-word'}}>
                      {user && user.userSports && user.userSports.map( r => 
                        r.sports ? r.sports.map( s => s.name + '\n') : ''
                      )}
                    </td>
                  <td align="center">{user.profiles.map( r => 
                    `${notNull(r.zipCode)}\n` ) 
                  }</td>
                  {/* eslint no-negated-condition: 0 */}
                  <td>{user.isActive !== 'A' ? 'Yes' : 'No'}</td>
                  <td>{user.lastLoggedinOn ? moment(user.lastLoggedinOn).format('DD-MM-YYYY HH:mm') : '-'}</td>
                  <td>
                    {user.profiles.map((profile, key) =>
                      (
                        <Row key={key++}><Col>{profile.isCompleted === 'Y' ? <span className="badge badge-success">{profile.completionPct}% </span> : <span className="badge badge-danger"> {profile.completionPct}%</span>}</Col>
                          <Col>{profile.type}</Col>
                        </Row>
                      ))}
                    {user.profiles.length === 0 ? 'Not started' : null}
                  </td>
                  <td><Link to="#" target="_blank" id={user.id} onClick={this.handleLogin}>Login</Link></td>
                  <td><Link to={APP_USER.replace(':id', user.id)}>View/Update</Link></td>
                </tr>
              )
            )
          }
        </tbody>)
    );
  }

  render() {
    const {nameOrderBy, regOrderBy, emailVerOrderBy, lastLoginOrderBy} = this.state;
    const {isActiveName, isActiveReg, isActiveEmailVer, isActiveLastLogin} = this.state;
    return (
      <div>
        {/* eslint react/forbid-component-props: 0 */}
        <ToastContainer/>
        <Table responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>{/* arrows-v */}
              <th className="all-scroll" id="name" onClick={this.handleNameToggle}>Name {isActiveName === true ? (nameOrderBy === true ? <i className="fa fa-arrow-up"/> : <i className="fa fa-arrow-down"/>) : (<i className="fa fa-arrows-v"/>)}</th>
              <th className="all-scroll" id="regDate" onClick={this.handleRegToggle}>Registered On {isActiveReg === true ? (regOrderBy === true ? <i className="fa fa-arrow-up"/> : <i className="fa fa-arrow-down"/>) : (<i className="fa fa-arrows-v"/>)}</th>
              <th style={{textAlign: 'center'}}>Phone Number</th>
              <th style={{textAlign: 'center'}}>Sport(s)</th>
              <th style={{textAlign: 'center'}}>Zip Code</th>
              <th className="all-scroll" id="emailVerified" onClick={this.handleEmailVerifiedToggle}>Email Verified {isActiveEmailVer === true ? (emailVerOrderBy === true ? <i className="fa fa-arrow-up"/> : <i className="fa fa-arrow-down"/>) : (<i className="fa fa-arrows-v"/>)}</th>
              <th className="all-scroll" id="lastLogin" onClick={this.handleLastLoginToggle}>Last Login {isActiveLastLogin === true ? (lastLoginOrderBy === true ? <i className="fa fa-arrow-up"/> : <i className="fa fa-arrow-down"/>) : (<i className="fa fa-arrows-v"/>)}</th>
              <th>Profile Completion</th>
              <th>Open Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            this.displayUsers()
          }
          <tbody/>
        </Table>
      </div>
    );
  }
}

export default User;
