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

export default class Modal extends Component {
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
        <div className="uk-container uk-container-center">
          <div className="uk-modal-header">
            <button
              onClick={this.props.closeModal}
              className="del btn-link"
              style={{
                textAlign: 'right'
              }}
            ><i className="fa fa-times"/>
            </button>
          </div>
          <div
            className="popupOuter popup1"
            style={{
              width: 600,
              height: 600
            }}
          >
            <a className="colorPicker" onClick={this.handleColorPicker}>
              <div
className="blueDiv"
style={{backgroundColor : session.color,
                position: 'relative',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 6
              }}
              />
            </a>
            <div style={{display: this.state.colorPicker}}>
              <BlockPicker onChange={this.handleChangeColor}/>
            </div>
            <h4>{session.name}</h4>
            <p>Level: {session.levelName}</p>
            <p>Group Size: {session.ageGroupName}</p>
            <div className="borderClassSec"/>
            <p>Location:{session.locationName} </p>
            <p>
              <span>333 Blossom Hill Rd, Los Gates, CA 95032</span>
            </p>
            <div className="borderClassSec"/>
            <form className="uk-form">
              <p className="highlight">From</p>
              <DateTimePicker value={event.start} defaultValue={event.start} onChange={this.handleStartDate}/>

              <p className="highlight">To</p>
              <DateTimePicker value={event.end} defaultValue={event.end} onChange={this.handleEndDate}/>

              <div className="borderClassSec"/>
              <p>
                <a>Add Invitees</a>
              </p>
              <div className="borderClassSec"/>
              <p>
                <span>Notes, URL or Attachments</span>
              </p>
              <div className="borderClassSec"/>
              <p>
                <span>Override default price</span>
              </p>
            </form>
          </div>
          <div className="uk-modal-footer">
            <div className="tableDiv">
              <div className="lCol">
                {/* <a className="finish" onClick={this.handleSave}>Save</a> */}
                <button className="finish" onClick={this.handleSave} type="button">Save</button>
              </div>
              <div className="rCol">
                {/* <a className="finish" onClick={this.props.closeModal}>Cancel</a> */}
                <button className="finish" onClick={this.props.closeModal} type="button">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}
