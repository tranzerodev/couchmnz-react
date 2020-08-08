import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {PROFILE_SSP_DEFAULT} from '../../constants/assetsPaths';
import config from '../../config';
import HeaderSearchWrapper from '../HeaderSearchWrapper';
import translate from 'redux-polyglot/translate';

import {FULFILLED} from '../../constants/ActionTypes';
import {withRouter} from 'react-router';
import {logout} from '../../actions';
import {getTotalItems} from '../../utils/shoppingCart';
import appConstants from '../../constants/appConstants';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTokenPresent: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.renderAuthFeatures = this.renderAuthFeatures.bind(this);
    this.renderCartIcon = this.renderCartIcon.bind(this);
    this.handleCartVisibility = this.handleCartVisibility.bind(this);
    this.findSSP = this.findSSP.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  handleCartVisibility() {
    const {userProfiles} = this.props;
    if (userProfiles.status === FULFILLED) {
      const {data} = userProfiles;
      const isSameUser = data.findIndex(this.findSSP);
      return isSameUser < 0;
    }
    return true;
  }

  findSSP(profile) {
    const {sspID} = this.props;
    return profile.id === sspID && profile.type === appConstants.userProfileTypes.ISP;
  }

  renderCartIcon() {
    const {userInfo, cartItemCount} = this.props;
    const shouldShowCart = this.handleCartVisibility();
    if (userInfo.status === FULFILLED && shouldShowCart) {
      return (
        <li>
          <a href={config.dashboardShoppingCart} target="_self">
            <svg className="cl-icon-cart" xmlns="http://www.w3.org/2000/svg" viewBox="-1476 701 26 26">
              <path data-name="Union 2" className="cl-icon-cart-1" d="M19.381,25.049h-.017a3.251,3.251,0,0,1,0-4.595,3.249,3.249,0,0,1,4.594,4.595,3.23,3.23,0,0,1-4.577,0ZM20.9,21.986a1.063,1.063,0,0,0-.317.757,1.082,1.082,0,0,0,1.092,1.091,1.064,1.064,0,0,0,.757-.317h.018a1.173,1.173,0,0,0,.3-.775,1.127,1.127,0,0,0-.3-.757h-.018a1.062,1.062,0,0,0-.757-.317A1.1,1.1,0,0,0,20.9,21.986ZM6.372,25.049a3.232,3.232,0,0,1-.951-2.306,3.28,3.28,0,0,1,.933-2.289h.017a3.23,3.23,0,0,1,4.577,0h.017a3.249,3.249,0,0,1-4.594,4.595Zm1.214-2.306a1.092,1.092,0,0,0,.3.775H7.9a1.064,1.064,0,0,0,.757.317,1.082,1.082,0,0,0,1.092-1.091,1.064,1.064,0,0,0-.317-.757,1.106,1.106,0,0,0-.775-.317,1.062,1.062,0,0,0-.757.317H7.886A1.05,1.05,0,0,0,7.587,22.743Zm1.866-4.331a3.171,3.171,0,0,1-2.13-.809,3.207,3.207,0,0,1-1.091-2.025L4.594,3.1a1.107,1.107,0,0,0-.369-.669L4.19,2.394a1.137,1.137,0,0,0-.669-.229H1.074A1.082,1.082,0,0,1,0,1.074,1.067,1.067,0,0,1,1.074,0H3.521A3.273,3.273,0,0,1,5.58.739L5.668.81A3.269,3.269,0,0,1,6.742,2.834l.334,2.588H24.908A1.082,1.082,0,0,1,26,6.5a1.048,1.048,0,0,1-.035.247l-1.813,9.118a3.232,3.232,0,0,1-1.127,1.813,3.271,3.271,0,0,1-2.06.739C17.163,18.343,13.273,18.413,9.453,18.413Zm11.512-2.165A1.024,1.024,0,0,0,21.652,16a.972.972,0,0,0,.37-.6l1.567-7.816H7.358l1.021,7.728a1.108,1.108,0,0,0,.37.669,1.085,1.085,0,0,0,.7.264c2.558,0,5.125-.016,7.683-.016Q19.055,16.232,20.965,16.248Z" transform="translate(-1476 701)"/>
            </svg>
            {cartItemCount > 0 &&
            <span className="cl-badge">{cartItemCount}</span>
            }
          </a>
        </li>
      );
    }
    return null;
  }

  renderAuthFeatures() {
    const {userInfo} = this.props;
    if (userInfo.status === FULFILLED) {
      return (
        <li data-uk-dropdown="{mode:'click', pos:'bottom-right'}">
          <a target="_self">
            <span className="cl-icon-profile">
              <img src={userInfo.data.profileImage ? userInfo.data.profileImage : PROFILE_SSP_DEFAULT}/>
            </span>
          </a>
          <div className="uk-dropdown cl-dropdown-profile">
            <ul>
              <li>
                <a target="_self" href={config.dashboardUrl}>
                  {this.props.p.t('loginOptions.dashboard')}
                  <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="-9499.75 -22752.947 9.5 18.293">
                    <path data-name="Path 184" className="cl-arrow-path" d="M0-.2l8.4,8,8.4-8" transform="translate(-9498.801 -22735.405) rotate(-90)"/>
                  </svg>
                </a>
              </li>
              <li><a onClick={this.handleLogout}>{this.props.p.t('Header.sign_out')}</a></li>
            </ul>
          </div>
        </li>
      );
    }
    return (
      <span>
        <li><a href={config.registerUrl} id="signup_link">{this.props.p.t('loginOptions.signUp')}</a></li>
        <li><a href={config.dashboardLoginUrl} id="signin_link">{this.props.p.t('loginOptions.signIn')}</a></li>
      </span>
    );
  }

  render() {
    return (
      <header className="cl-header-ab" >
        <div className="uk-grid uk-grid-collapse">
          <div className="uk-width-6-10 uk-width-small-6-10 uk-width-medium-3-10 uk-width-large-2-10 uk-width-xlarge-2-10">
            <a target="_self" href={config.baseURL} className="cl-logo-link">
              <svg className="cl-logo" xmlns="http://www.w3.org/2000/svg" viewBox="424.098 1014 169.902 40.108">
                <g transform="translate(424 1013.717)">
                  <path className="cl-logo-001" d="M101.267,27.128a47.481,47.481,0,0,1,1.308-4.648c1.034-2.642,2.207-5.232,3.387-7.813a2.131,2.131,0,0,1,1.145-1.128,2.424,2.424,0,0,1,1.8.273c.251.174.139,1.046.007,1.556a4.658,4.658,0,0,1-.752,1.376,31.622,31.622,0,0,0-4.015,9.344,3.67,3.67,0,0,0-.132.962c-.01,1.106.455,1.493,1.429,1.019.832-.407,2.141-.507,1.787-2.08-.061-.269.528-.941.875-.988a2.11,2.11,0,0,1,1.6.445,23.613,23.613,0,0,1,1.462,2.229,16.623,16.623,0,0,0,1.509,1.561c.126-.077.254-.154.379-.231-.118-.814-.238-1.628-.353-2.442-.286-2.01-.62-4.016-.838-6.033a7.828,7.828,0,0,1,1.879-6.23,3.717,3.717,0,0,1,4.185-1.168,3.217,3.217,0,0,1,2.371,3.173c.013.155.041.308.054.4.759.2,1.459.378,2.152.581.755.222,1.163.023,1.455-.781.939-2.591,1.946-5.16,2.98-7.716.692-1.713,1.712-2,3.427-1.043-.426,3.68-3.125,6.463-4.168,10.393,1.8-.608,3.346-1.117,4.879-1.654.342-.118.675-.5.97-.461A12.217,12.217,0,0,1,134,16.6c-.3.47-.5,1.2-.925,1.366-2.106.83-4.248,1.589-6.424,2.213a2.322,2.322,0,0,0-1.817,1.72c-.745,2.613-1.5,5.222-2.235,7.837-.338,1.206-.9,1.661-1.845,1.443-1.047-.241-1.421-.9-1.048-2.174q1.14-3.913,2.424-7.783c.23-.691.218-1.079-.443-1.5a13.466,13.466,0,0,1-1.693-1.527c-.088.155-.224.369-.333.6-.389.8-.9,1.267-1.81.7a1.324,1.324,0,0,1-.55-1.949,4.147,4.147,0,0,0,.281-1.86c-.01-.266-.4-.629-.691-.731-.179-.063-.549.243-.752.458-2.011,2.129-1.713,4.666-1.279,7.24.335,2,.648,4.01.9,6.024a2.419,2.419,0,0,1-3.529,2.575,32.325,32.325,0,0,1-3.506-2.318,19.833,19.833,0,0,1-3.762,1.949c-1.816.52-2.463-1.119-3.244-2.393a2.123,2.123,0,0,1-.468.281c-2.881.809-5.76,1.629-8.651,2.4-.859.228-1.76.291-2.639.449a3.375,3.375,0,0,1-3.633-1.893,2.093,2.093,0,0,1-.022-1.614c1.826-4.72,3.674-9.434,5.6-14.116.815-1.987,1.846-3.885,2.724-5.847a1.183,1.183,0,0,1,1.845-.672c.835.384,1.961.562,1.267,1.913-.845,1.646-1.852,3.218-2.579,4.913-1.835,4.285-3.563,8.617-5.3,12.945-.164.409-.257,1.185-.054,1.329a1.879,1.879,0,0,0,1.448.149A63.377,63.377,0,0,0,97.373,26.7c1.5-.621,2.791-.763,3.894.432" transform="translate(35.902 2.611)"/>
                  <path className="cl-logo-002" d="M91.871,31.781c-.24,1.186-1.2,1.2-2,1.287a2.593,2.593,0,0,1-2.626-1.8,8.973,8.973,0,0,1-.137-3.477c.408-2.048,1.1-4.039,1.776-6.4-.834,1.032-1.5,1.8-2.11,2.622-1.666,2.254-3.267,4.558-4.968,6.786-1.021,1.338-2.095,1.441-3.34.391A1.517,1.517,0,0,1,78.123,30a24.914,24.914,0,0,1,.68-2.67c-1.36,1.048-2.4,1.961-3.543,2.7A15.076,15.076,0,0,1,71.526,32a3.637,3.637,0,0,1-4.6-4.408,11.243,11.243,0,0,1,.646-2.341,26.925,26.925,0,0,1,5.743-8.683c1.671-1.573,2.808-1.8,5.267-.4a1.623,1.623,0,0,1,.707,2.195c-.33.953-.653,1.911-1.056,2.834a1.061,1.061,0,0,1-.757.573,1.876,1.876,0,0,1-1.57-2.619,2.62,2.62,0,0,0,.225-1.453,2.792,2.792,0,0,0-.654.377,24.411,24.411,0,0,0-6.008,9.629,7.077,7.077,0,0,0-.084,1.864,5.682,5.682,0,0,0,1.97-.105,30.75,30.75,0,0,0,3.488-1.947c1.436-.869,2.62-2.214,4.481-2.278.172-.006.378-.353.492-.578,3.31-6.6,6.6-13.21,9.943-19.789a1.979,1.979,0,0,1,1.407-.991c.576,0,1.493.428,1.636.873a2.437,2.437,0,0,1-.521,1.935C87.5,12.436,85.244,19.5,82.2,26.173c1.176-1.505,2.317-3.041,3.538-4.51,1.428-1.72,2.919-3.389,4.4-5.064.264-.3.605-.721.929-.737a3.785,3.785,0,0,1,2.274.3c.318.239.133,1.411-.1,2.069-.939,2.669-2.024,5.286-2.965,7.953a9.132,9.132,0,0,0-.368,2.523c-.107,1.935.163,2.333,1.963,3.071" transform="translate(27.817 1.217)"/>
                  <path className="cl-logo-003" d="M49.021,9.068a10.711,10.711,0,0,0-2.7,1.38,29.571,29.571,0,0,0-8.818,15.4,2.709,2.709,0,0,0,1.124,3,2.254,2.254,0,0,0,2.733-.2c1.606-1.087,3.109-2.329,4.647-3.517a5.9,5.9,0,0,1,1.021-.855,1.81,1.81,0,0,1,2.327.377c.728.88-.2,1.231-.63,1.647a43.5,43.5,0,0,1-4.07,3.672,6.845,6.845,0,0,1-8.487.009,3.032,3.032,0,0,1-1.426-2.683,25.931,25.931,0,0,1,.909-5.954A27.558,27.558,0,0,1,43.684,9.03a7.617,7.617,0,0,1,5.054-2.1,3.355,3.355,0,0,1,3.222,4.724c-.3.71-.607,1.418-.889,2.136a1.632,1.632,0,0,1-2.478.816c-1.018-.478-1.136-1.042-.525-2.2.5-.942.944-1.912,1.413-2.87l-.459-.47" transform="translate(14.389 2.496)"/>
                  <path className="cl-logo-004" d="M57.236,24.925c.093.979.476,1.328,1.24,1.019a3.576,3.576,0,0,0,1.023-.638c3.461-3.1,7.376-5.76,9.708-9.952A4.677,4.677,0,0,0,69.5,14.1c-.448-.035-.984-.25-1.331-.078-4.3,2.123-7.976,4.961-10.3,9.278a12.421,12.421,0,0,0-.632,1.627M73.1,14.664c-2.761,4.2-6.085,8.275-4.077,13.924-1.5,1.035-2.76.59-3.172-1.228a10.327,10.327,0,0,1-.236-1.931c-.022-.6.066-1.209.125-2.1-.513.425-.855.721-1.21,1C62.947,25.585,61.4,26.9,59.75,28.066a2.366,2.366,0,0,1-3.106-.195c-1.174-.936-1.965-1.919-1.71-3.49a13.5,13.5,0,0,1,3.178-6.09,18.758,18.758,0,0,1,9.024-6.374c1.735-.572,2.789-.153,3.943,1.247a10.543,10.543,0,0,0,2.025,1.5" transform="translate(22.821 4.479)"/>
                  <path className="cl-logo-005" d="M53.93,13.782a9.459,9.459,0,0,0-1.06.964,19.268,19.268,0,0,0-4.265,8.227A4.228,4.228,0,0,0,48.55,24.9a2.734,2.734,0,0,0,1.076,1.351c.168.116.869-.243,1.09-.553,1.764-2.479,3.513-4.984,4.054-8.074a4.009,4.009,0,0,0-.839-3.837m-7.893,9.57c.132-3.125,1.622-5.676,3.364-8.1a19.409,19.409,0,0,1,2.376-2.771c1.9-1.8,3.827-1.458,4.98.85a2.144,2.144,0,0,0,2.279,1.237,31.279,31.279,0,0,1,3.511.075c.295.021.564.388.845.6-.234.243-.427.626-.709.708a35.114,35.114,0,0,1-4.1,1.023,1.134,1.134,0,0,0-1.117.986c-.866,3.282-2,6.447-4.451,8.943-.983,1-1.926,2.289-3.6,1.741a4.348,4.348,0,0,1-3.273-3.84c-.05-.485-.075-.972-.109-1.445" transform="translate(19.119 4.338)"/>
                  <path className="cl-logo-006" d="M104.3,6.2c1.238.011,1.892.574,1.847,1.588a3.344,3.344,0,0,1-2.486,2.347,1.718,1.718,0,0,1-1.587-1.94c.021-1.311.8-2.009,2.227-2" transform="translate(42.56 2.191)"/>
                  <path className="cl-logo-007" d="M33.828,20.873s-.026.094-.078.277-.134.47-.247.832A30.85,30.85,0,0,1,32.36,25.06a29.061,29.061,0,0,1-2.438,4.481,24.372,24.372,0,0,1-4.369,4.984,20.5,20.5,0,0,1-3.107,2.219,17.141,17.141,0,0,1-3.772,1.629A15.346,15.346,0,0,1,9.85,38.32a13.428,13.428,0,0,1-2.185-.9A12.967,12.967,0,0,1,2.456,32.41,15.351,15.351,0,0,1,.709,27.8a16.765,16.765,0,0,1-.324-2.456Q.347,24.721.352,24.1T.4,22.867A21.107,21.107,0,0,1,9.692,6.8a20.685,20.685,0,0,1,1.953-1.157,19.191,19.191,0,0,1,2.035-.906A17.357,17.357,0,0,1,17.866,3.71c.177-.02.343-.035.53-.051.169-.011.326-.025.508-.032.356-.02.694-.021,1.039-.017a15.838,15.838,0,0,1,2.02.169,11.906,11.906,0,0,1,3.693,1.193A9.491,9.491,0,0,1,28.52,7.215a9.253,9.253,0,0,1,.989,1.4,8.847,8.847,0,0,1,.668,1.486A9.757,9.757,0,0,1,30.687,13a12.383,12.383,0,0,1-.2,2.465,16.172,16.172,0,0,1-1,3.271c-.073.183-.146.341-.206.478s-.114.251-.157.341l-.132.278a1.188,1.188,0,1,1-2.144-1.021,1.211,1.211,0,0,1,.061-.113l.012-.02.142-.229c.048-.075.106-.17.171-.284s.145-.244.225-.4c.168-.3.353-.68.551-1.133a11.779,11.779,0,0,0,.554-1.6c.076-.305.154-.628.207-.969a9.685,9.685,0,0,0,.105-1.076,7.473,7.473,0,0,0-.279-2.386A6.992,6.992,0,0,0,27.35,8.185a8.035,8.035,0,0,0-2.36-1.973A10.367,10.367,0,0,0,21.748,5.1a12.1,12.1,0,0,0-1.83-.175c-.31,0-.633,0-.94.013-.15,0-.326.02-.49.03-.147.012-.316.028-.474.045a13.586,13.586,0,0,0-1.928.357A15.75,15.75,0,0,0,14.171,6a17.145,17.145,0,0,0-3.637,2.013A20.244,20.244,0,0,0,3.863,16.5c-.145.342-.277.689-.407,1.039s-.243.7-.348,1.061a20.9,20.9,0,0,0-.52,2.179c-.069.367-.125.738-.173,1.109-.021.185-.048.374-.062.554l-.026.273L2.3,23a17.982,17.982,0,0,0-.031,2.23,16.982,16.982,0,0,0,.256,2.2,14.728,14.728,0,0,0,1.454,4.1,11.448,11.448,0,0,0,2.7,3.28,11.03,11.03,0,0,0,3.648,1.99,13.087,13.087,0,0,0,4.028.612,13.647,13.647,0,0,0,3.867-.571,15.594,15.594,0,0,0,3.418-1.489,18.077,18.077,0,0,0,2.85-2.057,22.7,22.7,0,0,0,4.02-4.691,25.863,25.863,0,0,0,2.223-4.243,27.314,27.314,0,0,0,1.016-2.915c.1-.343.164-.593.212-.784l.071-.279a.928.928,0,1,1,1.8.457c0,.006,0,.016-.006.022" transform="translate(0.008 1.108)"/>
                  <path className="cl-logo-008" d="M14.083,10.386c-.066.206-.12.41-.18.621s-.114.418-.167.628q-.158.628-.294,1.258l-.033.158-.008.04,0,.025,0,.009,0,.02-.019.077-.073.314-.161.653-.317,1.254c-.208.831-.4,1.661-.574,2.5-.086.419-.165.839-.235,1.261-.034.212-.068.423-.1.637s-.057.426-.076.645l-1.211-1.5c.162.024.311.045.464.06s.3.033.452.043q.449.034.9.049c.149,0,.3.007.447.008s.3,0,.448,0c.3,0,.595-.006.894,0l1.793-.008.45-.008c.15,0,.3,0,.451,0q.452,0,.908-.025a1.2,1.2,0,1,1,.122,2.391,1.243,1.243,0,0,1-.3-.021l-.035-.007q-.421-.087-.846-.153c-.142-.022-.284-.046-.425-.064l-.428-.048c-.286-.029-.573-.056-.859-.078s-.576-.03-.864-.041c-.144-.006-.287-.012-.432-.013l-.432,0c-.145,0-.288,0-.433,0s-.288.012-.432.021c-.288.017-.575.044-.861.087-.144.02-.286.044-.427.073a4.022,4.022,0,0,0-.415.1A1.036,1.036,0,0,1,9.529,19.9l.027-.056c.1-.189.18-.386.264-.581s.163-.394.24-.591q.231-.593.428-1.2c.134-.4.257-.806.373-1.212.055-.2.116-.406.166-.609s.107-.408.154-.612.1-.408.14-.613.088-.409.124-.612.069-.4.1-.592c.016-.1.027-.209.04-.312l.009-.079,0-.02V12.8c0,.006,0-.017,0,.013v0l0-.039.015-.157q.056-.628.09-1.257c.011-.21.021-.42.025-.63s.007-.425,0-.639v-.035a1.205,1.205,0,0,1,2.409-.063,1.245,1.245,0,0,1-.057.4" transform="translate(3.802 3.285)"/>
                  <path className="cl-logo-009" d="M14.063,2.861A1.185,1.185,0,0,1,13.7.549a8.778,8.778,0,0,1,3.824-.1,1.186,1.186,0,0,1-.708,2.263A7.354,7.354,0,0,0,14.43,2.8a1.177,1.177,0,0,1-.367.059" transform="translate(5.248 -0.283)"/>
                  <path className="cl-logo-010" d="M1.284,11.117A1.187,1.187,0,0,1,.136,9.635,5.691,5.691,0,0,1,2.42,6.387,1.133,1.133,0,0,1,4.3,6.635c.637,1.052-.617,1.756-.617,1.756a3.418,3.418,0,0,0-1.256,1.837,1.186,1.186,0,0,1-1.147.889" transform="translate(-0.098 2.096)"/>
                  <path className="cl-logo-011" d="M34.146,20.932s-.026.094-.077.275-.133.467-.245.825a30.933,30.933,0,0,1-1.134,3.057,28.926,28.926,0,0,1-2.42,4.448,24.217,24.217,0,0,1-4.337,4.947,20.35,20.35,0,0,1-3.084,2.2A17.044,17.044,0,0,1,19.1,38.3a15.219,15.219,0,0,1-8.759-.051,13.434,13.434,0,0,1-2.17-.9A12.878,12.878,0,0,1,3,32.385,15.241,15.241,0,0,1,1.27,27.8a16.668,16.668,0,0,1-.321-2.438c-.026-.409-.036-.819-.034-1.228s.016-.818.048-1.226a20.843,20.843,0,0,1,11.163-17.1,19.017,19.017,0,0,1,2.02-.9A17.237,17.237,0,0,1,18.3,3.9c.176-.02.341-.035.526-.05.169-.011.325-.026.506-.032.353-.02.688-.021,1.031-.017a15.618,15.618,0,0,1,2.006.168A11.808,11.808,0,0,1,26.035,5.15a9.411,9.411,0,0,1,2.842,2.226,9.176,9.176,0,0,1,.981,1.394,8.785,8.785,0,0,1,.663,1.475,9.665,9.665,0,0,1,.506,2.87,12.2,12.2,0,0,1-.2,2.447,15.975,15.975,0,0,1-.992,3.248c-.073.182-.144.338-.2.474s-.113.249-.156.339l-.131.275a1.179,1.179,0,1,1-2.128-1.014,1.123,1.123,0,0,1,.06-.111l.013-.02.141-.228c.047-.075.1-.169.169-.282s.143-.243.223-.392c.167-.3.351-.675.546-1.126a11.486,11.486,0,0,0,.551-1.585c.076-.3.152-.623.205-.962a9.756,9.756,0,0,0,.1-1.068,7.384,7.384,0,0,0-.277-2.368,6.924,6.924,0,0,0-1.236-2.4,7.966,7.966,0,0,0-2.342-1.958,10.307,10.307,0,0,0-3.22-1.1A12.054,12.054,0,0,0,20.338,5.1c-.308,0-.629,0-.934.012-.149,0-.323.02-.487.03-.146.012-.313.028-.469.045a13.556,13.556,0,0,0-1.915.354,15.718,15.718,0,0,0-1.9.62,17.086,17.086,0,0,0-3.611,2A20.107,20.107,0,0,0,4.4,16.59c-.143.34-.275.685-.4,1.032s-.243.7-.346,1.054a20.607,20.607,0,0,0-.517,2.163c-.069.365-.124.732-.173,1.1-.021.183-.047.371-.062.55l-.026.27-.021.29a17.876,17.876,0,0,0-.03,2.212,16.715,16.715,0,0,0,.254,2.184A14.624,14.624,0,0,0,4.52,31.52,11.381,11.381,0,0,0,7.2,34.776a10.946,10.946,0,0,0,3.621,1.976,13.014,13.014,0,0,0,4,.606,13.55,13.55,0,0,0,3.838-.565,15.547,15.547,0,0,0,3.393-1.478,17.976,17.976,0,0,0,2.828-2.041,22.577,22.577,0,0,0,3.991-4.657,25.6,25.6,0,0,0,2.206-4.211,26.847,26.847,0,0,0,1.008-2.894c.1-.341.163-.589.211-.778s.07-.277.07-.277a.921.921,0,1,1,1.785.453.216.216,0,0,1-.006.022" transform="translate(0.244 1.186)"/>
                </g>
              </svg>
            </a>
          </div>

          <div className="uk-width-xlarge-4-10 cl-Search-Col">
            <HeaderSearchWrapper/>
          </div>
          <div className="uk-width-4-10 uk-width-small-4-10 uk-width-medium-7-10 uk-width-large-8-10 uk-width-xlarge-4-10">
            <ul className="navigation uk-hidden-small">

              <li className="cl-ico-search">
                <a data-uk-toggle="{target:'#cl-search-box'}">
                  <svg className="cl-icon-search" xmlns="http://www.w3.org/2000/svg" viewBox="-4714 1650 31.708 31.707">
                    <g data-name="Group 981" transform="translate(-6112 1631)">
                      <g data-name="Ellipse 23" className="cl-icon-search-1" transform="translate(1398 19)">
                        <ellipse className="cl-icon-search-2" cx="11.707" cy="11.707" rx="11.707" ry="11.707"/>
                        <ellipse className="cl-icon-search-3" cx="11.707" cy="11.707" rx="10.707" ry="10.707"/>
                      </g>
                      <line data-name="Line 5" className="cl-icon-search-1" x2="11.707" y2="11.707" transform="translate(1417.293 38.293)"/>
                    </g>
                  </svg>
                </a>
              </li>
              {
                this.renderCartIcon()
              }
              {
                this.renderAuthFeatures()
              }
            </ul>
            <div className="cl-mobile-main-menu">
              <button className="uk-button" data-uk-offcanvas="{target:'#cl-mobile-mainmenu-side', mode:'reveal'}">
                <svg className="cl-icon-bars" data-name="Group 2378" xmlns="http://www.w3.org/2000/svg" viewBox="-14188 -1515 40 33">
                  <rect data-name="Rectangle 2308" className="cl-icon-bar-1" width={40} height={3} rx="1.5" transform="translate(-14188 -1515)"/>
                  <rect data-name="Rectangle 2309" className="cl-icon-bar-2" width={40} height={3} rx="1.5" transform="translate(-14188 -1500)"/>
                  <rect data-name="Rectangle 2310" className="cl-icon-bar-3" width={40} height={3} rx="1.5" transform="translate(-14188 -1485)"/>
                </svg>
              </button>
              <div id="cl-mobile-mainmenu-side" className="uk-offcanvas">
                <div className="uk-offcanvas-bar uk-offcanvas-bar-flip">
                  <ul className="uk-nav uk-nav-dropdown" data-uk-nav="{multiple:true}">
                    <li className="cl-mobile-main-menu-logo">
                      <a href={config.baseURL} className="cl-logo-link">
                        <svg className="cl-logo" xmlns="http://www.w3.org/2000/svg" viewBox="424.098 1014 169.902 40.108">
                          <g transform="translate(424 1013.717)">
                            <path className="cl-logo-001" d="M101.267,27.128a47.481,47.481,0,0,1,1.308-4.648c1.034-2.642,2.207-5.232,3.387-7.813a2.131,2.131,0,0,1,1.145-1.128,2.424,2.424,0,0,1,1.8.273c.251.174.139,1.046.007,1.556a4.658,4.658,0,0,1-.752,1.376,31.622,31.622,0,0,0-4.015,9.344,3.67,3.67,0,0,0-.132.962c-.01,1.106.455,1.493,1.429,1.019.832-.407,2.141-.507,1.787-2.08-.061-.269.528-.941.875-.988a2.11,2.11,0,0,1,1.6.445,23.613,23.613,0,0,1,1.462,2.229,16.623,16.623,0,0,0,1.509,1.561c.126-.077.254-.154.379-.231-.118-.814-.238-1.628-.353-2.442-.286-2.01-.62-4.016-.838-6.033a7.828,7.828,0,0,1,1.879-6.23,3.717,3.717,0,0,1,4.185-1.168,3.217,3.217,0,0,1,2.371,3.173c.013.155.041.308.054.4.759.2,1.459.378,2.152.581.755.222,1.163.023,1.455-.781.939-2.591,1.946-5.16,2.98-7.716.692-1.713,1.712-2,3.427-1.043-.426,3.68-3.125,6.463-4.168,10.393,1.8-.608,3.346-1.117,4.879-1.654.342-.118.675-.5.97-.461A12.217,12.217,0,0,1,134,16.6c-.3.47-.5,1.2-.925,1.366-2.106.83-4.248,1.589-6.424,2.213a2.322,2.322,0,0,0-1.817,1.72c-.745,2.613-1.5,5.222-2.235,7.837-.338,1.206-.9,1.661-1.845,1.443-1.047-.241-1.421-.9-1.048-2.174q1.14-3.913,2.424-7.783c.23-.691.218-1.079-.443-1.5a13.466,13.466,0,0,1-1.693-1.527c-.088.155-.224.369-.333.6-.389.8-.9,1.267-1.81.7a1.324,1.324,0,0,1-.55-1.949,4.147,4.147,0,0,0,.281-1.86c-.01-.266-.4-.629-.691-.731-.179-.063-.549.243-.752.458-2.011,2.129-1.713,4.666-1.279,7.24.335,2,.648,4.01.9,6.024a2.419,2.419,0,0,1-3.529,2.575,32.325,32.325,0,0,1-3.506-2.318,19.833,19.833,0,0,1-3.762,1.949c-1.816.52-2.463-1.119-3.244-2.393a2.123,2.123,0,0,1-.468.281c-2.881.809-5.76,1.629-8.651,2.4-.859.228-1.76.291-2.639.449a3.375,3.375,0,0,1-3.633-1.893,2.093,2.093,0,0,1-.022-1.614c1.826-4.72,3.674-9.434,5.6-14.116.815-1.987,1.846-3.885,2.724-5.847a1.183,1.183,0,0,1,1.845-.672c.835.384,1.961.562,1.267,1.913-.845,1.646-1.852,3.218-2.579,4.913-1.835,4.285-3.563,8.617-5.3,12.945-.164.409-.257,1.185-.054,1.329a1.879,1.879,0,0,0,1.448.149A63.377,63.377,0,0,0,97.373,26.7c1.5-.621,2.791-.763,3.894.432" transform="translate(35.902 2.611)"/>
                            <path className="cl-logo-002" d="M91.871,31.781c-.24,1.186-1.2,1.2-2,1.287a2.593,2.593,0,0,1-2.626-1.8,8.973,8.973,0,0,1-.137-3.477c.408-2.048,1.1-4.039,1.776-6.4-.834,1.032-1.5,1.8-2.11,2.622-1.666,2.254-3.267,4.558-4.968,6.786-1.021,1.338-2.095,1.441-3.34.391A1.517,1.517,0,0,1,78.123,30a24.914,24.914,0,0,1,.68-2.67c-1.36,1.048-2.4,1.961-3.543,2.7A15.076,15.076,0,0,1,71.526,32a3.637,3.637,0,0,1-4.6-4.408,11.243,11.243,0,0,1,.646-2.341,26.925,26.925,0,0,1,5.743-8.683c1.671-1.573,2.808-1.8,5.267-.4a1.623,1.623,0,0,1,.707,2.195c-.33.953-.653,1.911-1.056,2.834a1.061,1.061,0,0,1-.757.573,1.876,1.876,0,0,1-1.57-2.619,2.62,2.62,0,0,0,.225-1.453,2.792,2.792,0,0,0-.654.377,24.411,24.411,0,0,0-6.008,9.629,7.077,7.077,0,0,0-.084,1.864,5.682,5.682,0,0,0,1.97-.105,30.75,30.75,0,0,0,3.488-1.947c1.436-.869,2.62-2.214,4.481-2.278.172-.006.378-.353.492-.578,3.31-6.6,6.6-13.21,9.943-19.789a1.979,1.979,0,0,1,1.407-.991c.576,0,1.493.428,1.636.873a2.437,2.437,0,0,1-.521,1.935C87.5,12.436,85.244,19.5,82.2,26.173c1.176-1.505,2.317-3.041,3.538-4.51,1.428-1.72,2.919-3.389,4.4-5.064.264-.3.605-.721.929-.737a3.785,3.785,0,0,1,2.274.3c.318.239.133,1.411-.1,2.069-.939,2.669-2.024,5.286-2.965,7.953a9.132,9.132,0,0,0-.368,2.523c-.107,1.935.163,2.333,1.963,3.071" transform="translate(27.817 1.217)"/>
                            <path className="cl-logo-003" d="M49.021,9.068a10.711,10.711,0,0,0-2.7,1.38,29.571,29.571,0,0,0-8.818,15.4,2.709,2.709,0,0,0,1.124,3,2.254,2.254,0,0,0,2.733-.2c1.606-1.087,3.109-2.329,4.647-3.517a5.9,5.9,0,0,1,1.021-.855,1.81,1.81,0,0,1,2.327.377c.728.88-.2,1.231-.63,1.647a43.5,43.5,0,0,1-4.07,3.672,6.845,6.845,0,0,1-8.487.009,3.032,3.032,0,0,1-1.426-2.683,25.931,25.931,0,0,1,.909-5.954A27.558,27.558,0,0,1,43.684,9.03a7.617,7.617,0,0,1,5.054-2.1,3.355,3.355,0,0,1,3.222,4.724c-.3.71-.607,1.418-.889,2.136a1.632,1.632,0,0,1-2.478.816c-1.018-.478-1.136-1.042-.525-2.2.5-.942.944-1.912,1.413-2.87l-.459-.47" transform="translate(14.389 2.496)"/>
                            <path className="cl-logo-004" d="M57.236,24.925c.093.979.476,1.328,1.24,1.019a3.576,3.576,0,0,0,1.023-.638c3.461-3.1,7.376-5.76,9.708-9.952A4.677,4.677,0,0,0,69.5,14.1c-.448-.035-.984-.25-1.331-.078-4.3,2.123-7.976,4.961-10.3,9.278a12.421,12.421,0,0,0-.632,1.627M73.1,14.664c-2.761,4.2-6.085,8.275-4.077,13.924-1.5,1.035-2.76.59-3.172-1.228a10.327,10.327,0,0,1-.236-1.931c-.022-.6.066-1.209.125-2.1-.513.425-.855.721-1.21,1C62.947,25.585,61.4,26.9,59.75,28.066a2.366,2.366,0,0,1-3.106-.195c-1.174-.936-1.965-1.919-1.71-3.49a13.5,13.5,0,0,1,3.178-6.09,18.758,18.758,0,0,1,9.024-6.374c1.735-.572,2.789-.153,3.943,1.247a10.543,10.543,0,0,0,2.025,1.5" transform="translate(22.821 4.479)"/>
                            <path className="cl-logo-005" d="M53.93,13.782a9.459,9.459,0,0,0-1.06.964,19.268,19.268,0,0,0-4.265,8.227A4.228,4.228,0,0,0,48.55,24.9a2.734,2.734,0,0,0,1.076,1.351c.168.116.869-.243,1.09-.553,1.764-2.479,3.513-4.984,4.054-8.074a4.009,4.009,0,0,0-.839-3.837m-7.893,9.57c.132-3.125,1.622-5.676,3.364-8.1a19.409,19.409,0,0,1,2.376-2.771c1.9-1.8,3.827-1.458,4.98.85a2.144,2.144,0,0,0,2.279,1.237,31.279,31.279,0,0,1,3.511.075c.295.021.564.388.845.6-.234.243-.427.626-.709.708a35.114,35.114,0,0,1-4.1,1.023,1.134,1.134,0,0,0-1.117.986c-.866,3.282-2,6.447-4.451,8.943-.983,1-1.926,2.289-3.6,1.741a4.348,4.348,0,0,1-3.273-3.84c-.05-.485-.075-.972-.109-1.445" transform="translate(19.119 4.338)"/>
                            <path className="cl-logo-006" d="M104.3,6.2c1.238.011,1.892.574,1.847,1.588a3.344,3.344,0,0,1-2.486,2.347,1.718,1.718,0,0,1-1.587-1.94c.021-1.311.8-2.009,2.227-2" transform="translate(42.56 2.191)"/>
                            <path className="cl-logo-007" d="M33.828,20.873s-.026.094-.078.277-.134.47-.247.832A30.85,30.85,0,0,1,32.36,25.06a29.061,29.061,0,0,1-2.438,4.481,24.372,24.372,0,0,1-4.369,4.984,20.5,20.5,0,0,1-3.107,2.219,17.141,17.141,0,0,1-3.772,1.629A15.346,15.346,0,0,1,9.85,38.32a13.428,13.428,0,0,1-2.185-.9A12.967,12.967,0,0,1,2.456,32.41,15.351,15.351,0,0,1,.709,27.8a16.765,16.765,0,0,1-.324-2.456Q.347,24.721.352,24.1T.4,22.867A21.107,21.107,0,0,1,9.692,6.8a20.685,20.685,0,0,1,1.953-1.157,19.191,19.191,0,0,1,2.035-.906A17.357,17.357,0,0,1,17.866,3.71c.177-.02.343-.035.53-.051.169-.011.326-.025.508-.032.356-.02.694-.021,1.039-.017a15.838,15.838,0,0,1,2.02.169,11.906,11.906,0,0,1,3.693,1.193A9.491,9.491,0,0,1,28.52,7.215a9.253,9.253,0,0,1,.989,1.4,8.847,8.847,0,0,1,.668,1.486A9.757,9.757,0,0,1,30.687,13a12.383,12.383,0,0,1-.2,2.465,16.172,16.172,0,0,1-1,3.271c-.073.183-.146.341-.206.478s-.114.251-.157.341l-.132.278a1.188,1.188,0,1,1-2.144-1.021,1.211,1.211,0,0,1,.061-.113l.012-.02.142-.229c.048-.075.106-.17.171-.284s.145-.244.225-.4c.168-.3.353-.68.551-1.133a11.779,11.779,0,0,0,.554-1.6c.076-.305.154-.628.207-.969a9.685,9.685,0,0,0,.105-1.076,7.473,7.473,0,0,0-.279-2.386A6.992,6.992,0,0,0,27.35,8.185a8.035,8.035,0,0,0-2.36-1.973A10.367,10.367,0,0,0,21.748,5.1a12.1,12.1,0,0,0-1.83-.175c-.31,0-.633,0-.94.013-.15,0-.326.02-.49.03-.147.012-.316.028-.474.045a13.586,13.586,0,0,0-1.928.357A15.75,15.75,0,0,0,14.171,6a17.145,17.145,0,0,0-3.637,2.013A20.244,20.244,0,0,0,3.863,16.5c-.145.342-.277.689-.407,1.039s-.243.7-.348,1.061a20.9,20.9,0,0,0-.52,2.179c-.069.367-.125.738-.173,1.109-.021.185-.048.374-.062.554l-.026.273L2.3,23a17.982,17.982,0,0,0-.031,2.23,16.982,16.982,0,0,0,.256,2.2,14.728,14.728,0,0,0,1.454,4.1,11.448,11.448,0,0,0,2.7,3.28,11.03,11.03,0,0,0,3.648,1.99,13.087,13.087,0,0,0,4.028.612,13.647,13.647,0,0,0,3.867-.571,15.594,15.594,0,0,0,3.418-1.489,18.077,18.077,0,0,0,2.85-2.057,22.7,22.7,0,0,0,4.02-4.691,25.863,25.863,0,0,0,2.223-4.243,27.314,27.314,0,0,0,1.016-2.915c.1-.343.164-.593.212-.784l.071-.279a.928.928,0,1,1,1.8.457c0,.006,0,.016-.006.022" transform="translate(0.008 1.108)"/>
                            <path className="cl-logo-008" d="M14.083,10.386c-.066.206-.12.41-.18.621s-.114.418-.167.628q-.158.628-.294,1.258l-.033.158-.008.04,0,.025,0,.009,0,.02-.019.077-.073.314-.161.653-.317,1.254c-.208.831-.4,1.661-.574,2.5-.086.419-.165.839-.235,1.261-.034.212-.068.423-.1.637s-.057.426-.076.645l-1.211-1.5c.162.024.311.045.464.06s.3.033.452.043q.449.034.9.049c.149,0,.3.007.447.008s.3,0,.448,0c.3,0,.595-.006.894,0l1.793-.008.45-.008c.15,0,.3,0,.451,0q.452,0,.908-.025a1.2,1.2,0,1,1,.122,2.391,1.243,1.243,0,0,1-.3-.021l-.035-.007q-.421-.087-.846-.153c-.142-.022-.284-.046-.425-.064l-.428-.048c-.286-.029-.573-.056-.859-.078s-.576-.03-.864-.041c-.144-.006-.287-.012-.432-.013l-.432,0c-.145,0-.288,0-.433,0s-.288.012-.432.021c-.288.017-.575.044-.861.087-.144.02-.286.044-.427.073a4.022,4.022,0,0,0-.415.1A1.036,1.036,0,0,1,9.529,19.9l.027-.056c.1-.189.18-.386.264-.581s.163-.394.24-.591q.231-.593.428-1.2c.134-.4.257-.806.373-1.212.055-.2.116-.406.166-.609s.107-.408.154-.612.1-.408.14-.613.088-.409.124-.612.069-.4.1-.592c.016-.1.027-.209.04-.312l.009-.079,0-.02V12.8c0,.006,0-.017,0,.013v0l0-.039.015-.157q.056-.628.09-1.257c.011-.21.021-.42.025-.63s.007-.425,0-.639v-.035a1.205,1.205,0,0,1,2.409-.063,1.245,1.245,0,0,1-.057.4" transform="translate(3.802 3.285)"/>
                            <path className="cl-logo-009" d="M14.063,2.861A1.185,1.185,0,0,1,13.7.549a8.778,8.778,0,0,1,3.824-.1,1.186,1.186,0,0,1-.708,2.263A7.354,7.354,0,0,0,14.43,2.8a1.177,1.177,0,0,1-.367.059" transform="translate(5.248 -0.283)"/>
                            <path className="cl-logo-010" d="M1.284,11.117A1.187,1.187,0,0,1,.136,9.635,5.691,5.691,0,0,1,2.42,6.387,1.133,1.133,0,0,1,4.3,6.635c.637,1.052-.617,1.756-.617,1.756a3.418,3.418,0,0,0-1.256,1.837,1.186,1.186,0,0,1-1.147.889" transform="translate(-0.098 2.096)"/>
                            <path className="cl-logo-011" d="M34.146,20.932s-.026.094-.077.275-.133.467-.245.825a30.933,30.933,0,0,1-1.134,3.057,28.926,28.926,0,0,1-2.42,4.448,24.217,24.217,0,0,1-4.337,4.947,20.35,20.35,0,0,1-3.084,2.2A17.044,17.044,0,0,1,19.1,38.3a15.219,15.219,0,0,1-8.759-.051,13.434,13.434,0,0,1-2.17-.9A12.878,12.878,0,0,1,3,32.385,15.241,15.241,0,0,1,1.27,27.8a16.668,16.668,0,0,1-.321-2.438c-.026-.409-.036-.819-.034-1.228s.016-.818.048-1.226a20.843,20.843,0,0,1,11.163-17.1,19.017,19.017,0,0,1,2.02-.9A17.237,17.237,0,0,1,18.3,3.9c.176-.02.341-.035.526-.05.169-.011.325-.026.506-.032.353-.02.688-.021,1.031-.017a15.618,15.618,0,0,1,2.006.168A11.808,11.808,0,0,1,26.035,5.15a9.411,9.411,0,0,1,2.842,2.226,9.176,9.176,0,0,1,.981,1.394,8.785,8.785,0,0,1,.663,1.475,9.665,9.665,0,0,1,.506,2.87,12.2,12.2,0,0,1-.2,2.447,15.975,15.975,0,0,1-.992,3.248c-.073.182-.144.338-.2.474s-.113.249-.156.339l-.131.275a1.179,1.179,0,1,1-2.128-1.014,1.123,1.123,0,0,1,.06-.111l.013-.02.141-.228c.047-.075.1-.169.169-.282s.143-.243.223-.392c.167-.3.351-.675.546-1.126a11.486,11.486,0,0,0,.551-1.585c.076-.3.152-.623.205-.962a9.756,9.756,0,0,0,.1-1.068,7.384,7.384,0,0,0-.277-2.368,6.924,6.924,0,0,0-1.236-2.4,7.966,7.966,0,0,0-2.342-1.958,10.307,10.307,0,0,0-3.22-1.1A12.054,12.054,0,0,0,20.338,5.1c-.308,0-.629,0-.934.012-.149,0-.323.02-.487.03-.146.012-.313.028-.469.045a13.556,13.556,0,0,0-1.915.354,15.718,15.718,0,0,0-1.9.62,17.086,17.086,0,0,0-3.611,2A20.107,20.107,0,0,0,4.4,16.59c-.143.34-.275.685-.4,1.032s-.243.7-.346,1.054a20.607,20.607,0,0,0-.517,2.163c-.069.365-.124.732-.173,1.1-.021.183-.047.371-.062.55l-.026.27-.021.29a17.876,17.876,0,0,0-.03,2.212,16.715,16.715,0,0,0,.254,2.184A14.624,14.624,0,0,0,4.52,31.52,11.381,11.381,0,0,0,7.2,34.776a10.946,10.946,0,0,0,3.621,1.976,13.014,13.014,0,0,0,4,.606,13.55,13.55,0,0,0,3.838-.565,15.547,15.547,0,0,0,3.393-1.478,17.976,17.976,0,0,0,2.828-2.041,22.577,22.577,0,0,0,3.991-4.657,25.6,25.6,0,0,0,2.206-4.211,26.847,26.847,0,0,0,1.008-2.894c.1-.341.163-.589.211-.778s.07-.277.07-.277a.921.921,0,1,1,1.785.453.216.216,0,0,1-.006.022" transform="translate(0.244 1.186)"/>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li className="cl-select-role"/>
                    <li className="uk-nav-header">{/* Browse */}</li>
                    { (this.state.isTokenPresent === true) ? <li><a href={config.dashboardUrl}>{this.props.p.t('loginOptions.dashboard')}</a></li> : ''}
                    <li className="uk-nav-divider"/>
                  </ul>
                </div>
              </div>
            </div>
            <div className="cl-mobile-search-menu">
              <button className="uk-button" data-uk-toggle="{target:'#cl-search-box'}">
                <svg className="cl-icon-search" xmlns="http://www.w3.org/2000/svg" viewBox="-4714 1650 31.708 31.707">
                  <g data-name="Group 981" transform="translate(-6112 1631)">
                    <g data-name="Ellipse 23" className="cl-icon-search-1" transform="translate(1398 19)">
                      <ellipse className="cl-icon-search-2" cx="11.707" cy="11.707" rx="11.707" ry="11.707"/>
                      <ellipse className="cl-icon-search-3" cx="11.707" cy="11.707" rx="10.707" ry="10.707"/>
                    </g>
                    <line data-name="Line 5" className="cl-icon-search-1" x2="11.707" y2="11.707" transform="translate(1417.293 38.293)"/>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div id="cl-search-box" className="cl-Search-box uk-hidden">
          <HeaderSearchWrapper/>
        </div>
      </header>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      onSignUp: PropTypes.func.isRequired,
      onLogIn: PropTypes.func.isRequired,
      sspID: PropTypes.string.isRequired,
      userProfiles: PropTypes.object.isRequired,
      userInfo: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired,
      cartItemCount: PropTypes.number.isRequired
    };
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const mapStateToProps = state => {
  const {auth, viewssp, shoppingCart, userProfiles} = state;
  const {sspData} = viewssp;
  const {cartData} = shoppingCart;
  return {
    userProfiles,
    sspID: sspData && sspData.data ? sspData.data.sspID : '',
    userInfo: auth.userInfo,
    cartItemCount: getTotalItems(cartData.data.cartItems)
  };
};

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(Header)));