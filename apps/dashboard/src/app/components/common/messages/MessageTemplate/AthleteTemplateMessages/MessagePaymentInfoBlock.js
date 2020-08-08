import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import moment from 'moment';

class MessagePaymentInfoBlock extends PureComponent {
  render() {
    const {p, paymentInfo} = this.props;
    const {amount, bookingDate, bookingId} = paymentInfo;
    const parsedBookingDate = (moment(bookingDate)).format(p.t('bookingDateFormat'));
    return (
      <div className="msg_messagesDetail-paymentDetails">
        <table className="uk-table">
          <thead>
            <tr>
              <th>{p.t('youRecieve')}</th>
              <th>{p.t('bookingId')}</th>
              <th>{p.t('dateOfBooking')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="msg_messagesDetail-amount">${amount}</span></td>
              <td>{bookingId}</td>
              <td>{parsedBookingDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
MessagePaymentInfoBlock.defaultProps = {

};

MessagePaymentInfoBlock.propTypes = {
  paymentInfo: PropTypes.object.isRequired,
  p: PropTypes.shape({t: PropTypes.func.isRequired}).isRequired
};
export default translate('MessagePaymentInfoBlock')(MessagePaymentInfoBlock);

