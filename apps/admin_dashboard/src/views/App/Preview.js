import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, NavLink, Card, CardHeader, CardBody, Form, FormGroup, Label} from 'reactstrap';
import ScrollIntoView from 'react-scroll-into-view';
import changeCase from 'change-case';
import Map from '../../components/Map/Map';
import config from '../../config';
import PricingCard from './PricingCard';
import p from '../../locale/enUs.json';
import reactHtmlParser from 'react-html-parser';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import moment from 'moment';

class Preview extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.formatTimeLabel = this.formatTimeLabel.bind(this);
    this.handleHexToDecimal = this.handleHexToDecimal.bind(this);
    this.handleHexToRGBa = this.handleHexToRGBa.bind(this);
    this.state = {
      map: {
        zoom: config.defaultZoom,
        center: config.defaultPosition,
        position: config.defaultPosition
      },
      activeTab: ''
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleScrollTo() {
    window.scrollTo(0, 0);
  }

  formatTimeLabel(hour, minute) {
    return (moment().set({h: hour, m: minute}).format('hh:mm A'));
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  handleHexToDecimal(hex) {
    const prefix = '0x';
    if (!isNaN(prefix + hex)) {
      return parseInt(hex, 16);
    }
  }
  handleHexToRGBa(hex) {
    if (hex && hex.length === 7) {
      const r = this.handleHexToDecimal(hex.slice(1, 3));
      const g = this.handleHexToDecimal(hex.slice(3, 5));
      const b = this.handleHexToDecimal(hex.slice(5, 7));
      const a = 0.2;
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    return 'rgba(' + 255 + ',' + 255 + ',' + 255 + ',' + 255 + ')';
  }
  render() {
    /* eslint complexity: 0  */
    const {sportId, profile} = this.props;
    const sports = profile ? profile.sports : [];
    let sport;
    if (sports && sports.length) {
      for (let i = 0; i < sports.length; i++) {
        if (sportId === sports[i].id) {
          sport = sports[i];
        }
      }
    }
    let prerequisites;
    let trainingLocations;
    let schedulerSettings;
    let accountDetails;
    let accountDetailsBusiness;
    let accountDetailspersonal;
    let images = [];
    let videos = [];
    if (profile) {
      schedulerSettings = profile && profile.schedulerSettings ? Object.keys(profile.schedulerSettings) : null;
      if (profile.accountDetails) {
        accountDetails = profile.accountDetails;
        accountDetailsBusiness = Object.keys(profile.accountDetails.business);
        accountDetailspersonal = Object.keys(profile.accountDetails.personal);
      }
    }
    if (sport) {
      prerequisites = Object.keys(sport.prerequisites);
      trainingLocations = sport.trainingLocations;
      if (sport.media) {
        images = sport.media.images;
        videos = sport.media.videos;
      }
    }
    return (
      <div className="animated fadeIn isp-profile">
        <div>
          {/* eslint react/jsx-no-bind: 0 */}
          {/* eslint react/forbid-component-props: 0 */}
          <Nav tabs>
            <NavItem>
              <ScrollIntoView selector={'#service' + sportId}>
                <NavLink>
                  {p.Service.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#trainingPreference' + sportId}>
                <NavLink>
                  {p.TrainingPreferences.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#pricing' + sportId}>
                <NavLink>
                  {p.Pricing.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#location' + sportId}>
                <NavLink>
                  {p.Location.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#session' + sportId}>
                <NavLink>
                  {p.Session.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#biography' + sportId}>
                <NavLink>
                  {p.Biography.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#listDetails' + sportId}>
                <NavLink>
                  {p.ListingDetails.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#photosAndVideos' + sportId}>
                <NavLink>
                  {p.PhotosAndVideos.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            {/*  <NavItem>
            <ScrollIntoView selector={'#faqs' + sportId}>
              <NavLink>
            FAQs
              </NavLink>
            </ScrollIntoView>
          </NavItem> */}
            <NavItem>
              <ScrollIntoView selector={'#bookingPreference' + sportId}>
                <NavLink>
                  {p.BookingPreferences.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#accountDetails' + sportId}>
                <NavLink>
                  {p.AccountDetails.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#payoutDetails' + sportId}>
                <NavLink>
                  {p.PayoutDetails.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#scheduler' + sportId}>
                <NavLink>
                  {p.Scheduler.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
          </Nav><br/>
          <Card id={'service' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Service.title}</b>
            </CardHeader>
            {sport ?
              <CardBody>
                <p><b>{changeCase.upperCase(p.Specialties.title)}</b></p>
                {sport.specializations.map((specilty, key) => {
                  return specilty.isSelected === 'Y' ?
                    <p key={key++}><i className="fa fa-check-square-o"/> {specilty.name}</p> :
                    <p key={key++}><i className="fa fa-square-o"/> {specilty.name}</p>;
                })}
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'trainingPreference' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.TrainingPreferences.title}</b>
            </CardHeader>
            {prerequisites ?
              <CardBody>
                <Row>
                  { prerequisites.map((prerequisite, key) => {
                    return (
                      <Col key={key++} md="3" sm="4" xs="12">
                        <p><b>{changeCase.upperCase(changeCase.titleCase(prerequisite))}</b> {prerequisite.toLocaleLowerCase() === 'otherservices' ? null : <b><span className="required">{p.requiredFieldLabel} </span></b>} </p>
                        {prerequisite.toLocaleLowerCase() === 'gender' ?
                          config.GERDER.map((gender, key) => (
                            sport.prerequisites[prerequisite].includes(gender) ?
                              <p key={key++}><i className="fa fa-check-square-o"/> {p.TrainingPreferences.genders[gender]}</p> :
                              <p key={key++}><i className="fa fa-square-o"/> {p.TrainingPreferences.genders[gender]}</p>
                          )) :
                          sport.prerequisites[prerequisite].map((obj, key) => {
                            return obj.isSelected === 'Y' ?
                              <p key={key++}><i className="fa fa-check-square-o"/> {obj.name ? obj.name : obj}</p> :
                              <p key={key++}><i className="fa fa-square-o"/> {obj.name ? obj.name : obj}</p>;
                          })}
                      </Col>);
                  })}
                </Row>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'pricing' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Pricing.title}</b>
            </CardHeader>
            {sport && sport.pricePerSession && sport.pricePerSession.subSSPTypes.length ?
              <CardBody>
                {sport.pricePerSession.subSSPTypes.map((subSSPType, key) => {
                  return (
                    <PricingCard key={key++} pricing={subSSPType}/>
                  );
                })}
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'location' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Location.title} <span className="required"> {p.requiredFieldLabel} </span></b>
            </CardHeader>
            {sport && trainingLocations.length ?
              <CardBody>
                <Row>
                  {trainingLocations.map((trainingLocation, key) => {
                    return (
                      <Col key={key++} md="3" sm="6" xs="12">
                        <div className="social-box locationCard">
                          <Map
                            isMarkerShown
                            zoom={this.state.map.zoom}
                            center={trainingLocation.location}
                            markers={[trainingLocation.location]}
                            position={[trainingLocation.location]}
                            googleMapURL={config.googleMapUrl.replace('{key}', config.googleApiKey)}
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={<div style={{height: `250px`}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                          />
                          <div>
                            <div style={{padding: 10}}>
                              <b>{changeCase.upperCase(trainingLocation.title)}</b>
                              <div>{p.Location.tag}: {trainingLocation.notes}</div>
                              <div>{trainingLocation.street ? trainingLocation.street + ', ' : null} {trainingLocation.cityName} </div>
                              <div>{trainingLocation.stateName ? trainingLocation.stateName + ', ' : null} {trainingLocation.countryName} </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'session' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Session.title} <span className="required"> {p.requiredFieldLabel} </span></b>
            </CardHeader>
            {sport && sport.sessions.length ?
              <CardBody>
                <Row>
                  {sport.sessions.map((session, key) => {
                    const {color} = session;
                    const colorAlpha = this.handleHexToRGBa(color);
                    return (
                      <Col key={key++} md="3" sm="6" xs="12">
                        {/* <div className="social-box session" style={{backgroundColor: session.color}}> */}
                        <div className="social-box session" style={{borderColor: color, borderTopColor: color, background: colorAlpha}}>
                          <div className="padding">
                            <div style={{color}}><b>{changeCase.upperCase(session.name)}</b></div><br/>
                            <div>{session.defaultSession === 'Y' ? p.Session.default : '' } {session.subSSPTypeName}</div>
                            <div>{session.ageGroupName}</div><br/>
                            <div>{session.skillLevelName}</div>
                            {session.minSize > 0 && <div>{p.Session.group} {session.minSize !== null && session.maxSize !== null ? '(' + session.minSize + '-' + session.maxSize + ') ' : '(' + session.minSize + ') ' } {p.Session.participants}</div>}
                            <div>{session.trainingLocation.title}</div><br/>
                            <div>{p.Session.defaultLength}: {session.defaultSessionLength} {p.Session.minutes}</div>
                            <div>{p.Session.cost}: {session.priceUnit ? session.priceUnit : p.Session.priceUnit}{session.overridePricing > 0 ? session.overridePricing : session.price}</div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'biography' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Biography.title}</b>
            </CardHeader>
            {sport ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label><b>{p.Biography.yearOfExperience} <span className="required"> {p.requiredFieldLabel} </span> </b></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="name">{sport.playingExperience.numberOfYears ? sport.playingExperience.numberOfYears + 'yrs Coaching' : ''}</Label><br/>
                      {sport.playingExperience.description}
                    </Col>
                  </FormGroup>
                </Form>

                <FormGroup row>
                  <Col md="3">
                    <Label><b>{p.Biography.certification}</b></Label>
                  </Col>
                  <Col xs="12" md="9">
                    {sport.certifications.map((cert, key) => {
                      const data = cert.split(',');
                      return <p key={key++}> {data[0] ? data[0] : null } {data[0] && data[1] ? ':' + data[1] : null } {data[1] && data[2] ? ', ' + data[2] : null } </p>;
                    })}

                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label><b>{p.Biography.degree}</b></Label>
                  </Col>
                  <Col xs="12" md="9">
                    {sport.degrees.map((deg, key) => {
                      const data = deg.split(',');
                      return <p key={key++}> {data[0] ? data[0] : null } {data[0] && data[1] ? ':' + data[1] : null } {data[1] && data[2] ? ', ' + data[2] : null } </p>;
                    })}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label><b>{p.Biography.award}</b></Label>
                  </Col>
                  <Col xs="12" md="9">
                    {sport.awards.map((award, key) => {
                      const data = award.split(',');
                      return <p key={key++}> {data[0] ? data[0] : null } {data[0] && data[1] ? ':' + data[1] : null } {data[1] && data[2] ? ', ' + data[2] : null } </p>;
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="name"><b>{p.Biography.accomplishment}</b></Label>
                  </Col>
                  <Col xs="12" md="9">
                    {sport.accomplishments.map((acc, key) => {
                      const data = acc.split(',');
                      return <p key={key++}> {data[0] ? data[0] : null } {data[0] && data[1] ? ':' + data[1] : null } {data[1] && data[2] ? ', ' + data[2] : null } </p>;
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label><b>{p.Biography.affiliation}</b></Label>
                  </Col>
                  <Col xs="12" md="9">
                    {sport.affiliations.map((aff, key) => {
                      return <p key={key++}> {aff}</p>;
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label><b>{p.Biography.tools}</b></Label>
                  </Col>
                  <Col xs="12" md="9">
                    {sport.tools.map((tool, key) => {
                      return <p key={key++}> {tool}</p>;
                    })}
                  </Col>
                </FormGroup>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'listDetails' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.ListingDetails.title}</b>
            </CardHeader>
            {sport ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label><b>{p.ListingDetails.heading} <span className="required"> {p.requiredFieldLabel} </span> </b></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="name">{sport.listingDetail.headline} </Label><br/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label><b>{p.ListingDetails.describeAndCurriculum}</b></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="name">{reactHtmlParser(sport.listingDetail.description)}</Label><br/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label><b>{p.ListingDetails.bioAndCredentials}</b></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label htmlFor="name">{reactHtmlParser(sport.listingDetail.aboutMe)}</Label><br/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>
          <Card id={'photosAndVideos' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.PhotosAndVideos.title}</b>
            </CardHeader>
            {sport && sport.media ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label><b>{p.PhotosAndVideos.photos} <span className="required"> {p.requiredFieldLabel} </span></b></Label>
                    </Col>
                    <Col md="3" sm="9">
                      <Row>
                        <Carousel showArrows>
                          {images.map((img, key) => {
                            return (
                              <div key={key++}>
                                <img src={img.image ? sport.media.imgBaseUrl + img.image : sport.media.imgBaseUrl + img}/>
                                <p className="legend">{img.caption_en ? img.caption_en : key === 1 ? p.PhotosAndVideos.profileImage : null}</p>
                              </div>
                            );
                          })}
                        </Carousel>

                        {/* {images.map((img, key) => {
                            return (
                              <Col key={key++} md="4" style={{textAlign: 'center'}}>
                                <div className="img-responsive">
                                  <img src={img.image ? img.image : img} style={{border: img.image ? null : '1px solid #f15e23'}}/>
                                  <div>
                                    <b>{img.caption_en ? img.caption_en : key === 1 ? p.PhotosAndVideos.profileImage : null} </b>
                                  </div>
                                </div>
                              </Col>
                            );
                          })} */}
                      </Row>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label><b>{p.PhotosAndVideos.videos}</b></Label>
                    </Col>
                    <Col md="9">
                      <Row>
                        {videos.map((video, key) => {
                          return (
                            <Col key={key++} md="4" style={{textAlign: 'center'}}>
                              <div className="video-responsive">
                                <video controls>
                                  <source src={video.video ? sport.media.vidBaseUrl + video.video : sport.media.vidBaseUrl + video} type="video/mp4"/>
                                      Your browser does not support the video tag.
                                </video>
                                <div>
                                  <b>{video.caption_en ? video.caption_en : null} </b>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notUploaded}</div>
              </CardBody>}
          </Card>
          {/*  <Card id={'faqs' + sportId}>
          <CardHeader>
FAQs
          </CardHeader>
          <CardBody>
     8. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
       et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
       aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
       dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
       officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card> */}
          <Card id={'bookingPreference' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.BookingPreferences.title}</b>
            </CardHeader >
            {profile && profile.bookingPreference ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  <Row>
                    <Col md="6" >
                      <FormGroup row>
                        <Col md="6">
                          <Label><b>{p.BookingPreferences.bookingAcceptance} <span className="required"> {p.requiredFieldLabel} </span> </b></Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Label htmlFor="name">{p.BookingPreferences[profile.bookingPreference].name} </Label>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6" >
                      <FormGroup row>
                        <Col md="6">
                          <Label><b>{p.BookingPreferences.bookingCutOff}</b></Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Label htmlFor="name"> {profile.bookingCutOffTime ? profile.bookingCutOffTime : p.BookingPreferences.defaultCutOff} {p.BookingPreferences.defaultCutOffUnit}</Label>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6" >
                      <FormGroup row>
                        <Col md="6">
                          <Label><b>{p.BookingPreferences.cancellationPolicies.title} <span className="required"> {p.requiredFieldLabel} </span></b></Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Label htmlFor="name">{p.BookingPreferences.cancellationPolicies[profile.cancellationPolicy].name}</Label><br/>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody>}
          </Card>

          <Card id={'accountDetails' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.AccountDetails.title}</b>
            </CardHeader>
            <CardBody>
              <b>{p.AccountDetails.businessInformation.title}</b> <hr/>
              <Row>
                {accountDetailsBusiness && accountDetailsBusiness.map((element, key) => {
                  return (
                    <Col key={key++} md="6" sm="12">
                      <Form action="" className="form-horizontal">
                        <FormGroup key={key++} row>
                          <Col md="6">
                            <Label><b>{changeCase.titleCase(element)}</b> {element.toLocaleLowerCase() === 'landlinenumber' || element.toLocaleLowerCase() === 'name' || element.toLocaleLowerCase() === 'website' ? null : <b><span className="required"> {p.requiredFieldLabel} </span></b> }</Label>
                          </Col>
                          <Col md="6">
                            <Label htmlFor="name"> {accountDetails.business[element]}</Label>
                          </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                  );
                })}
              </Row><br/>
              <b>{p.AccountDetails.personalInformation.title}</b><hr/>
              <Row>
                {accountDetailspersonal && accountDetailspersonal.map((element, key) => {
                  return (
                    <Col key={key++} md="6" sm="12" >
                      <Form action="" className="form-horizontal">
                        <FormGroup key={key++} row>
                          <Col md="6">
                            <Label><b>{changeCase.titleCase(element)} {element.toLocaleLowerCase() === 'othernumber' ? null : <span className="required"> {p.requiredFieldLabel} </span> }</b> </Label>
                          </Col>
                          <Col md="6">
                            <Label htmlFor="name"> {typeof (accountDetails.personal[element]) === 'object' ? accountDetails.personal[element].label : accountDetails.personal[element]}</Label>
                          </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
          <Card id={'payoutDetails' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.PayoutDetails.title}</b>
            </CardHeader>
            {profile ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  <Row>
                    <Col md="6" >
                      <FormGroup row>
                        <Col md="6">
                          <Label><b>{p.PayoutDetails.currency} <span className="required"> {p.requiredFieldLabel} </span> </b></Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Label htmlFor="name">{profile.currency} </Label>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="6" >
                      <FormGroup row>
                        <Col md="6">
                          <Label><b>{p.PayoutDetails.defaultMethod} <span className="required"> {p.requiredFieldLabel} </span> </b></Label>
                        </Col>
                        <Col xs="12" md="6">
                          <Label htmlFor="name"> {p.PayoutDetails.methods[profile.payoutOption]}</Label>
                        </Col>
                      </FormGroup>
                    </Col>
                    {profile.payoutOption === 'PP' ?
                      <Col md="6" >
                        <FormGroup row>
                          <Col md="3">
                            <Label><b>{p.PayoutDetails.methods[profile.payoutOption]}</b></Label><br/>
                            <Label>{profile.paypalDetails.email}</Label>
                          </Col>
                        </FormGroup>
                      </Col> : null}
                    {profile.bankDetails ?
                      <Col md="6" >
                        <FormGroup row>
                          <Col md="3">
                            <Label><b>{profile.bankDetails.bank}</b></Label><br/>
                            <Label>{profile.bankDetails.firstName} {profile.bankDetails.lastName} {profile.bankDetails.nickName ? '(' + profile.bankDetails.nickName + ')' : null}</Label>
                            <Label>{profile.bankDetails.holder} {profile.bankDetails.accountNumber} {profile.bankDetails.type} </Label>
                          </Col>
                        </FormGroup>
                      </Col> : null}
                  </Row>
                </Form>
              </CardBody> : null}
          </Card>
          <Card id={'scheduler' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Scheduler.title} <span className="required"> {p.requiredFieldLabel} </span> </b>
            </CardHeader>
            {schedulerSettings ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  {schedulerSettings.map((scheduler, key) => {
                    return (
                      <FormGroup key={key++} row>
                        <Col md="3">
                          <Label><b>{p.SchedulerSettings.days[scheduler]}</b></Label>
                        </Col>
                        <Col xs="12" md="9">
                          {profile.schedulerSettings[scheduler] ?
                            <Label htmlFor="name">
                              {profile.schedulerSettings[scheduler].startTime ?
                                this.formatTimeLabel(profile.schedulerSettings[scheduler].startTime.hour, profile.schedulerSettings[scheduler].startTime.minute) + ' - ' : null
                              }
                              {profile.schedulerSettings[scheduler].endTime ?
                                this.formatTimeLabel(profile.schedulerSettings[scheduler].endTime.hour, profile.schedulerSettings[scheduler].endTime.minute) : null
                              }
                            </Label> : null}
                        </Col>
                      </FormGroup>);
                  })}
                </Form>
              </CardBody> : null}
          </Card>
        </div>
      </div>
    );
  }
}

export default Preview;
