import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withRouter} from 'react-router-dom';
import {WELCOME} from '../../../constants/pathConstants';

class FinishLaterLink extends Component {
  constructor() {
    super();
    this.handleFinishLater = this.handleFinishLater.bind(this);
  }
  handleFinishLater() {
    this.props.history.push(WELCOME);
  }
  render() {
    return (
      <a className="finish" onClick={this.handleFinishLater}>{this.props.p.t('FinishLaterLink.finish')}</a>
    );
  }
}

FinishLaterLink.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(translate(FinishLaterLink));
