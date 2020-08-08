import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
class TravelPreferencesClass extends Component {
  constructor() {
    super();
    this.renderDashboardUI = this.renderDashboardUI.bind(this);
  }

  renderDashboardUI() {
    const {willingToTravel, isValid} = this.props;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <label>{this.props.p.t('TravelPreferences.travel')}</label>
          <p>{this.props.p.t('TravelPreferences.willingToTravel')}</p>
        </div>
        <div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-2-10  uk-width-small-1-1 ">
          <div className={(isValid) ? 'field-holder' : 'field-holder error'}>
            <select className="uk-form-controls uk-from-control-xsmall field-required" onChange={this.props.handleChangeTravelPreference} value={willingToTravel}>
              <option value="">{this.props.p.t('TravelPreferences.select')}</option>
              <option value="Y">{this.props.p.t('TravelPreferences.yes')}</option>
              <option value="N">{this.props.p.t('TravelPreferences.no')}</option>
            </select>
            <span className="error-text">{this.props.p.t('TravelPreferences.validation_messages.willingToTravel')}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {dashboard} = this.props;
    const {willingToTravel} = this.props;
    if (dashboard) {
      return (this.renderDashboardUI());
    }
    return (
      <div>
        <div className="travel">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
              <h1 className="uk-padding-remove">{this.props.p.t('TravelPreferences.travel')}</h1>
              <p className="mb30">{this.props.p.t('TravelPreferences.willingToTravel')}</p>
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1 ">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-4   uk-width-small-1-1 ">
                  <div className="field-holder">
                    <select className="uk-form-controls field-required" onChange={this.props.handleChangeTravelPreference} value={willingToTravel}>
                      <option value="">{this.props.p.t('TravelPreferences.select')}</option>
                      <option value="Y">{this.props.p.t('TravelPreferences.yes')}</option>
                      <option value="N">{this.props.p.t('TravelPreferences.no')}</option>
                    </select>
                    <span className="error-text">{this.props.p.t('TravelPreferences.validation_messages.willingToTravel')}</span>
                  </div>
                </div>
              </div>
              <div/>
            </div>
          </div>

          <div className="borderClass pb30 mb30"/>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      dashboard: PropTypes.bool,
      handleChangeTravelPreference: PropTypes.func.isRequired,
      willingToTravel: PropTypes.string.isRequired,
      isValid: PropTypes.bool
    };
  }
}

TravelPreferencesClass.defaultProps = {
  dashboard: false,
  isValid: false
};

export default translate(TravelPreferencesClass);
