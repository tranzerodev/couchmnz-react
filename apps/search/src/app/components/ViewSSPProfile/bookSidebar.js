import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Import 'https://fonts.googleapis.com/icon?family=Material+Icons';

class BookSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      booked: []
    };
    this.handle24to12Time = this.handle24to12Time.bind(this);
    this.hideSB = this.hideSB.bind(this);
    this.addSessions = this.addSessions.bind(this);
  }
  static get propTypes() {
    return {
      booked: PropTypes.array,
      showSidebar: PropTypes.bool.isRequired,
      onHide: PropTypes.func
    };
  }
  
  componentDidMount() {
    console.log('Passed to Sidebar : ' + this.props.booked);
    this.setState({showSidebar: this.props.showSidebar});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.booked !== this.props.booked) {
        this.setState({booked: nextProps.booked});
      }
      if (nextProps.showSidebar !== this.props.showSidebar) {
        this.setState({showSidebar: nextProps.showSidebar});
      }
    }
  }
  addSessions(event) {

  }
  handle24to12Time(time24) {
    let time12 = '';
    const hh = Math.round(time24 / 100);
    const mm = Math.round(time24 % 100);
    let HH = hh;
    if (hh > 9) {
      if (hh >= 13) {
        HH = hh - 12;
      }
      time12 = HH.toString() + ':';
    } else {
      time12 = '0' + HH.toString() + ':';
    }
    if (mm > 9) {
      time12 = time12.concat(mm.toString(), (hh >= 12 ? 'PM' : 'AM'));
    } else {
      time12 = time12.concat('0' + mm.toString(), (hh >= 12 ? 'PM' : 'AM'));
    }
    return (time12);
  }
  hideSB() {
    const newState = !this.props.showSidebar;
    this.setState({showSidebar: newState});
    this.props.onHide();
  }
  render() {
    if (this.props.booked.length === 0) {
      return (
        <div className={'sidepanel' + ((this.state.showSidebar) ? ' moveLeft' : '')} style={{height: '6036px'}}>
          <div className="closeSidebar">
            <a onClick={this.props.onHide}>
              <i className="fa fa-times" aria-hidden="true"/>
            </a>
          </div>
          <div className="v-scroll-container">
            {/* <div className="package-box">
              <h2>Buy More, Save More!</h2>
              <div className="pacakge-image">
                <img src="./resources/assets/images/package-image.png" width="100%" alt="Package Image" title="Package Image"/>
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
                <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                  <div className="bold-font-family pkg-name">SINGLE SESSION FEE: $55</div>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
                <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                  <div className="bold-font-family pkg-name">3+
                    <span className="normal-font">SESSIONS:</span> $52 EACH
                  </div>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                  <span className="offer-price">
                  Save $9
                  </span>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                  <a className="select-package">Select</a>
                </div>
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
                <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                  <div className="bold-font-family pkg-name">5+
                    <span className="normal-font">SESSIONS:</span> $49 EACH
                  </div>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                  <span className="offer-price">
                  Save $30
                  </span>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                  <a className="select-package">Select</a>
                </div>
              </div>
              <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
                <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                  <div className="bold-font-family pkg-name">10+
                    <span className="normal-font">SESSIONS:</span> $45 EACH
                  </div>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                  <span className="offer-price">
                  Save $100
                  </span>
                </div>
                <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                  <a className="select-package">Select</a>
                </div>
              </div>
            </div> */}
            <div className="payment-summary-box">
              <h2>No Sessions Selected yet.</h2>
              <p>After clicking "Add to Cart" please click the Shopping Cart icon <i className="fa fa-shopping-cart"/>to see this again. </p><p>Close this by pressing the cross <i className="fa fa-times"/> in the top right corner.</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={'sidepanel' + ((this.state.showSidebar) ? ' moveLeft' : '')} style={{height: '6036px'}}>
        <div className="closeSidebar">
          <a onClick={this.props.onHide}>
            <i className="fa fa-times" aria-hidden="true"/>
          </a>
        </div>
        <div className="v-scroll-container">
          <div className="package-box">
            <h2>Buy More, Save More!</h2>

            <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
              <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                <div className="bold-font-family pkg-name">SINGLE SESSION FEE: {/* {this.props.booked[0].sessionRegRate.currency}{this.props.booked[0].sessionRegRate.rate} */}</div>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
            </div>
            <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
              <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                <div className="bold-font-family pkg-name">More than 3
                  <span className="normal-font">SESSIONS:</span> $52 EACH
                </div>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                <span className="offer-price">
                  Save $9
                </span>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                <a className="select-package">Select</a>
              </div>
            </div>
            {/* <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
              <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                <div className="bold-font-family pkg-name">5+
                  <span className="normal-font">SESSIONS:</span> $49 EACH
                </div>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                <span className="offer-price">
                  Save $30
                </span>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                <a   className="select-package">Select</a>
              </div>
            </div>
            <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
              <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                <div className="bold-font-family pkg-name">10+
                  <span className="normal-font">SESSIONS:</span> $45 EACH
                </div>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                <span className="offer-price">
                  Save $100
                </span>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1">
                <a   className="select-package">Select</a>
              </div>
            </div> */}
          </div>
          <div className="payment-summary-box">
            <h2>Payment Summary</h2>
            <div className="payment-summary-content">
              <div className="uk-flex">
                <div className="uk-width-9-10">
                  <div className="package-details">
                    {/* <h3 className="training-type">{this.props.booked[0].sessionSport}</h3>
                    <span className="training-group">{this.props.booked[0].sessionPunch}</span>
                    <span className="t-type">{this.props.booked[0].sessionType}</span>
                    <span className="training-place">{this.props.booked[0].trainVenue}</span>
                    <span className="open-position">Open positions: {this.props.booked[0].trainOpen}</span> */}
                  </div>
                </div>
                <div className="uk-width-1-10">
                  <a className="trash-icon">
                    <i className="fa fa-times"/>
                  </a>
                </div>
              </div>
              <div className="select-session">
                <div className="uk-flex">
                  <div className="uk-width-7-10">
                    <span className="select-txt">Select No of Sessions</span>
                  </div>
                  <div className="uk-width-3-10">
                    <input className="session-no" type="number" value={this.props.booked.length} onChange={this.addSessions}/>
                  </div>
                </div>
              </div>
              <div className="booked-session-table">
                <table className="uk-table">
                  <tbody>
                    <tr>
                      <td className="uk-width-6-10">
                        <span className="session-count">
                                                Session 1
                        </span>
                        <span className="session-time">
                                                Wed, Dec 14, 9:00am - 10:00am PDT
                        </span>
                        <span className="re-schedule">
                          <a >Re-Schedule</a>
                        </span>
                      </td>
                      <td className="uk-width-3-10">
                        <span className="bold-font-family uk-text-center">$52.00</span>
                      </td>
                      <td className="uk-width-1-10">
                        <a className="trash-icon">
                          <i className="fa fa-trash"/>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="uk-width-6-10">
                        <span className="session-count">
                                                Session 2
                        </span>
                        <span className="re-schedule">
                          <a >Re-Schedule</a>
                        </span>
                      </td>
                      <td className="uk-width-3-10">
                        <span className="bold-font-family uk-text-center">$52.00</span>
                      </td>
                      <td className="uk-width-1-10">
                        <a className="trash-icon">
                          <i className="fa fa-trash"/>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="uk-width-6-10">
                        <span className="session-count">
                                                Session 3
                        </span>
                        <span className="re-schedule">
                          <a >Re-Schedule</a>
                        </span>
                      </td>
                      <td className="uk-width-3-10">
                        <span className="bold-font-family uk-text-center">$52.00</span>
                      </td>
                      <td className="uk-width-1-10">
                        <a className="trash-icon">
                          <i className="fa fa-trash"/>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="uk-width-6-10 total-td">
                        <span className="session-count">
                                                Total amount:
                        </span>
                      </td>
                      <td className="uk-width-3-10 total-td">
                        <span className="bold-font-family uk-text-center">$171.00</span>
                      </td>
                      <td className="uk-width-1-10 total-td"/>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="payment-condition">
            <label className="container-ck bold-font-family">
              <input type="checkbox"/>
              <span className="checkmark"/>
                        I agree,
              <a >Cancellation Policy</a>
            </label>
          </div>
          <div className="action-btn">
            <a className="payment-summary-box-btn darkgray-btn uk-float-left">CONTINUE SHOPPING</a>
            <a className="payment-summary-box-btn orange-btn uk-float-right">CHECKOUT</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BookSidebar;
