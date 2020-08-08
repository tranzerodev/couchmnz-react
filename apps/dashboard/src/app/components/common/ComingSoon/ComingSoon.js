import React, {Component} from 'react';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {COMING_SOON_SCC, COMING_SOON_TF, COMING_SOON_OSP, COMING_SOON_P, COMING_SOON_A} from '../../../constants/pathConstants';
import {COMING_SOON_DEFAULT} from '../../../constants/assetsPaths';

class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.renderProfileType =
    this.renderProfileType.bind(this);
  }
  handleBack() {
    this.props.history.goBack();
  }
  renderProfileType() {
    const currentLocation = this.props.location.pathname;
    console.log('LOCATION', currentLocation);
    return (
      <div className="profileTypeInfo">
        {currentLocation === ('/' + COMING_SOON_SCC) ?
          <svg className="cl-icon-ssp-camp" xmlns="http://www.w3.org/2000/svg" viewBox="761.314 1352.325 91.35 88.455">
            <g data-name="Group 14" transform="translate(-3688.511 380.489)">
              <g transform="translate(4450 972)">
                <g>
                  <path data-name="Path 9" className="cl-icon-ssp-camp-1" d="M7,87.76c-.475.271-.655.1-.4-.39L45.671,13.149c.256-.486.457-.44.45.11l-.279,21.06a5.8,5.8,0,0,1-.413,1.9S38.67,51.853,31.14,65.3,7,87.76,7,87.76Z"/>
                  <path data-name="Path 10" className="cl-icon-ssp-camp-2" d="M7.373,86.972q.259-.15.561-.329c.943-.561,1.993-1.219,3.126-1.971a80.363,80.363,0,0,0,9.489-7.349A49.84,49.84,0,0,0,30.7,65.054q1.34-2.391,2.718-5c2.779-5.255,5.54-10.888,8.157-16.52.916-1.972,1.748-3.8,2.481-5.445.257-.575.482-1.085.675-1.525.116-.264.195-.445.236-.541a5.317,5.317,0,0,0,.371-1.71l.264-19.968Z"/>
                </g>
                <g>
                  <path data-name="Path 11" className="cl-icon-ssp-camp-1" d="M45.849-87.76c-.475-.271-.655-.1-.4.39L84.525-13.149c.256.486.457.44.45-.11L84.7-34.32a5.8,5.8,0,0,0-.414-1.9S77.524-51.853,69.994-65.3,45.849-87.76,45.849-87.76Z" transform="translate(129.977) rotate(180)"/>
                  <path data-name="Path 12" className="cl-icon-ssp-camp-2" d="M46.227-86.972q.259.15.561.329c.943.561,1.993,1.219,3.126,1.971A80.363,80.363,0,0,1,59.4-77.323a49.841,49.841,0,0,1,10.156,12.27q1.339,2.391,2.718,5c2.779,5.255,5.54,10.888,8.157,16.52.916,1.972,1.748,3.8,2.481,5.445.257.575.482,1.085.675,1.525.116.264.195.445.236.541a5.317,5.317,0,0,1,.371,1.71l.264,19.968Z" transform="translate(129.977) rotate(180)"/>
                </g>
                <path className="cl-icon-ssp-camp-3" d="M48.567,19.938,38.343.511"/>
                <path className="cl-icon-ssp-camp-3" d="M52.657-19.938,42.433-.511" transform="translate(95.09) rotate(180)"/>
                <path data-name="Line" className="cl-icon-ssp-camp-3" d="M45.5,13.8V87.485"/>
                <path data-name="Line" className="cl-icon-ssp-camp-3" d="M6.646,87.421H83.74"/>
                <path data-name="Line" className="cl-icon-ssp-camp-3" d="M84.354,87.421,90.489,77.2"/>
                <path className="cl-icon-ssp-camp-3" d="M.511-87.421,6.646-77.2" transform="translate(7.157) rotate(180)"/>
              </g>
            </g>
          </svg> : currentLocation === ('/' + COMING_SOON_TF) ?
            <svg className="cl-icon-ssp-fitness-business" xmlns="http://www.w3.org/2000/svg" viewBox="1061.995 1353 102.05 86">
              <g data-name="Group 15" transform="translate(-3654.56 386)">
                <g transform="translate(4716 967)">
                  <g transform="translate(32)">
                    <g>
                      <rect data-name="Rectangle 23" className="cl-icon-ssp-fitness-business-1" width="40" height="19.286" rx="3"/>
                      <rect data-name="Rectangle 24" className="cl-icon-ssp-fitness-business-2" width="39" height="18.286" rx="3" transform="translate(0.5 0.5)"/>
                    </g>
                    <path className="cl-icon-ssp-fitness-business-3" d="M20,18.8v7.714"/>
                    <g transform="translate(6.829 4.821)">
                      <rect className="cl-icon-ssp-fitness-business-4" width="19.638" height="2.893" transform="translate(3.43 3.235)"/>
                      <g transform="translate(18.159)">
                        <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="9.705" rx="1.463"/>
                        <rect data-name="Rectangle-14" className="cl-icon-ssp-fitness-business-4" width="2.927" height="6.821" rx="1.463" transform="translate(2.927 1.442)"/>
                        <rect data-name="Rectangle-14" className="cl-icon-ssp-fitness-business-4" width="2.927" height="4.08" rx="1.463" transform="translate(5.854 2.812)"/>
                      </g>
                      <g>
                        <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="9.705" rx="1.463" transform="translate(6.231)"/>
                        <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="6.835" rx="1.463" transform="translate(3.304 1.435)"/>
                        <rect className="cl-icon-ssp-fitness-business-4" width="2.927" height="3.834" rx="1.463" transform="translate(0.378 2.935)"/>
                      </g>
                    </g>
                  </g>
                  <g transform="translate(0 24)">
                    <g>
                      <rect data-name="Rectangle 25" className="cl-icon-ssp-fitness-business-5" width="97.251" height="62" rx="3" transform="translate(2.943)"/>
                      <rect data-name="Rectangle 26" className="cl-icon-ssp-fitness-business-6" width="96.251" height="61" rx="3" transform="translate(3.443 0.5)"/>
                    </g>
                    <g data-name="Rectangle-9">
                      <path data-name="Path 13" className="cl-icon-ssp-fitness-business-5" d="M43.407,38.425a3,3,0,0,1,3.006-3h10.91a3,3,0,0,1,3.006,3V62H43.407Z"/>
                      <path data-name="Path 14" className="cl-icon-ssp-fitness-business-7" d="M43.907,61.5H59.829V38.425a2.5,2.5,0,0,0-2.506-2.5H46.413a2.5,2.5,0,0,0-2.506,2.5Z"/>
                    </g>
                    <g>
                      <rect data-name="Rectangle 27" className="cl-icon-ssp-fitness-business-5" width="15.45" height="9.595" rx="2" transform="translate(14.714 10.333)"/>
                      <rect data-name="Rectangle 28" className="cl-icon-ssp-fitness-business-6" width="14.45" height="8.595" rx="2" transform="translate(15.214 10.833)"/>
                    </g>
                    <g>
                      <rect data-name="Rectangle 29" className="cl-icon-ssp-fitness-business-1" width="16.921" height="9.595" rx="2" transform="translate(43.407 10.333)"/>
                      <rect data-name="Rectangle 30" className="cl-icon-ssp-fitness-business-2" width="15.921" height="8.595" rx="2" transform="translate(43.907 10.833)"/>
                    </g>
                    <g>
                      <rect data-name="Rectangle 31" className="cl-icon-ssp-fitness-business-5" width="15.45" height="9.595" rx="2" transform="translate(72.1 10.333)"/>
                      <rect data-name="Rectangle 32" className="cl-icon-ssp-fitness-business-6" width="14.45" height="8.595" rx="2" transform="translate(72.6 10.833)"/>
                    </g>
                    <g data-name="Rectangle-6">
                      <rect data-name="Rectangle 33" className="cl-icon-ssp-fitness-business-1" width="15.45" height="9.595" rx="2" transform="translate(14.714 36.167)"/>
                      <rect data-name="Rectangle 34" className="cl-icon-ssp-fitness-business-2" width="14.45" height="8.595" rx="2" transform="translate(15.214 36.667)"/>
                    </g>
                    <g data-name="Rectangle-6-Copy-3">
                      <rect data-name="Rectangle 35" className="cl-icon-ssp-fitness-business-1" width="15.45" height="9.595" rx="2" transform="translate(72.1 36.167)"/>
                      <rect data-name="Rectangle 36" className="cl-icon-ssp-fitness-business-2" width="14.45" height="8.595" rx="2" transform="translate(72.6 36.667)"/>
                    </g>
                    <path className="cl-icon-ssp-fitness-business-3" d="M3.278,29.155H99.859"/>
                    <path className="cl-icon-ssp-fitness-business-3" d="M3.679,59.786H43.407"/>
                    <path className="cl-icon-ssp-fitness-business-3" d="M60.329,59.786H99.321"/>
                    <g>
                      <path data-name="Path 15" className="cl-icon-ssp-fitness-business-5" d="M.781,1.716A2.9,2.9,0,0,1,3.3,0H99.862a2.905,2.905,0,0,1,2.518,1.716l.1.259a1.173,1.173,0,0,1-1.174,1.716H1.854A1.171,1.171,0,0,1,.679,1.975Z"/>
                      <path data-name="Path 16" className="cl-icon-ssp-fitness-business-7" d="M1.246,1.9l-.1.259c-.243.621.04,1.034.709,1.034h99.453c.664,0,.95-.416.708-1.034l-.1-.259A2.408,2.408,0,0,0,99.862.5H3.3A2.407,2.407,0,0,0,1.246,1.9Z"/>
                    </g>
                  </g>
                </g>
              </g>
            </svg> : currentLocation === ('/' + COMING_SOON_OSP) ?
              <svg className="cl-icon-ssp-other" xmlns="http://www.w3.org/2000/svg" viewBox="1354 1361 129.511 71.51">
                <g data-name="Group 16" transform="translate(-3625 381)">
                  <g transform="translate(4979 980)">
                    <g transform="translate(15.184)">
                      <g>
                        <rect data-name="Rectangle 39" className="cl-icon-ssp-other-1" width="71.454" height="71.51" rx="10"/>
                        <rect data-name="Rectangle 40" className="cl-icon-ssp-other-2" width="70.454" height="70.51" rx="10" transform="translate(0.5 0.5)"/>
                      </g>
                      <g>
                        <path data-name="Path 17" className="cl-icon-ssp-other-1" d="M10.718,12.842a3,3,0,0,1,3-3.009H57.739a3,3,0,0,1,3,3.009v3.695a6.7,6.7,0,0,1-6.707,6.7h-36.6a6.71,6.71,0,0,1-6.707-6.7Z"/>
                        <path data-name="Path 18" className="cl-icon-ssp-other-3" d="M11.218,12.842v3.695a6.21,6.21,0,0,0,6.207,6.2h36.6a6.2,6.2,0,0,0,6.207-6.2V12.842a2.5,2.5,0,0,0-2.5-2.509H13.716A2.5,2.5,0,0,0,11.218,12.842Z"/>
                      </g>
                    </g>
                    <g transform="translate(64.309 20.559)">
                      <g>
                        <rect data-name="Rectangle 41" className="cl-icon-ssp-other-1" width="65.202" height="44.694" rx="6" transform="translate(0 6.257)"/>
                        <rect data-name="Rectangle 42" className="cl-icon-ssp-other-2" width="64.202" height="43.694" rx="6" transform="translate(0.5 6.757)"/>
                      </g>
                      <g>
                        <ellipse data-name="Ellipse 9" className="cl-icon-ssp-other-4" cx="8.932" cy="8.939" rx="8.932" ry="8.939" transform="translate(24.116 19.665)"/>
                        <ellipse data-name="Ellipse 10" className="cl-icon-ssp-other-5" cx="8.432" cy="8.439" rx="8.432" ry="8.439" transform="translate(24.616 20.165)"/>
                      </g>
                      <g transform="translate(28.582 24.135)">
                        <path className="cl-icon-ssp-other-6" d="M4.466,0V8.939"/>
                        <path className="cl-icon-ssp-other-6" d="M8.932,4.469H0"/>
                      </g>
                      <path className="cl-icon-ssp-other-7" d="M25.009,5.99V3a3,3,0,0,1,3-3h9.746a3,3,0,0,1,3,3v3"/>
                    </g>
                    <g transform="translate(0 14.302)">
                      <g>
                        <path data-name="Path 19" className="cl-icon-ssp-other-1" d="M0,19.157A12,12,0,0,1,12,7.151H31.763a12.008,12.008,0,0,1,12,12.006v34.06a4,4,0,0,1-4,3.991H4a3.992,3.992,0,0,1-4-3.991Z"/>
                        <path data-name="Path 20" className="cl-icon-ssp-other-3" d="M.5,19.157v34.06A3.492,3.492,0,0,0,4,56.708H39.766a3.5,3.5,0,0,0,3.5-3.491V19.157a11.508,11.508,0,0,0-11.5-11.506H12A11.5,11.5,0,0,0,.5,19.157Z"/>
                      </g>
                      <g>
                        <path data-name="Path 21" className="cl-icon-ssp-other-1" d="M0,15.152a8,8,0,0,1,8-8H35.764a8,8,0,0,1,8,8V53.217a4,4,0,0,1-4,3.991H4a3.992,3.992,0,0,1-4-3.991Z"/>
                        <path data-name="Path 22" className="cl-icon-ssp-other-3" d="M.5,15.152V53.217A3.492,3.492,0,0,0,4,56.708H39.766a3.5,3.5,0,0,0,3.5-3.491V15.152a7.5,7.5,0,0,0-7.5-7.5H8A7.5,7.5,0,0,0,.5,15.152Z"/>
                      </g>
                      <g>
                        <path data-name="Path 23" className="cl-icon-ssp-other-1" d="M9.16,3a3,3,0,0,1,2.994-3H31.612a3,3,0,0,1,2.994,3V8.173H9.16Z"/>
                        <path id="Path_24" data-name="Path 24" className="cl-icon-ssp-other-3" d="M9.66,7.673H34.106V3A2.5,2.5,0,0,0,31.612.5H12.154A2.5,2.5,0,0,0,9.66,3Z"/>
                      </g>
                      <g>
                        <path data-name="Path 25" className="cl-icon-ssp-other-4" d="M9.16,3a3,3,0,0,1,2.994-3H31.612a3,3,0,0,1,2.994,3V8.173H9.16Z"/>
                        <path data-name="Path 26" className="cl-icon-ssp-other-8" d="M9.66,7.673H34.106V3A2.5,2.5,0,0,0,31.612.5H12.154A2.5,2.5,0,0,0,9.66,3Z"/>
                      </g>
                      <rect className="cl-icon-ssp-other-4" width="27.481" height="8.173" rx="2" transform="translate(8.142 36.777)"/>
                      <g transform="translate(12.338 17.367)">
                        <g>
                          <g transform="translate(7.267 -7.129) rotate(42)">
                            <path data-name="Path 27" className="cl-icon-ssp-other-4" d="M12.919,11.527s2.56-2.519,2.56-5.626S12.919.274,12.919.274s-2.56,2.519-2.56,5.626S12.919,11.527,12.919,11.527Z"/>
                            <path data-name="Path 28" className="cl-icon-ssp-other-8" d="M12.919,10.783l.018-.021a10.288,10.288,0,0,0,.839-1.15,7.047,7.047,0,0,0,1.2-3.712,7.047,7.047,0,0,0-1.2-3.712,10.28,10.28,0,0,0-.839-1.15l-.018-.021-.018.021a10.28,10.28,0,0,0-.839,1.15,7.048,7.048,0,0,0-1.2,3.712,7.048,7.048,0,0,0,1.2,3.712,10.288,10.288,0,0,0,.839,1.15Z"/>
                          </g>
                          <g>
                            <path data-name="Path 29" className="cl-icon-ssp-other-4" d="M5.668-13.734A7.631,7.631,0,0,1,7.831-8.981,7.631,7.631,0,0,1,5.668-4.229,7.631,7.631,0,0,1,3.506-8.981,7.631,7.631,0,0,1,5.668-13.734Z" transform="matrix(-0.743, 0.669, -0.669, -0.743, 3.871, -1.486)"/>
                            <path data-name="Path 30" className="cl-icon-ssp-other-9" d="M5.668-12.985a8.621,8.621,0,0,1,.658.909,5.878,5.878,0,0,1,1,3.094,5.878,5.878,0,0,1-1,3.094,8.614,8.614,0,0,1-.658.909,8.616,8.616,0,0,1-.658-.909,5.878,5.878,0,0,1-1-3.094,5.878,5.878,0,0,1,1-3.094A8.624,8.624,0,0,1,5.668-12.985Z" transform="matrix(-0.743, 0.669, -0.669, -0.743, 3.871, -1.486)"/>
                          </g>
                          <path className="cl-icon-ssp-other-7" d="M9.286,15.012a3.635,3.635,0,0,1-.778-2.381,5.566,5.566,0,0,1,.82-2.781"/>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg> : currentLocation === ('/' + COMING_SOON_P) ?
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
                </svg> : currentLocation === ('/' + COMING_SOON_A) ?
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
                  </svg> : <div/>
        }
        <h5>{this.props.p.t('ComingSoon.create_profile')}</h5>
        {currentLocation === ('/' + COMING_SOON_SCC) ?
          <h2>{this.props.p.t('ComingSoon.SCC')}</h2> :
          currentLocation === ('/' + COMING_SOON_TF) ?
            <h2>{this.props.p.t('ComingSoon.TF')}</h2> :
            currentLocation === ('/' + COMING_SOON_OSP) ?
              <h2>{this.props.p.t('ComingSoon.OSP')}</h2> :
              currentLocation === ('/' + COMING_SOON_A) ?
                <h2>{this.props.p.t('ComingSoon.A')}</h2> :
                currentLocation === ('/' + COMING_SOON_P) ?
                  <h2>{this.props.p.t('ComingSoon.P')}</h2> :
                  <div/>
        }
      </div>
    );
  }
  render() {
    const profileType = this.renderProfileType();
    return (
      <div>
        <section className="profileType">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-2 uk-width-large-1-2 uk-width-medium-1-1  uk-width-small-1-1">
                  {profileType}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="top-back-sec">
          <div className="wrapper">
            <div className="uk-container-fluid uk-container-center">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <a onClick={this.handleBack} className="back">
                    <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                      <g data-name="Group 118" transform="translate(7302 -512.5)">
                        <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                        <line data-name="Line 9" className="cl-icon-back-arrow-1" x2="16" transform="translate(48.5 203.5)"/>
                      </g>
                    </svg>
                    {' ' + this.props.p.t('ComingSoon.back')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="stepSection stepSectionNxt stepSection1-2">
          <div className="uk-container uk-container-center">
            <div className="comingSoonOuter">
              <div className="uk-grid">
                <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1 ">
                  <div className="comingSoonImg">
                    <img src={COMING_SOON_DEFAULT}/>
                  </div>
                </div>
                <div className="uk-width-xlarge-5-10 uk-width-large-5-10 uk-width-medium-1-2  uk-width-small-1-1 ">
                  <div className="comingSoon">
                    <h1 className="uk-padding-remove">{this.props.p.t('ComingSoon.coming_soon')}</h1>
                    <p>{this.props.p.t('ComingSoon.p1')}</p>
                    <p>{this.props.p.t('ComingSoon.p2')}</p>
                    <p>{this.props.p.t('ComingSoon.p3')} <a rel="noopener noreferrer" href="mailto:support@coachlist.com" target="_blank">{this.props.p.t('ComingSoon.supportMail')}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };
  }
}
const ComingSoonPage = translate(ComingSoon);
export default ComingSoonPage;
