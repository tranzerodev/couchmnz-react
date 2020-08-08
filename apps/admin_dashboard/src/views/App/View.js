import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, NavLink, Card, CardHeader, CardBody, Form, FormGroup, Label} from 'reactstrap';
import ScrollIntoView from 'react-scroll-into-view';
import changeCase from 'change-case';
import config from '../../config';
import p from '../../locale/enUs.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

/* eslint react/prop-types: 0 */
/* eslint react/no-deprecated: 0 */

class View extends Component {
  constructor(props) {
    super(props);
    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.state = {
      sportId: '',
      profile: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({sportId: nextProps.sportId, profile: nextProps.profile});
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({sportId: this.props.sportId, profile: this.props.profile});
  }
  handleScrollTo() {
    window.scrollTo(0, 0);
  }
  render() {
    /* eslint complexity: 0  */
    const {sportId, profile} = this.state;
    const sports = profile ? profile.sports : [];
    const accountDetails = profile ? profile.accountDetails : null;
    let sport;
    console.log('sportId view ', sportId);
    if (sports && sports.length) {
      for (let i = 0; i < sports.length; i++) {
        if (sports[i].id === sportId) {
          sport = sports[i];
        }
      }
    }
    return (

      <div className="animated fadeIn isp-profile">
        <div>
          {/* eslint react/jsx-no-bind: 0 */}
          {/* eslint react/forbid-component-props: 0 */}
          {/*    <Nav tabs>
            <NavItem>
              <ScrollIntoView selector={'#profile' + sportId}>
                <NavLink>
                  {p.Athlete.profile.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#primaryAreaOfInterest' + sportId}>
                <NavLink>
                  {p.Athlete.primaryAreaOfInterest.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
            <NavItem>
              <ScrollIntoView selector={'#accountDetails' + sportId}>
                <NavLink>
                  {p.Athlete.accountDetails.title}
                </NavLink>
              </ScrollIntoView>
            </NavItem>
          </Nav><br/> */}
          <Card id={'profile' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Athlete.profile.title}</b>
            </CardHeader>
            {profile ?
              <CardBody>
                <Form action="" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.country}</b> <span className="required">{p.Athlete.requiredLabel}</span></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{profile.country ? profile.country : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.name} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{profile.firstName === null && profile.lastName === null ? '-' : changeCase.titleCase(profile.firstName) + ' ' + changeCase.titleCase(profile.lastName) }</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.gender} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{profile.gender ? p.Athlete.profile.genders[profile.gender] : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.dob} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{profile.dob ? profile.dob : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.height}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{profile.height && profile.height.value ? profile.height.value.toFixed(2) : '-'} {p.Athlete.profile.heightUnit[profile.height && profile.height.unit ? profile.height.unit : null]}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.weight}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{profile.weight && profile.weight.value ? profile.weight.value : '-'} {p.Athlete.profile.weightUnit[profile.weight && profile.weight.unit ? profile.weight.unit : null]}</Label>
                    </Col>
                  </FormGroup>
                  {profile.grade ?
                    <FormGroup row>
                      <Col md="4">
                        <Label><b>{p.Athlete.profile.grade}</b></Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Label>{profile.grade}</Label>
                      </Col>
                    </FormGroup> : null}
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.profile.profilePhoto}</b></Label>
                    </Col>
                    {profile.profileImage ?
                      <Col xs="12" md="8">
                        <img src={profile.profileImage} className="profile-photo"/>
                      </Col> :
                      <Col xs="12" md="8">
                        <Label>-</Label>
                      </Col>}
                  </FormGroup>
                </Form>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody> }
          </Card>
          <Card id={'primaryAreaOfInterest' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Athlete.primaryAreaOfInterest.title}</b>
            </CardHeader>
            {sport ?
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.sport} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{sport.name}</Label>
                    </Col>
                  </FormGroup>
                  {sport.specializations && sport.specializations.length ?
                    <FormGroup row>
                      <Col md="4">
                        <Label><b>{p.Athlete.primaryAreaOfInterest.speciality}</b></Label>
                      </Col>
                      <Col xs="12" md="8">
                        {sport.specializations.map((speciality, key) => {
                          return speciality.isSelected === 'Y' ?
                            <p key={key++}><i className="fa fa-check-square-o"/> {speciality.description}</p> :
                            <p key={key++}><i className="fa fa-square-o"/> {speciality.description}</p>;
                        })}
                      </Col>
                    </FormGroup> : null}
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.yearOfExp}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{sport.yearOfExperience ? sport.yearOfExperience : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.level} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{sport.skillLevel ? sport.skillLevel : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.notes}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{sport.notes ? sport.notes : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <hr/>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.trainingIn} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      {sport.preferences.sspSubTypes.map((sspSubType, key) => {
                        return sspSubType.isSelected === 'Y' ?
                          <p key={key++}><i className="fa fa-check-square-o"/> {sspSubType.description}</p> :
                          <p key={key++}><i className="fa fa-square-o"/> {sspSubType.description}</p>;
                      })}
                    </Col>
                  </FormGroup>
                  <hr/>
                  {sport.preferences.otherTypes.length > 0 ?
                    <div>
                      <FormGroup row>
                        <Col md="4">
                          <Label><b>{p.Athlete.primaryAreaOfInterest.otherServices}</b></Label>
                        </Col>
                        <Col xs="12" md="8">
                          {sport.preferences.otherTypes.map((otherType, key) => {
                            return otherType.isSelected === 'Y' ?
                              <p key={key++}><i className="fa fa-check-square-o"/> {otherType.description}</p> :
                              <p key={key++}><i className="fa fa-square-o"/> {otherType.description}</p>;
                          })}
                        </Col>
                      </FormGroup>
                      <hr/>
                    </div> : null}
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.gender} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      { config.GERDER.map((gender, key) => (
                        sport.preferences.trainerGenders.includes(gender) ?
                          <p key={key++}><i className="fa fa-check-square-o"/> {p.Athlete.profile.genders[gender]}</p> :
                          <p key={key++}><i className="fa fa-square-o"/> {p.Athlete.profile.genders[gender]}</p>
                      ))}
                    </Col>
                  </FormGroup>
                  <hr/>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.travelDistance}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{sport.preferences.travelPref.distance ? sport.preferences.travelPref.distance : '-'} {p.Athlete.primaryAreaOfInterest.distanceUnits[sport.preferences.travelPref && sport.preferences.travelPref.unit ? sport.preferences.travelPref.unit : null]}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.primaryAreaOfInterest.fromAddress}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{sport.preferences.travelPref.travelFrom.address ? sport.preferences.travelPref.travelFrom.address : '-'}</Label>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody> }
          </Card>
          <Card id={'accountDetails' + sportId}>
            <CardHeader onClick={this.handleScrollTo}>
              <b>{p.Athlete.accountDetails.title}</b>
            </CardHeader>
            {accountDetails ?
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.accountDetails.name} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{accountDetails.firstName === null && accountDetails.lastName ? '-' : accountDetails.firstName + ' ' + accountDetails.lastName}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.accountDetails.address} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{accountDetails.address ? accountDetails.address : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.accountDetails.timezone} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{accountDetails.timezone ? accountDetails.timezone : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.accountDetails.mobile} <span className="required">{p.Athlete.requiredLabel}</span></b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{accountDetails.mobile ? accountDetails.mobile : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label><b>{p.Athlete.accountDetails.landLine}</b></Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Label>{accountDetails.landLine ? accountDetails.landLine : '-'}</Label>
                    </Col>
                  </FormGroup>
                  <br/>
                  <FormGroup row>
                    <Col >
                      {accountDetails.canSendReminder === 'Y' ?
                        <div>
                          <Label> <i className="fa fa-check-square-o"/> {p.Athlete.accountDetails.canSendReminder}</Label>
                        </div> :
                        <div className="acc-dis">
                          <Label> <i className="fa fa-square-o"/> {p.Athlete.accountDetails.canSendReminder}</Label>
                        </div>
                      }

                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col >
                      {accountDetails.canReceiveMarketingCall === 'Y' ?
                        <div>
                          <Label> <i className="fa fa-check-square-o"/> {p.Athlete.accountDetails.canReceiveMarketingCall}</Label>
                        </div> :
                        <div className="acc-dis">
                          <Label> <i className="fa fa-square-o"/> {p.Athlete.accountDetails.canReceiveMarketingCall}</Label>
                        </div>
                      }

                    </Col>
                  </FormGroup>
                </Form>
              </CardBody> :
              <CardBody>
                <div className="alert alert-secondary fade show" role="alert">{p.DefaultMessages.notFilled}</div>
              </CardBody> }
          </Card>
        </div>
      </div>
    );
  }
}

export default View;
