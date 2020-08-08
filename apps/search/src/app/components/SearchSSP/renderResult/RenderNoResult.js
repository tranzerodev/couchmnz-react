// App/components/SearchSSP/renderResult/RenderNoResult
// REnder No Result Page when there is no specific service provider for sport search
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {withRouter, Redirect, Switch} from 'react-router-dom';
import {matchPath} from 'react-router';
import {
  PATH_VARIABLE_SPORT, SSP_SEARCH_SPORT_LOCATION,
  PATH_VARIABLE_LOCATION, SSP_SEARCH_ONLY_LOCATION
} from '../../../constants/RouterPaths';
import {urlPathToText} from '../../../utils/sspSearchUtils';
import {OVERLAY_NO_RESULT_FOUND} from '../../../constants/assetsPaths';
import {isAuthenticated, decodeUserID} from '../../../../auth/auth';
import RegisterServiceProviderAvailabiltyForm from '../../Forms/RegisterServiceProviderAvailabiltyForm';
import {
  fetchAvailableSportsList,
  postSendServiceProviderCoupon
} from '../../../actions/coachlistApi';
import CloseLink from '../../common/Modal/closeLink';

class RenderNoResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: null
    };
    this.sendCoupon = this.sendCoupon.bind(this);
  }

  componentDidMount() {
    this.props.fetchAvailableSportsList();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.serviceProvidersCoupon.data != this.props.serviceProvidersCoupon.data &&
        this.props.serviceProvidersCoupon.data.responseCode === 0) ||
        (prevProps.registerServiceProvidersAvailability.data != this.props.registerServiceProvidersAvailability.data &&
        this.props.registerServiceProvidersAvailability.data.responseCode === 0)) {
      this.setState({
        redirectUrl: '/search/sports'
      });
    }
  }

  sendCoupon = () => {
    const pathName = this.props.location.pathname.split('/');
    let sportID = null;
    if (pathName[3]) {
      const sport = this.props.availableSportsList.data.payload.find(sport => {
        return sport.name.toLowerCase() === pathName[3].toLowerCase();
      });
      sportID = sport ? sport.id : null;
    }
    const data = {
      userID: decodeUserID(),
      sportID,
      lat: this.props.locationLookupData.data.latitude,
      lng: this.props.locationLookupData.data.longitude
    };
    this.props.postSendServiceProviderCoupon(data);
  }

  render() {
    if (this.state.redirectUrl) {
      return (<Switch>
        <Redirect to={this.state.redirectUrl}/>
      </Switch>);
    }

    const {p, discount, history} = this.props;

    const {location} = history;
    const {pathname} = location;

    const isLoggedInUser = isAuthenticated();

    let sportname = 'new';
    const match = matchPath(pathname, {path: SSP_SEARCH_SPORT_LOCATION, strict: false, exact: true});
    if (match) {
      sportname = urlPathToText(match.params[PATH_VARIABLE_SPORT]);
      if (sportname.length > 0 && this.props.availableSportsList.data.payload) {
        const searched_sport = this.props.availableSportsList.data.payload.find(sport => {
          return sport.name.toLowerCase() === sportname.toLowerCase();
        });
        sportname = searched_sport ? sportname : 'new';
      }
    }

    const render_col_left = () => {
      return (
        <div className="cl-col-left">
          <img src={OVERLAY_NO_RESULT_FOUND} alt="CoachList"/>
          {!isLoggedInUser && renderSvg()}
        </div>
      );
    };
    const renderSvg = () => {
      return (
        <svg className="cl-icon-off" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.213 180.982">
          <g id="Group_3551" data-name="Group 3551" transform="matrix(0.966, 0.259, -0.259, 0.966, 13.844, -475.597)">
            <path id="badge" className="cl-icon-off-1" d="M147.971,82.305h.022a20.773,20.773,0,0,1-1.348-4.168A23.951,23.951,0,0,1,148,63.605h-.027a16.775,16.775,0,0,0-7.529-23.148l.018-.013a21.314,21.314,0,0,1-3.54-2.578,24.024,24.024,0,0,1-7.449-12.551l-.022.013A16.728,16.728,0,0,0,123.5,14.58c-.267-.218-.539-.432-.824-.637a16.709,16.709,0,0,0-12.925-2.921l.005-.022a21.464,21.464,0,0,1-4.377-.009A24.018,24.018,0,0,1,91.964,5.212l-.008.027a16.782,16.782,0,0,0-24.35,0L67.6,5.208a21.176,21.176,0,0,1-3.549,2.574A24.029,24.029,0,0,1,49.8,10.987l.013.036A16.789,16.789,0,0,0,30.109,25.328l-.022-.018a20.948,20.948,0,0,1-1.358,4.163A23.968,23.968,0,0,1,19.09,40.435l.027.022a16.778,16.778,0,0,0-7.524,23.148h-.031a21.371,21.371,0,0,1,1.349,4.168,23.982,23.982,0,0,1-1.349,14.533h.031a16.779,16.779,0,0,0,7.524,23.153l-.022.018a20.659,20.659,0,0,1,3.535,2.583,23.976,23.976,0,0,1,7.453,12.556l.027-.027a17.5,17.5,0,0,0,.445,2.191A16.785,16.785,0,0,0,49.815,134.9l-.009.027a21.164,21.164,0,0,1,4.377.009,24.01,24.01,0,0,1,13.41,5.779l.013-.036a16.792,16.792,0,0,0,24.35,0l0,.018a21.019,21.019,0,0,1,3.554-2.565,23.979,23.979,0,0,1,14.242-3.206l-.009-.027c.543.1,1.082.178,1.634.223a16.782,16.782,0,0,0,18.068-14.533l.018.018a20.648,20.648,0,0,1,1.358-4.167,24,24,0,0,1,9.644-10.962l-.027-.018a16.774,16.774,0,0,0,7.528-23.154Z" transform="translate(138.948 454.493)"/>
            <g id="Group_3550" data-name="Group 3550" transform="translate(165.924 501.1)">
              <path id="Path_179" data-name="Path 179" className="cl-icon-off-2" d="M1.325-3.856H13.53V-6.895H6.771c4.352-3.063,6.637-5.47,6.637-8.242,0-3.234-2.747-5.179-6.2-5.179A8.261,8.261,0,0,0,.96-17.666L2.929-15.38a5.783,5.783,0,0,1,4.328-1.872c1.362,0,2.65.705,2.65,2.115,0,1.994-1.945,3.671-8.582,8.558ZM15.961-6A8.09,8.09,0,0,0,22.21-3.564c3.914,0,6.492-2.164,6.492-5.592a5.048,5.048,0,0,0-5.2-5.227,5.588,5.588,0,0,0-3.647,1.337v-4.06h7.756v-2.966H16.472v9.263l2.407.656a4.675,4.675,0,0,1,3.4-1.337c1.848,0,2.918,1,2.918,2.48,0,1.337-1.094,2.431-3.015,2.431a5.922,5.922,0,0,1-4.328-1.751ZM30.184-16.231a3.889,3.889,0,0,0,4.109,3.987,3.9,3.9,0,0,0,4.133-3.987,3.958,3.958,0,0,0-4.133-4.085A3.952,3.952,0,0,0,30.184-16.231ZM32.713-3.856h1.823L44.918-20.073H43.07Zm3.5-12.375a1.913,1.913,0,0,1-1.921,2.091,1.926,1.926,0,0,1-1.921-2.091,1.937,1.937,0,0,1,1.921-2.164A1.924,1.924,0,0,1,36.214-16.231Zm2.893,8.655a3.908,3.908,0,0,0,4.109,4.012,3.928,3.928,0,0,0,4.133-4.012,3.972,3.972,0,0,0-4.133-4.085A3.952,3.952,0,0,0,39.107-7.576Zm6.054,0A1.926,1.926,0,0,1,43.216-5.46,1.908,1.908,0,0,1,41.3-7.576,1.937,1.937,0,0,1,43.216-9.74,1.954,1.954,0,0,1,45.161-7.576Zm9.847-4.376a8.142,8.142,0,0,0,8.461,8.388,8.148,8.148,0,0,0,8.485-8.388,8.148,8.148,0,0,0-8.485-8.388A8.142,8.142,0,0,0,55.008-11.952Zm13.4,0c0,3.015-1.945,5.325-4.936,5.325s-4.911-2.31-4.911-5.325c0-3.039,1.921-5.325,4.911-5.325S68.4-14.991,68.4-11.952Zm5.981,8.1h3.452v-6.759h7.853v-2.966H77.838v-3.525h8.023v-2.966H74.385Zm13.883,0H91.72v-6.759h7.853v-2.966H91.72v-3.525h8.023v-2.966H88.268Z" transform="translate(1.817 20.34)"/>
              <path id="Path_180" data-name="Path 180" className="cl-icon-off-2" d="M-47.757-2.234a3.576,3.576,0,0,0,3.734-3.705A3.572,3.572,0,0,0-47.757-9.63a3.569,3.569,0,0,0-3.72,3.691A3.572,3.572,0,0,0-47.757-2.234Zm0-1.648a1.854,1.854,0,0,1-1.794-2.057,1.849,1.849,0,0,1,1.794-2.042,1.86,1.86,0,0,1,1.809,2.042A1.865,1.865,0,0,1-47.757-3.882ZM-37.9-2.409h1.853V-7.383a2.049,2.049,0,0,0-2.29-2.247A3.226,3.226,0,0,0-40.8-8.536v-.919h-1.853v7.046H-40.8V-7.15a2.007,2.007,0,0,1,1.6-.832,1.143,1.143,0,0,1,1.3,1.313Zm7.454,1.094L-30.718.348a5.064,5.064,0,0,0,.919.1,2.56,2.56,0,0,0,2.67-1.707l3.311-8.2h-2l-1.838,4.9-1.838-4.9h-1.984l2.859,7.148-.263.6a.935.935,0,0,1-.977.511A1.6,1.6,0,0,1-30.441-1.315Zm10.722-.919a3.576,3.576,0,0,0,3.734-3.705A3.572,3.572,0,0,0-19.719-9.63a3.569,3.569,0,0,0-3.72,3.691A3.572,3.572,0,0,0-19.719-2.234Zm0-1.648a1.854,1.854,0,0,1-1.794-2.057,1.849,1.849,0,0,1,1.794-2.042A1.86,1.86,0,0,1-17.91-5.939,1.865,1.865,0,0,1-19.719-3.882Zm9.861,1.473H-8V-9.455H-9.858v4.77a2.074,2.074,0,0,1-1.6.8,1.133,1.133,0,0,1-1.3-1.3V-9.455h-1.853v5a2.018,2.018,0,0,0,2.276,2.217A3.3,3.3,0,0,0-9.858-3.3Zm3.691,0h1.853V-7.063A2.348,2.348,0,0,1-2.578-7.85a2.46,2.46,0,0,1,.511.044V-9.615A3.014,3.014,0,0,0-4.314-8.492v-.963H-6.167ZM8.508-10.491A1.108,1.108,0,0,0,9.617-11.6a1.108,1.108,0,0,0-1.109-1.109A1.118,1.118,0,0,0,7.4-11.6,1.118,1.118,0,0,0,8.508-10.491ZM3.228-2.409H5.095V-7.836h1.43V-9.455H5.095v-.379c0-.642.35-.992.875-.992a1.039,1.039,0,0,1,.6.175l.379-1.342a3,3,0,0,0-1.342-.292A2.271,2.271,0,0,0,3.228-9.834v.379H2.061v1.619H3.228Zm4.362,0H9.442V-9.455H7.589Zm3.691,0h1.853V-7.063a2.348,2.348,0,0,1,1.736-.788,2.46,2.46,0,0,1,.511.044V-9.615a3.014,3.014,0,0,0-2.247,1.123v-.963H11.28Zm4.639-.919A4.743,4.743,0,0,0,19.07-2.234c1.955,0,3.049-.963,3.049-2.261,0-1.751-1.619-2.071-2.83-2.3-.788-.16-1.342-.321-1.342-.759,0-.408.438-.656,1.109-.656a2.972,2.972,0,0,1,2.086.817l.729-1.269a4.427,4.427,0,0,0-2.83-.963c-1.853,0-2.888,1.036-2.888,2.217,0,1.678,1.561,1.969,2.772,2.2.8.16,1.415.336,1.415.832,0,.438-.379.715-1.182.715a4.033,4.033,0,0,1-2.436-.963Zm9.934,1.094A2.287,2.287,0,0,0,27.4-2.686l-.394-1.4a1.012,1.012,0,0,1-.642.2c-.408,0-.642-.336-.642-.773v-3.18h1.43V-9.455h-1.43v-1.926H23.855v1.926H22.688v1.619h1.167V-4.16A1.761,1.761,0,0,0,25.853-2.234Zm-90.32,17.654h1.853v-.89A2.764,2.764,0,0,0-60.441,15.6c1.78,0,3.122-1.342,3.122-3.691,0-2.3-1.327-3.705-3.122-3.705a2.714,2.714,0,0,0-2.174,1.079V5.69h-1.853Zm1.853-2.261V10.665a2.044,2.044,0,0,1,1.59-.817A1.834,1.834,0,0,1-59.23,11.9a1.821,1.821,0,0,1-1.794,2.042A2.062,2.062,0,0,1-62.614,13.159Zm9.963,2.436a3.576,3.576,0,0,0,3.734-3.705A3.572,3.572,0,0,0-52.651,8.2a3.569,3.569,0,0,0-3.72,3.691A3.572,3.572,0,0,0-52.651,15.6Zm0-1.648a1.854,1.854,0,0,1-1.794-2.057,1.849,1.849,0,0,1,1.794-2.042,1.86,1.86,0,0,1,1.809,2.042A1.865,1.865,0,0,1-52.651,13.947Zm8.373,1.648a3.576,3.576,0,0,0,3.734-3.705A3.572,3.572,0,0,0-44.277,8.2,3.569,3.569,0,0,0-48,11.89,3.572,3.572,0,0,0-44.277,15.6Zm0-1.648a1.854,1.854,0,0,1-1.794-2.057,1.849,1.849,0,0,1,1.794-2.042,1.86,1.86,0,0,1,1.809,2.042A1.865,1.865,0,0,1-44.277,13.947Zm9.672,1.473h2.319l-2.874-3.851,2.786-3.195H-34.65l-2.67,3.136V5.69h-1.853v9.73h1.853V13.612l.846-.9Zm2.48-3.53A3.568,3.568,0,0,0-28.362,15.6a4.342,4.342,0,0,0,2.9-.977l-.817-1.2a2.881,2.881,0,0,1-1.882.7,1.9,1.9,0,0,1-2.028-1.634h5.237V12.08c0-2.3-1.43-3.88-3.53-3.88A3.586,3.586,0,0,0-32.126,11.89Zm3.647-2.217a1.632,1.632,0,0,1,1.736,1.561h-3.472A1.693,1.693,0,0,1-28.479,9.673Zm9.715,5.748H-16.9V5.69h-1.867V9.279A2.714,2.714,0,0,0-20.937,8.2c-1.794,0-3.122,1.4-3.122,3.705,0,2.349,1.342,3.691,3.122,3.691a2.764,2.764,0,0,0,2.174-1.065Zm0-2.276a2.037,2.037,0,0,1-1.6.8,1.835,1.835,0,0,1-1.78-2.042,1.84,1.84,0,0,1,1.78-2.057,2.037,2.037,0,0,1,1.6.8Zm6.827,1.357A4.743,4.743,0,0,0-8.785,15.6c1.955,0,3.049-.963,3.049-2.261,0-1.751-1.619-2.071-2.83-2.3-.788-.16-1.342-.321-1.342-.759,0-.408.438-.656,1.109-.656a2.972,2.972,0,0,1,2.086.817l.729-1.269A4.427,4.427,0,0,0-8.815,8.2c-1.853,0-2.888,1.036-2.888,2.217,0,1.678,1.561,1.969,2.772,2.2.8.16,1.415.336,1.415.832,0,.438-.379.715-1.182.715a4.033,4.033,0,0,1-2.436-.963Zm7.119-2.611A3.568,3.568,0,0,0-1.054,15.6a4.342,4.342,0,0,0,2.9-.977l-.817-1.2a2.881,2.881,0,0,1-1.882.7,1.9,1.9,0,0,1-2.028-1.634H2.36V12.08c0-2.3-1.43-3.88-3.53-3.88A3.586,3.586,0,0,0-4.818,11.89Zm3.647-2.217A1.632,1.632,0,0,1,.565,11.234H-2.906A1.693,1.693,0,0,1-1.171,9.673ZM3.089,14.5A4.743,4.743,0,0,0,6.24,15.6c1.955,0,3.049-.963,3.049-2.261,0-1.751-1.619-2.071-2.83-2.3-.788-.16-1.342-.321-1.342-.759,0-.408.438-.656,1.109-.656a2.972,2.972,0,0,1,2.086.817l.729-1.269A4.427,4.427,0,0,0,6.211,8.2c-1.853,0-2.888,1.036-2.888,2.217,0,1.678,1.561,1.969,2.772,2.2.8.16,1.415.336,1.415.832,0,.438-.379.715-1.182.715A4.033,4.033,0,0,1,3.891,13.2Zm6.958,0A4.743,4.743,0,0,0,13.2,15.6c1.955,0,3.049-.963,3.049-2.261,0-1.751-1.619-2.071-2.83-2.3-.788-.16-1.342-.321-1.342-.759,0-.408.438-.656,1.109-.656a2.972,2.972,0,0,1,2.086.817L16,9.162a4.427,4.427,0,0,0-2.83-.963c-1.853,0-2.888,1.036-2.888,2.217,0,1.678,1.561,1.969,2.772,2.2.8.16,1.415.336,1.415.832,0,.438-.379.715-1.182.715A4.033,4.033,0,0,1,10.85,13.2Zm8.49-7.163A1.109,1.109,0,1,0,17.429,6.23,1.108,1.108,0,0,0,18.538,7.339Zm-.919,8.082h1.853V8.375H17.619Zm6.958.175a3.576,3.576,0,0,0,3.734-3.705A3.572,3.572,0,0,0,24.577,8.2a3.569,3.569,0,0,0-3.72,3.691A3.572,3.572,0,0,0,24.577,15.6Zm0-1.648a1.854,1.854,0,0,1-1.794-2.057,1.816,1.816,0,1,1,3.6,0A1.865,1.865,0,0,1,24.577,13.947Zm9.861,1.473h1.853V10.446A2.049,2.049,0,0,0,34,8.2a3.226,3.226,0,0,0-2.465,1.094V8.375H29.683v7.046h1.853V10.679a2.007,2.007,0,0,1,1.6-.832,1.143,1.143,0,0,1,1.3,1.313Zm3.822-3.166h1.634l.292-6.565H37.939ZM37.91,14.4a1.167,1.167,0,1,0,1.167-1.182A1.18,1.18,0,0,0,37.91,14.4Z" transform="translate(64.467 36.723)"/>
            </g>
          </g>
        </svg>
      );
    };
    const renderColRight = () => {
      return (
        <div className="cl-col-right">
          <div className="content">
            <h4>{p.t('SportsList.hangTight')}</h4>
            <p>
              {p.t('SportsList.messageCommon')}
              <strong> {sportname}</strong>
              {p.t('SportsList.serviceProviderInYourArea')}
            </p>
            {isLoggedInUser &&
            <p>{p.t('SportsList.regMessage.notify')}</p>}
            <p>
              {isLoggedInUser ? p.t('SportsList.regMessage.andYouWillHave') : p.t('SportsList.unregMessage.andYouWillHave') }
              <strong>{p.t('SportsList.discount', {discount})}</strong>
              {isLoggedInUser ? p.t('SportsList.regMessage.offerMsg') : p.t('SportsList.unregMessage.offerMsg')}
            </p>
            {!isLoggedInUser && <p>{p.t('SportsList.formNote')}</p>}
            {isLoggedInUser && this.props.serviceProvidersCoupon.data && this.props.serviceProvidersCoupon.data.responseCode > 0 &&
              <p style={{color: '#ed485b'}}>{p.t('SportsList.regMessage.couponExisted')}</p>
            }
            {isLoggedInUser ?
              <button
                type="submit"
                className="general_Btn"
                onClick={this.sendCoupon}
              >
                    Send Coupon Code
              </button> :
              <RegisterServiceProviderAvailabiltyForm/>}
          </div>
          {isLoggedInUser && renderSvg()}
        </div>
      );
    };

    return (
      <div className="popup_overlay">
        <div className={isLoggedInUser ? 'cl-noresults-registered_popup' : 'cl-noresults-unregistered_popup'}>
          <div className="cl-noresults-box">
            {render_col_left()}
            {renderColRight()}
            <CloseLink linkClass="noresults_close"/>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      searchData: PropTypes.object.isRequired,
      discount: PropTypes.number,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      availableSportsList: PropTypes.object
    };
  }
}

RenderNoResult.defaultProps = {
  discount: 0
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAvailableSportsList: () =>
      dispatch(fetchAvailableSportsList()),
    postSendServiceProviderCoupon: data =>
      dispatch(postSendServiceProviderCoupon(data))
  };
};

const mapStateToProps = state => {
  const {
    discounts,
    availableSportsList,
    registerServiceProvidersAvailability,
    locationLookupData, serviceProvidersCoupon,
    auth
  } = state;
  return {
    discount: discounts.discount,
    availableSportsList,
    registerServiceProvidersAvailability,
    locationLookupData,
    serviceProvidersCoupon,
    auth
  };
};

export default withRouter(translate(connect(mapStateToProps, mapDispatchToProps)(RenderNoResult)));

