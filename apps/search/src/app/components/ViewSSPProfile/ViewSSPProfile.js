import React, {Component} from 'react';
import Modal from './Modal';
import translate from 'redux-polyglot/translate';
// For Page routing
import {connect} from 'react-redux';
import {matchPath} from 'react-router';
import {withRouter, NavLink} from 'react-router-dom';
// Import axios from 'axios';
import PropTypes from 'prop-types';
// Loading spinner
import {PulseLoader} from 'react-spinners';
// To change the Page Title
import {Helmet} from 'react-helmet';
import MetaTags from '../../utils/headMetaTagHelper'

// Components hand-written by Shashank Sondhi
import ProfileTopR1 from './profileTop1';
import BriefProfile from './briefProfile';
import RenderMap from './mapGen';
import RenderReviews from './renderReviews';
import CAQuestions from './commonQ';
import FindASession from './sessFind';
import RenderSims from './renderSimilar';
import LocationBreadCrumbs from './locateBC';
import BookSidebar from './contactSidebar';
import NonULDropDown from './nonULDropDown';
import ContactModal from './sessContactModalR1';
import config from '../../config';
// Data Sourcing for redux-store
import {fetchSSPProfile, fetchSSPSessions, fetchSSPProfileAuth, fetchProfile} from '../../actions';
import {PENDING, FULFILLED, REJECTED} from '../../constants/ActionTypes';
import Header from '../Header/Header';

import ShoppingCartSideNav from './ShoppingCartSideNav';

import ProfilePreview from './ProfilePreview';
import appConstants from '../../constants/appConstants';
let sspSessionQueryString = '';
/* Notes:
The state data has been retained despite pulling from the API for data structure and type purposes for Offline Debugging.
All states are pulled via APIs through the redux store.

 */

/* eslint react/no-deprecated:0 */

class ViewSSPP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      navactive: '',
      schedules: [],
      isSection: {
        ProfilePop: true,
        LocationPop: true,
        SessionsPop: true,
        ReviewsPop: false,
        CAQPop: false
      },
      showTrainLoc: true,
      showSideBar: false,
      data: {},
      sessionFilteredList: [],
      sessionBookList: {},
      submitted: false,
      showSidePanel: false
    };
    this.handleNavbar = this.handleNavbar.bind(this);
    this.handleSportDropDown = this.handleSportDropDown.bind(this);
    this.updateNav = this.updateNav.bind(this);
    this.handleNavActive = this.handleNavActive.bind(this);
    this.handlePushToCart = this.handlePushToCart.bind(this);
    this.handleSideBar = this.handleSideBar.bind(this);
    this.handleAccord = this.handleAccord.bind(this);
    this.sendFilters = this.sendFilters.bind(this);
    this.handleContactSSP = this.handleContactSSP.bind(this);
    this.onMailText = this.onMailText.bind(this);
    this.renderSidePanel = this.renderSidePanel.bind(this);
    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    const {match, router} = this.props;
    if (match) {
      const {query} = router ? router : {query: null};
      const param = query ? query.p : null;
      if (query && param && param === appConstants.profilePreviewParameter) {
        this.props.fetchSSPProfileAuth(match.params.nickname, match.params.sportID);
      } else {
        this.props.fetchSSPProfile(match.params.nickname, match.params.sportID);
      }
      if (match.params.sportID) {
        this.props.fetchSSPSessions(match.params.nickname, match.params.sportID, sspSessionQueryString);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionStatus !== FULFILLED && nextProps.sessionStatus !== PENDING && nextProps.sessionStatus !== REJECTED) {
      const {match} = nextProps;
      if (match.params.sportID) {
        this.props.fetchSSPSessions(match.params.nickname, nextProps.data.presentSportID, sspSessionQueryString);
      }
    }
    if (this.props.status === PENDING && nextProps.status === FULFILLED) {
      this.props.fetchProfile(nextProps.data.sspID);
    }
  }
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      fetchSSPProfile: PropTypes.func.isRequired,
      fetchSSPProfileAuth: PropTypes.func.isRequired,
      fetchSSPSessions: PropTypes.func.isRequired,
      router: PropTypes.object.isRequired,
      status: PropTypes.string,
      sessionStatus: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onLogIn: PropTypes.func.isRequired,
      userInfo: PropTypes.object.isRequired,
      cartItemsCount: PropTypes.number.is
    };
  }

  handleNavActive(e) {
    e.target.AddCssClass('active');
  }
  handleAccord(event) {
    if (event.target.value === 2) {
      const newState = !this.state.showTrainLoc;
      this.setState({showTrainLoc: newState});
    }
  }
  handleNavbar(e) {
    const linksList = [];
    let keyVar = 0;
    if (e.ProfilePop) {
      linksList.push(<li key={keyVar++}><a href="#overview" activeClassName="active" data-uk-smooth-scroll="{offset: 70}">{this.props.p.t('SSPProfile.navbar.overview')}</a></li>);
    }
    if (e.LocationPop) {
      linksList.push(<li key={keyVar++}><a href="#training-locations" activeClassName="active" data-uk-smooth-scroll="{offset: 70}" onClick={this.handleAccord} value={keyVar}>{this.props.p.t('SSPProfile.navbar.trainingLocations')}</a></li>);
    }
    if (e.SessionsPop) {
      linksList.push(<li key={keyVar++}><a href="#find-a-session" activeClassName="active" data-uk-smooth-scroll="{offset: 70}" >{this.props.p.t('SSPProfile.navbar.session', {sessionName: this.props.data.sessionTerm ? this.props.data.sessionTerm.singular : ''})}</a></li>);
    }
    if (e.ReviewsPop) {
      linksList.push(<li key={keyVar++}><a href="#reviews" activeClassName="active" data-uk-smooth-scroll="{offset: 70}">{this.props.p.t('SSPProfile.navbar.reviews')}</a></li>);
    }
    if (e.CAQPop) {
      linksList.push(<li key={keyVar++}><a href="#commonly-asked-questions" activeClassName="active" data-uk-smooth-scroll="{offset: 70}">{this.props.p.t('SSPProfile.navbar.questions')}</a></li>);
    }
    return (linksList);
  }

  handleSportDropDown() {
    const sportList = this.props.data.sports;
    const dropdownArray = [];
    const location = window.location.href;
    let keyArr = 0;
    for (let count = 0; count <= sportList.length - 1; count++) {
      // If (sportList[count].name === this.state.presentSport) {
      //   dropdownArray.push(<li key={keyArr++}><a>{sportList[count].name}</a></li>);
      // } else {
      const targetPath = '/#/ssp/' + this.props.data.nickname + '/' + sportList[count].sportID;
      /* Window.location.hostname + '/#/' + this.props.data.nickname + '/' + sportList[count].sportsID */
      dropdownArray.push(<li key={keyArr++}><a href={targetPath}>{sportList[count].name}</a></li>);
      // }
    }
    return (dropdownArray);
  }
  handlePushToCart(array) {
    console.log('Received @ Cart:' + array);
    const newState = array;
    // Const newState = [];
    // for (let count = 0; count < array.length; count++) {
    //   newState.push([...array]);
    // }
    this.setState({sessionBookList: newState});
    console.log(newState);
    this.handleSideBar();
  }
  updateNav(sectionID) {
    // Event.preventDefault();

    this.setState({navactive: sectionID});
  }
  handleSideBar() {
    const newState = !this.state.showSideBar;
    if (newState) {
      this.setState({showSideBar: true});
    } else {
      this.setState({showSideBar: false});
    }
  }
  sendFilters(filterArray) {
    // Query String Creation
    // let queryString = window.location.href + '?';
    let queryString = '?'; /* Config.baseURL + '/' + this.props.data.nickname + '/' + this.props.data.presentSportID + '?'; */
    queryString += (
      'location_id=' + filterArray.activeLocationID.join(',') +
        '&service_id=' + filterArray.activeServiceID.join(',') +
        '&facility_id=' + filterArray.activeFacilityID.join(',') +
        '&speciality_id=' + filterArray.activeSpecialityID.join(',') +
        '&skill_id=' + filterArray.activeSkillID.join(',') +
        '&gender=' + filterArray.activeGenderID.join(',') +
        '&age_group_id=' + filterArray.activeAgeGID.join(',') +
        '&sess_date=' + filterArray.activeDate.getFullYear() + '-' + filterArray.activeDate.getMonth() + '-' + filterArray.activeDate.getDate());
    console.log('Query Path : ' + queryString);
    sspSessionQueryString = queryString;
    this.props.fetchSSPSessions(this.props.data.nickname, this.props.data.presentSportID, queryString);
  }
  onMailText() {
    const mailString = '';
    mailString.add(this.props.p.t('SSPProfile.mailText.salutation') + this.props.data.firstName + ' ' + this.props.data.lastName + this.props.p.t('SSPProfile.mailText.message') + this.state.sendFilters.activeLocation.join(', '));
    return (mailString);
  }
  handleContactSSP() {

  }

  toggleSidePanel() {
    this.setState({showSidePanel: !this.state.showSidePanel});
  }

  renderSidePanel() {
    const {userInfo, cartItemsCount} = this.props;
    const {showSidePanel} = this.state;
    if (userInfo.status === FULFILLED && cartItemsCount > 0) {
      return (
        <ShoppingCartSideNav show={showSidePanel} toggleSidePanel={this.toggleSidePanel}/>
      );
    }
  }

  render() {
    const {trainLocationBC, status} = this.props.data;
    const {sessionStatus} = this.props;
    const preDDHeadDisplay = [];
    let keyVal = 0;
    preDDHeadDisplay.push(<div key={keyVal++} className="choose-type-text">{this.props.p.t('SSPProfile.sportOrService')}</div>);
    const isProfileLoaded = status !== FULFILLED;
    if (isProfileLoaded) {
      if (this.props.status !== '_FULFILLED' && this.props.status !== '_REJECTED') {
        return (
          <div style={{width: '100%'}}>
            <Helmet>
              <title>{`Loading SSP Profile Page ...`}</title>
            </Helmet>
            <center>
              <div className="cl-loader-center">
                <div className="cl-loader">
                  <PulseLoader loading size={10}/>
                </div>
              </div>
            </center>
          </div>
        );
      } else if (this.props.status === '_REJECTED' || this.props.sessionStatus === '_REJECTED') {
        return (
          <div style={{width: '100%'}}>
            <Helmet>
              <title>{`Error in Loading Profile `}</title>
            </Helmet>
            <center>
              <br/><br/>
              <h3>{this.props.p.t('SSPProfile.profileLoadError.heading')} {this.props.p.t('SSPProfile.profileLoadError.title')}<br/>{this.props.p.t('SSPProfile.profileLoadError.message')}<br/>
                {this.props.p.t('SSPProfile.profileLoadError.subMessage')}<br/>{this.props.p.t('SSPProfile.profileLoadError.team')}
              </h3>
            </center>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="cl-page-sspdetail-scroll-area" >
          {this.props.data && this.props.data.firstName &&
            <MetaTags 
              title={`${this.props.data.firstName} ${this.props.data.lastName}\'s Coachlist ${this.props.data.presentSport} ${this.props.data.ssptype} Profile Page`}
              desc={this.props.data.brief}
              path={this.props.location.pathname}
            />
          }
          <ProfilePreview/>
          <ProfileTopR1
            isVerified={this.props.data.isVerified}
            firstName={this.props.data.firstName}
            lastName={this.props.data.lastName}
            displayName={this.props.data.displayName}
            displayPicture={this.props.data.displayPicture}
            numberOfReviews={this.props.data.numberOfReviews}
            rating={this.props.data.rating}
            sports={this.props.data.sports}
            presentSport={this.props.data.presentSport}
            specialization={this.props.data.specialization}
            ssptype={this.props.data.ssptype}
            contact={this.props.data.contact}
            isFav={this.props.data.isFav}
          />
          <section className="body-content">
            <div className="coach-profile-body">
              <div data-uk-sticky="{top:50}" className="uk-width-1-1 coach-profile-header-bg bottom-dark-border uk-width-1-1 coach-profile-header-bg">
                <div className="booking-wrapper">
                  <div className="uk-grid">
                    <NonULDropDown
                      containerClassName="uk-width-large-2-10 uk-push-8-10 uk-width-m-large-full profile-selector uk-position-relative uk-text-right pad-T30 sm-text-center"
                      preHeadDisplay={preDDHeadDisplay}
                      headClassName="selected-option"
                      headSpanText={this.props.data.presentSport}
                      dropdownClassName="uk-dropdown type-of-sport uk-dropdown-bottom"
                      headAlteredState="uk-open"
                      dropDownAlteredState="true"
                      sports={this.props.data.sports}
                      nickname={this.props.data.nickname}
                      router={this.props.router}
                    />
                    <div className="uk-width-large-8-10  profile-anchor uk-pull-2-10 uk-width-m-large-full">
                      <ul className="uk-hidden-small">
                        {this.handleNavbar(this.state.isSection)}
                      </ul>
                    </div>
                  </div>
                  <div className="uk-button-dropdown theme-dropdown sm-profile-anchore uk-visible-small" data-uk-dropdown='{mode:"click",pos:"bottom-left"}'>
                    <button className="uk-button btn-transparent-t2">{this.props.p.t('SSPProfile.select')}
                      <i className="uk-icon-caret-down"/>
                    </button>
                    <div className="uk-dropdown uk-width-1-1 width uk-width-100">
                      <ul className="uk-nav uk-nav-dropdown uk-text-left">
                        {this.handleNavbar(this.state.isSection)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="coach-tab-content-wrapper coach-tab-content-wrapper-1-2">
              <div className="booking-wrapper">
                <div className="uk-width-1-1">
                  <div id="coach-tab-content">
                    <div>
                      <BriefProfile
                        ssPics={this.props.data.ssPics}
                        certBadges={this.props.data.certBadges}
                        brief={this.props.data.brief}
                        displaySport={this.props.data.presentSport}
                        experience={this.props.data.experience}
                        awards={this.props.data.awards}
                        sportAwards={this.props.data.sportAwards}
                        certifications={this.props.data.certifications}
                        sportCertifs={this.props.data.sportCertifs}
                        edDegrees={this.props.data.degrees}
                        degrees={this.props.data.degrees}
                        aboutMe={this.props.data.aboutMe}
                        coachStyle={this.props.data.coachStyle}
                        priceCurrency={this.props.data.priceCurrency}
                        priceMin={this.props.data.priceMin}
                        pricePerSession={this.props.data.pricePerSession}
                        trainingOffer={this.props.data.trainingOffer}
                        trainTypes={this.props.data.trainTypes}
                        trainSpecial={this.props.data.trainSpeciality}
                        otherServe={this.props.data.otherService}
                        trainingTerm={this.props.data.sessionTerm}
                        videoSrc={this.props.data.profVideo && this.props.data.profVideo.src ? this.props.data.profVideo.src : ''}
                        videoType={this.props.data.profVideo && this.props.data.profVideo.type ? this.props.data.profVideo.type : ''}
                        affiliations={this.props.data.affiliations}
                        tools={this.props.data.tools}
                        accomplishments={this.props.data.accomplishments}
                      />
                      <div className="uk-width-1-1 custom-accordian">
                        <RenderMap
                          address={this.props.data.address}
                          showTrainLoc={this.state.showTrainLoc}
                        />
                        <FindASession
                          sessions={this.props.data.sessions}
                          booked={this.state.sessionBookList}
                          sessionFilteredList={this.props.sessionFilteredList}
                          instUSP={this.props.data.instUSP}
                          sessionCalledAs={this.props.data.sessionTerm}
                          onClick={this.handleSideBar}
                          nickname={this.props.data.nickname}
                          sportID={this.props.data.presentSportID}
                          onSelect={sessionBookList => this.handlePushToCart(sessionBookList)}
                          onFilterUpdate={sendFilters => this.sendFilters(sendFilters)}
                          onLogIn={this.props.onLogIn}
                          handleToggleSidePanel={this.toggleSidePanel}
                        />
                        {/* <RenderReviews
                        presentSport={this.props.data.presentSport}
                        numberOfReviews={this.props.data.numberOfReviews}
                        overallRating={this.props.data.rating}
                      />
                      <CAQuestions
                        displayName={this.props.data.displayName}
                        specQs={this.props.data.specQs}
                        commonQs={this.props.data.commonQs}
                      /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {trainLocationBC && this.props.data.simProfile && this.props.data.simProfile.length > 0 &&
            <RenderSims
              displaySport={this.props.data.presentSport}
              displaySportID={this.props.data.presentSportID}
              city={trainLocationBC.city}
              similars={this.props.data.simProfile}
            />}
            <div className="related-links">
              { trainLocationBC &&
              <LocationBreadCrumbs
                displaySport={this.props.data.presentSport}
                displaySportID={this.props.data.presentSportID}
                continent={trainLocationBC.continent}
                continentID={this.props.data.trainLocationBC.continentID}
                country={this.props.data.trainLocationBC.country}
                countryID={this.props.data.trainLocationBC.countryID}
                state={this.props.data.trainLocationBC.state}
                stateID={this.props.data.trainLocationBC.stateID}
                distCounty={this.props.data.trainLocationBC.distCounty}
                distCountyID={this.props.data.trainLocationBC.distCountyID}
                city={this.props.data.trainLocationBC.city}
                cityID={this.props.data.trainLocationBC.cityID}
                nearbySSPCountry={this.props.data.nearbySSPCountry}
                nearbySSPCity={this.props.data.nearbySSPCity}
              />
              }
            </div>
            <Modal isModalOpen={this.state.showSideBar}>
              <ContactModal
                onHide={this.handleSideBar}
                showSideBar={this.state.showSideBar}
                nickname={this.props.data.nickname}
                sportID={this.props.data.presentSportID}
                booked={this.state.sessionBookList}
                total={this.props.data}
                defaultBody={this.onMailText}
              />
            </Modal>
          </section>
        </div>
        {
          this.renderSidePanel()
        }
      </div>
    );
  }
}

ViewSSPP.defaultProps = {
  data: {},
  status: '_PENDING',
  sessionFilteredList: [],
  sessionStatus: '_PENDING'
};

const mapStateToProps = state => {
  const {auth, shoppingCart} = state;
  const {userInfo} = auth;
  const {cartData} = shoppingCart;
  return {
    data: state.viewssp.sspData.data,
    status: state.viewssp.sspData.status,
    router: state.router,
    sessionFilteredList: state.viewssp.sspSessions.sessionFilteredList,
    sessionStatus: state.viewssp.sspSessions.status,
    cartItemsCount: cartData.data.cartItems.length,
    userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSSPProfile: (nickname, sportID) => dispatch(fetchSSPProfile(nickname, sportID)),
    fetchSSPProfileAuth: (nickname, sportID) => dispatch(fetchSSPProfileAuth(nickname, sportID)),
    fetchSSPSessions: (nickname, sportID, sspSessionQueryString) => dispatch(fetchSSPSessions(nickname, sportID, sspSessionQueryString)),
    fetchProfile: profileID => dispatch(fetchProfile(profileID))
  };
};

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(ViewSSPP)));
