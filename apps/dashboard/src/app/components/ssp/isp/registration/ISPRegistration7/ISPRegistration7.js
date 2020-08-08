import React, {Component} from 'react';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import RequiredNotFilledModal from '../../registration/RequiredNotFilledModal';

import {
  sspSessionNameSubmit,
  sspSessionSubmit
} from '../../../../../actions';
import Sessions from '../Sessions';
import TopContent from '../ISPRegFlowTopContent';
import BackButton from '../BackButton';
import FinishLaterLink from '../../../../common/FinishLaterLink';
import {REGISTRATION_ISP_SCHEDULE, REGISTRATION_ISP_TRAINING_LOCATIONS} from '../../../../../constants/pathConstants';

class ISPRegistration7Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotFilledModalOpen: false
    };
    this.onNotFilledModalClose = this.onNotFilledModalClose.bind(this);
    this.onHandleNext = this.onHandleNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onHandleNext() {
    this.props.history.push(REGISTRATION_ISP_SCHEDULE);
  }

  onNotFilledModalClose() {
    this.setState({isNotFilledModalOpen: false});
  }

  handleSubmit() {
    const {sessions} = this.props;
    const {data} = sessions;
    if (data && data.length > 0) {
      this.onHandleNext();
    } else {
      this.setState({
        isNotFilledModalOpen: true
      });
    }
  }

  render() {
    return (
      <div className>
        <TopContent step={7}/>
        <BackButton back={REGISTRATION_ISP_TRAINING_LOCATIONS} {...this.props}/>
        <section className="stepSection stepSectionNxt ssp-regflow-1o">
          <div className="uk-container uk-container-center">
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1 ">
                <Sessions {...this.props}/>
              </div>
            </div>
            <div className="uk-grid">
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2"/>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2 mnone"/>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-3  uk-width-small-1-2">
                <div className="nxtAlign">
                  <a className="general_btn" onClick={this.handleSubmit}>{this.props.p.t('RegistrationNextLink.next')}</a>
                </div>

              </div>
              <div className="uk-width-xlarge-1-4 uk-width-large-1-4 uk-width-medium-1-1  uk-width-small-1-1">
                <div className="finishDivSec">
                  <FinishLaterLink/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <RequiredNotFilledModal
          notFilled={[]}
          isModalOpen={this.state.isNotFilledModalOpen}
          handleClose={this.onNotFilledModalClose}
          saveData={this.onHandleNext}
          data={{}}
          msgKey="Sessions.youHaveNotFilled"
          saveType=""
        />
      </div>
    );
  }
}

ISPRegistration7Class.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  history: PropTypes.object.isRequired,
  sessions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {sspValidation, sessions} = state;
  return {
    sspValidation,
    sessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sspSessionNameSubmit: data => dispatch(sspSessionNameSubmit(data)),
    sspSessionSubmit: data => dispatch(sspSessionSubmit(data))
  };
};

export default (translate(connect(mapStateToProps, mapDispatchToProps)(withRouter(ISPRegistration7Class))));
