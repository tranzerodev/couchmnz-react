import React, {Component} from 'react';
import {RecievedMessageHeader} from '../RecievedMessageHeader';

export default class BookingMessageView extends Component {
  render() {
    return (
      <div className="msg_messagesDetail-container">
        <RecievedMessageHeader/>
        <div className="msg_messagesDetail-scheduleActions uk-clearfix">
          <div className="msg_messagesDetail-scheduleCount">5 sessions</div>
          <div className="msg_messagesDetail-scheduleCtas">
            <a href="#" className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/> Accept All</a>
            <a href="#cl-session-decline" data-uk-modal className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/> Decline All</a>
          </div>
        </div>
        <div className="msg_messagesDetail-messageContent uk-clearfix">

          <div className="msg_messagesDetail-scheduleContainer">
            <div className="msg_messagesDetail-scheduleHeader">
              <strong>Intermediate Soccer, Adults</strong> <i className="uk-icon-circle"/> Adults Session Bundle - 3
            </div>
            <div className="msg_messagesDetail-scheduleItem uk-clearfix">
              <div className="msg_messagesDetail-scheduleInfo">
                <span><strong>Session 1</strong> Open positions: 8/10</span>
                <span>Wakefield Park, Santa Clara</span>
              </div>
              <div className="msg_messagesDetail-scheduleTime">
                <span>Mon, Oct 17</span> <i className="uk-icon-circle"/>
                <span>2:00 - 3:00 pm</span>
              </div>
              <div className="msg_messagesDetail-scheduleOptions">
                <a href="#" className="msg_messagesDetail-ctaBtn active"><i className="uk-icon-check"/></a>
                <a href="#" className="msg_messagesDetail-ctaBtn disabled"><i className="uk-icon-close"/></a>
              </div>
            </div>

            <div className="msg_messagesDetail-scheduleItem uk-clearfix">
              <div className="msg_messagesDetail-scheduleInfo">
                <span><strong>Session 2</strong> Open positions: 2/10</span>
                <span>Mansfield Grounds, San Francisco</span>
              </div>
              <div className="msg_messagesDetail-scheduleTime">
                <span>Tue, Oct 18</span>
                <span>5:30 - 6:30 pm</span>
              </div>
              <div className="msg_messagesDetail-scheduleOptions">
                <a href="#" className="msg_messagesDetail-ctaBtn disabled"><i className="uk-icon-check"/></a>
                <a href="#cl-session-decline" data-uk-modal className="msg_messagesDetail-ctaBtn active"><i className="uk-icon-close"/></a>
              </div>
            </div>

            <div className="msg_messagesDetail-scheduleItem uk-clearfix">
              <div className="msg_messagesDetail-scheduleInfo">
                <span><strong>Session 3</strong> Open positions: 2/10</span>
                <span>Not scheduled</span>
              </div>
              <div className="msg_messagesDetail-scheduleTime"/>
              <div className="msg_messagesDetail-scheduleOptions"/>
            </div>
          </div>
          <div className="msg_messagesDetail-scheduleContainer">
            <div className="msg_messagesDetail-scheduleItem uk-clearfix">
              <div className="msg_messagesDetail-scheduleInfo">
                <span><strong>Yoga for Soccer Players</strong> Open positions: 2/10</span>
                <span>Mansfield Grounds, San Francisco</span>
              </div>
              <div className="msg_messagesDetail-scheduleTime">
                <span>Wed, Oct 19</span>
                <span>2:00 - 3:00 pm</span>
              </div>
              <div className="msg_messagesDetail-scheduleOptions">
                <a href="#" className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/></a>
                <a href="#cl-session-decline" data-uk-modal className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/></a>
              </div>
            </div>
          </div>
          <div className="msg_messagesDetail-scheduleContainer">
            <div className="msg_messagesDetail-scheduleItem uk-clearfix">
              <div className="msg_messagesDetail-scheduleInfo">
                <span><strong>Soccer 101 Package</strong> Open positions: 2/10</span>
                <span>Mansfield Grounds, San Francisco</span>
              </div>
              <div className="msg_messagesDetail-scheduleTime">
                <span>Mon, Oct 23 -</span>
                <span>Fri, Oct 27</span>
              </div>
              <div className="msg_messagesDetail-scheduleOptions">
                <a href="#" className="msg_messagesDetail-ctaBtn"><i className="uk-icon-check"/></a>
                <a href="#cl-session-decline" data-uk-modal className="msg_messagesDetail-ctaBtn"><i className="uk-icon-close"/></a>
              </div>
            </div>
          </div>

          <h4>Payment Details</h4>

          <div className="msg_messagesDetail-paymentDetails">
            <table className="uk-table">
              <thead>
                <tr>
                  <th>You receive</th>
                  <th>Booking ID</th>
                  <th>Date of booking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="msg_messagesDetail-amount">$215</span></td>
                  <td>0012876</td>
                  <td>10/10/2017 at 10:53 am</td>
                </tr>
              </tbody>
            </table>

            <a href="#">Show payment breakup <i className="uk-icon-chevron-down"/></a>

          </div>

        </div>
      </div>
    );
  }
}
