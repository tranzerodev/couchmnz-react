import React, {Component} from 'react';
import {FormGroup, Form, CardHeader, Alert, Label, Row, Col, Card, CardBody, CardFooter, Button, Input, FormText} from 'reactstrap';
import axios from 'axios';
import config from '../../config';
import ReactDOM from 'react-dom';
import {getAuthHeader} from '../../auth';
import {ToastContainer, toast} from 'react-toastify';
import {INSTITUTIONS, USERS} from '../../constants/pathConstants';
import Loader from 'react-loader';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      selectedRole: '',
      passwordValid: false,
      disabled: '',
      loaded: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.removeMessageAndRedirect = this.removeMessageAndRedirect.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.getRoles = this.getRoles.bind(this);
    this.renderRoles = this.renderRoles.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
  }

  componentWillMount() {
    const role = localStorage.getItem('cl-adm-role');
    if (role && role !== config.ROLE_TYPE.SUPERADMIN) {
      this.props.history.push(INSTITUTIONS);
    }
  }
  componentDidMount() {
    this.getRoles();
  }
  validatePassword(password) {
    this.setState({passwordValid: false});
    const reg = new RegExp('^(?=.*[a-z]).{6,}$');
    if (reg.test(password)) {
      this.setState({passwordValid: true});
    }
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === 'password') {
      this.validatePassword(value);
    }
    this.setState({
      [name]: value
    });
  }
  getRoles() {
    const header = getAuthHeader();
    // Post
    axios.get(config.URL_GET_ROLES, {
      headers: header
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({roles: res.data.payload});
          const defaultRole = res.data.payload.find(item =>
            item.type === config.ROLE_TYPE.DEFAULT_ROLE);
          if (defaultRole && defaultRole._id) {
            this.setState({selectedRole: defaultRole._id});
          }
        }
      });
  }

  handleCreateUser(event) {
    event.preventDefault();
    this.setState({disabled: 'disable', loaded: false});
    const self = this;
    if (this.state.passwordValid) {
      const payload = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.selectedRole
      };
      const header = getAuthHeader();
      // Post
      axios.post(config.REGISTER_URL, payload, {
        headers: header
      })
        .then(res => {
          if (res.status === 200) {
            console.log('Response --- ', res.data.responseCode);
            if (res.data.responseCode.toString() === '0') {
              self.setState({email: '', password: '', confpassword: '', disabled: '', loaded: true});
              toast.info('User added Successfully');
              /* ReactDOM.render('User added Successfully', document.getElementById('validationMessage'));
              document.getElementById('validationMessage').classList.add('alert-success'); */
              self.removeMessageAndRedirect();
              self.setState({disabled: '', loaded: true});
            } else if (res.data.responseCode.toString() === '102') {
              self.setState({disabled: '', loaded: true});
              ReactDOM.render(res.data.developerMessage, document.getElementById('validationMessage'));
              document.getElementById('validationMessage').classList.add('alert-danger');
              self.removeMessage();
            } else {
              toast.warn('ERROR!!!Something went wrong');
              this.setState({disabled: '', loaded: true});
            }
          }
        })
        .catch(err => {
          toast.warn('ERROR!!!Something went wrong');
          /* ReactDOM.render('Something Went Wrong', document.getElementById('validationMessage'));
          document.getElementById('validationMessage').classList.add('alert-danger'); */
          self.removeMessage();
          self.setState({disabled: '', loaded: true});
          console.log('ERROR!!!Something went wrong', err);
        });
    } else {
      ReactDOM.render('Password Not Valid', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      self.removeMessage();
      self.setState({disabled: '', loaded: true});
    }
  }
  handlePasswordCheck(event) {
    const target = event.target;
    const value = target.value;
    if (value === this.state.password) {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    } else {
      ReactDOM.render('Password does not Match', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
    }
  }
  removeMessageAndRedirect() {
    const self = this;
    self.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
      self.props.history.push(USERS);
    }, 3000);
  }

  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 8000);
  }

  handleRoleChange(event) {
    const {value} = event.target;
    this.setState({
      selectedRole: value
    });
  }
  renderRoles(role) {
    return (
      <div key={role._id} >
        <input id={role.name} type="radio" name="role" value={role._id} onChange={this.handleRoleChange} checked={this.state.selectedRole === role._id}/>
        <label htmlFor={role.name}>{role.name}</label>
      </div>
    );
  }
  handleBack() {
    this.props.history.push(USERS);
  }

  render() {
    return (
      <div className="animated fadeIn">
        {/* eslint react/forbid-component-props: 0 */}
        <ToastContainer/>
        <Row>
          <Col xs="12" md="3"/>
          <Col xs="12" md="6">
            <Card>
              <Form action="" method="post" onSubmit={this.handleCreateUser} encType="multipart/form-data" >
                <CardHeader>
                  <strong>Add User</strong>
                </CardHeader>
                <CardBody>
                  <Alert color="white" id="validationMessage"/>
                  {/*                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="name">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" placeholder="" name="name" onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup> */}

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email" value={this.state.email} name="email" placeholder="" onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password" value={this.state.password} name="password" placeholder="" onChange={this.handleChange} required/>
                      <FormText >Minimum 6 characters with atleast one alphabet</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password">Confirm Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="confpassword" value={this.state.confpassword} name="confpassword" placeholder="" onChange={this.handlePasswordCheck} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="role">Select Role</Label>
                    </Col>
                    <Col xs="12" md="9">
                      {
                        this.state.roles.map(this.renderRoles)
                      }
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button disabled={this.state.disabled === 'disable'} className={this.state.disabled} type="submit" color="primary" ><i className="fa fa-dot-circle-o"/> Create User</Button> {''}
                  <Button type="reset" color="danger" onClick={this.handleBack}><i className="fa fa-ban"/> Cancel</Button>
                </CardFooter>
              </Form>
            </Card>
            <Loader loaded={this.state.loaded} className="spinner"/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddUser;
