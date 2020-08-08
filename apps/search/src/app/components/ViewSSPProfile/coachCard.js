import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class CoachCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleVerif = this.handleVerif.bind(this);
    this.handleRatings = this.handleRatings.bind(this);
  }
  static get propTypes() {
    return {
      displayName: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      displaySport: PropTypes.string.isRequired,
      displaySportID: PropTypes.string.isRequired,
      profileImage: PropTypes.any.isRequired,
      slidePics: PropTypes.any,
      rating: PropTypes.number,
      isVerified: PropTypes.bool,
      trainerType: PropTypes.string,
      rateCurr: PropTypes.string,
      rateMin: PropTypes.string,
      rateUnit: PropTypes.string,
      coachesAt: PropTypes.object.isRequired,
      expertTag: PropTypes.string,
      otherSportsCoachedIn: PropTypes.number
    };
  }
  /* ------------------------------
     Display of Verification Status
     ------------------------------ */
  handleVerif(TrueOrFalse) {
    const VerifStat = [];
    if (TrueOrFalse) {
      VerifStat.push(
        <div key={TrueOrFalse} className="coach-status">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7044 -1120 20 20.001">
            <g id="Verified-Bigger" transform="translate(-7044 -1120)">
              <g id="Group_260" data-name="Group 260" transform="translate(0 0)">
                <path
                  id="Page-1"
                  className="cls-1"
                  d="M10,0,7.775,1.7,5,1.338,3.924,3.925,1.338,5,1.7,7.775,0,10l1.7,2.226L1.338,15l2.586,1.074L5,18.661l2.777-.36L10,20l2.225-1.7,2.775.36,1.074-2.586L18.662,15l-.36-2.777L20,10,18.3,7.775,18.662,5,16.076,3.925,15,1.338l-2.777.36Z"
                  transform="translate(0 0)"
                />
                <path id="Path-2" className="cls-2" d="M6.286,10.714l2.857,2.857,5.714-5.714" transform="translate(-0.571 -0.714)"/>
              </g>
            </g>
          </svg>
        </div>);
    } else {
      VerifStat.push();
    }
    return (VerifStat);
  }

  /* ------------------------------------------------------------------
    Drawing the rating in the form of stars using styles defined earlier.
    A Functional Component is used for easier replication to other components.
    --------------------------------------------------------------------- */
  handleRatings(stars) {
    const starList = [];
    let keyvar = 0;
    for (let i = 0; i <= 4; i++) {
      if (i <= (((stars * 10) - ((stars * 10) % 10)) / 10) - 1) {
        starList.push(
          <label key={keyvar++}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
              <path id="Path_40" data-name="Path 40" className="cls-orange" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-6835.539 -1121)"/>
            </svg>
          </label>);
      } else
      if (i < stars) {
        starList.push(
          <label key={keyvar++}>
            <svg className="half-star" id="Group_2374" data-name="Group 2374" xmlns="http://www.w3.org/2000/svg" viewBox="-10825 -23071 20 20">
              <defs>
                <clipPath id="clip-path">
                  <rect id="Rectangle_2308" data-name="Rectangle 2308" className="cls-1" width="10" height="20" transform="translate(-10785 -23071)"/>
                </clipPath>
              </defs>
              <path id="Path_324" data-name="Path 324" className="cls-2" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-10825.538 -23071)"/>
              <g id="Mask_Group_17" data-name="Mask Group 17" className="cls-3" transform="translate(-40)">
                <path id="Path_325" data-name="Path 325" className="cls-4" d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z" transform="translate(-10785.539 -23071)"/>
              </g>
            </svg>
          </label>);
      } else {
        starList.push(
          <label key={keyvar++}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6835 -1121 20 20">
              <path
                id="Path_40"
                data-name="Path 40"
                className="cls-gray"
                d="M10.538,16.584,4.358,20l1.18-7.236-5-5.125,6.91-1.056L10.538,0l3.09,6.584,6.91,1.056-5,5.125L16.719,20Z"
                transform="translate(-6835.539 -1121)"
              />
            </svg>
          </label>);
      }
    }
    return (starList);
  }

  render() {
    let keyVal = 0;
    return (
      <li key={keyVal++}>
        <div key={keyVal++} className="similar-trainer-wrapper">
          <NavLink to={'/ssp/' + this.props.nickname + '/' + this.props.displaySportID}>
            <div key={keyVal++} className="trainer-image-holder">
              <img src={this.props.profileImage} alt="" title="" draggable="false" style={{borderRadius: '6px', border: '0px'}}/>
            </div>
            <div key={keyVal++} className="similar-trainer-details">
              <div key={keyVal++} className="tName">
                <span key={keyVal++}>
                  {this.props.displayName}
                </span>
                {this.handleVerif(this.props.isVerified)}
              </div>
              <div key={keyVal++} className="trainer-details">
                <span key={keyVal++} className="t-type">{this.props.trainerType}</span>
                <span key={keyVal++} className="t-place">
                  {this.props.displaySport + ((this.props.otherSportsCoachedIn > 1) ? (' & ' + (this.props.otherSportsCoachedIn - 1) + ' more') : '') }&nbsp;
                  <i key={keyVal++} className="fa fa-circle" aria-hidden="true"/>&nbsp;
                  {this.props.coachesAt.Place + ', ' + this.props.coachesAt.State + ', ' + this.props.coachesAt.Country}
                </span>
              </div>
              <div key={keyVal++} className="sec-rating">
                {this.handleRatings(this.props.rating)}
              </div>
              <div key={keyVal++} className="t-experience">
                {this.props.expertTag}
              </div>
              <div key={keyVal++} className="t-rate">
                {'Starts from ' + this.props.rateCurr + this.props.rateMin + ' per ' + this.props.rateUnit}
              </div>
            </div>
          </NavLink>
        </div>
      </li>);
  }
}

CoachCard.defaultProps = {
  slidePics: {},
  rating: 0,
  isVerified: false,
  trainerType: 'Individual Trainer',
  rateCurr: '$',
  rateMin: '0',
  rateUnit: 'Session',
  expertTag: null,
  otherSportsCoachedIn: 0
};
export default CoachCard;
