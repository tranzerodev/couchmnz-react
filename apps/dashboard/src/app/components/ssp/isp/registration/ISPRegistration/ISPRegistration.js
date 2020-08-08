import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';

import BuildProfile from '../BuildProfile';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import {updateSport, sspBuildProfileSubmit} from '../../../../../actions';
import {WELCOME} from '../../../../../constants/pathConstants';

class ISPRegistration extends Component {
  render() {
    return (
      <div>
        <TopContent step={1}/>
        <BackButton back={WELCOME} {...this.props}/>
        <BuildProfile {...this.props}/>
      </div>
    );
  }
  static get propTypes() {
    return {};
  }
}

ISPRegistration.defaultProps = {};

const mapStateToProps = state => {
  const {sports, sspValidation
  } = state;
  return {
    sports,
    sspValidation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSport: profile => dispatch(updateSport(profile)),
    sspBuildProfileSubmit: data => dispatch(sspBuildProfileSubmit(data))
  };
};

const Registration = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration);
export default translate(Registration);
