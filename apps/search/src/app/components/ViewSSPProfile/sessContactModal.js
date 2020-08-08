import React, {Component} from 'react';
import ReactModal from 'react-modal';
import DateTimePicker from 'react-datetime';
import './DateTime.css';
import moment from 'moment';
import {BlockPicker} from 'react-color';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(69, 69, 69, 0.75)',
    zIndex: 5
  },
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
      colorPicker: 'none'
    };
    this.handleSave = this.handleSave.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleColorPicker = this.handleColorPicker.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }
  handleSave() {
    this.props.onSave(this.state.event);
  }
  afterOpenModal() {
    // References are now sync'd and can be accessed. this.subtitle.style.color =
    // '#f00';
    this.setState({
      event: this.props.event
    });
  }
  handleStartDate(date) {
    const {event} = this.state;
    this.setState({event: {...event, start: date._d}});
  }
  handleEndDate(date) {
    const {event} = this.state;
    this.setState({event: {...event, end: date._d}});
  }
  handleColorPicker() {
    const colorPicker = this.state.colorPicker === 'none' ? 'block' : 'none';
    this.setState({
      colorPicker
    });
  }
  componentWillUnmount() {
    this.setState({
      colorPicker: 'none'
    });
  }
  handleChangeColor(color, event) {
    console.log('color', color, 'event', event);
  }
  render() {
    const {event} = this.state;
    const {session} = event;
    return (
      <ReactModal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div id="addtocartModal" className="uk-modal degreeModal">
          <div className="uk-modal-dialog uk-modal-dialog-small">
            <div className="uk-modal-header">
              <h2>Personal Information</h2>
              <a href="#" className="del uk-modal-close">
                <svg className="cl-icon-cross-blue-big" xmlns="http://www.w3.org/2000/svg" viewBox="-317.53 -5232.53 19.061 19.061">
                  <g transform="translate(-1946.5 -5770.5)">
                    <line data-name="Line 230" className="cl-icon-cross-blue-big-1" x2="18" y2="18" transform="translate(1629.5 538.5)"/>
                    <line data-name="Line 231" className="cl-icon-cross-blue-big-1" x1="18" y2="18" transform="translate(1629.5 538.5)"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className="uk-modal-body">
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="field-holder">
                    <label>First Name</label>
                    <input type="text" name="" className="field-required" placeholder="Type your first name" required/>
                    {/* <span class="error-text">Sample error message goes here</span> */}
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="field-holder error">
                    <label>Last Name</label>
                    <input type="text" name="" className="field-required" placeholder="Type your last name" required/>
                    {/* <span class="error-text">Sample error message goes here</span> */}
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="field-holder error">
                    <label>Your Email</label>
                    <input type="email" name="" className="field-required" placeholder="Type your email" required/>
                    {/* <span class="error-text">Sample error message goes here</span> */}
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="field-holder error">
                    <label>Subject</label>
                    <input type="text" name="" className="field-required" placeholder="Type your subject" required/>
                    {/* <span class="error-text">Sample error message goes here</span> */}
                  </div>
                </div>
              </div>
              <div className="uk-grid">
                <div className="uk-width-xlarge-1-1 uk-width-large-1-1 uk-width-medium-1-1  uk-width-small-1-1">
                  <div className="field-holder">
                    <label>Message</label>
                    <textarea rows="4" className="field-required" placeholder="Type your Message" value={this.rendermsgContent}required/>
                    {/* <span class="error-text">Sample error message goes here</span> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="uk-modal-footer">
              <div className="tableDiv">
                <div className="lCol">
                  <a href="#" className="general_btn" onSubmit={this.handleSubmit}>Save</a>
                </div>
                <div className="rCol">
                  <a href="#" className="cancel" onClick={this.handleReset}>Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}
