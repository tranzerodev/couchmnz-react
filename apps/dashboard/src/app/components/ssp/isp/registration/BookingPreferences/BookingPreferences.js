import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class BookingPreferences extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="subcription">
            <div className="tandc">
              <input id="booking1" type="radio" checked={this.props.bookingPreferences === 'A'} onChange={this.props.onBookingfPreferenceChange} onClick={this.handleBookingPreference} value={'A'}/>
              <label htmlFor="booking1">{this.props.p.t('BookingPreferences.bookingPreferences.A.name')}</label>
            </div>
            <div className="tableDiv">
              <div className="lCol"/>
              <div className="rCol">
                <p className="mb30">{this.props.p.t('BookingPreferences.bookingPreferences.A.description')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-1">
          <div className="subcription">
            <div className="tandc">
              <input id="booking2" type="radio" checked={this.props.bookingPreferences === 'N'} onChange={this.props.onBookingfPreferenceChange} onClick={this.handleBookingPreference} value={'N'}/>
              <label htmlFor="booking2">{this.props.p.t('BookingPreferences.bookingPreferences.N.name')}</label>
            </div>
            <div className="tableDiv">
              <div className="lCol"/>
              <div className="rCol">
                <p className="mb30">{this.props.p.t('BookingPreferences.bookingPreferences.N.description')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="uk-width-xlarge-2-2 uk-width-large-2-2 uk-width-medium-2-2  uk-width-small-1-1 field-holder">
          <span className="error-text">{this.props.p.t('BookingPreferences.validation_messages.bookingPreference')}</span>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      bookingPreferences: PropTypes.string.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onBookingfPreferenceChange: PropTypes.func.isRequired
    };
  }
}

export default translate(BookingPreferences);
