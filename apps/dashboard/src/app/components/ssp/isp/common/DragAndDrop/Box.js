import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import ItemTypes from './ItemTypes';
import DraggableEventWrapper from '../../../../../utils/react-big-calendar/addons/dragAndDrop/DraggableEventWrapper.js';
import moment from 'moment';
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
    }
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
	static propTypes = {
	  connectDragSource: PropTypes.func.isRequired,
	  isDragging: PropTypes.bool.isRequired,
	  name: PropTypes.string.isRequired
	}

	render() {
	  const {isDragging, connectDragSource} = this.props;
	  const {name} = this.props.session;
	  const opacity = isDragging ? 0.8 : 1;

	  return (
	    <DraggableEventWrapper
	      event={{
	        title: name,
	        allDay: false,
	        session: this.props.session,
	        start: moment(),
	        end: moment(),
	        notes: '',
	        url: '',
	        invitees: []
	      }}
    >
	      <div>
	        <span className="sky" style={{backgroundColor: this.props.session.color}}/>
	        <p>{name}</p>
    </div>
	    </DraggableEventWrapper>
	  );
	}
}
