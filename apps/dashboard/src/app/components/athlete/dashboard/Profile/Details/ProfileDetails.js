import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import DatePicker from 'react-datetime';

import {saveAthleteProfile, fetchCountries, fetchAthleteProfile} from '../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../constants/ActionTypes';
import appConstants from '../../../../../constants/appConstants';
import validateProfile from '../../../../../validators/athlete/common/profile';
import SideNav from '../common/SideNav';
import ProfilePicture from '../../../common/ProfilePicture';
import NextLink from '../../../common/SaveLink';
import {kilosToPounds, lengthToFeetInches} from '../../../../../utils/coverter';
import {isNumber, notNull} from '../../../../../validators/common/util';
import moment from 'moment';
const {conversion, defaultDateFormat} = appConstants;

const today = moment();
const validDateRange = function (current) {
  return current.isBefore(today);
};

class Profile extends Component {
  constructor(props) {
    super(props);
    const {profile} = this.props;
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
      isModified: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.profile.status === PENDING &&
      nextProps.profile.status === FULFILLED && !this.state.isModified) {
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
        profile: {...profile.data, height, weight: {unit: appConstants.units.mass.pounds, value: heightAndWeight.weight}}
      });
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.countries.status !== FULFILLED && this.props.countries.status !== PENDING) {
      this.props.fetchCountries();
    }
    if (this.props.profile.status !== FULFILLED && this.props.profile.status !== PENDING) {
      this.props.fetchAthleteProfile({athleteId: this.props.profile.data.id});
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
  renderOptions(i) {
    return <option value={i}>{i}</option>;
  }
  generateOptions(n) {
    return Array.from(Array(n).keys());
  }
  handleSave() {}
  render() {
    const {t} = this.props.p;
    const {profile, submitted} = this.state;
    const {dob, country, grade, height, weight} = profile;
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

    const data = {...profile, dob, country, grade, height, weight: {unit: appConstants.units.mass.pounds, value: heightAndWeight.weight}};
    const countries = this.props.countries.status === FULFILLED ? this.props.countries.data : [];
    const {feet, inches} = lengthToFeetInches(height && isNumber(height.value) ? height.value : null);
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
                          <h1 className="uk-text-left">{t('AthleteProfile.title')}</h1>
                          <p className="pt0">{t('AthleteProfile.message')}</p>
                        </div>
                      </div>
                      <div className="uk-grid">
                        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                          <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                            <div className="buildProfile buildProfileSec" >

                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile" >
                                  <div className={validation.country === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('AthleteProfile.country')}</label>
                                    <select className="uk-form-controls field-required" onChange={this.handleCountry} value={country && country.id ? country.id : ''}>
                                      <option value={''}>{t('AthleteProfile.selectCountry')}</option>
                                      {countries.map(this.renderCountry)}
                                    </select>
                                    <span className="error-text">{t('AthleteProfile.validation_messages.country')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile">
                                  <div className={validation.dob === false ? 'field-holder uk-form error' : 'field-holder uk-form'}>
                                    <label>{t('AthleteProfile.dateOfBirth')}</label>
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
                                      inputProps={{className:'field-required'}}
                                    />
                                    <span className="error-text">{t('AthleteProfile.validation_messages.dateOfBirth')}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile mergeinpheight">
                                  <div className={validation.height === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('AthleteProfile.height')}</label>
                                    <div className="tableDiv">
                                      <div className="form-inline">
                                        <input type="number" name="" placeholder={t('AthleteProfile.selectFeet')} value={notNull(feet) ? feet : ''} onChange={this.handleHeight} min={0}/>
                                        <select className="uk-form-controls uk-form-width-small addon" placeholder="">
                                          <option>{t('AthleteProfile.heightUnit.F')}</option>
                                        </select>
                                      </div>
                                      <div className="form-inline">
                                        <input type="number" name="" placeholder={t('AthleteProfile.selectInches')} value={notNull(inches) ? inches : ''} onChange={this.handleHeightInches} min={0}/>
                                        <select className="uk-form-controls uk-form-width-small addon" placeholder="">
                                          <option>{t('AthleteProfile.heightUnit.I')}</option>
                                        </select>
                                      </div>
                                    </div>
                                    <span className="error-text">{t('AthleteProfile.validation_messages.height')}</span>
                                  </div>
                                </div>
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile mergeinpheight">
                                  <div className={validation.weight === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('AthleteProfile.weight')}</label>
                                    <input type="number" name placeholder={t('AthleteProfile.enterWeight')} min={0} value={weight && weight.value ? weight.value : ''} onChange={this.handleWeight}/>
                                    <select className="uk-form-controls uk-form-width-small addon" placeholder value={weight && weight.unit ? weight.unit : appConstants.units.mass.pounds} onChange={this.handleWeightUnit}>
                                      <option value={appConstants.units.mass.pounds}>{t('AthleteProfile.weightUnit.L')}</option>
                                      <option value={appConstants.units.mass.kilos}>{t('AthleteProfile.weightUnit.K')}</option>
                                    </select>
                                    <span className="error-text">{t('AthleteProfile.validation_messages.weight')}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="uk-grid uk-grid-mobile">
                                <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1 uk-width-mobile" style={{display: validation.grade === true ? appConstants.displayTypes.block : appConstants.displayTypes.none}}>
                                  <div className={validation.grade === false && submitted ? 'field-holder error' : 'field-holder'}>
                                    <label>{t('AthleteProfile.gradeInSchool')}</label>
                                    <input type="text" name className="uk-form-controls" placeholder={t('AthleteProfile.gradeInSchool')} value={grade ? grade : ''} onChange={this.handleGrade}/>
                                    <span className="error-text">{t('AthleteProfile.validation_messages.gradeInSchool')}</span>
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
                                        <h4>{t('AthleteProfile.validation_messages.age')}</h4>
                                        <p>{t('AthleteProfile.validation_messages.ageMessage')}</p>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          {notNull(dob) && validation.dob === true && <NextLink submitForm={this.submitForm} saveData={this.props.saveAthleteProfile} data={data} saveType={appConstants.saveType.onlyProfile} buttonText={t('NextLink.save')} onSave={this.handleSave}/>}
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
      countries: PropTypes.object.isRequired,
      saveAthleteProfile: PropTypes.func.isRequired,
      fetchCountries: PropTypes.func.isRequired,
      fetchAthleteProfile: PropTypes.func.isRequired
    };
  }
}

const mapStateToProps = state => {
  const {profile, countries} = state;
  return {
    profile,
    countries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveAthleteProfile: profile => dispatch(saveAthleteProfile(profile)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchAthleteProfile: params => dispatch(fetchAthleteProfile(params))
  };
};

const AthleteProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default (translate(AthleteProfile));
/* eslint complexity: 0 */
