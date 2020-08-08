import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container, Alert, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Config from '../../../config';
import axios from 'axios';
import {INSTITUTIONS} from '../../../constants/pathConstants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.HandleChange = this.HandleChange.bind(this);
    this.HandleLogin = this.HandleLogin.bind(this);
  }

  HandleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  HandleLogin(event) {
    event.preventDefault();
    const self = this;
    if (this.state.username.trim()) {
      if (this.state.password) {
        const loginPayload = {
          email: this.state.username.trim(),
          password: this.state.password
        };

        const loginURL = Config.LOGIN_URL;

        axios.post(loginURL, loginPayload)
          .then(res => {
            console.log('Success ::', res.data);
            if (res.data.responseCode === 0) {
              self.setLoginToken(self.state.username, res.data.payload.token, res.data.payload.role);
            } else {
              ReactDOM.render('Invalid Username or Password', document.getElementById('validationMessage'));
              document.getElementById('validationMessage').classList.add('alert-danger');
              self.removeMessage();
            }
          })
          .catch(err => {
            ReactDOM.render('Invalid Username or Password', document.getElementById('validationMessage'));
            document.getElementById('validationMessage').classList.add('alert-danger');
            self.removeMessage();
            console.error('ERROR!!! Please check the User Name and Password Combination.' + err);
          });
      } else {
        ReactDOM.render('Password required', document.getElementById('validationMessage'));
        document.getElementById('validationMessage').classList.add('alert-danger');
        self.removeMessage();
      }
    } else {
      ReactDOM.render('Username required', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.add('alert-danger');
      self.removeMessage();
    }
  }

  setLoginToken(userID, token, role) {
    localStorage.setItem('cl-adm-token', token);
    localStorage.setItem('cl-adm-role', role);
    this.props.history.push(INSTITUTIONS);
  }

  removeMessage() {
    this.timerVar = setTimeout(() => {
      ReactDOM.render('', document.getElementById('validationMessage'));
      document.getElementById('validationMessage').classList.remove('alert-success', 'alert-danger');
    }, 3000);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Alert color="white" id="validationMessage"/>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" name="username" onChange={this.HandleChange} required/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" onChange={this.HandleChange} required/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.HandleLogin}>Login</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
