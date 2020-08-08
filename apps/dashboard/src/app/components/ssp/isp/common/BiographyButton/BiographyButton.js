import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

import {} from '../../../../../actions/index';

class Button extends Component {
  render() {
    const {isModified} = this.props;
    const {t} = this.props.p;
    return (
      <div className="uk-grid">
        <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
          <a className="back btm-back" onClick={this.props.onSubmit}>
            {isModified ? t('Biography.save') : t('Biography.save')}
            <svg className="cl-icon-arrow-right-orange" xmlns="http://www.w3.org/2000/svg" viewBox="-804.53 -5141.531 6.591 11.063">
              <g transform="translate(-1001.605 -5996.5)">
                <path data-name="Path 149" className="cl-icon-arrow-right-orange-1" d="M-17914.895-2197l5,5,5-5" transform="translate(2394.606 -17049.395) rotate(-90)"/>
              </g>
            </svg>
          </a>
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      isModified: PropTypes.bool,
      onSubmit: PropTypes.func.isRequired
    };
  }
}

Button.defaultProps = {
  isModified: false
};

const mapStateToProps = (/* state */) => {
  return {};
};
const mapDispatchToProps = (/* dispatch */) => {
  return {};
};
const BiographyButton = connect(mapStateToProps, mapDispatchToProps)(translate(Button));
export default BiographyButton;
