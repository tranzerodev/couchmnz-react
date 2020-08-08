import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import PropTypes from 'prop-types';
class AthleteProfileDetailsCard extends Component {
  render() {
    const {altheteProfile, p} = this.props;
    const height = (altheteProfile.height) ? altheteProfile.height.value : 0;
    const weight = (altheteProfile.weight) ? altheteProfile.weight.value : 0;
    return (
      <div className="uk-dropdown cl-ssp-manage-booking-dropdown cl-mb-athlete-bio-dp">
        <div className="cl-mb-athlete-bio">
          <div className="cl-mb-athlete-bio-top">
            <a target="_self" className="uk-dropdown-close cl-close-dp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                <g fill="none" fillRule="evenodd" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M10.525 1.626l-9.05 9.051M1.475 1.626l9.05 9.051"/>
                </g>
              </svg>
            </a>
            <div className="cl-mb-athlete-bio-image">
              <img src={altheteProfile.profileImage} alt={altheteProfile.name} title={altheteProfile.name} width="100%"/>
            </div>
            <span className="cl-mb-athlete-bio-name">{altheteProfile.name}</span>
          </div>
          <div className="cl-mb-athlete-bio-bottom">
            <ul>
              <li>
                <div className="cl-mb-athlete-bio-table">
                  <div className="cl-mb-athlete-bio-table-cell">{p.t('ManageBooking.gender')}</div>
                  <div className="cl-mb-athlete-bio-table-cell">{p.t('ManageBooking.genders.' + altheteProfile.gender)}</div>
                </div>
              </li>
              <li>
                <div className="cl-mb-athlete-bio-table">
                  <div className="cl-mb-athlete-bio-table-cell">{p.t('ManageBooking.ageGroup')}</div>
                  <div className="cl-mb-athlete-bio-table-cell">{altheteProfile.ageGroup.description}</div>
                </div>
              </li>
              <li>
                <div className="cl-mb-athlete-bio-table">
                  <div className="cl-mb-athlete-bio-table-cell">{p.t('ManageBooking.height')}</div>
                  <div className="cl-mb-athlete-bio-table-cell">{height}</div>
                </div>
              </li>
              <li>
                <div className="cl-mb-athlete-bio-table">
                  <div className="cl-mb-athlete-bio-table-cell">{p.t('ManageBooking.weight')}</div>
                  <div className="cl-mb-athlete-bio-table-cell">{weight}</div>
                </div>
              </li>
              <li>
                <div className="cl-mb-athlete-bio-table">
                  <div className="cl-mb-athlete-bio-table-cell">{p.t('ManageBooking.experience')}</div>
                  <div className="cl-mb-athlete-bio-table-cell">{altheteProfile.yearOfExperience} , {altheteProfile.skillLevel.name}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

AthleteProfileDetailsCard.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  altheteProfile: PropTypes.object.isRequired
};

export default translate(AthleteProfileDetailsCard);
