
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
  updateCancellationPolicy
} from '../../../../../actions';
class ISPRegistration10Class extends Component {
  constructor() {
    super();
    this.handleLearnMore = this.handleLearnMore.bind(this);
    this.state = {
      visible: 'none',
      visibleSpeciality: 'none',
      modal: ''
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleLearnMore(e) {
    this.props.handleLearnMore(e.currentTarget.getAttribute('value'));
  }
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1">
          <div className="subcription">
            <div className="tandc">
              <input id="policy1" type="radio" name="policy" onChange={this.props.onCancellationPolicyChange} checked={this.props.cancellationPolicy === 'L'} value={'L'}/>
              <label htmlFor="policy1">{this.props.p.t('BookingPreferences.cancellationPolicies.L.name')}</label>
            </div>
            <div className="tableDiv">
              <div className="lCol"/>
              <div className="rCol">
                <p><span>{this.props.p.t('BookingPreferences.cancellationPolicies.L.description')}</span></p>
                <p>{this.props.p.t('BookingPreferences.cancellationPolicies.L.terms')}</p>
                <a value={'L'} onClick={this.handleLearnMore} data-uk-modal>{this.props.p.t('BookingPreferences.learnMore')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1">
          <div className="subcription">
            <div className="tandc">
              <input id="policy2" type="radio" name="policy" onChange={this.props.onCancellationPolicyChange} checked={this.props.cancellationPolicy === 'C'} value={'C'}/>
              <label htmlFor="policy2">{this.props.p.t('BookingPreferences.cancellationPolicies.C.name')}</label>
            </div>
            <div className="tableDiv">
              <div className="lCol"/>
              <div className="rCol">
                <p className="mb10"><span>{this.props.p.t('BookingPreferences.cancellationPolicies.C.description')}</span></p>
                <p className="mb10">{this.props.p.t('BookingPreferences.cancellationPolicies.C.terms')}</p>
                <a value={'C'} onClick={this.handleLearnMore} data-uk-modal>{this.props.p.t('BookingPreferences.learnMore')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-3  uk-width-small-1-1">
          <div className="subcription">
            <div className="tandc">
              <input id="policy3" type="radio" name="policy" checked={this.props.cancellationPolicy === 'N'} value={'N'} onChange={this.props.onCancellationPolicyChange}/>
              <label htmlFor="policy3">{this.props.p.t('BookingPreferences.cancellationPolicies.N.name')}</label>
            </div>
            <div className="tableDiv">
              <div className="lCol"/>
              <div className="rCol">
                <p className="mb10"><span>{this.props.p.t('BookingPreferences.cancellationPolicies.N.description')}</span></p>
                <p className="mb10">{this.props.p.t('BookingPreferences.cancellationPolicies.N.terms')}</p>
                <a value={'N'} onClick={this.handleLearnMore} data-uk-modal>{this.props.p.t('BookingPreferences.learnMore')}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-2-2 uk-width-large-2-2 uk-width-medium-2-2  uk-width-small-1-1 field-holder">
          <span className="error-text">{this.props.p.t('BookingPreferences.validation_messages.cancellationPolicy')}</span>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      cancellationPolicy: PropTypes.string.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onCancellationPolicyChange: PropTypes.func.isRequired,
      handleLearnMore: PropTypes.func.isRequired
    };
  }
}

export default translate(ISPRegistration10Class);
