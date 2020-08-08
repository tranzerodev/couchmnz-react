import React, {Component} from 'react';
import PropTypes from 'prop-types';

/* ----------------------------------------------------------------------
The class for the Brief Profile at the top of the Profile display
---------------------------------------------------------------------- */

class ProfileTopR1 extends Component {
  /* ----------------------------------------------------------------
  Constructor that sets the state as per SSP Data needed for Display
  ------------------------------------------------------------------ */
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      isFav: true,
      isVerified: true,
      firstName: 'Neil',
      lastName: 'Mcguire',
      displayName: 'Neil Mcguire',
      displayPicture: 'images/profile-pic.jpg',
      dateOfBirth: '19-01-1974',
      url: 'https://coachlist.com/profile/neil-mcguire',
      numberOfReviews: 19,
      rating: 4.8,
      sports: ['Golf', 'Soccer', 'Baseball'],
      presentSport: 'Golf',
      specialization: ['Defender', 'Catcher'],
      ssptype: 'Individual Trainer',
      contact: {
        street: '48 Haskins Ranch Circle',
        cityID: '58e4b35ddb252928067b3857',
        cityName: 'Danville',
        stateName: 'CA'
      }
    };

    this.renderRating = this.renderRating.bind(this);
    this.ProfilePics = this.ProfilePics.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  static get propTypes() {
    return {
      isVerified: PropTypes.bool,
      displayName: PropTypes.string,
      displayPicture: PropTypes.string,
      numberOfReviews: PropTypes.number,
      rating: PropTypes.number,
      sports: PropTypes.array,
      ssptype: PropTypes.string,
      contact: PropTypes.object,
      isFav: PropTypes.bool
    };
  }
  componentDidMount() {
    this.setState({isFav: this.props.isFav});
  }
  ProfilePics(e) {
    return (e);
  }

  sportsList(array) {
    let retString = '';
    for (let count = 0; count < array.length; count++) {
      if (count < array.length - 1) {
        retString = retString.concat(array[count].name + ', ');
      } else {
        retString = retString.concat(array[count].name);
      }
    }
    return (retString);
  }
  handleFavorite(event) {
    event.preventDefault();
    const newState = !this.state.isFav;
    this.setState({isFav: newState});
  }
  /* ------------------------------------------------------------------
  Drawing the rating in the form of stars using styles defined earlier.
  A Functional Component is used for easier replication to other components.
  --------------------------------------------------------------------- */
  renderRating(stars) {
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

  /* ------------------------------
     Display of Verification Status
     ------------------------------ */
  verifstatus(TrueOrFalse) {
    const VerifStat = [];
    if (TrueOrFalse) {
      VerifStat.push(
        <div key={TrueOrFalse} className="coach-status status-info">
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
        Verified
        </div>
      );
    } else {
      VerifStat.push();
    }
    return (VerifStat);
  }

  render() {
    return (
      <section className="coach-profile-header-bg" >
        <div className="booking-wrapper">
          <div className="uk-grid coach-profile-header">
            <div className="uk-width-large-1-10 uk-width-medium-2-10 change-width-sm profile-pic">
              <img src={this.props.displayPicture} alt="" title=""/>
            </div>
            <div className="uk-width-large-5-10 uk-width-medium-8-10 change-width-sm pad-sm-L15">
              <div className="coach-info sub-heading">
                <h2>{this.props.displayName}</h2>
                <div className="coach-speciality">
                  <span className="pad-R30">{this.sportsList(this.props.sports)}</span>
                  <div className="coach-place address-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7265 -1121 16 20.633" className="location-marker">
                      <path id="Path_67" data-name="Path 67" className="cls-1" d="M4967.559,1353.175c-.309-.32-7.559-7.9-7.559-12.174a8,8,0,1,1,16,0c0,4.278-7.253,11.854-7.561,12.174l-.441.457ZM4961.223,1341c0,2.937,4.54,8.444,6.775,10.859,2.237-2.415,6.777-7.925,6.777-10.859a6.776,6.776,0,1,0-13.553,0Zm2.726-.177a4.051,4.051,0,1,1,4.051,4.051A4.055,4.055,0,0,1,4963.948,1340.824Zm1.223,0A2.828,2.828,0,1,0,4968,1338,2.832,2.832,0,0,0,4965.171,1340.824Z" transform="translate(-12225 -2454)"/>
                    </svg>
                    {this.props.contact.cityName},{' '}{this.props.contact.stateName}
                  </div>
                </div>
                <div className="coach-info-bar">
                  <div className="uk-flex top-padding-15">
                    {/* <div className="sec-rating reviews-info">
                        {this.renderRating(this.props.rating)}
                        <a href="#reviews" className="review">{this.props.numberOfReviews} Reviews</a>
                      </div> */}
                    {this.verifstatus(this.props.isVerified)}
                    <div className="coach-status it-trainer-info">
                      <svg id="it-trainer" xmlns="http://www.w3.org/2000/svg" viewBox="-10477.705 -22762.25 15.372 18.75">
                        <g id="SearchResultSSPType_Individual" data-name="SearchResultSSPType/Individual" transform="translate(-10481 -22762)">
                          <g id="Group_2121" data-name="Group 2121" transform="translate(3.833)">
                            <path id="Path-9-Copy" className="cls-1" d="M1.41,4.038A6.465,6.465,0,0,1,2.991,1.149,4.918,4.918,0,0,1,6.048,0,5.711,5.711,0,0,1,7.625,2.114c.352,1.095,2.56,1.574.524,2.348S1.4,4.482,1.4,4.482Z" transform="translate(0.007)"/>
                            <path id="Path-10-Copy" className="cls-1" d="M6.755,0C5.106,0,7.915,1.316,8.145,1.931S8.259,3.8,8.58,4s.834-.947,1.095-1.111a3.828,3.828,0,0,1,.793-.341A2.548,2.548,0,0,0,9.408.813,3.415,3.415,0,0,0,6.755,0Z" transform="translate(0.029 0)"/>
                            <path id="Path-11-Copy" className="cls-1" d="M9.08,4.293a6.788,6.788,0,0,1,1.055-.942,9.445,9.445,0,0,1,.98-.568l3.225.091a.512.512,0,0,1,.111.665c-.21.436-.239.743-.555.743Z" transform="translate(0.042 0.013)"/>
                            <path id="Path-12-Copy" className="cls-2" d="M1.517,4.584A6.9,6.9,0,0,0,1.2,7.171,15.573,15.573,0,0,0,1.921,9.56,10.337,10.337,0,0,1,2.1,10.77c.013.147,4.92,1.529,4.92,1.529s-.27-1.033-.025-1.355,1.941-.218,2.312-.423a2.468,2.468,0,0,0,1.07-1.163,10.364,10.364,0,0,0,.561-2.747,11.451,11.451,0,0,0,.007-2.205" transform="translate(0.005 0.021)"/>
                            <path id="Path-14-Copy" className="cls-2" d="M1.44,12.057A5.4,5.4,0,0,0,.5,13.547,13.175,13.175,0,0,0,0,15.923a9.87,9.87,0,0,0,4.65,1.952,6.782,6.782,0,0,0,5.028-1.238c.931-.66-.069-1.02-.64-1.872a9.279,9.279,0,0,0-1.649-1.784Z" transform="translate(0 0.056)"/>
                            <path id="Path-13-Copy" className="cls-1" d="M2.078,10.861l-.6,1.154s5.662,1.86,6.511,1.909-.967-1.592-.967-1.592Z" transform="translate(0.007 0.051)"/>
                          </g>
                        </g>
                      </svg>
                      {this.props.ssptype}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-width-large-4-10 uk-width-medium-8-10 uk-text-right sm-text-center change-width-sm">
              {/* <div className="favorite" onClick={this.handleFavorite}>
                  <i className={(this.props.isFav && this.state.isFav) ? 'fa fa-heart' : 'fa fa-heart-o'}/> {(this.props.isFav && this.state.isFav) ? 'Remove from Favorites' : 'Save as Favorite'}
                </div>
                <a className="write-review">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5548.5 -1207.5 23.893 13" className="write-review-svg">
                    <g id="Group-51" transform="translate(-5548.5 -1208.5)">
                      <g id="Group-50" transform="translate(0.5 1.5)">
                        <path id="Line-7" className="cls-4" d="M.5,1.5H12.44" transform="translate(-0.5 -1.5)"/>
                        <path id="Line-7-Copy" className="cls-4" d="M.5,4.5H8.46" transform="translate(-0.5 -0.52)"/>
                        <path id="Line-7-Copy-2" data-name="Line-7-Copy" className="cls-4" d="M.5,7.5H8.46" transform="translate(-0.5 0.46)"/>
                        <path id="Line-7-Copy-2-2" data-name="Line-7-Copy-2" className="cls-4" d="M.5,10.5H8.46" transform="translate(-0.5 1.44)"/>
                      </g>
                      <path id="Star" className="cls-5" d="M14.553,11.45l-3.9,2.05L11.4,9.158,8.245,6.084,12.6,5.45l1.95-3.95L16.5,5.45l4.359.633L17.708,9.158l.745,4.342Z" transform="translate(2.53 0)"/>
                    </g>
                  </svg>
              Write a review
                </a> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
ProfileTopR1.defaultProps = {
  isFav: false,
  isVerified: false,
  displayName: 'Coach Known Name',
  displayPicture: '',
  numberOfReviews: 0,
  rating: 0,
  ssptype: 'Individual Trainer',
  sports: 'No Sport entered',
  contact: {}
};
export default ProfileTopR1;
