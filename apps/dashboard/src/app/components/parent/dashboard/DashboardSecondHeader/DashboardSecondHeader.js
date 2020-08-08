import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import ChangeProfileDropDown from '../../../common/ChangeProfileDropDown';
import {FULFILLED} from '../../../../constants/ActionTypes';

const getSportName = (data, id) => data[id].name;
class DashboardSecondHeader extends PureComponent {
  render() {
    const {p, sportsMapping, account} = this.props;
    let fullName = '';
    let address = '';
    if (account.data) {
      const {firstName, lastName} = account.data;
      if (firstName) {
        fullName = firstName;
      }
      if (lastName) {
        fullName += ' ' + lastName;
      }
      if (account.data) {
        const {city, country, state} = account.data;
        if (city && city.name) {
          address = city.name + ', ';
        }
        if (state && state.name) {
          address += state.name + ', ';
        }
        address += (country && country.name ? country.name : '');
      }
    }

    const sportsNames = (Object.keys(sportsMapping.data).map(i => getSportName(sportsMapping.data, i))).join(', ');
    return (
      <div className="booking-wrapper-outer">
        <div className="booking-wrapper">
          <div className="coachlistSecheader">
            <div className="uk-grid coach-profile-header">
              <div className="uk-width-large-7-10 uk-width-medium-7-10 uk-width-small-1-1">
                <div className="coach-info">
                  <h2><span>{p.t('DashboardSecondHeader.welcome')}</span> {fullName}</h2>
                  <div className="coach-speciality">
                    <label>{p.t('DashboardSecondHeader.choose_role')}:</label>
                    <ChangeProfileDropDown/>
                    <label>{p.t('DashboardSecondHeader.sports')}</label> <strong>{sportsNames}</strong>
                  </div>
                  {account.status === FULFILLED &&
                    (
                      <div className="coach-info-bar">
                        <div className="top-padding-15">
                          <div className="coach-place address-info">
                            <svg className="cl-icon-location-marker" xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633">
                              <path data-name="Path 67" className="cl-icon-location-marker-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
                            </svg>
                            {address}
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardSecondHeader.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  account: PropTypes.object.isRequired,
  sportsMapping: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {profile, parent} = state;
  const {sportsMapping, account} = parent;
  return {
    profile,
    account,
    sportsMapping
  };
};

export default translate(connect(mapStateToProps)(DashboardSecondHeader));
