import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import moment from 'moment';

import appConstants from '../../../../constants/appConstants';
import {isNonEmptyArray} from '../../../../validators/common/util';

class ViewOrderItem extends Component {
  constructor(props) {
    super(props);
    this.renderSession = this.renderSession.bind(this);
    this.getSelectedProfile = this.getSelectedProfile.bind(this);
  }

  getSelectedProfile(selectedProfileId, dependents) {
    return dependents.find(dependent => dependent.id === selectedProfileId);
  }

  renderSession(session, index) {
    const {p} = this.props;
    const key = session.label + index;
    return (
      <p key={key}>
        <span>{session.label}: </span>
        {session.status === appConstants.sessionEvents.scheduled ?
          p.t('OrderItem.scheduledTimeStamp',
            {
              date: moment(session.startDate).format('ddd[,] MMM DD'),
              startTime: moment(session.startDate).format('hh:mm a'),
              endTime: moment(session.endDate).format('hh:mm a'),
              locationName: session.location && session.location.address ? session.location.address : 'Location'
            }) : session.status}
      </p>
    );
  }

  render() {
    const {p, orderItem} = this.props;
    const {sport, trainingType, occurances, ageGroup, skillLevel, paidAmount, totalAmount, attendee} = orderItem;

    return (
      <div className="cl-sd-cartlistbody">
        <div className="cl-sd-row cl-two-cols">
          <div className="cl-sd-col1">
            <h6>{sport}, <span>{attendee && attendee.type ? ((attendee.type === 'ATHLETE') ? p.t('ShoppingCart.me') : attendee.name) : ''}</span></h6>
          </div>
        </div>
        <div className="cl-sd-row cl-four-cols">
          <div className="cl-sd-col1">
            <p><span>{orderItem.sessionLabel}</span></p>
            <p> {p.t('ShoppingCart.description',
              {trainingType,
                ageGroup,
                skillLevel
              })}
            </p>
          </div>
          <div className="cl-sd-col4">
            <p>{p.t('OrderItem.price')}</p>
            {totalAmount > paidAmount && <p><del>{p.t('currency')}{totalAmount}</del></p>}
            <p className="cl-sd-price">{p.t('currency')}{paidAmount}</p>
          </div>
        </div>
        <div className="cl-sd-viewSessions-deatils show">
          {
            occurances && isNonEmptyArray(occurances) && occurances.map(this.renderSession)
          }
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.object.isRequired,
      orderItem: PropTypes.object.isRequired
    };
  }
}

export default translate(ViewOrderItem);
