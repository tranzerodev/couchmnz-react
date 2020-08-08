import React, {Component} from 'react';
import {Row, Col, Card, CardHeader, CardBody, Button, Table, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import {getAuthHeader, logout} from '../../auth';
import {INSTITUTIONS, ADD_USERS} from '../../constants/pathConstants';
import Loader from 'react-loader';

/* eslint react/no-deprecated: 0 */

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      header: getAuthHeader(),
      loaded: false,
      isError: false
    };
    this.getUserList = this.getUserList.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
  }
  componentWillMount() {
    const role = localStorage.getItem('cl-adm-role');
    if (role && role !== config.ROLE_TYPE.SUPERADMIN) {
      this.props.history.push(INSTITUTIONS);
    }
  }
  componentDidMount() {
    this.getUserList();
  }
  getUserList() {
    const self = this;
    axios.get(config.USER_LIST_URL, {headers: this.state.header})
      .then(response => {
        if (response.data.payload && response.data.responseCode === 0) {
          self.setState({userArr: response.data.payload, loaded: true});
        } else {
          self.setState({isError: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({isError: true});
        }
      });
  }

  displayUsers() {
    const {userArr} = this.state;
    return (
      <tbody>
        {
          userArr.map((user, key) =>
            (
              <tr key={user._id} >
                <td>{key + 1}</td>
                <td>{user.email}</td>
                <td>{user.roleType}</td>
              </tr>
            )
          )
        }
      </tbody>
    );
  }

  render() {
    const {isError} = this.state;
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8" align="right">
            <Link to={ADD_USERS} > <Button color="primary">Add User</Button></Link>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs="12" md="2"/>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/>Users
              </CardHeader>
              <CardBody>
                {isError === false ?
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    {
                      this.displayUsers()
                    }
                    <tbody/>
                  </Table> :
                  <Alert color="warning">
                    No data found
                  </Alert>}
              </CardBody>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>

      </div>
    );
  }
}

export default User;
