import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

import appConstants from '../../../../../constants/appConstants';

class AthleteEventItem extends Component {
  constructor(props) {
    super(props);
    this.renderTrainingType = this.renderTrainingType.bind(this);
    this.renderScheduleButton = this.renderScheduleButton.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
  }

  handleSchedule() {
    this.props.onSchedule(this.props.event);
  }

  renderTrainingType() {
    const {trainingType} = this.props;
    return (
      <i className={'cl-icon' + appConstants.trainingServicesIconMap[trainingType.name]}/>
    );
  }

  renderScheduleButton() {
    return (
      <div className="scheduler-calendarWeekItemAction">
        <a className="uk-button theme-orange-btn" onClick={this.handleSchedule}>{this.props.p.t('AthleteEventItem.schedule')}</a>
      </div>
    );
  }

  render() {
    const {event, color, p, ageGroup, skillLevel, sport, trainingLocation, trainingType, gender} = this.props;
    const {t} = p;
    return (
      <div className="scheduler-calendarWeekItem" style={{borderLeftColor: color}}>
        <div className="scheduler-calendarColumn scheduler-calendarColumn--medium">
          <div className="scheduler-calendarWeekItemTimestamp">
            <strong>{moment(event.startTime).format('hh:mm A')} - {moment(event.endTime).format('hh:mm A')}</strong>
          </div>
          <div className="scheduler-calendarWeekItemPositions">
            {t('AthleteEventItem.open_position', {availableSlots: event.availableSlots})}
          </div>
        </div>
        <div className="scheduler-calendarColumn scheduler-calendarColumn--large">
          <div className="scheduler-calendarWeekItemTitle">
            <strong>
              {t('AthleteEventItem.details',
                {
                  gender: t('genders.' + gender),
                  ageGroup: ageGroup.description,
                  skillLevel: skillLevel.description,
                  sport: sport.name
                })}
            </strong >
          </div>
          <div className="scheduler-calendarWeekItemCategory">
            <span>{sport.name}</span>
            <i className="uk-icon-circle"/>
            <span>
              {this.renderTrainingType()}
              {trainingType.description}
            </span>
            <i className="uk-icon-circle"/>
            <span>{t('AthleteEventItem.detailsRepeat',
              {
                gender: t('genders.' + gender),
                ageGroup: ageGroup.description,
                skillLevel: skillLevel.description
              })}
            </span>
          </div>
          <div className="scheduler-calendarWeekItemLocation">
            <span>{trainingLocation.address} (~2 mi away pending) <a onClick={this.props.onSeeOnMap}>{t('AthleteEventItem.see_on_map')}</a></span>
            <i className="uk-icon-circle"/>
            <span>
              {trainingLocation.type.description}
            </span>
          </div>
        </div>
        <div className="scheduler-calendarColumn scheduler-calendarColumn--small">
          {this.renderScheduleButton()}
        </div>
      </div>
    );
  }

  static get propTypes() {
    return {
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      event: PropTypes.object.isRequired,
      color: PropTypes.string.isRequired,
      ageGroup: PropTypes.object.isRequired,
      skillLevel: PropTypes.object.isRequired,
      sport: PropTypes.object.isRequired,
      trainingLocation: PropTypes.object.isRequired,
      trainingType: PropTypes.object.isRequired,
      gender: PropTypes.string.isRequired,
      onSeeOnMap: PropTypes.func.isRequired,
      onSchedule: PropTypes.func.isRequired
    };
  }
}

export default translate(AthleteEventItem);
