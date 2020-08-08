import React, {Component} from 'react';
import {connect} from 'react-redux';

import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';

class CantFind extends Component {
  render() {
    return (
      <div>
        <a onClick={this.props.handleAddNewModal}>{this.props.p.t('CantFind.cantFind')}</a>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      handleAddNewModal: PropTypes.func.isRequired
    };
  }
}

CantFind.defaultProps = {
};

const mapStateToProps = state => {
  const {
  } = state;
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const CantFindLink = connect(mapStateToProps, mapDispatchToProps)(translate(CantFind));
export default CantFindLink;
