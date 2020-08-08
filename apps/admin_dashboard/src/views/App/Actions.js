import React, {Component} from 'react';
import {Row, Col, Table, Alert, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import ModalComp from '../../components/Modal';
import {ToastContainer, toast} from 'react-toastify';
import {getAuthHeader, logout} from '../../auth';
import Clipboard from 'react-clipboard.js';
import Loader from 'react-loader';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      authorizeEmailModal: false,
      resendVerificationEmailModal: false,
      genPassModal: false,
      resetPassModal: false,
      tosModal: false,
      suspendAccModal: false,
      resetEmailVerifiedModal: false,
      header: getAuthHeader(),
      passModal: false,
      genPass: '',
      isActive: '',
      successCopyText: '',
      loaded: false
    };
    this.getUserActions = this.getUserActions.bind(this);
    this.handleToggleAuthorizeEmailModal = this.handleToggleAuthorizeEmailModal.bind(this);
    this.handleToggleResendVerificationEmailModal = this.handleToggleResendVerificationEmailModal.bind(this);
    this.handleToggleGenPassModal = this.handleToggleGenPassModal.bind(this);
    this.handleToggleResetPassModal = this.handleToggleResetPassModal.bind(this);
    this.handleToggleTOSModal = this.handleToggleTOSModal.bind(this);
    this.handleCreateRole = this.handleCreateRole.bind(this);
    this.handleToggleSuspendAccModal = this.handleToggleSuspendAccModal.bind(this);
    this.handleToggleResetEmailVerifiedModal = this.handleToggleResetEmailVerifiedModal.bind(this);
    this.handleTogglePassModal = this.handleTogglePassModal.bind(this);

    this.handleAuthorizeEmail = this.handleAuthorizeEmail.bind(this);
    this.handleResendVerificationEmail = this.handleResendVerificationEmail.bind(this);
    this.handleGenPass = this.handleGenPass.bind(this);
    this.handleResetPass = this.handleResetPass.bind(this);
    this.handleSuspendAcc = this.handleSuspendAcc.bind(this);
    this.handleResetEmailVerified = this.handleResetEmailVerified.bind(this);
    this.onSuccessCopyText = this.onSuccessCopyText.bind(this);
  }
  onSuccessCopyText(e) {
    console.log('onSuccessCopyText');
    e.preventDefault();
    this.setState({
      successCopyText: 'Genarated password copied to clipboard!!!'
    });
  }
  handleTogglePassModal(e) {
    e.preventDefault();
    this.setState({
      passModal: !this.state.passModal
    });
  }
  componentWillReceiveProps() {
    /* Toast.dismiss(); */
  }
  handleCreateRole(e) {
    e.preventDefault();
    axios.post(config.DASHBOARD_LOGIN.replace('{userId}', this.props.userId), {}, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          window.open(config.DASHBOARD_LOGIN_URL + response.data.payload.token + '&' + config.LOGIN_AS.KEY + '=' + config.LOGIN_AS.VALUE, '_blank');
        } else {
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
          toast.warn(config.ERROR_MSG);
        }
      });
  }
  handleToggleAuthorizeEmailModal(e) {
    e.preventDefault();
    this.setState({
      authorizeEmailModal: !this.state.authorizeEmailModal, isActive: 'Y'
    });
  }
  handleToggleDeactivateRole(e) {
    e.preventDefault();
    this.setState({
      deactivateRole: !this.state.deactivateRole
    });
  }
  handleToggleGenPassModal(e) {
    e.preventDefault();
    this.setState({
      genPassModal: !this.state.genPassModal
    });
  }
  handleToggleResendVerificationEmailModal(e) {
    e.preventDefault();
    this.setState({
      resendVerificationEmailModal: !this.state.resendVerificationEmailModal
    });
  }
  handleToggleResetEmailVerifiedModal(e) {
    e.preventDefault();
    this.setState({
      resetEmailVerifiedModal: !this.state.resetEmailVerifiedModal, isActive: 'A'
    });
  }
  handleToggleResetPassModal(e) {
    e.preventDefault();
    this.setState({
      resetPassModal: !this.state.resetPassModal
    });
  }
  handleToggleSuspendAccModal(e) {
    e.preventDefault();
    this.setState({
      suspendAccModal: !this.state.suspendAccModal,
      isActive: e.target.id
    });
  }
  handleToggleTOSModal(e) {
    e.preventDefault();
    this.setState({
      tosModal: !this.state.tosModal
    });
  }
  handleAuthorizeEmail(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.APP_USER_STATUS.replace('{userId}', this.props.userId),
      {isActive: this.state.isActive},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.dismiss();
          toast.info(config.SUCCESS_EMAIL_AUTHORIZE);
          self.getUserActions();
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
      authorizeEmailModal: !this.state.authorizeEmailModal
    });
  }
  handleResendVerificationEmail(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.APP_USER_VERFICATION_EMAIL.replace('{userId}', this.props.userId), {}, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.dismiss();
          toast.info(config.SUCCESS_USER_VERFICATION_EMAIL);
          self.getUserActions();
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
      resendVerificationEmailModal: !this.state.resendVerificationEmailModal
    });
  }
  handleGenPass(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.get(config.APP_USER_GENERATE_PASSWORD.replace('{userId}', this.props.userId), {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0 && response.data.payload) {
          self.setState({genPass: response.data.payload.password, passModal: true, loaded: true});
          /* Toast.info(config.SUCCESS_GENERATE_PASSWORD);
          self.getUserActions(); */
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
      genPassModal: !this.state.genPassModal
    });
  }
  handleResetPass(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.APP_USER_RESET_PASSWORD.replace('{userId}', this.props.userId), {}, {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.dismiss();
          toast.info(config.SUCCESS_RESET_PASSWORD);
          self.getUserActions();
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
      resetPassModal: !this.state.resetPassModal
    });
  }
  handleSuspendAcc(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.APP_USER_STATUS.replace('{userId}', this.props.userId),
      {isActive: self.state.isActive},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.dismiss();
          if (self.state.isActive === 'Y') {
            toast.info(config.SUCCESS_USER_ACTIVATE);
          } else {
            toast.info(config.SUCCESS_USER_SUSPEND);
          }
          self.getUserActions();
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
      suspendAccModal: !this.state.suspendAccModal
    });
  }
  handleResetEmailVerified(e) {
    e.preventDefault();
    const self = this;
    self.setState({loaded: false});
    axios.post(config.APP_USER_STATUS.replace('{userId}', this.props.userId),
      {isActive: this.state.isActive},
      {headers: this.state.header})
      .then(response => {
        if (response.data.responseCode === 0) {
          toast.dismiss();
          toast.info(config.SUCCESS_RESET_EMAIL_VERIFY);
          self.getUserActions();
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
      resetEmailVerifiedModal: !this.state.resetEmailVerifiedModal
    });
  }
  componentWillMount() {
    this.getUserActions();
  }
  getUserActions() {
    const self = this;
    axios.get(config.APP_USER_ACCOUNT_DETAILS.replace('{userId}', this.props.userId), {headers: this.state.header})
      .then(response => {
        if (response.data.payload) {
          self.setState({action: response.data.payload, loaded: true});
        } else {
          self.setState({action: null, loaded: true});
        }
      })
      .catch(error => {
        console.error('Error---', error);
        if (error && error.response && error.response.statusText === 'Unauthorized' && error.response.status === 401) {
          logout();
        } else {
          self.setState({action: null, loaded: true});
        }
      });
    // Const response = {emailVerified: 'N', showAuthorizeEmail: 'Y', showSendVerificationEmail: 'Y', tos: {version: '1.1', text: 'TOS Text', acceptedOn: '2018-03-06T13:39:22.157Z', ipAddress: '10.1.1.2'}, roles: ['athlete', 'isp'], status: 'A', canSuspendAccount: 'Y'};
    // this.setState({action: response});
  }

  render() {
    const {action} = this.state;
    console.log('action ', action);
    return (
      <Row>
        {/* eslint react/forbid-component-props: 0 */}
        {action ?
          <Col xs="12" sm="12" md="12" lg="10">
            <Table hover bordered striped responsive size="lg">
              <thead/>
              <tbody>
                <tr>
                  <td>Email Verified Status</td>
                  {/* eslint no-negated-condition: 0 */}
                  <td><Row className="row-margin-right">{action.isActive !== 'A' ? <Col className="col-auto" >Yes</Col> : [<Col className="col-auto" >No</Col>, <Col className="col-auto"><Link to="#" onClick={this.handleToggleAuthorizeEmailModal}>Authorize email</Link></Col>, <Col className="col-auto"><Link to="#" onClick={this.handleToggleResendVerificationEmailModal}>Resend verification email</Link></Col>]}</Row></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><Row className="row-margin-right"><Col className="col-auto"><Link to="#" onClick={this.handleToggleGenPassModal}>Generate new password</Link></Col><Col className="col-auto"><Link to="#" onClick={this.handleToggleResetPassModal}>Force user to reset password</Link></Col></Row></td>
                </tr>
                <tr>
                  <td>Version of tos accepted and timestamp</td>
                  <td><Link to="#" onClick={this.handleToggleTOSModal}>TOS version {action.tos.version}</Link><br/>
            dated {action.tos.acceptedOn} on IP Address: {action.tos.ipAddress}
                  </td>
                </tr>
                <tr>
                  <td>Eligible roles</td>
                  <td>{config.USER_ROLES.map((role, key) => (
                    action.roles.includes(role) ?
                      <Row key={key++} className="row-margin-right"><Col> {role} </Col><Col><span className="disabled">Create this role </span> </Col> <Col/></Row> :
                      <Row key={key++} className="row-margin-right"><Col> {role} </Col><Col><Link to="#" onClick={this.handleCreateRole}>Create this role </Link></Col><Col/></Row>
                  ))}
                  </td>
                </tr>
                <tr>
                  <td>Account status</td>
                  <td><Row className="row-margin-right"><Col className="col-auto">{action.isActive === 'Y' ? 'Active' : 'Inactive'}</Col><Col className="col-auto">{action.canSuspendAccount === 'Y' ? <Link to="#" id="N" onClick={this.handleToggleSuspendAccModal}>Suspend Account</Link> : <Link to="#" id="Y" onClick={this.handleToggleSuspendAccModal}>Activate Account</Link>}</Col><Col className="col-auto"><Link to="#" onClick={this.handleToggleResetEmailVerifiedModal} style={{cursor: 'help'}}>Reset email verified status to No</Link></Col></Row></td>
                </tr>
              </tbody>
            </Table>
          </Col> :
          <Alert color="warning">
                  User Account Details Are Not Found !!!.
          </Alert>}
        <ToastContainer autoClose={config.TOASTTIMEOUT}/>
        <Loader loaded={this.state.loaded} className="spinner"/>
        <ModalComp
          isOpen={this.state.authorizeEmailModal}
          className="modal-primary"
          onToggle={this.handleToggleAuthorizeEmailModal}
          onConfirm={this.handleAuthorizeEmail}
          onCancel={this.handleToggleAuthorizeEmailModal}
          content="Are you sure?"
          header="Authorize Email"
          cancelText="No"
          confirmText="Yes"
        />
        <ModalComp
          isOpen={this.state.resendVerificationEmailModal}
          className="modal-primary"
          onToggle={this.handleToggleResendVerificationEmailModal}
          onConfirm={this.handleResendVerificationEmail}
          onCancel={this.handleToggleResendVerificationEmailModal}
          content="Are you sure?"
          header="Resend Verification Email"
          cancelText="No"
          confirmText="Yes"
        />
        <ModalComp
          isOpen={this.state.genPassModal}
          className="modal-primary"
          onToggle={this.handleToggleGenPassModal}
          onConfirm={this.handleGenPass}
          onCancel={this.handleToggleGenPassModal}
          content="Are you sure?"
          header="Generate Password"
          cancelText="No"
          confirmText="Yes"
        />
        <ModalComp
          isOpen={this.state.resetPassModal}
          className="modal-danger"
          onToggle={this.handleToggleResetPassModal}
          onConfirm={this.handleResetPass}
          onCancel={this.handleToggleResetPassModal}
          content="Are you sure?"
          header="Reset Password"
          cancelText="No"
          confirmText="Yes"
        />
        <ModalComp
          isOpen={this.state.tosModal}
          className="modal-primary modal-lg"
          onToggle={this.handleToggleTOSModal}
          onConfirm={this.handleToggleTOSModal}
          content={this.state.action ? this.state.action.tos.text : null}
          header="TOS"
          confirmText="OK"
        />

        <ModalComp
          isOpen={this.state.suspendAccModal}
          className="modal-danger"
          onToggle={this.handleToggleSuspendAccModal}
          onConfirm={this.handleSuspendAcc}
          onCancel={this.handleToggleSuspendAccModal}
          content="Are you sure?"
          header="Activate/Suspend Account"
          cancelText="No"
          confirmText="Yes"
        />
        <ModalComp
          isOpen={this.state.resetEmailVerifiedModal}
          className="modal-danger"
          onToggle={this.handleToggleResetEmailVerifiedModal}
          onConfirm={this.handleResetEmailVerified}
          onCancel={this.handleToggleResetEmailVerifiedModal}
          content="Are you sure?"
          header="Reset Email Verified"
          cancelText="No"
          confirmText="Yes"
        />
        <ModalComp
          isOpen={this.state.passModal}
          className="modal-primary"
          onToggle={this.handleTogglePassModal}
          onConfirm={this.handleTogglePassModal}
          content={this.state.genPass + this.state.successCopyText}
          header="Generated Password"
          confirmText="OK"
        />
        <Modal isOpen={this.state.passModal} toggle={this.handleTogglePassModal} className="modal-primary">
          <ModalHeader toggle={this.handleTogglePassModal}>Generated Password</ModalHeader>
          <ModalBody>
            <h3>{this.state.genPass}</h3>
            <p style={{color: '#9da0a2'}}>Press OK to copy generated password to clipboard!!!.</p>
          </ModalBody>
          <ModalFooter>
            <Clipboard data-clipboard-text={this.state.genPass} className="btn btn-primary" onClick={this.handleTogglePassModal}>
              OK
            </Clipboard>
          </ModalFooter>
        </Modal>
      </Row>
    );
  }
}

export default Actions;
