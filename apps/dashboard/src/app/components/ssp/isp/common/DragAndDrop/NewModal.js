import React, {Component} from 'react';
import DateTimePicker from 'react-datetime';
import './DateTime.css';
import {connect} from 'react-redux';
import Modal from '../../../../common/Modal';
import moment from 'moment';

import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {postEvents} from '../../../../../actions/index';
import config from '../../../../../config';

class NewModalClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    };
    this.handleSave = this.handleSave.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
    this.handleOverridePricing = this.handleOverridePricing.bind(this);
  }
  handleSave() {
    const {event} = this.state;
    console.log('handleSave', 'event', event);
    this.props.postEvents({
      ...event,
      id: null,
      sessionID: event.session.id,
      userType: 'S',
      recurRule: '0 0 1 1 *',
      notes: event.notes,
      start: moment(event.start).add(moment().utcOffset(), config.sessionLengthUnit),
      end: moment(event.end).add(moment().utcOffset(), config.sessionLengthUnit),
      overridePricing: event.overridePricing ? event.overridePricing : 0,
      overrideSessionLength: 0,
      overrideBufferLength: 0
    });
    this.props.closeModal();
  }
  afterOpenModal() {}
  handleStartDate(date) {
    const {event} = this.state;
    console.log('---> ', moment().isSameOrBefore(date));
    if (moment().isSameOrBefore(date)) {
      console.log('dateOffset', date.utcOffset());
      this.setState({
        event: {
          ...event,
          id: event.id,
          start: date._d,
          end: moment(date._d).add(event.session.defaultSessionLength, config.sessionLengthUnit)
        }
      });
    }
  }
  handleEndDate(date) {
    const {event} = this.state;
    console.log('---> ', moment().isSameOrBefore(moment(date).subtract(event.session.defaultSessionLength, config.sessionLengthUnit)));
    if (moment().isSameOrBefore(moment(date).subtract(event.session.defaultSessionLength, config.sessionLengthUnit))) {
      this.setState({
        event: {
          ...event,
          id: event.id,
          start: moment(date._d).subtract(event.session.defaultSessionLength, config.sessionLengthUnit),
          end: date._d
        }
      });
    }
  }
  componentWillUnmount() {}
  handleRemoveEvent() {
    this.setState({event: {}});
    this.props.closeModal();
  }
  handleSearchEvent(events, id) {
    return events.findIndex(event => event.id === id);
  }
  componentDidMount() {
    const {event, start} = this.props;
    this.setState({
      event: {
        ...event,
        start,
        overridePricing: event.session.overridePricing,
        end: moment(start).add(event.session.defaultSessionLength, config.sessionLengthUnit)
      },
      set: true
    });
  }
  handleOverridePricing(e) {
    const {event} = this.state;
    const {value} = e.target;
    const intValue = parseInt(value, 10);
    this.setState({
      event: {
        ...event,
        overridePricing: (intValue) ? intValue : 0
      }
    });
  }
  render() {
    const {event, set} = this.state;

    if (!set) {
      return null;
    }
    const {subSSPTypeID} = event.session;
    console.log('event', event);
    const price = this.props.prices.find(itemPrice => itemPrice.id === subSSPTypeID);
    const basePrice = (price && price.prices[0]) ? price.prices[0].price : 0;
    return (
      <Modal isModalOpen>
        <div id="newSessionModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <div
                style={{display: 'inline-block',
                  border: '1px solid #cccccc',
                  padding: 5,
                  borderRadius: 4,
                  width: 20,
                  verticalAlign: 'top'}}
              >
                <div
                  style={{backgroundColor: event.session.color,
                    position: 'relative',
                    display: 'block',
                    borderRadius: 4,
                    height: 20
                  }}
                />
              </div>
              <div className="uk-modal-header rCol"/>
            </div>
            <div className="borderClassSec"/>
            <div className="uk-modal-body">
              <h4>{event.session.name}</h4>
              <p>Level: {event.session.skillLevelName}</p>
              <p>Group Size: {event.session.ageGroupName}</p>
              <div className="borderClassSec"/>
              <p>Location: {event.session.trainingLocation.title} </p>

              <form className="uk-form">
                <p className="highlight">From <DateTimePicker value={event.start} onChange={this.handleStartDate}/></p>
                <div className="borderClassSec"/>
                <p className="highlight">To <DateTimePicker value={event.end} onChange={this.handleEndDate}/></p>
                <div className="borderClassSec"/>
                <p className="highlight">
                  {this.props.p.t('SessionsCreateModal.overridePricing')}
                  <input type="number" name placeholder={`$${basePrice}`} onChange={this.handleOverridePricing} value={(event.overridePricing < 1) ? '' : event.overridePricing}/>
                </p>
              </form>
            </div>
            <div className="borderClassSec"/>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a className="finish" onClick={this.handleSave}>{this.props.p.t('SessionsCreateModal.save')}</a>
                </div>
                <div className="rCol">
                  <a className="finish" onClick={this.props.closeModal}>{this.props.p.t('SessionsCreateModal.close')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Modal>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      postEvents: PropTypes.func.isRequired,
      closeModal: PropTypes.func.isRequired,
      event: PropTypes.object.isRequired,
      start: PropTypes.object.isRequired,
      prices: PropTypes.array
    };
  }
}
NewModalClass.defaultProps = {
  prices: []
};

const mapStateToProps = state => {
  const {events, prices} = state;
  return {
    events,
    prices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postEvents: event => dispatch(postEvents(event))
  };
};

const ModalComponent = connect(mapStateToProps, mapDispatchToProps)(NewModalClass);
export default translate(ModalComponent);
