import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  updateProfile,
  clearProfile,
  createNewRole,
  setNewProfile,
  postNewProfile,
  changeProfile
} from '../../../actions';

import translate from 'redux-polyglot/translate';
import appConstants from '../../../constants/appConstants';
import {PropTypes} from 'prop-types';
import {PROFILE_SSP, PROFILE_ATHLETE, PROFILE_PARENT} from '../../../constants/assetsPaths';
import {FULFILLED} from '../../../constants/ActionTypes';
import {REGISTRATION} from '../../../constants/pathConstants';
import {isNonEmptyArray} from '../../../validators/common/util';
import {isShortRegFlow} from '../../../utils/registration';

const {parent, athlete, isp, ssp} = appConstants.profiles;

class ProfileClass extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFindParent = this.handleFindParent.bind(this);
    this.state = {
      profile: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.profile.status !== FULFILLED && this.props.profile.status === FULFILLED) {
      this.props.history.push('/');
    }
  }

  handleChange(e) {
    this.setState({
      profile: e.target.value
    });
    // console.log('HandleChange')
    const profile = e.target.value
    const {userProfiles} = this.props;
    switch (profile) {
      case parent: {
        this.handleFindParent(profile);
        break;
      }
      case athlete: {
        const athleteObject = userProfiles.data.find(this.handleFindAthlete);
        if (athleteObject) {
          console.log('Push History Registration')
          this.props.history.push(REGISTRATION);
        } else {
          this.props.postNewProfile({profileType: profile});
        }
        break;
      }
      default: {
        this.props.updateProfile(profile);
        this.props.history.push(profile);
      }
    }
  }

  handleFindISP(profile) {
    return profile.type === isp;
  }

  handleFindAthlete(profile) {
    return profile.type === athlete;
  }

  handleFindInactiveChild(child) {
    return child.isActive === appConstants.profileActiveFlages.inactive;
  }

  handleFindParent(profile) {
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
      this.props.postNewProfile({profileType: profile});
    } else {
      this.props.postNewProfile({profileType: profile});
    }
  }

  render() {
    const {userProfiles} = this.props;
    const userProfilesStatus = userProfiles.status === FULFILLED;
    const flag = isShortRegFlow();
    const showSSP = userProfilesStatus ? (userProfiles.data.findIndex(this.handleFindISP) < 0 && !flag) : true;
    const athleteObject = userProfiles.data.find(this.handleFindAthlete);
    const showAthlete = userProfilesStatus ? athleteObject ? athleteObject.isActive === appConstants.no : true : true;
    const n = showSSP ? showAthlete ? 3 : 2 : showAthlete ? 2 : 1;
    const number = n > 1 ? n : 3;
    const className = n === 2 ? 'uk-width-xlarge-{n}-10 uk-width-large-{n}-10 uk-width-medium-4-10 uk-width-small-1-1'.replace(/{n}/g, 3) : 'uk-width-xlarge-1-{n} uk-width-large-1-{n} uk-width-medium-1-{n}  uk-width-small-1-1'.replace(/{n}/g, number);

    return (
      <section className="stepSection ssp-regflow-1o">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <h1 className="uk-text-center">{this.props.p.t('Profile.welcomeMessage')}</h1>
            </div>
          </div>
          <div className="uk-grid">
            {showSSP && (
              <div className={className}>
                <div className="stepContent">
                  <input id="question1" name="question" type="radio" value={ssp} checked={this.state.profile === ssp} onChange={this.handleChange}/>
                  <label htmlFor="question1">
                    <span className="radioImgHolder">
                      <svg className="cl-icon-ssp" xmlns="http://www.w3.org/2000/svg" viewBox="497 358 106.564 84.972">
                        <g data-name="Group 8" transform="translate(497 358)">
                          <g transform="translate(0)">
                            <g transform="translate(6.059 9.296)">
                              <ellipse data-name="Ellipse 1" className="cl-icon-ssp-1" cx="30.634" cy="30.792" rx="30.634" ry="30.792"/>
                              <ellipse data-name="Ellipse 2" className="cl-icon-ssp-2" cx="29.966" cy="30.123" rx="29.966" ry="30.123" transform="translate(0.669 0.669)"/>
                            </g>
                            <path className="cl-icon-ssp-3" d="M28.093,3.91V8.558" transform="translate(8.6 1.319)"/>
                            <g transform="translate(30.336)">
                              <rect data-name="Rectangle 3" className="cl-icon-ssp-1" width="12.716" height="5.81" rx="1"/>
                              <rect data-name="Rectangle 4" className="cl-icon-ssp-2" width="11.379" height="4.472" rx="1" transform="translate(0.669 0.669)"/>
                            </g>
                            <path data-name="Line" className="cl-icon-ssp-3" d="M7.347,15.2l2.312,2.324" transform="translate(1.602 5.129)"/>
                            <g id="Rectangle-16-Copy" transform="translate(0 20.709) rotate(-47)">
                              <rect data-name="Rectangle 5" className="cl-icon-ssp-1" width="13.872" height="5.81" rx="1" transform="translate(0 0)"/>
                              <rect data-name="Rectangle 6" className="cl-icon-ssp-2" width="12.535" height="4.472" rx="1" transform="translate(0.669 0.669)"/>
                            </g>
                            <path id="Path-18" className="cl-icon-ssp-3" d="M27.773,16.355V36.14h16.96" transform="translate(8.492 5.517)"/>
                          </g>
                          <g transform="translate(41.918 30.935)">
                            <path className="cl-icon-ssp-4" d="M6.261,27.4H28.314s-3.45,22.7,16.951,22.7c16.805,0,18.88-14.015,18.88-17.719a15.451,15.451,0,0,0-8-13.612c-6.539-3.758-16.693-2.381-16.693-2.381l-.111,4.522H33.678l-6.184-5.768L0,14.665Z" transform="translate(0 3.434)"/>
                            <g transform="translate(0.033 18.347)">
                              <path data-name="Path 1" className="cl-icon-ssp-5" d="M16.644,14.851V27.4H6.278L.025,14.851Z" transform="translate(-0.025 -14.851)"/>
                              <path data-name="Path 2" className="cl-icon-ssp-6" d="M15.7,15.351H.832L6.419,26.568H15.7Z" transform="translate(0.248 -14.682)"/>
                            </g>
                            <path className="cl-icon-ssp-3" d="M33.725,38.168a12.268,12.268,0,0,0,6.845-2.146c2.852-2.208,4.35-6.562,4.35-6.562" transform="translate(11.377 8.425)"/>
                            <path data-name="Line" className="cl-icon-ssp-3" d="M28.409,12.916,33.846,2.087" transform="translate(9.584 -0.809)"/>
                            <path data-name="Line" className="cl-icon-ssp-3" d="M23.864,13.238V1.132" transform="translate(8.05 -1.132)"/>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <h2>{this.props.p.t('Profile.user1')}</h2>
                    <p>{this.props.p.t('Profile.userDescription1')}</p>
                  </label>
                </div>
              </div>
            )
            }
            {n === 1 && (<div className={className}/>)}
            {n === 2 && (<div className="uk-width-xlarge-2-10 uk-width-large-2-10 uk-width-medium-1-10"/>)}
            {showAthlete && (
              <div className={className}>
                <div className="stepContent">
                  <input id="question2" name="question" type="radio" value={athlete} checked={this.state.profile === athlete} onChange={this.handleChange}/>
                  <label htmlFor="question2">
                    <span className="radioImgHolder">
                      <svg className="cl-icon-athlete" xmlns="http://www.w3.org/2000/svg" viewBox="920.494 346.699 80.47 106.716">
                        <g data-name="Group 9" transform="translate(921 347)">
                          <g transform="translate(0)">
                            <path className="cl-icon-athlete-1" d="M1.157,81.972A141.534,141.534,0,0,0,32.366,87" transform="translate(0.246 16.45)"/>
                            <path className="cl-icon-athlete-1" d="M39.342,86.821a173.407,173.407,0,0,0,31.129-4.364" transform="translate(8.382 16.554)"/>
                            <path className="cl-icon-athlete-1" d="M79.224,100.258S80.89,80.33,75.1,73.083c-5.017-6.287-15.313-9.77-26.68-10.738a27.707,27.707,0,0,1-.993-4.707,24.629,24.629,0,0,1,.879-4.3c8.871-3.846,15.2-13.709,15.2-25.3C63.507,13.109,53.028,1,40.1,1S16.7,13.109,16.7,28.042c0,11.585,6.315,21.442,15.178,25.291a26.7,26.7,0,0,1,.816,4.3,33.629,33.629,0,0,1-1,5.037C20.672,64.019,10.548,67.569,5.1,73.083-1.408,79.672-.325,99.338,1.018,99.338" transform="translate(0 -0.801)"/>
                            <path className="cl-icon-athlete-2" d="M79.224,88.716S80.89,68.788,75.1,61.541c-5.017-6.287-10.323-8.527-21.69-9.494-.134-.479-1.572,11.737-13.233,11.737s-12.991-11.4-13.038-11.214S10.548,56.027,5.1,61.541C-1.408,68.13-.325,87.8,1.018,87.8c0,0,25.631,5.982,38.705,6.136C52.718,94.084,79.224,88.716,79.224,88.716Z" transform="translate(0 10.072)"/>
                            <path className="cl-icon-athlete-3" d="M60.637,27.468A29.08,29.08,0,0,0,53.854,8.879l.029-.012c-.325-.381-.676-.73-1.022-1.088-.1-.1-.186-.2-.284-.3-.448-.452-.917-.873-1.4-1.285-.1-.083-.191-.173-.291-.253-.494-.412-1.006-.795-1.53-1.161-.087-.064-.176-.13-.266-.191-.545-.37-1.1-.709-1.671-1.028L47.2,3.433q-.889-.481-1.816-.879c-.056-.023-.112-.048-.168-.07a20.09,20.09,0,0,0-1.954-.709c-.037-.012-.074-.021-.112-.033a19.524,19.524,0,0,0-2.079-.51c-.02-.006-.041-.008-.06-.012a20.536,20.536,0,0,0-2.19-.287h-.007C38.3.89,37.779.836,37.251.836c-12.658,0-22.942,11.619-23.364,26.125l33.77-15.28Z" transform="translate(2.959 -0.836)"/>
                            <g id="Rectangle" transform="translate(16.443 14.872)">
                              <path data-name="Path 3" className="cl-icon-athlete-4" d="M14.9,14.115A1.62,1.62,0,0,1,16.517,13.1s9.876,1.09,20.961,1.09A202.254,202.254,0,0,0,57.783,13.1a1.571,1.571,0,0,1,1.585,1.022,26.95,26.95,0,0,1,1.089,4.095,15.465,15.465,0,0,1,.394,3.265A1.3,1.3,0,0,1,59.692,22.8s-10.45,1.1-22.1,1.1c-12.02,0-22.828-1.1-22.828-1.1a1.345,1.345,0,0,1-1.2-1.321,17.077,17.077,0,0,1,.352-3.646A18.65,18.65,0,0,1,14.9,14.115Z" transform="translate(-13.555 -13.096)"/>
                              <path data-name="Path 4" className="cl-icon-athlete-5" d="M15.362,14.214l-.014.035c-.042.1-.122.307-.227.63-.179.55-.359,1.214-.527,1.991q-.1.463-.191.962a17.617,17.617,0,0,0-.346,3.453c0,.046,0,.046,0,.1a.74.74,0,0,0,.66.707l.483.047c.4.037.86.079,1.384.124,1.5.128,3.182.257,5.017.377,5.243.343,10.638.548,15.882.548,5.081,0,10.3-.205,15.377-.547,1.776-.12,3.406-.248,4.854-.376.506-.045.954-.086,1.338-.124l.473-.047a.708.708,0,0,0,.611-.739s0,0,0-.01a16.013,16.013,0,0,0-.384-3.108q-.073-.371-.151-.727c-.2-.921-.416-1.735-.631-2.433-.127-.414-.225-.695-.288-.861a.967.967,0,0,0-.94-.61l-.437.047c-.355.037-.768.079-1.235.124-1.334.128-2.836.256-4.474.375-4.679.341-9.509.546-14.228.546-4.865,0-9.848-.205-14.68-.547-1.691-.119-3.242-.248-4.621-.376-.483-.045-.909-.086-1.276-.124L16.35,13.6A1.017,1.017,0,0,0,15.362,14.214Z" transform="translate(-13.448 -12.989)"/>
                            </g>
                            <path className="cl-icon-athlete-1" d="M32.932,71.308l4.254,6.686" transform="translate(7.016 14.178)"/>
                            <path className="cl-icon-athlete-6" d="M37.187,82.076,55.612,54.041a53.264,53.264,0,0,0-7.388-1.891L32.933,75.39" transform="translate(7.016 10.097)"/>
                            <path className="cl-icon-athlete-7" d="M41.018,82.992,22.272,53.541a62.5,62.5,0,0,0-7.324,1.978L32.786,82.992Z" transform="translate(3.185 10.393)"/>
                            <path className="cl-icon-athlete-8" d="M41.832,83.24a7.474,7.474,0,1,1-7.474-7.565A7.519,7.519,0,0,1,41.832,83.24Z" transform="translate(5.728 15.109)"/>
                            <path className="cl-icon-athlete-9" d="M37.561,82.594a3.841,3.841,0,1,1-3.84-3.887,3.862,3.862,0,0,1,3.84,3.887" transform="translate(6.366 15.754)"/>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <h2>{this.props.p.t('Profile.user2')}</h2>
                    <p>{this.props.p.t('Profile.userDescription2')}</p>
                  </label>
                </div>
              </div>
            )
            }
            <div className={className}>
              <div className="stepContent">
                <input id="question3" name="question" type="radio" value={parent} checked={this.state.profile === parent} onChange={this.handleChange}/>
                <label htmlFor="question3">
                  <span className="radioImgHolder">
                    <svg className="cl-icon-parent" xmlns="http://www.w3.org/2000/svg" viewBox="1316.48 347.773 106.849 105.789">
                      <g data-name="Group 10" transform="translate(1317 348)">
                        <g transform="translate(0 0)">
                          <g transform="translate(0.053 0)">
                            <path className="cl-icon-parent-1" d="M84.226,92.268s-.965-18.324-6.275-24.987c-4.6-5.781-19.038-8.984-29.467-9.874a25.527,25.527,0,0,1-.911-4.328,22.69,22.69,0,0,1,.807-3.951c8.139-3.536,16.438-12.606,16.438-23.263C64.817,12.134,52.709,1,40.849,1S16.882,12.134,16.882,25.865c0,10.652,8.289,19.717,16.42,23.255a24.608,24.608,0,0,1,.749,3.958,30.981,30.981,0,0,1-.922,4.632c-10.108,1.235-21.891,4.5-26.889,9.57C.268,73.34,0,91.422,0,91.422s15.168,6.229,40.574,6.229S84.226,92.268,84.226,92.268Z" transform="translate(0 -0.727)"/>
                            <path className="cl-icon-parent-2" d="M47.722.931C47.634,7.953,43.3,13.671,39.43,18.305c-.279.381-.157-1.135-.483-.789-.09.094-.175.2-.267.292-.422.437-.864.845-1.313,1.244-.093.08-.18.167-.274.245-.465.4-.947.769-1.441,1.123-.082.062-.166.126-.251.185-.513.358-1.037.686-1.573.995l-.209.123q-.837.465-1.709.85c-.053.023-.105.047-.158.068a18.594,18.594,0,0,1-1.839.686,18.69,18.69,0,0,1-2.063.526,18.84,18.84,0,0,1-2.118.29c-.495.04-.982.092-1.479.092C12.338,24.235.4,14.036,0,0,0,0,8.2,11.593,14.355,12.958c3.56.79,6.3-3.561,9.9-3.561s7.5,3.561,10.636,3.561C40.559,12.958,47.722.931,47.722.931Z" transform="translate(64.339 24.235) rotate(180)"/>
                            <path className="cl-icon-parent-3" d="M22.059,48.948l12.964,12.4a1.322,1.322,0,0,0,1.766.03L50.826,48.948" transform="translate(4.524 9.107)"/>
                          </g>
                          <g transform="translate(0 0)">
                            <path data-name="Stroke-5" className="cl-icon-parent-4" d="M99.172,97.1S100.415,82.71,96.1,77.476c-3.743-4.54-11.425-7.057-19.9-7.755a19.459,19.459,0,0,1-.74-3.4,17.289,17.289,0,0,1,.656-3.1c6.618-2.778,11.338-9.9,11.338-18.273,0-10.786-7.818-19.531-17.461-19.531s-17.46,8.746-17.46,19.531c0,8.367,4.712,15.487,11.324,18.267a18.735,18.735,0,0,1,.609,3.109,23.6,23.6,0,0,1-.75,3.638c-8.219.97-15.772,3.534-19.836,7.517-4.856,4.759-4.048,18.962-3.046,18.962,0,0,10.389,5.372,28,5.372A96.057,96.057,0,0,0,99.172,97.1Z" transform="translate(6.478 3.251)"/>
                            <path data-name="Stroke-5" className="cl-icon-parent-5" d="M99.1,89.163s1.348-14.417-3.074-19.627c-2.44-2.875-4.822-5.712-13.3-6.411a13.607,13.607,0,0,1-13.094,8.846c-10.649,0-11.548-8.98-11.584-8.846-8.219.97-9.829,2.027-14.246,6.411C39,74.308,39.755,88.5,40.757,88.5c0,0,10.389,5.372,28,5.372A96.057,96.057,0,0,0,99.1,89.163Z" transform="translate(6.467 10.984)"/>
                            <g data-name="Group">
                              <g data-name="Page-1-Copy">
                                <path data-name="Stroke-5" className="cl-icon-parent-1" d="M85.226,92.268s-.965-18.324-6.275-24.987c-4.6-5.781-19.038-8.984-29.467-9.874a25.527,25.527,0,0,1-.911-4.328,22.69,22.69,0,0,1,.807-3.951c8.139-3.536,16.438-12.606,16.438-23.263C65.817,12.134,53.709,1,41.849,1S17.882,12.134,17.882,25.865c0,10.652,8.289,19.717,16.42,23.255a24.608,24.608,0,0,1,.749,3.958,30.981,30.981,0,0,1-.922,4.632c-10.108,1.235-21.891,4.5-26.889,9.57C1.268,73.34,1,91.422,1,91.422s15.168,6.229,40.574,6.229S85.226,92.268,85.226,92.268Z" transform="translate(-0.947 -0.727)"/>
                                <path data-name="Fill-7" className="cl-icon-parent-2" d="M47.722.931C47.634,7.953,43.3,13.671,39.43,18.305c-.279.381-.157-1.135-.483-.789-.09.094-.175.2-.267.292-.422.437-.864.845-1.313,1.244-.093.08-.18.167-.274.245-.465.4-.947.769-1.441,1.123-.082.062-.166.126-.251.185-.513.358-1.037.686-1.573.995l-.209.123q-.837.465-1.709.85c-.053.023-.105.047-.158.068a18.6,18.6,0,0,1-1.839.686,18.69,18.69,0,0,1-2.063.526,18.84,18.84,0,0,1-2.118.29c-.495.04-.982.092-1.479.092C12.338,24.235.4,14.036,0,0,0,0,8.2,11.593,14.355,12.958c3.56.79,6.3-3.561,9.9-3.561s7.5,3.561,10.636,3.561C40.559,12.958,47.722.931,47.722.931Z" transform="translate(64.392 24.235) rotate(180)"/>
                                <path data-name="Path-8" className="cl-icon-parent-3" d="M23.059,48.948l12.964,12.4a1.322,1.322,0,0,0,1.766.03L51.826,48.948" transform="translate(3.578 9.107)"/>
                                <path className="cl-icon-parent-6" d="M85.235,82.748s-.965-20.734-6.275-27.4c-4.6-5.78-15.083-5.857-25.512-6.747C53.333,48.19,41.58,62,41.58,62S31.1,48.427,31.056,48.6c-10.108,1.235-20.014,2.882-25.011,7.952C.072,62.614,1.009,81.9,1.009,81.9S16.177,88.13,41.583,88.13,85.235,82.748,85.235,82.748Z" transform="translate(-0.956 9.034)"/>
                              </g>
                              <g data-name="Page-1-Copy-2" transform="translate(46.478 28.665)">
                                <path data-name="Stroke-5" className="cl-icon-parent-6" d="M59.172,72.1S60.415,57.71,56.1,52.476c-3.743-4.54-11.425-7.057-19.9-7.755a19.459,19.459,0,0,1-.74-3.4,17.29,17.29,0,0,1,.656-3.1c6.618-2.778,11.338-9.9,11.338-18.273C47.446,9.16,39.629.414,29.985.414S12.525,9.16,12.525,19.946c0,8.367,4.712,15.487,11.324,18.267a18.736,18.736,0,0,1,.609,3.109,23.6,23.6,0,0,1-.75,3.638c-8.219.97-15.772,3.534-19.836,7.517C-.984,57.235-.176,71.438.826,71.438c0,0,10.389,5.372,28,5.372A96.057,96.057,0,0,0,59.172,72.1Z" transform="translate(0 -0.414)"/>
                                <path data-name="Stroke-5" className="cl-icon-parent-7" d="M59.1,64.163s1.348-14.417-3.074-19.627c-2.44-2.875-4.822-5.712-13.3-6.411a13.607,13.607,0,0,1-13.094,8.846c-10.649,0-11.548-8.98-11.584-8.846C9.83,39.1,8.22,40.152,3.8,44.536-1,49.308-.245,63.5.757,63.5c0,0,10.389,5.372,28,5.372A96.057,96.057,0,0,0,59.1,64.163Z" transform="translate(-0.011 7.318)"/>
                                <path data-name="Fill-7" className="cl-icon-parent-2" d="M34.878.225a20.609,20.609,0,0,1-5.06,13.426,8.7,8.7,0,0,1-.741.795c-.071.07-.138.148-.212.218-.334.326-.684.631-1.041.928-.073.06-.143.125-.217.183-.369.3-.751.574-1.142.838-.065.046-.131.094-.2.138-.406.267-.822.512-1.247.743l-.166.092q-.663.347-1.355.635l-.125.051a15.319,15.319,0,0,1-1.457.512,15.572,15.572,0,0,1-1.635.392,15.806,15.806,0,0,1-1.678.217c-.392.03-.778.069-1.172.069C7.987,19.459.315,11.067,0,.591A22.649,22.649,0,0,1,8.639.225c3.089.4,13.89,3.21,16.214,3.832,2.036.545,4.964-2.726,4.964-2.726Z" transform="translate(47.432 19.692) rotate(180)"/>
                                <g transform="translate(12.842 8.612)">
                                  <path data-name="Path 5" className="cl-icon-parent-8" d="M11.978,8.537a2.6,2.6,0,0,1,1.9-.976H41.669a2.516,2.516,0,0,1,1.891.981s.52.342.9,2.344a9.3,9.3,0,0,0,.514,2.066.918.918,0,0,1-.819,1.259s-7.387.813-15.977.813c-8.864,0-16.528-.817-16.528-.817a1.062,1.062,0,0,1-.959-1.289s.06-.206.377-2.033C11.4,8.981,11.978,8.537,11.978,8.537Z" transform="translate(-10.667 -7.56)"/>
                                  <path data-name="Path 6" className="cl-icon-parent-9" d="M12.366,8.784l-.124.129a2.113,2.113,0,0,0-.367.726,7.393,7.393,0,0,0-.316,1.248c-.242,1.4-.353,1.965-.38,2.049a.462.462,0,0,0,.432.571l.342.035c.282.028.611.059.984.092,1.067.1,2.272.191,3.591.28,3.767.254,7.684.407,11.547.407,3.743,0,7.53-.152,11.168-.4,1.273-.089,2.436-.184,3.465-.278.616-.057,1.05-.1,1.285-.127.278-.027.394-.206.351-.366a9.815,9.815,0,0,1-.58-2.247,9.761,9.761,0,0,0-.241-1.009,2.9,2.9,0,0,0-.4-.943l-.174-.175a1.931,1.931,0,0,0-1.386-.708H13.775A2.014,2.014,0,0,0,12.366,8.784Z" transform="translate(-10.565 -7.458)"/>
                                </g>
                                <path data-name="Path-8" className="cl-icon-parent-3" d="M15.384,38.448s1.078,8.421,11.245,8.421,12.146-8.421,12.146-8.421" transform="translate(3.142 7.386)"/>
                              </g>
                              <path className="cl-icon-parent-10" d="M52.545,62.962s1.134,10.456,14.367,10.456S81.646,62.67,81.646,62.67" transform="translate(9.625 11.921)"/>
                            </g>
                            <path data-name="Fill-7" className="cl-icon-parent-2" d="M34.878.225a20.609,20.609,0,0,1-5.06,13.426,8.707,8.707,0,0,1-.742.794c-.071.07-.138.148-.212.218-.334.326-.684.631-1.041.928-.073.06-.143.125-.217.183-.369.3-.751.574-1.142.839-.065.046-.131.094-.2.138-.406.267-.822.512-1.247.743l-.166.092q-.663.347-1.355.635l-.125.051a15.34,15.34,0,0,1-1.457.512,15.572,15.572,0,0,1-1.635.392,15.814,15.814,0,0,1-1.679.217c-.392.03-.778.069-1.172.069C7.987,19.459.315,11.067,0,.591A22.649,22.649,0,0,1,8.639.225c3.089.4,13.89,3.21,16.214,3.832,2.036.545,4.964-2.726,4.964-2.726Z" transform="translate(93.91 48.358) rotate(180)"/>
                            <g data-name="Rectangle" transform="translate(59.32 37.277)">
                              <path data-name="Path 7" className="cl-icon-parent-8" d="M51.978,33.537a2.6,2.6,0,0,1,1.9-.976H81.669a2.516,2.516,0,0,1,1.891.981s.52.342.9,2.344a9.3,9.3,0,0,0,.514,2.066.918.918,0,0,1-.819,1.259s-7.387.813-15.977.813c-8.864,0-16.528-.817-16.528-.817a1.062,1.062,0,0,1-.959-1.289s.06-.206.377-2.033C51.4,33.981,51.978,33.537,51.978,33.537Z" transform="translate(-50.667 -32.56)"/>
                              <path data-name="Path 8" className="cl-icon-parent-11" d="M52.366,33.784l-.124.128a2.113,2.113,0,0,0-.367.726,7.392,7.392,0,0,0-.316,1.248c-.242,1.4-.353,1.965-.38,2.049a.462.462,0,0,0,.432.571l.342.035c.282.028.611.059.984.092,1.067.1,2.272.191,3.591.28,3.767.254,7.684.407,11.547.407,3.743,0,7.53-.152,11.168-.4,1.273-.089,2.436-.184,3.465-.278.616-.057,1.05-.1,1.285-.127.278-.027.394-.206.351-.366a9.816,9.816,0,0,1-.58-2.247,9.756,9.756,0,0,0-.241-1.01,2.9,2.9,0,0,0-.4-.943l-.174-.174a1.931,1.931,0,0,0-1.386-.708H53.775A2.013,2.013,0,0,0,52.366,33.784Z" transform="translate(-50.565 -32.458)"/>
                            </g>
                            <path data-name="Path-8" className="cl-icon-parent-3" d="M55.384,63.448s1.078,8.421,11.245,8.421,12.146-8.421,12.146-8.421" transform="translate(9.619 11.052)"/>
                          </g>
                        </g>
                        <path className="cl-icon-parent-3" d="M889.2,359.314l15.406,17.1L920.012,358.8" transform="translate(-863.599 -300.924)"/>
                      </g>
                    </svg>
                  </span>
                  <h2>{this.props.p.t('Profile.user3')}</h2>
                  <p>{this.props.p.t('Profile.userDescription3')}</p>
                </label>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <p className="uk-text-center note"><strong>{this.props.p.t('Profile.note')}</strong> {this.props.p.t('Profile.message')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  static get propTypes() {
    return {
      history: PropTypes.object,
      updateProfile: PropTypes.func,
      userProfiles: PropTypes.object.isRequired,
      postNewProfile: PropTypes.func.isRequired,
      changeProfile: PropTypes.func.isRequired,
      profile: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

ProfileClass.defaultProps = {
  history: {},
  profile: {data: [], status: null},
  updateProfile: () => {}
};

const mapStateToProps = state => {
  const {profile, athlete, parent, userProfiles} = state;
  return {
    profile,
    athlete,
    parent,
    userProfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: profile => dispatch(updateProfile({profile})),
    clearProfile: () => dispatch(clearProfile()),
    createNewRole: params => dispatch(createNewRole(params)),
    setNewProfile: profile => dispatch(setNewProfile(profile)),
    postNewProfile: params => dispatch(postNewProfile(params)),
    changeProfile: profile => dispatch(changeProfile(profile))
  };
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileClass);
export default translate(Profile);
