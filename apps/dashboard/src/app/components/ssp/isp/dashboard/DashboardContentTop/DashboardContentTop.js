import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class DashboardContentTop extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1 uk-width-small-1-1">
          <div className="dashboardContentTop">
            <a className="cross" onClick={this.props.onClick}><i className="fa fa-times"/></a>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1 rightdivider">
                <h4>{this.props.p.t('DashboardContentTop.welcome_to_coachList')}</h4>
                <p>{this.props.p.t('DashboardContentTop.congratulations')}</p>
                <a className="learnmore" onClick={this.props.handleOpenModal}>{this.props.p.t('DashboardContentTop.learn_more')}</a>
              </div>
              <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1 uk-width-small-1-1 rightDiv">
                <h4>{this.props.p.t('DashboardContentTop.coming_soon')}</h4>
                <p>{this.props.p.t('DashboardContentTop.more_feature')}</p>
                <span className="horn">
                  <svg className="cl-icon-bullhorn" xmlns="http://www.w3.org/2000/svg" viewBox="-15943.712 -1892.632 108.93 122.891">
                    <path data-name="Union 1" className="cl-icon-bullhorn-1" d="M15424.875,2511.376l-13.277-1.68c-1.315-.21-2.142-.326-3.353-.462a12.141,12.141,0,0,1-3.753-.543c-5.457-1.878-.436-8.445,1.68-12.128,1.444-2.565,2.679-4.731,4.138-7.063-1.51-.52-2.337-.842-2.961-1.863-2.461-3.982,3.287-8.181,4.5-10.952-1.646.26-3.307-.05-6.1.66a62.4,62.4,0,0,0-10.964,3.865c-10.7,5.247-18.466,9.411-31,5.092a10.88,10.88,0,0,1-5.1-4.327c-3.419-5.286-4.319-12.373-4.272-18.555.2-20.767,8.593-46.06,21.256-62.124,3.928-4.976,8.856-9.846,14.612-11.958,3.8-1.393,5.5-.908,8.884.26,9.031,3.109,13.37,10.405,17.054,17.981l5.739,10.424c.676.986.975,1.537,1.7,2.48,9.916,13.029,28.549,14.806,33.66,19.421a15.622,15.622,0,0,1,2.127,2.271c4.3,5.822,4.871,15.194,2.554,21.924-2.352,6.831-4.626,10.875-10.219,15.388a17.628,17.628,0,0,1-2.829,1.785c-3.159,1.6-7.227,2.562-11.088,1.23-.393.862-2.143,2.569-3.412,5.379a30.813,30.813,0,0,0-2.259,6.73c-1.883,8.985.051,16.767-7.145,16.767Zm-16-11.274c-3.384,5.744-3.435,4.58,7.421,6.047,1.646.229,3.369.466,5.216.706,5.562.753,4.6,1.583,5.966-8.589.687-5.057,2.662-13.355,6.4-17.135-1.028-.334-1.541-.268-2.884-.73-1.091-.373-2.181-.749-3.291-1.133a29.2,29.2,0,0,0-5.76,6.54c-2.192,3.528-2.235,4.471-7.017,3.97Zm5.368-19.723c-5.364,6.19-1.812,5.045,1.393,5.267,2.593.163,1.863-1.424,6-6.082l1.249-1.448c-1.862-.586-3.784-.512-5.631-1.149Zm-30.308-82.1c-5.853,4.84-12.155,16.11-15.232,22.654-1.425,3.039-3.183,7.11-4.378,10.583l-3.14,11.084c-2.084,10.735-3.765,17.531-1.863,29.508.57,3.574,2.748,9.846,6.881,10.816,7.525,1.75,11.2,1.549,18.4-1.432,1.378-.559,2.546-1.339,3.943-1.909,4.851-1.991,6.159-2.891,11.786-4.952,1.46-.532,2.825-.85,4.273-1.234,9.027-2.391,21.128.741,30.559,3.99,4.3,1.479,6.967,2.232,10.053,1.021,5.965-2.34,10.013-7.816,12.38-13.723,2.072-5.088,2.406-13.421-.655-18.753-3.218-5.6-7.8-5.092-13.541-7.611-1.5-.667-3.7-1.7-5.251-2.317-10.6-4.172-17.1-10.692-22.181-20.139-2.3-4.323-4.773-9.528-7.106-13.281-2.91-4.739-6.058-6.722-10.793-8.953a9.226,9.226,0,0,0-3.971-.963C15390.168,2392.67,15387.123,2395.632,15383.934,2398.283Zm-16.575,79.771c-5.807-1.568-5.558-13.685-5.3-18.365.912-16.339,8.713-37.363,17.577-51.055,11.569-17.891,22.347-14.573,20.379,7.223a99.589,99.589,0,0,1-4.866,23.406c-3.6,10.456-6.552,18.319-12.47,27.113-2.877,4.281-8.7,11.851-13.978,11.852A5.176,5.176,0,0,1,15367.358,2478.054Zm13.51-63.723c-.908,1.545-1.661,2.977-2.488,4.494-.834,1.5-1.715,3.52-2.433,5l-4.3,10.743c-2.344,6.757-5.453,19.6-5.554,26.267-.02,2.678-.338,12.276,2.43,13.227,3.275,1.129,10.653-9.621,12.578-12.92a66.866,66.866,0,0,0,3.419-6.163,23.035,23.035,0,0,1-3.209-3.322,17.608,17.608,0,0,1-2.119-3.827,15.9,15.9,0,0,1,10.421-20.725,20.9,20.9,0,0,1,4.738-.675c1.3-4.1,2.166-15.175,1.525-19.638-.159-1.126-.967-5.045-2.057-5.422a2.06,2.06,0,0,0-.675-.109C15389.056,2401.259,15382.223,2411.993,15380.868,2414.331Zm6.419,18.377a11.637,11.637,0,0,0-4.459,12.955,9.416,9.416,0,0,0,2.247,4.153,8.513,8.513,0,0,0,1.284,1.343c1.168-3.388,2.807-6.676,4-10.149l3.089-10.444C15390.478,2431.024,15389.8,2431.074,15387.287,2432.708Zm54.792,34.483-19.184-6.605c-1.746-.6-.893-4.494,1.758-3.582l18.715,6.447a1.863,1.863,0,0,1,1.23,2.526,1.826,1.826,0,0,1-1.756,1.35A2.352,2.352,0,0,1,15442.079,2467.191Zm3.866-11.228-18.715-6.443a1.98,1.98,0,1,1,1.289-3.745l18.714,6.446a2,2,0,0,1-.527,3.876A2.347,2.347,0,0,1,15445.945,2455.963Z" transform="translate(-31298.121 -4281.119)"/>
                  </svg>
                </span>
                <ul>
                  <li><i className="fa fa-angle-right"/> {this.props.p.t('DashboardContentTop.messaging_system')}</li>
                  <li><i className="fa fa-angle-right"/> {this.props.p.t('DashboardContentTop.team_management')}</li>
                  <li><i className="fa fa-angle-right"/> {this.props.p.t('DashboardContentTop.coachlist_pro')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      handleOpenModal: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

export default translate(DashboardContentTop);
