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
      total: PropTypes.object,
      booked: PropTypes.object,
      trainingTerm: PropTypes.object,
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
            <div className="payment-summary-box">
              <h2>No {this.props.trainingTerm ? this.props.trainingTerm.plural : ''} Selected yet.</h2>
              <p>You probably clicked the envelope icon <i className="fa fa-envelope-o" style={{color: 'blue'}}/> before selecting any {this.props.trainingTerm ? this.props.trainingTerm.plural.toLowerCase() : ''} (i.e. checking the boxes beside them). </p><p>Please select the {this.props.trainingTerm ? this.props.trainingTerm.plural.toLowerCase() : ''} you are interested in and then either press the <span className="btn-red"><a>orange button </a></span>below the list or the envelope icon <i className="fa fa-envelope-open-o" style={{color: 'red'}}/> near the section header.</p>
              <p>Thanks for your interest.</p><p>For now, please close this by pressing the cross <i className="fa fa-times" style={{color: 'red'}}/> in the top right corner.</p>
              <p> We hope to have you back here once you are done selecting 1 or more {this.props.trainingTerm ? this.props.trainingTerm.singular : ''}(s).</p>
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
            <h2>Contact the Trainer regarding selected {this.props.trainingTerm ? this.props.trainingTerm.plural: ''}</h2>
            <div className="uk-flex uk-flex-wrap uk-flex-wrap-reverse uk-flex-wrap-space-around package-rate">
              <div className="uk-width-large-6-10 uk-width-medium-6-10 uk-width-1-1">
                <div className="bold-font-family pkg-name">SINGLE {this.props.trainingTerm ? this.props.trainingTerm.singular.toUpperCase() : ''} FEE: {/* {this.props.booked[0].sessionRegRate.currency} {this.props.booked[0].sessionRegRate.rate} */}</div>
              </div>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
              <div className="uk-width-large-2-10 uk-width-medium-2-10 uk-width-1-1"/>
            </div>
            <div className="payment-summary-box">
              <h2>Session Summary to send to Trainer Name</h2>
              <div className="payment-summary-content">
                <div className="uk-flex">
                  <div className="uk-width-9-10">
                    <div className="package-details">
                      <div className="field-holder">
                        <input type="text" name="" className="field-required" placeholder="First Name"/>
                        <span className="error-text">First Name is required.</span>
                      </div>
                      <div className="field-holder">
                        <input type="text" name="" className="field-required" placeholder="Last Name"/>
                        <span className="error-text">Last Name is required.</span>
                      </div>
                      <div className="field-holder">
                        <input type="text" name="" className="field-required" placeholder="Email ID"/>
                        <span className="error-text">Email ID is required.</span>
                      </div>
                      {/* <h3 className="training-type">{this.booked[0].sessionSport.toUpperCase()}</h3> */}
                      {/* {{this.props.booked}} */}
                      {/* <span className="training-group">{this.booked[0].sessionPunch}</span> */}
                      <span className="t-type">Traiining Type i.e. Group etc.</span>
                      <span className="training-place">Training Venue</span>
                      <span className="open-position">Open positions: Number of openings.</span>
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
                      <input className="session-no" type="number" value="1" onChange={this.addSessions}/>
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
          </div>

          <div className="payment-condition">
            <label className="container-ck bold-font-family">
              <input type="checkbox"/>
              <span className="checkmark"/>
                        I agree that the trainer's discretion is paramount for accepting any {this.props.trainingTerm.plural.toLowerCase()} booking and also with the additional terms in the Coachlist &nbsp;
              <a >Cancellation Policy</a>
            </label>
          </div>
          <div className="action-btn">
            <a className="payment-summary-box-btn darkgray-btn uk-float-left">CONTACT</a>
            <a className="payment-summary-box-btn orange-btn uk-float-right">CLOSE & CANCEL</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BookSidebar;
