import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

import {} from '../../../../../actions';

class Link extends Component {
  constructor() {
    super();
    this.handleNav = this.handleNav.bind(this);
  }
  handleNav() {
    const {previous} = this.props;
    this.props.history.push(previous);
  }
  render() {
    return (
      <a onClick={this.handleNav} className="back">
        <svg className="cl-icon-back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="7348.966 -314.516 17.534 11.033">
          <g data-name="Group 118" transform="translate(7302 -512.5)">
            <path data-name="Path 35" className="cl-icon-back-arrow-1" d="M0,0,4.749,5,3.795,6,0,10" transform="translate(52.749 208.5) rotate(180)"/>
            <line data-name="Line 9" className="cl-icon-back-arrow-1" x2={16} transform="translate(48.5 203.5)"/>
          </g>
        </svg>
        Back
      </a>
    );
  }
  static get propTypes() {
    return {
      history: PropTypes.object.isRequired,
      previous: PropTypes.string.isRequired
    };
  }
}

Link.defaultProps = {};

const mapStateToProps = state => {
  const {sport} = state;
  return {
    sport
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PreviousLink = connect(mapStateToProps, mapDispatchToProps)(Link);
export default translate(PreviousLink);
