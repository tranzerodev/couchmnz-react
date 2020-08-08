import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  sspPaypalDetailsSubmit
} from '../../../../../actions';
import appConstants from '../../../../../constants/appConstants';
class ISPRegistration14Class extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-4-10 uk-width-large-4-10 uk-width-medium-1-2  uk-width-small-1-1">
          <h1 className="uk-padding-remove">{this.props.p.t('PaypalSettings.title')}</h1>
          <p>{this.props.p.t('PaypalSettings.header')}</p>
          <a className="gen_link" href={appConstants.paypalLearnMoreLink} target="_blank">{this.props.p.t('PaypalSettings.learn')}</a>
        </div>
        {this.props.paypalVerification.displaySuccess &&
        <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="thankyou">
            <div className="tableDiv">
              <div className="lCol">
                <svg className="cl-icon-check-circle" xmlns="http://www.w3.org/2000/svg" viewBox="7329 2611 57 57">
                  <g transform="translate(7329 2611)">
                    <circle className="cl-icon-check-circle-1" cx="27.5" cy="27.5" r="27.5" transform="translate(1 1)"/>
                    <path className="cl-icon-check-circle-2" d="M14.193,23.567,19.7,30.118,32.869,14.193" transform="translate(5.902 5.902)"/>
                  </g>
                </svg>
              </div>
              <div className="rCol">
                <h1>{this.props.p.t('PaypalSettings.thank_you')}</h1>
                <p>{this.props.p.t('PaypalSettings.your_email')} {' ' + this.props.paypalDetails.email + ' ' } {this.props.p.t('PaypalSettings.verification_message')}</p>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired
    };
  }
}

const mapStateToProps = state => {
  const {paypalDetails, sspValidation, profile, paypalVerification} = state;
  return {
    paypalDetails,
    sspValidation,
    profile,
    paypalVerification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sspPaypalDetailsSubmit: data => dispatch(sspPaypalDetailsSubmit(data))
  };
};

const Registration14 = connect(mapStateToProps, mapDispatchToProps)(ISPRegistration14Class);
export default translate(Registration14);
