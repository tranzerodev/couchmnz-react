/* global localStorage */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import ChangeProfileDropDown from '../../../../common/ChangeProfileDropDown';
import {notNull} from '../../../../../validators/common/util';

class DashboardSecondHeader extends Component {
  constructor(props) {
    super(props)
  
    this.getAmbassadorType = this.getAmbassadorType.bind(this)
    
    this.state = {
      ambassadorType: null
    }
  }
  
  getAmbassadorType() {
    const ambassadorType = localStorage.getItem('ambassadorType')
    
    this.setState({
      ambassadorType: ambassadorType
    })
  }
  
  componentDidMount() {
      this.getAmbassadorType()
  }
  
  render() {
    const {p, sports, profile, contact} = this.props;
    let fullName = '';
    let address;
    if (profile.data.profile) {
      const {firstName, lastName} = profile.data.profile;
      if (firstName) {
        fullName = firstName;
      }
      if (lastName) {
        fullName += ' ' + lastName;
      }
      if (profile.data.contact) {
        const {cityName, countryName, stateName} = profile.data.contact;
        if (cityName) {
          address = cityName + ', ';
        }
        if (stateName) {
          address += stateName + ', ';
        }
        if (countryName) {
          address += countryName;
        }
      }
    }
    const name = (contact) && notNull(contact.businessName) ? (contact.businessName) : (fullName);
    const sportsNames = (sports.map(sport => sport.name)).join(', ');
    return (
      <div className="booking-wrapper-outer">
        <div className="booking-wrapper">
          <div className="coachlistSecheader">
            <div className="uk-grid coach-profile-header">
              <div className="uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                <div className="coach-info">
                  <h2><span>{p.t('DashboardSecondHeader.welcome')}</span> {name}</h2>
                  <div className="coach-speciality">
                    <label>{p.t('DashboardSecondHeader.choose_role')}:</label>
                    <ChangeProfileDropDown/>
                    {sportsNames &&
                    <label>{p.t('DashboardSecondHeader.sports')}</label>
                    }
                    {sportsNames &&
                    <strong>{sportsNames}</strong>
                    }
                  </div>
                  <div className="coach-info-bar">
                    <div className="top-padding-15">
                      <div className="coach-place address-info">
                        {address &&
                        <svg className="cl-icon-location-marker" xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633">
                          <path data-name="Path 67" className="cl-icon-location-marker-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
                        </svg>
                        }
                        {
                          address ? address : ''
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-width-large-3-10 uk-width-medium-3-10 uk-width-small-1-1">
              {this.state.ambassadorType == 'marquee' ?
                <img src="https://assets.coachlist.com/svg/marquee.svg" alt="Marquee" style={{width: '185px', height: '40px'}} /> 
                : this.state.ambassadorType == 'luminary' ?
                  <img src="https://assets.coachlist.com/svg/luminary.svg" alt="Luminary" style={{width: '185px', height: '40px'}} /> 
                : '' }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardSecondHeader.defaultProps = {
  sports: []
};

DashboardSecondHeader.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  contact: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  sports: PropTypes.array
};

const mapStateToProps = state => {
  const {sports, profile, contact} = state;
  return {
    profile,
    sports,
    contact
  };
};

export default translate(connect(mapStateToProps)(DashboardSecondHeader));
