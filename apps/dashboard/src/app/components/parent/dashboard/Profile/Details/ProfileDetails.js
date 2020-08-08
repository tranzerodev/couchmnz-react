import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import DatePicker from 'react-datetime';

import {saveParentProfile, fetchCountries, fetchParentProfile, fetchParentAccount, postNewProfile, changeProfile} from '../../../../../actions';
import ProfilePicture from '../../../common/ProfilePicture';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import validateProfile from '../../../../../validators/parent/common/profile';
import NextLink from '../../../common/SaveLink';
import SideNav from '../common/SideNav';
import config from '../../../../../config';
import {REGISTRATION} from '../../../../../constants/pathConstants';

import {kilosToPounds, lengthToFeetInches} from '../../../../../utils/coverter';
import {isNumber, notNull, isNonEmptyArray} from '../../../../../validators/common/util';
import moment from 'moment';
const {conversion, defaultDateFormat} = appConstants;

const today = moment();
const validDateRange = function (current) {
  return current.isBefore(today);
};

class Profile extends Component {
  constructor(props) {
    super(props);
    const {profile} = props;
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleGrade = this.handleGrade.bind(this);
    this.handleHeight = this.handleHeight.bind(this);
    this.handleHeightInches = this.handleHeightInches.bind(this);
    this.handleWeight = this.handleWeight.bind(this);
    this.handleWeightUnit = this.handleWeightUnit.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.renderGender = this.renderGender.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.renderWeight = this.renderWeight.bind(this);

    this.state = {
      profile: profile.status === FULFILLED ? profile.data : {
        id: '',
        firstName: null,
        lastName: null,
        gender: null,
        dob: null,
        profileImage: null,
        country: {
          id: null,
          name: null
        },
        grade: null,
        height: {
          unit: null,
          value: null
        },
        weight: {
          unit: null,
          value: null
        }
      },
      submitted: false,
      isModified: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    if (this.props.profile.status !== FULFILLED && this.props.profile.status !== PENDING) {
      this.props.fetchParentProfile({parentId: this.props.profile.data.parentId, childId: this.props.profile.data.id});
    }
    if (this.props.account.status !== FULFILLED && this.props.account.status !== PENDING) {
      this.props.fetchParentAccount();
    }
    if (this.props.profile.status === FULFILLED) {
      if (this.props.profile.data.isActive === appConstants.profileActiveFlages.inactive) {
        this.props.history.push(REGISTRATION);
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.profile.status !== FULFILLED && this.props.profile.status === FULFILLED) {
      const {profile} = this.props;
      if (profile.data.isActive === appConstants.profileActiveFlages.inactive) {
        this.props.history.push(REGISTRATION);
      }
    }
    if (prevProps.userProfiles.selectedProfile !== this.props.userProfiles.selectedProfile) {
      const {userProfiles} = this.props;
      if (userProfiles.selectedProfile && isNonEmptyArray(userProfiles.selectedProfile.dependents)) {
        const dependent = userProfiles.selectedProfile.dependents[0];
        if (dependent && dependent.isActive) {
          if (dependent.isActive === appConstants.profileActiveFlages.inactive) {
            this.props.history.push(REGISTRATION);
          }
        }
      }
    }
  }
  handleFindInactiveChild(child) {
    return child.isActive === appConstants.profileActiveFlages.inactive;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.profile.status === PENDING &&
      nextProps.profile.status === FULFILLED && !this.state.isModified) {
      if (nextProps.profile.data.isActive === appConstants.profileActiveFlages.inactive) {
        this.props.history.push(REGISTRATION);
      }
      const {profile} = nextProps;
      const {height, weight} = profile.data;
      const heightAndWeight = {
        height: null,
        weight: null
      };
      if (height && height.value) {
        heightAndWeight.height = lengthToFeetInches(height && isNumber(height.value) ? height.value : null);
      }
      if (weight && weight.value && weight.unit) {
        const {unit, value} = weight;
        if (unit === appConstants.units.mass.pounds) {
          heightAndWeight.weight = value;
        } else if (unit === appConstants.units.mass.kilos) {
          heightAndWeight.weight = kilosToPounds(value);
        }
      }
      this.setState({
        // Profile: {...profile.data, height: {unit: appConstants.units.length.feet, value: heightAndWeight.height}, weight: {unit: appConstants.units.mass.pounds, value: heightAndWeight.weight}}
        profile: {...profile.data, height, weight: {unit: appConstants.units.mass.pounds, value: heightAndWeight.weight}}
      });
    }
  }
  handleValidation(profile) {
    return {
      valid: Boolean(profile)
    };
  }
  submitForm() {
    const {profile} = this.state;
    const validation = validateProfile(profile);
    this.setState({
      submitted: true,
      validation
    });
    return validation.valid;
  }
  handleProfileUpdate(data) {
    const {profile} = this.state;
    this.setState({
      profile: {
        ...profile,
        ...data
      },
      isModified: true
    });
  }
  handleFirstName(e) {
    const {value} = e.target;
    this.handleProfileUpdate({
      firstName: value
    });
  }
  handleLastName(e) {
    const {value} = e.target;
    this.handleProfileUpdate({
      lastName: value
    });
  }
  handleGender(e) {
    const {value} = e.target;
    this.handleProfileUpdate({
      gender: value
    });
  }
  handleDateOfBirth(e) {
    const {_d} = e;
    this.handleProfileUpdate({
      dob: _d
    });
  }
  handleCountry(e) {
    const {value} = e.target;
    const country = this.props.countries.data.find(country => country.id === value);
    const {id, name} = country;
    this.handleProfileUpdate({
      country: {
        id,
        name
      }
    });
  }
  handleGrade(e) {
    const {value} = e.target;
    this.handleProfileUpdate({
      grade: value
    });
  }
  handleHeight(e) {
    const {value} = e.target;
    const {height} = this.state.profile;
    const heightObject = lengthToFeetInches(height && isNumber(height.value) ? height.value : null);
    if (notNull(value)) {
      const feet = parseInt(value, 10);
      this.handleProfileUpdate({
        height: {
          value: ((isNumber(feet) ? feet : 0.0) + (isNumber(heightObject.inches) ? heightObject.inches / conversion.feetToInch : 0.0))
        },
        heightObject: {
          ...heightObject,
          feet
        }
      });
    } else {
      this.handleProfileUpdate({
        height: null,
        heightObject: {
          ...heightObject
        }
      });
    }
  }
  handleHeightInches(e) {
    const {value} = e.target;
    const {height} = this.state.profile;
    const heightObject = lengthToFeetInches(height && isNumber(height.value) ? height.value : null);
    const inches = parseInt(value, 10);
    this.handleProfileUpdate({
      height: {
        value: ((isNumber(heightObject.feet) ? heightObject.feet : 0.0) + (isNumber(inches) ? inches / conversion.feetToInch : 0.0))
      },
      heightObject: {
        ...heightObject,
        inches
      }
    });
  }
  handleWeight(e) {
    const {value} = e.target;
    const {weight} = this.state.profile;
    const {unit} = (weight ? weight : {});
    this.handleProfileUpdate({
      weight: {
        ...weight,
        value: parseInt(value, 10) < 0 ? 0 : value,
        unit: unit ? unit : appConstants.units.mass.pounds
      }
    });
  }
  renderOptions(i) {
    return <option value={i}>{i}</option>;
  }
  generateOptions(n) {
    return Array.from(Array(n).keys());
  }
  handleWeightUnit(e) {
    const {value} = e.target;
    const {weight} = this.state.profile;
    this.handleProfileUpdate({
      weight: {
        ...weight,
        unit: value
      }
    });
  }
  renderCountry(country, i) {
    return <option key={i} name={country.name} value={country.id}>{country.name}</option>;
  }
  renderGender(gender, index) {
    const {p} = this.props;
    const {profile} = this.state;
    const id = `gen${index}`;
    return (
      <span key={index}>
        <input id={id} type="radio" name="gender" value={gender.value} onChange={this.handleGender} checked={gender.value ? (gender.value === profile.gender) : null}/>
        <label htmlFor={id}>{p.t(gender.displayName)}</label>
      </span>
    );
  }
  renderWeight() {
    const {t} = this.props.p;
    const {profile, submitted} = this.state;
    const {height, weight} = profile;
    const {feet, inches} = lengthToFeetInches(height && isNumber(height.value) ? height.value : null);
    const validation = validateProfile(profile);
    return (
      <div className="uk-grid uk-grid-mobile">
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile mergeinpheight">
          <div className={validation.height === false && submitted ? 'field-holder error' : 'field-holder'}>
            <label>{t('ParentProfile.height')}</label>
            <div className="tableDiv">
              <div className="form-inline">
                <input type="number" name placeholder={t('ParentProfile.selectFeet')} value={notNull(feet) ? feet : ''} onChange={this.handleHeight} min={0}/>
                <select className="uk-form-controls uk-form-width-small addon" placeholder>
                  <option>{t('ParentProfile.heightUnit.F')}</option>
                </select>
              </div>
              <div className="form-inline">
                <input type="number" name placeholder={t('ParentProfile.selectInches')} value={notNull(inches) ? inches : ''} onChange={this.handleHeightInches} min={0}/>
                <select className="uk-form-controls uk-form-width-small addon" placeholder>
                  <option>{t('ParentProfile.heightUnit.I')}</option>
                </select>
              </div>
            </div>
            <span className="error-text">{t('ParentProfile.validation_messages.height')}</span>
          </div>
        </div>
        <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile mergeinpheight">
          <div className={validation.weight === false && submitted ? 'field-holder error' : 'field-holder'}>
            <label>{t('ParentProfile.weight')}</label>
            <input type="number" name placeholder={t('ParentProfile.enterWeight')} min={0} value={weight && weight.value ? weight.value : ''} onChange={this.handleWeight}/>
            <select className="uk-form-controls uk-form-width-small addon" placeholder value={weight && weight.unit ? weight.unit : appConstants.units.mass.pounds} onChange={this.handleWeightUnit}>
              <option value={appConstants.units.mass.pounds}>{t('ParentProfile.weightUnit.L')}</option>
              <option value={appConstants.units.mass.kilos}>{t('ParentProfile.weightUnit.K')}</option>
            </select>
            <span className="error-text">{t('ParentProfile.validation_messages.weight')}</span>
          </div>
        </div>
      </div>
    );
  }
  handleNav() {
    // This.props.history.push(PROFILE);
    const {userProfiles} = this.props;
    const parentObject = userProfiles.data.find(profile => profile.type === appConstants.userProfileTypes.PARENT);
    if (parentObject) {
      const {dependents} = parentObject;
      if (dependents && isNonEmptyArray(dependents)) {
        const inactiveChild = dependents.find(this.handleFindInactiveChild);
        if (inactiveChild) {
          this.props.changeProfile({...parentObject, dependents: [inactiveChild], dependentId: inactiveChild.id});
          this.props.history.push(REGISTRATION);
          return;
        }
      }
      this.props.postNewProfile({profileType: appConstants.userProfileTypes.PARENT});
    } else {
      this.props.postNewProfile({profileType: appConstants.userProfileTypes.PARENT});
    }
  }
  handleSave() {}
  render() {
    const {t} = this.props.p;
    const {profile, submitted} = this.state;
    const {firstName, lastName, dob, country, grade, height, weight} = profile;
    const heightAndWeight = {
      weight: 0.0,
      weightUnit: null
    };
    if (weight && weight.value && weight.unit) {
      const {unit, value} = weight;
      if (unit === appConstants.units.mass.pounds) {
        heightAndWeight.weight = value;
        heightAndWeight.weightUnit = appConstants.units.mass.pounds;
      } else if (unit === appConstants.units.mass.kilos) {
        heightAndWeight.weight = kilosToPounds(value);
        heightAndWeight.weightUnit = appConstants.units.mass.kilos;
      }
    }
    const countries = this.props.countries.status === FULFILLED ? this.props.countries.data : [];
    const data = {...profile, dob, country, grade, height, weight: {unit: appConstants.units.mass.pounds, value: heightAndWeight.weight}};
    const validation = validateProfile(profile);
    return (
      <div className="booking-wrapper cl-sm-bk-wrapper">
        <div className="dashboardSection">
          <div className="uk-grid">
            <SideNav/>
            <div className="uk-width-xlarge-8-10 uk-width-large-8-10 uk-width-medium-1-1 uk-width-small-1-1">
              <div className="cl-sd-trainingLocationInner">
                <div className="uk-grid">
                  <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                    <section className="stepSection stepSectionNxt cl-sm-athleteSection ssp-regflow-1o">
                      <div className="uk-grid">
                        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                          <h1 className="uk-text-left">{t('ParentProfile.title')}</h1>
                          <p className="pt0">{t('ParentProfile.dashboardMessage')}</p>
                        </div>
                      </div>
                      <div className="uk-grid">
                        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                            <div className="buildProfile buildProfileSec" >
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile" >
                                  <div className={validation.country === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('ParentProfile.country')}</label>
                                    <select className="uk-form-controls field-required" onChange={this.handleCountry} value={country && country.id ? country.id : ''}>
                                      <option>{t('ParentProfile.selectCountry')}</option>
                                      {countries.map(this.renderCountry)}
                                    </select>
                                    <span className="error-text">{t('ParentProfile.validation_messages.country')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                                  <div className={validation.firstName === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('ParentProfile.firstName')}</label>
                                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentProfile.firstNameLabel')} value={firstName} onChange={this.handleFirstName}/>
                                    <span className="error-text">{t('ParentProfile.validation_messages.firstName')}</span>
                                  </div>
                                </div>
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                                  <div className={validation.lastName === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('ParentProfile.lastName')}</label>
                                    <input type="text" name className="uk-form-controls field-required" placeholder={t('ParentProfile.lastNameLabel')} value={lastName} onChange={this.handleLastName}/>
                                    <span className="error-text">{t('ParentProfile.validation_messages.lastName')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                                  <div className="uk-form-inline uk-from-inline-mobile">
                                    <div className={validation.gender === false && submitted ? 'field-holder error' : 'field-holder'}>
                                      <h6 className="uk-padding-remove">Gender</h6>
                                      <div className="tandc">
                                        {
                                          config.genders.map(this.renderGender)
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                                  <div className={validation.dob === false && submitted ? 'field-holder uk-form error' : 'field-holder uk-form'}>
                                    <label>{t('ParentProfile.dateOfBirth')}</label>
                                    <DatePicker
                                      value={dob ? moment(dob).format(defaultDateFormat) : undefined}
                                      defaultValue={dob ? moment(dob).format(defaultDateFormat) : undefined}
                                      viewDate={dob ? dob : new Date(appConstants.defaultViewDate)}
                                      viewMode={dob ? 'days' : 'years'}
                                      dateFormat={defaultDateFormat}
                                      timeFormat={false}
                                      closeOnSelect
                                      onChange={this.handleDateOfBirth}
                                      min={new Date()}
                                      isValidDate={validDateRange}
                                    />
                                    <span className="error-text">{t('ParentProfile.validation_messages.dateOfBirth')}</span>
                                  </div>
                                </div>
                              </div>
                              {this.renderWeight()}
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile" style={{display: validation.grade === true ? appConstants.displayTypes.block : appConstants.displayTypes.none}}>
                                  <div className={validation.grade === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('ParentProfile.gradeInSchool')}</label>
                                    <input type="text" name className="uk-form-controls" placeholder={t('ParentProfile.gradeInSchool')} value={grade ? grade : ''} onChange={this.handleGrade}/>
                                    <span className="error-text">{t('ParentProfile.validation_messages.gradeInSchool')}</span>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          <div className="uk-grid uk-grid-mobile">
                            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 uk-width-mobile">
                                  <ProfilePicture
                                    withIcon
                                    buttonText={this.props.p.t('PhotosAndVideos.chooseImage')}
                                    imgExtension={['.jpg', '.jpeg', '.png']}
                                    label={this.props.p.t('PhotosAndVideos.profilePictureLabel')}
                                    onSelect={this.handleImageCrop}
                                    maxFileSize={5242880}
                                    dimensionsError={this.props.p.t('PhotosAndVideos.profilePictureDimensionsError')}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="uk-grid" style={{display: notNull(dob) ? validation.dob === true ? appConstants.displayTypes.none : appConstants.displayTypes.block : appConstants.displayTypes.none}}>
                            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                              <div className="cl-sd-athlete-profile-info">
                                <div className="tableDiv">
                                  <div className="lCol">
                                    <svg className="cl-icon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.049 71.051">
                                      <g transform="translate(-14.877 -16.289)">
                                        <circle id="Ellipse_239" data-name="Ellipse 239" className="cl-icon-info-1" cx="3.506" cy="3.506" r="3.506" transform="translate(46.895 33.776)"/>
                                        <g data-name="Group 3344">
                                          <path data-name="Path 232" className="cl-icon-info-1" d="M50.4,19.842A31.972,31.972,0,1,1,18.428,51.814,32.009,32.009,0,0,1,50.4,19.842m0-3.552A35.525,35.525,0,1,0,85.926,51.815,35.525,35.525,0,0,0,50.4,16.29Z"/>
                                          <rect data-name="Rectangle 2484" className="cl-icon-info-1" width="4.973" height="24.284" transform="translate(47.914 45.569)"/>
                                        </g>
                                      </g>
                                    </svg>
                                  </div>
                                  <div className="rCol">
                                    <h4>{t('ParentProfile.validation_messages.age')}</h4>
                                    <p>{t('ParentProfile.validation_messages.ageMessage')}</p>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className="uk-grid">
                            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2 uk-text-left">
                              {notNull(dob) && validation.dob === true && <NextLink submitForm={this.submitForm} saveData={this.props.saveParentProfile} data={data} saveType={appConstants.saveType.onlyProfile} onSave={this.handleSave} buttonText={t('NextLink.save')}/>}
                            </div>
                            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2 uk-text-right">
                              <a onClick={this.handleNav} className="back btm-back">{t('ParentProfile.addAnother')} <span>{t('ParentProfile.child')}</span></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      profile: PropTypes.object.isRequired,
      account: PropTypes.object.isRequired,
      countries: PropTypes.object.isRequired,
      saveParentProfile: PropTypes.func.isRequired,
      fetchParentAccount: PropTypes.func.isRequired,
      userProfiles: PropTypes.object.isRequired,
      postNewProfile: PropTypes.func.isRequired,
      changeProfile: PropTypes.func.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      fetchParentProfile: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, countries, parent, userProfiles} = state;
  const {account} = parent;
  return {
    profile,
    countries,
    account,
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveParentProfile: profile => dispatch(saveParentProfile(profile)),
    changeProfile: profile => dispatch(changeProfile(profile)),
    postNewProfile: profile => dispatch(postNewProfile(profile)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchParentProfile: params => dispatch(fetchParentProfile(params)),
    fetchParentAccount: () => dispatch(fetchParentAccount())
  };
};

const ParentProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default translate(ParentProfile);
/* eslint complexity: 0 */
