import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

class BackButton extends Component {
  constructor() {
    super();
    this.handleBack = this.handleBack.bind(this);
  }
  handleBack() {
    this.props.history.push(this.props.back);
  }
  render() {
    return (
      <div className="top-back-sec">
        <div className="wrapper">
          <div className="uk-container-fluid uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                <a onClick={this.handleBack} className="back">
                  <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
                    <g data-name="Group 118" transform="translate(7302 -512.5)">
                      <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
                      <line data-name="Line 9" className="cl-icon-back-arrow-1" x2={16} transform="translate(48.5 203.5)"/>
                    </g>
                  </svg>
                  {' ' + this.props.p.t('BackButton.back')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object,
      back: PropTypes.string,
      p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
    };
  }
}

BackButton.defaultProps = {
  history: {},
  back: ''
};

export default translate(BackButton);
