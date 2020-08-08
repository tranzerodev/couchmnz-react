import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

function getStatus(completedSteps, currentStep) {
  return completedSteps >= currentStep ? 'complete' : (completedSteps - currentStep) === 1 ? 'upcoming' : '';
}

class PaymentProgressBar extends Component {
  constructor(props) {
    super(props);
    this.renderStep = this.renderStep.bind(this);
  }

  renderStep(status, stepName1, stepName2) {
    const {p} = this.props;
    return (
      <div className={'cl-sd-paymentProgress-step ' + status}>
        <h6>{p.t('PaymentProgressBar.' + stepName1)}<br/> {p.t('PaymentProgressBar.' + stepName2)}</h6>
        <div className="cl-sd-paymentProgress-bar"/>
      </div>
    );
  }

  render() {
    const {completedSteps} = this.props;
    return (
      <div className="cl-sd-paymentProgress-steps">
        {
          this.renderStep(getStatus(completedSteps, 1), 'shopping', 'cart')
        }
        {
          this.renderStep(getStatus(completedSteps, 2), 'confirm', 'order')
        }
        {
          this.renderStep(getStatus(completedSteps, 3), 'billing', 'address')
        }
        {
          this.renderStep(getStatus(completedSteps, 4), 'make', 'payment')
        }
        {
          this.renderStep(getStatus(completedSteps, 5), 'download', 'receipt')
        }
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      completedSteps: PropTypes.number.isRequired
    };
  }
}

export default translate(PaymentProgressBar);
