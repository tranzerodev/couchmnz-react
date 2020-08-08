import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import {DASHBOARD_ISP_BUSINESS_MODEL} from '../../../constants/pathConstants';

class RegBusinessModel extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.history.push(DASHBOARD_ISP_BUSINESS_MODEL);
  }

  render() {
    return (
      <section className="stepSection ssp-regflow-1-2">
        <div className="uk-container uk-container-center">
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
              <h1>{this.props.p.t('regBusinessModel.heading')}</h1>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="cl-sd-setting-content">
                <span>
                  <svg className="cl-icon-teach" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.464 81.098">
                    <g data-name="Group 4379" transform="translate(-239.192 -209.168)">
                      <path data-name="Path 376" className="cl-icon-teach-1" d="M-7388.582-24504.777l-1.115,4.148-.576,5.344.319,2.99,1.088,3.248,1.267,3.684.558,1.9.6,4.02-1.422,4.389-2.409,2.887-2.612,4.322-1.6,6.705-.472,3.531,7.36,4.121,5.491,2.316,4.677,1.15,6.018.543,3.459-.271,1.178-.271-1.6-3.129-.845-3.994v-2.963l.845-2.98,1.257-2.857,1.924-2.631,1.773-1.4-2.974-3.531-.377-2.031.377-2.4,1.2-1.1,2.814-.41h3l2.058-.367,2.277-1.422,1.925-2.23,1.643-3.492.782-4.205.784-6.238v-6.449l-.784-1.834Z" transform="translate(7635 24733)"/>
                      <path className="cl-icon-teach-2" d="M5.988,16.487s1.588-7.1,6.494-11.794S25.043,0,25.043,0s5.034,4.16,6.479,8.63a65.245,65.245,0,0,1,2.153,9.586L5.935,18.3Z" transform="translate(239.831 210)"/>
                      <path className="cl-icon-teach-2" d="M26.962.1s4.349,5.582,5.311,8.137,2.545,9.967,2.545,9.967a8.094,8.094,0,0,0,3.58-.65c1.721-1,8.351-6.217,8.351-6.217s-3.489-5.675-6.956-7.955S26.962.1,26.962.1Z" transform="translate(238.896 210)"/>
                      <path className="cl-icon-teach-2" d="M37.1,18.482s3.692-3.012,5.814-4.413a38.822,38.822,0,0,1,4.028-2.321l13.25.37a2.083,2.083,0,0,1,.455,2.714c-.862,1.78-.98,3.032-2.28,3.032S37.1,18.482,37.1,18.482Z" transform="translate(238.9 209.665)"/>
                      <path className="cl-icon-teach-3" d="M6.393,19.33S4.431,25.2,5.076,29.893s2.386,7.067,2.981,9.753a41.965,41.965,0,0,1,.718,4.939c.055.6,20.211,6.241,20.211,6.241s-1.109-4.217-.1-5.532,7.973-.891,9.5-1.728a10.1,10.1,0,0,0,4.4-4.746c1.751-3.876,1.968-9.139,2.3-11.215a46.462,46.462,0,0,0,.029-9" transform="translate(239.859 209.47)"/>
                      <path className="cl-icon-teach-3" d="M5.916,50.91a27.1,27.1,0,0,0-3.865,6.081C1.032,59.689,0,66.69,0,66.69s8.959,6.637,19.1,7.97,24.151-3.133,24.151-3.133-3.779-6.088-6.127-9.565a45.94,45.94,0,0,0-6.776-7.283Z" transform="translate(240 208.549)"/>
                      <path className="cl-icon-teach-4" d="M8.385,44.867l-3.652,6s24.758,7.264,28.244,7.462-4.286-7.462-4.286-7.462Z" transform="translate(239.865 208.721)"/>
                      <g transform="translate(265.283 259.564)">
                        <g transform="translate(0 0)">
                          <ellipse data-name="Ellipse 13" className="cl-icon-teach-1" cx="15.376" cy="15.218" rx="15.376" ry="15.218"/>
                          <ellipse data-name="Ellipse 14" className="cl-icon-teach-5" cx="14.89" cy="14.732" rx="14.89" ry="14.732" transform="translate(0.486 0.486)"/>
                        </g>
                        <g transform="translate(5.394 6.72)">
                          <path className="cl-icon-teach-6" d="M1.852,9.747H8.375s-1.02,6.72,5.014,6.72a5.189,5.189,0,0,0,5.584-5.245,4.575,4.575,0,0,0-2.365-4.03,9.228,9.228,0,0,0-4.937-.7l-.033,1.339H9.961L8.132,6.118,0,5.976Z" transform="translate(0 -0.618)"/>
                          <g transform="translate(0.01 5.431)">
                            <path data-name="Path 31" className="cl-icon-teach-7" d="M4.926,6.052V9.768H1.86L.01,6.052Z" transform="translate(-0.01 -6.052)"/>
                            <path data-name="Path 32" className="cl-icon-teach-8" d="M4.463,6.552H.817L2.183,9.3H4.463Z" transform="translate(-0.033 -6.066)"/>
                          </g>
                          <path className="cl-icon-teach-9" d="M13.732,14.583a3.626,3.626,0,0,0,2.024-.635A4.805,4.805,0,0,0,17.043,12" transform="translate(-0.391 -0.79)"/>
                          <path className="cl-icon-teach-9" d="M11.567,4.056,13.175.851" transform="translate(-0.33 -0.472)"/>
                          <path data-name="Line" className="cl-icon-teach-9" d="M9.716,4.045V.461" transform="translate(-0.277 -0.461)"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <h4>{this.props.p.t('regBusinessModel.sportHeading')}</h4>
                <p>{this.props.p.t('regBusinessModel.sportDesc')}</p>
              </div>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="cl-sd-setting-content">
                <span>
                  <svg className="cl-icon-company" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 64.785">
                    <g data-name="Group 4381" transform="translate(-1010.998 -150.525)">
                      <path data-name="Path 377" className="cl-icon-company-1" d="M7743,24750.854h-80v-14.332a3.527,3.527,0,0,1,3.524-3.521h72.955a3.525,3.525,0,0,1,3.521,3.521v14.332Z" transform="translate(-6651 -24572.344)"/>
                      <path className="cl-icon-company-2" d="M25.009,8.8V4.4A4.4,4.4,0,0,1,29.414,0H43.735A4.406,4.406,0,0,1,48.14,4.4V8.8" transform="translate(1015.456 151.526)"/>
                      <path data-name="Path 378" className="cl-icon-company-3" d="M80,36.048H0V3.521A3.527,3.527,0,0,1,3.524,0H76.479A3.525,3.525,0,0,1,80,3.521V36.048Z" transform="translate(1091.999 214.31) rotate(180)"/>
                      <g data-name="Group 4380" transform="translate(1033.129 172.933)">
                        <g data-name="Rectangle 2724" className="cl-icon-company-4">
                          <rect className="cl-icon-company-5" width="7.63" height="11.151" rx="3.815"/>
                          <rect className="cl-icon-company-6" x="1" y="1" width="5.63" height="9.151" rx="2.815"/>
                        </g>
                        <g data-name="Rectangle 2725" className="cl-icon-company-4" transform="translate(30.52)">
                          <rect className="cl-icon-company-5" width="7.63" height="11.151" rx="3.815"/>
                          <rect className="cl-icon-company-6" x="1" y="1" width="5.63" height="9.151" rx="2.815"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <h4>{this.props.p.t('regBusinessModel.businessHeading')}</h4>
                <p>{this.props.p.t('regBusinessModel.businessDesc')}</p>
              </div>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="cl-sd-setting-content">
                <span>
                  <svg className="cl-icon-scheduler-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 69.492">
                    <g data-name="Group 4377" transform="translate(-1417 -206)">
                      <g transform="translate(1417 211.662)">
                        <rect data-name="Rectangle 496" className="cl-icon-scheduler-gray-1" width="63.273" height="54.769" rx="2"/>
                        <rect data-name="Rectangle 497" className="cl-icon-scheduler-gray-2" width="61.091" height="52.587" rx="2" transform="translate(1.091 1.091)"/>
                      </g>
                      <path className="cl-icon-scheduler-gray-3" d="M7.622.876v9.971" transform="translate(1421.645 206.124)"/>
                      <path data-name="Path-9" className="cl-icon-scheduler-gray-3" d="M26,.876v9.971" transform="translate(1443.364 206.124)"/>
                      <path data-name="Path-9" className="cl-icon-scheduler-gray-3" d="M20,.876v9.971" transform="translate(1436.273 206.124)"/>
                      <path data-name="Path-9" className="cl-icon-scheduler-gray-3" d="M14,.876v9.971" transform="translate(1429.182 206.124)"/>
                      <g data-name="Group 2777" transform="translate(1459.182 236.52)">
                        <ellipse className="cl-icon-scheduler-gray-4" cx="18.909" cy="18.987" rx="18.909" ry="18.987"/>
                        <path className="cl-icon-scheduler-gray-3" d="M29.211,24.472V36.4l8.182,4.336" transform="translate(-9.906 -15.325)"/>
                      </g>
                      <path className="cl-icon-scheduler-gray-5" d="M2.191,9.522H63.745" transform="translate(1415.225 216.343)"/>
                    </g>
                  </svg>
                </span>
                <h4>{this.props.p.t('regBusinessModel.sessionHeading')}</h4>
                <p>{this.props.p.t('regBusinessModel.sessionDesc')}</p>
              </div>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="cl-sd-setting-content">
                <span>
                  <svg className="cl-icon-revenue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 81.998">
                    <g data-name="Group 4376" transform="translate(-368 -510)">
                      <g data-name="Ellipse 170" className="cl-icon-revenue-1" transform="translate(384.768 526.768)">
                        <circle className="cl-icon-revenue-4" cx="23.938" cy="23.938" r="23.938"/>
                        <circle className="cl-icon-revenue-5" cx="23.938" cy="23.938" r="22.938"/>
                      </g>
                      <g data-name="Group 1879" transform="translate(369 511)">
                        <path data-name="Path 164" className="cl-icon-revenue-2" d="M76.817,96.989A40.007,40.007,0,0,1,34.758,33.251" transform="translate(-25.751 -18.542)"/>
                        <path data-name="Path 165" className="cl-icon-revenue-2" d="M34.535,33.3A40,40,0,1,1,77.158,100.58" transform="translate(-19.034 -24.916)"/>
                      </g>
                      <path data-name="Path 166" className="cl-icon-revenue-3" d="M52.178,40.22a1.355,1.355,0,0,1,1.368,1.366v.7a11.563,11.563,0,0,1,4.925,1.747,1.7,1.7,0,0,1,.951,1.525,1.75,1.75,0,0,1-1.779,1.749,1.833,1.833,0,0,1-.951-.286,11.591,11.591,0,0,0-3.274-1.4v6.1c4.828,1.207,6.893,3.146,6.893,6.545,0,3.494-2.73,5.815-6.766,6.2V66.37a1.355,1.355,0,0,1-1.368,1.366,1.381,1.381,0,0,1-1.4-1.366V64.4a13.743,13.743,0,0,1-6.514-2.478,1.742,1.742,0,0,1-.858-1.525,1.747,1.747,0,0,1,2.8-1.4,11.332,11.332,0,0,0,4.7,2.128V54.869c-4.639-1.209-6.8-2.956-6.8-6.545,0-3.4,2.7-5.751,6.672-6.069v-.667A1.382,1.382,0,0,1,52.178,40.22ZM50.909,51.055V45.431c-2.033.191-3.051,1.271-3.051,2.668C47.86,49.434,48.462,50.261,50.909,51.055Zm2.509,4.415v5.783c2.033-.222,3.146-1.239,3.146-2.764C56.565,57.092,55.866,56.235,53.419,55.471Z" transform="translate(357.357 497.251)"/>
                    </g>
                  </svg>
                </span>
                <h4>{this.props.p.t('regBusinessModel.revenueHeading')}</h4>
                <p>{this.props.p.t('regBusinessModel.revenueDesc')}</p>
                <p><a target="_blank" rel="noopener noreferrer" href="https://www.coachlist.com/athlete-levels-and-points-system">{this.props.p.t('regBusinessModel.revenueLearnMore')}</a></p>
              </div>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="cl-sd-setting-content">
                <span>
                  <svg className="cl-icon-account" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82">
                    <g data-name="Group 4378" transform="translate(-728 -489)">
                      <circle data-name="Ellipse 32" className="cl-icon-account-1" cx="40" cy="40" r="40" transform="translate(729 490)"/>
                      <g data-name="Group 111" transform="translate(741.889 506.619)">
                        <path data-name="Intersection 1" className="cl-icon-account-2" d="M0,52.669C.578,49.439,1.6,46,3.386,44.181c3.318-3.366,11.14-5.533,17.85-6.353a20.5,20.5,0,0,0,.612-3.074,16.379,16.379,0,0,0-.5-2.628c-5.4-2.349-10.9-8.366-10.9-15.438A15.535,15.535,0,0,1,10.8,13.4c.166-4.422,2.471-6.467,4.976-9.466.094-.128.119.065.149.258a.625.625,0,0,0,.084.288q.206-.19.418-.37c.234-.233.475-.454.72-.671.062-.054.119-.111.182-.162.309-.265.629-.51.956-.746.055-.041.11-.084.166-.122.341-.238.689-.456,1.044-.661l.139-.082q.556-.31,1.135-.565c.034-.015.07-.031.1-.045A12.15,12.15,0,0,1,22.1.6,12.486,12.486,0,0,1,23.466.254,12.728,12.728,0,0,1,24.872.061C25.2.034,25.523,0,25.854,0c6.774,0,13.454,4.1,15.4,11.134a15.7,15.7,0,0,1,1.022,5.554c0,7.074-5.509,13.1-10.912,15.443a15.065,15.065,0,0,0-.535,2.622,16.929,16.929,0,0,0,.6,2.873c6.923.59,16.506,2.718,19.562,6.554,1.571,1.972,2.569,5.482,3.193,8.767A40,40,0,0,1,0,52.669Z" transform="translate(0 0)"/>
                        <path className="cl-icon-account-3" d="M31.013,1.163c-.058,4.661-2.416,6.734-4.985,9.81-.185.253-.1-.754-.321-.524-.06.062-.116.131-.177.194-.28.29-.573.561-.872.826-.061.053-.119.111-.182.162-.309.265-.629.51-.956.746-.055.041-.11.083-.166.123-.34.238-.688.455-1.044.66l-.139.082q-.555.309-1.135.565l-.1.045a12.341,12.341,0,0,1-1.221.455,12.4,12.4,0,0,1-1.369.349,12.505,12.505,0,0,1-1.406.193c-.328.027-.652.061-.982.061C8.043,14.91.264,9.318,0,0L8.3,8.342Z" transform="translate(42.124 14.91) rotate(180)"/>
                        <path className="cl-icon-account-4" d="M19.811,44.054s-3.049,8.783,9.18,8.783,9.916-8.783,9.916-8.783" transform="translate(-2.584 -5.514)"/>
                      </g>
                    </g>
                  </svg>
                </span>
                <h4>{this.props.p.t('regBusinessModel.accountHeading')}</h4>
                <p>{this.props.p.t('regBusinessModel.accountDesc')}</p>
              </div>
            </div>
            <div className="uk-width-xlarge-1-3 uk-width-large-1-3 uk-width-medium-1-2  uk-width-small-1-1">
              <div className="cl-sd-setting-content cl-sd-setting-content-coming">
                <div className="tableDiv">
                  <div className="lCol">
                    <span>
                      <svg className="cl-icon-comingsoon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.558 61.027">
                        <g transform="translate(-5 -5.986)">
                          <path data-name="Path 379" className="cl-icon-comingsoon-1" d="M59.352,59.816C49.046,53.439,38.541,48.712,26.638,48.7H20.313a14.313,14.313,0,1,1,0-28.626h6.338A55.25,55.25,0,0,0,59.1,9.554" transform="translate(0 0.725)"/>
                          <ellipse data-name="Ellipse 456" className="cl-icon-comingsoon-1" cx="5.754" cy="28.127" rx="5.754" ry="28.127" transform="translate(56.05 6.986)"/>
                          <line data-name="Line 316" className="cl-icon-comingsoon-1" y2="28.666" transform="translate(28.092 20.78)"/>
                          <path data-name="Path 380" className="cl-icon-comingsoon-1" d="M19.947,40.362l2.516,16.59H15.327l-2.7-17.881" transform="translate(1.871 9.062)"/>
                          <path data-name="Path 381" className="cl-icon-comingsoon-2" d="M45.079,23.325a7.174,7.174,0,1,1,0,14.347" transform="translate(11.037 4.615)"/>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="rCol">
                    <h4>{this.props.p.t('regBusinessModel.comingSoon')}</h4>
                    <p>{this.props.p.t('regBusinessModel.comingSoonDesc1')}</p>
                  </div>
                </div>
                <p>{this.props.p.t('regBusinessModel.comingSoonDesc2')}</p>
              </div>
            </div>
          </div>
          <div className="uk-grid">
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2">
              <Link to="ssp" className="back btm-back">{this.props.p.t('regBusinessModel.back')}</Link>
            </div>
            <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-2  uk-width-small-1-2 uk-text-right">
              <a className="general_btn" onClick={this.handleClick}>{this.props.p.t('regBusinessModel.next')}</a>
            </div>
          </div>
        </div>
      </section>

    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}
RegBusinessModel.defaultProps = {
  history: {}
};
export default translate(RegBusinessModel);
