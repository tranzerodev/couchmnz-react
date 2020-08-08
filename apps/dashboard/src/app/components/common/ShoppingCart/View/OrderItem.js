import React, {Component} from 'react';
import translate from 'redux-polyglot/translate';
import {PropTypes} from 'prop-types';
import moment from 'moment';

import appConstants from '../../../../constants/appConstants';

const {shoppingCart} = appConstants;

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
    const date = session.status === shoppingCart.itemStatus.scheduled ? session.eventDetails.date : undefined;
    return (
      <p key={session.name + index}>
        <span>{session.name}: </span>
        {session.status === appConstants.sessionEvents.scheduled ?
          p.t('OrderItem.scheduledTimeStamp',
            {
              date: moment(date.start).format('ddd[,] MMM DD'),
              startTime: moment(date.start).format('hh:mm a'),
              endTime: moment(date.end).format('hh:mm a'),
              locationName: session.eventDetails.location
            }) : session.status }
      </p>
    );
  }

  render() {
    const {p, orderItem, dependents} = this.props;
    const {sport, trainingType, sessions, ageGroup, skillLevel, basePrice, totalPrice, qty} = orderItem;
    const selectedProfile = this.getSelectedProfile(orderItem.attendeeProfileId, dependents);

    return (
      <div className="cl-sd-cartlistbody">
        <div className="cl-sd-row cl-two-cols">
          <div className="cl-sd-col1">
            <h6>{sport.name}, <span>{selectedProfile ? ((selectedProfile.isDependent === 'NO') ? p.t('ShoppingCart.me') : selectedProfile.displayName) : ''}</span></h6>
          </div>
        </div>
        <div className="cl-sd-row cl-four-cols">
          <div className="cl-sd-col1">
            <p><span>{orderItem.sessionLabel}</span></p>
            <p> {p.t('ShoppingCart.description',
              {trainingType: trainingType.name,
                ageGroup: ageGroup.description,
                skillLevel: skillLevel.description
              })}
            </p>
          </div>
          <div className="cl-sd-col4">
            <p>{p.t('OrderItem.price')}</p>
            {basePrice * qty !== totalPrice && <p><del>{p.t('currency')}{basePrice * qty}</del></p> }
            <p className="cl-sd-price">{p.t('currency')}{totalPrice}</p>
          </div>
        </div>
        <div className="cl-sd-viewSessions-deatils show">
          {
            sessions.map(this.renderSession)
          }
        </div>
      </div>
    );
  }
  static get propTypes() {
    return {
      p: PropTypes.object.isRequired,
      orderItem: PropTypes.object.isRequired,
      dependents: PropTypes.array.isRequired
    };
  }
}

export default translate(ViewOrderItem);
