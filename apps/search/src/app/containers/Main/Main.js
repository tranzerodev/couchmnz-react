import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

import SearchSSP from '../../components/SearchSSP/SearchSSP';
import ViewSSPP from '../../components/ViewSSPProfile/ViewSSPProfile';
import {SSP_SEARCH_PAGE_URL} from '../../constants/RouterPaths';
import Header from '../../components/Header';
import SignUpModal from '../../components/Auth/SignUp';
import LoginModal from '../../components/Auth/Login';
import VerifyOTP from '../../components/Auth/VerifyOTP';
import {VERIFY_OTP} from '../../constants/pathConstants';
import TermsAndConditionModal from '../../components/common/TermsAndConditionModal';
import {verifyOTPPrevalidation} from '../../routeMiddlewares/Auth/VerifyOTP';
import {isAuthenticated} from '../../../auth/auth';
import {fetchUserProfiles} from '../../actions/index';

class Main extends Component {
  constructor(props) {
    super(props);

    this.renderSignUpModal = this.renderSignUpModal.bind(this);
    this.handleSignUpModalOpen = this.handleSignUpModalOpen.bind(this);
    this.handleSignUpModalClose = this.handleSignUpModalClose.bind(this);
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
    this.handleLoginModalClose = this.handleLoginModalClose.bind(this);
    this.handleTOSModalOpen = this.handleTOSModalOpen.bind(this);
    this.handleTOSModalClose = this.handleTOSModalClose.bind(this);
    this.renderLogInModal = this.renderLogInModal.bind(this);
    this.renderTOSModal = this.renderTOSModal.bind(this);
    this.renderViewISP = this.renderViewISP.bind(this);

    this.state = {
      isSignUpModalOpen: false,
      isLoginModalOpen: false,
      isTOSModalOpen: false
    };
  }

  componentDidMount() {
    const flag = isAuthenticated();
    if (flag) {
      this.props.fetchUserProfiles();
    }
  }

  handleSignUpModalOpen() {
    this.setState({isSignUpModalOpen: true});
  }

  handleSignUpModalClose() {
    this.setState({isSignUpModalOpen: false});
  }

  handleLoginModalOpen() {
    this.setState({isLoginModalOpen: true});
  }

  handleLoginModalClose() {
    this.setState({isLoginModalOpen: false});
  }

  handleTOSModalOpen() {
    this.setState({isTOSModalOpen: true, isSignUpModalOpen: false});
  }

  handleTOSModalClose() {
    this.setState({isTOSModalOpen: false, isSignUpModalOpen: true});
  }

  renderSignUpModal() {
    const {isSignUpModalOpen} = this.state;
    return (
      <SignUpModal
        isModalOpen={isSignUpModalOpen}
        onClose={this.handleSignUpModalClose}
        onTOSOpen={this.handleTOSModalOpen}
        onSigin={this.handleLoginModalOpen}
      />
    );
  }

  renderLogInModal() {
    const {isLoginModalOpen} = this.state;
    if (isLoginModalOpen) {
      return (
        <LoginModal
          isModalOpen={isLoginModalOpen}
          onClose={this.handleLoginModalClose}
          onSignUp={this.handleSignUpModalOpen}
        />
      );
    }
  }

  renderTOSModal() {
    const {isTOSModalOpen} = this.state;
    return (
      <TermsAndConditionModal
        isModalOpen={isTOSModalOpen}
        onClose={this.handleTOSModalClose}
      />
    );
  }

  renderViewISP() {
    return (
      <ViewSSPP
        onLogIn={this.handleLoginModalOpen}
      />
    );
  }

  render() {
    return (
      <div className="app">
        <Header
          onSignUp={this.handleSignUpModalOpen}
          onLogIn={this.handleLoginModalOpen}
        />
        <Switch>
          <Route path="/ssp/:nickname/:sportID?" name="ViewSSPP" component={this.renderViewISP}/>
          <Route path={SSP_SEARCH_PAGE_URL} name="SearchSSP" component={SearchSSP}/>
          <Route path={VERIFY_OTP} name="SearchSSP" component={verifyOTPPrevalidation(VerifyOTP)}/>
          <Redirect from="/" to="/search/"/>
        </Switch>
        {
          this.renderSignUpModal()
        }
        {
          this.renderLogInModal()
        }
        {
          this.renderTOSModal()
        }
      </div>
    );
  }
}

Main.propTypes = {
  fetchUserProfiles: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfiles: () => dispatch(fetchUserProfiles())
  };
};

export default connect(() => {}, mapDispatchToProps)(Main);
