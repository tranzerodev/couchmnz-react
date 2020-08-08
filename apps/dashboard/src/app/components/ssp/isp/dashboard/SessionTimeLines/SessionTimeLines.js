import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import ispSessionTemplates from './ispSessionTemplates';

class SessionTimeLines extends Component {
  constructor(props) {
    super(props);

    this.renderSessionEvents = this.renderSessionEvents.bind(this);
    this.eventActionCallback = this.eventActionCallback.bind(this);
  }
  renderSessionEvents(event, index) {
    const {p, events, booking} = this.props;
    const activeEvent = ((events.length - 1) === index);
    return ispSessionTemplates({data: event, t: p.t, booking, isActiveEvent: activeEvent, index}, this.eventActionCallback);
  }

  eventActionCallback(event) {
    const {action} = event.target.dataset;

    const {booking} = this.props;
    this.props.onAction(booking, action);
  }
  render() {
    const {events, sessionName} = this.props;
    return (
      <div className="cl-md-session-details">
        <div className="uk-container-center cl-md-view-session cl-md-custom-8-10">
          <h4>{sessionName}</h4>
          {
            events.map(this.renderSessionEvents)
          }
        </div>
      </div>
    );
  }
}

SessionTimeLines.propTypes = {
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired,
  events: PropTypes.array,
  sessionName: PropTypes.string.isRequired,
  booking: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired
};

SessionTimeLines.defaultProps = {
  events: []
};

export default translate(SessionTimeLines);
