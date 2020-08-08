import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
      displaySport: PropTypes.string.isRequired,
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
        <div className="verified">
          <svg className="cl-icon-verified" xmlns="http://www.w3.org/2000/svg" viewBox="-7044 -1120 20 20.001">
            <g transform="translate(-7044 -1120)">
              <g data-name="Group 260" transform="translate(0 0)">
                <path className="cl-icon-verified-1" d="M10,0,7.775,1.7,5,1.338,3.924,3.925,1.338,5,1.7,7.775,0,10l1.7,2.226L1.338,15l2.586,1.074L5,18.661l2.777-.36L10,20l2.225-1.7,2.775.36,1.074-2.586L18.662,15l-.36-2.777L20,10,18.3,7.775,18.662,5,16.076,3.925,15,1.338l-2.777.36Z" transform="translate(0 0)"/>
                <path className="cl-icon-verified-2" d="M6.286,10.714l2.857,2.857,5.714-5.714" transform="translate(-0.571 -0.714)"/>
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
      <div className="uk-width-xlarge-1-3 uk-width-large-1-2 uk-width-medium-1-2 uk-width-small-1-2 uk-width-xsmall-1">
        <div className="uk-panel uk-panel-box">
          <div className="uk-panel-teaser">
            <div className="cl-icon-favourite" onClick={this.handleFavorite}>
              <i className={(this.props.isFav && this.state.isFav) ? 'fa fa-heart' : 'fa fa-heart-o'}/>
              {/*                 <svg className="cl-icon-fav-on active" xmlns="http://www.w3.org/2000/svg" viewBox="-15980.995 -11639 21.991 20.385">
                  <g data-name="Symbol 124 – 2" transform="translate(-16216 -11884)">
                    <g data-name="Path 176" className="cl-icon-fav-1" transform="translate(231 235)">
                      <path className="cl-icon-fav-2" d="M 15.0001859664917 28.96483993530273 L 14.29048538208008 28.24987983703613 L 11.07503509521484 25.0106201171875 L 6.6211256980896 20.52379989624023 C 4.463435649871826 18.35006904602051 4.464205741882324 14.81246948242188 6.622815608978271 12.63787937164307 C 7.671055793762207 11.58191967010498 9.065285682678223 11.00037956237793 10.54870510101318 11.00037956237793 C 12.03135585784912 11.00037956237793 13.42454528808594 11.58136940002441 14.47162532806396 12.6363000869751 L 15.00019836425781 13.16880416870117 L 15.52879524230957 12.63628005981445 C 16.57623481750488 11.58109951019287 17.96944618225098 11 19.45178604125977 11 C 20.93496513366699 11 22.32915496826172 11.58168983459473 23.37752532958984 12.63789939880371 C 25.5361156463623 14.81242942810059 25.53695487976074 18.35002899169922 23.37936592102051 20.52376937866211 L 15.70989513397217 28.2498893737793 L 15.0001859664917 28.96483993530273 Z"></path>
                      <path className="cl-icon-fav-3" d="M 15.00019550323486 27.54538917541504 L 22.66962623596191 19.81929969787598 C 24.44385528564453 18.03179931640625 24.44365501403809 15.13134956359863 22.66778564453125 13.34237003326416 C 21.77953910827637 12.44747638702393 20.61549949645996 12.00000190734863 19.45178604125977 12.00000190734863 C 18.28864097595215 12.00000190734863 17.12582397460938 12.44690322875977 16.23851585388184 13.34076023101807 L 15.00019550323486 14.58827972412109 L 13.76187515258789 13.34076023101807 C 12.87509059906006 12.44731712341309 11.71185493469238 12.00038433074951 10.54870414733887 12.00038433074951 C 9.384700775146484 12.00038433074951 8.220780372619629 12.44757175445557 7.332525730133057 13.34237003326416 C 5.556285381317139 15.13175964355469 5.555915355682373 18.03118896484375 7.330825328826904 19.81929969787598 L 11.78474521636963 24.30612945556641 L 15.00019550323486 27.54538917541504 M 15.0001859664917 30.38430023193359 L 13.58077526092529 28.95438003540039 L 10.36532592773438 25.71512031555176 L 5.911415576934814 21.22830009460449 C 3.368125677108765 18.66609001159668 3.368895530700684 14.49642944335938 5.913105487823486 11.93338012695313 C 7.150515556335449 10.68686008453369 8.796795845031738 10.00037956237793 10.54870510101318 10.00037956237793 C 12.21564197540283 10.00037956237793 13.78662776947021 10.62194061279297 15.00020217895508 11.7560396194458 C 16.2140941619873 10.62173366546631 17.78515434265137 10 19.45178604125977 10 C 21.20347595214844 10 22.84971618652344 10.6866397857666 24.08725547790527 11.93342971801758 C 26.63141632080078 14.49637985229492 26.63227462768555 18.66604042053223 24.08909606933594 21.22822952270508 L 16.41960525512695 28.95438957214355 L 15.0001859664917 30.38430023193359 Z"></path>
                    </g>
                  </g>
                </svg> */}
            </div>
            <div className="cl-sr-box-slider" data-uk-slideshow="">
              <ul className="uk-slideshow" style={{height: '160px'}}>
                <li data-slideshow-slide="img" aria-hidden="false" className="uk-active" style={{height: '160px'}}><div className="uk-cover-background uk-position-cover" style={{backgroundImage: '../../resources/assets/images/placeholder_800x400_1.jpg'}}/>
                  <img src={this.props.profileImage} alt="" title="" draggable="false" style={{borderRadius: '6px', border: '0px'}}/>
                </li>
                <li data-slideshow-slide="img" aria-hidden="true" style={{height: '160px'}}><div className="uk-cover-background uk-position-cover" style={{backgroundImage: '../../resources/assets/images/placeholder_800x400_2.jpg'}}/>
                  <img src="../../resources/assets/images/placeholder_800x400_2.jpg" alt="" style={{width: '100%', height: 'auto', opacity: '0'}}/>
                </li>
                <li data-slideshow-slide="img" aria-hidden="true" style={{height: '160px'}}><div className="uk-cover-background uk-position-cover" style={{backgroundImage: '../../resources/assets/images/placeholder_800x400_3.jpg'}}/>
                  <img src="../../resources/assets/images/placeholder_800x400_3.jpg" alt="" style={{width: '100%', height: 'auto', opacity: '0'}}/>
                </li>
              </ul>
              <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slideshow-item="previous" style={{color: 'rgba(255,255,255,0.4)'}}/>
              <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slideshow-item="next" style={{color: 'rgba(255,255,255,0.4)'}}/>
              <ul className="uk-dotnav uk-dotnav-contrast uk-position-bottom uk-flex-center">
                <li data-uk-slideshow-item="0" className="uk-active"><a href="#">Item 1</a></li>
                <li data-uk-slideshow-item="1" className=""><a href="#">Item 2</a></li>
                <li data-uk-slideshow-item="2" className=""><a href="#">Item 3</a></li>
              </ul>
            </div>
          </div>
          <div className="cl-filterbox-content">
            <div className="cl-filterBy">
              <div className="location">{this.props.displaySport + ((this.props.otherSportsCoachedIn > 1) ? (' & ' + (this.props.otherSportsCoachedIn - 1) + ' more') : '') }&nbsp;
                <i key={keyVal++} className="fa fa-circle" aria-hidden="true"/>&nbsp;
                {this.props.coachesAt.Place + ', ' + this.props.coachesAt.State + ', ' + this.props.coachesAt.Country}
              </div>
            </div>
            <div className="cl-resultStatus">
              <div className="nameBy">{this.props.displayName}</div>
              {this.handleVerif(this.props.isVerified)}
              <div className="iconBy">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-16025.5 -11631.5 22.334 17">
                  <g data-name="SearchResultSSPType/TrainingFacility" transform="translate(-16406 -12089)">
                    <g data-name="Group 3407" transform="translate(381 458)">
                      <g transform="translate(10.667 5.333)">
                        <g transform="translate(2.667 2.667)">
                          <path className="cl-icon-facility-1" d="M.5,1.5H5.833" transform="translate(-0.5 -1.5)"/>
                          <path data-name="Line-4" className="cl-icon-facility-1" d="M.5,3.5H5.833" transform="translate(-0.5 -0.833)"/>
                          <path data-name="Line-4" className="cl-icon-facility-1" d="M.5,5.5H5.833" transform="translate(-0.5 -0.167)"/>
                        </g>
                        <path className="cl-icon-facility-2" d="M.5.5V11.167H11.167v-10A.667.667,0,0,0,10.5.5Z" transform="translate(-0.5 -0.5)"/>
                      </g>
                      <g>
                        <path className="cl-icon-facility-2" d="M1,16.5H11.667V1.167A.667.667,0,0,0,11,.5H1.667A.667.667,0,0,0,1,1.167Z" transform="translate(-1 -0.5)"/>
                        <g transform="translate(2.667 2.667)">
                          <path data-name="Line-4" className="cl-icon-facility-1" d="M.5,1.5H5.833" transform="translate(-0.5 -1.5)"/>
                          <path data-name="Line-4" className="cl-icon-facility-1" d="M.5,3.5H5.833" transform="translate(-0.5 -0.833)"/>
                          <path data-name="Line-4" className="cl-icon-facility-1" d="M.5,5.5H5.833" transform="translate(-0.5 -0.167)"/>
                        </g>
                        <path className="cl-icon-facility-3" d="M3,13.833V8.5H8.333v5.333" transform="translate(-0.333 2.167)"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="sec-rating reviews-info">
              {this.handleRatings(this.props.rating)}
              <a className="review">121</a>
            </div>
            <p>{this.props.expertTag} {'Starts from ' + this.props.rateCurr + this.props.rateMin + ' per ' + this.props.rateUnit}</p>
          </div>
        </div>
      </div>

    );
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
