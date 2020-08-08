import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DragSource as dragSource, DropTarget as dropTarget} from 'react-dnd';

/* eslint react/prop-types: 0 */

const Types = {
  ROW: 'row'
};

const rowSource = {
  beginDrag(props) {
    return {id: props.id};
  }
};

const rowTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    if (draggedId !== props.id) {
      props.moveRow(draggedId, props.id);
    }
  }
};

const sourceCollect = function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const targetCollect = function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class OrderRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
  }
  handleEdit(e) {
    const {id} = e.target;
    this.props.onEdit(id);
  }
  handleStatus(e) {
    const {id, name} = e.target;
    this.props.onStatusUpdate(id, name === 'Y' ? 'N' : 'Y');
  }
  render() {
    const self = this;
    const opacity = this.props.isDragging ? 0 : 1;
    const connectDragSource = this.props.connectDragSource;
    const connectDropTarget = this.props.connectDropTarget;
    return connectDragSource(connectDropTarget(
      <tr style={{opacity}}>
        <td>{self.props.id}</td>
        <td>{self.props.data.name}</td>
        {/* <td>{self.props.data.lastModified ? moment(self.props.data.lastModified).format('DD-MM-YYYY HH:mm') : '-'}</td>
        <td>{self.props.data.isActive === 'Y' ? 'Active' : 'Inactive'}</td> */}
        <td><Link to="#" id={self.props.data.id} onClick={self.handleEdit}> Edit </Link> {' '} {/* <Link to="#" id={self.props.data.id} name={self.props.data.isActive} onClick={self.handleStatus}>{self.props.data.isActive === 'Y' ? 'Disable' : 'Enable'} </Link> */}</td>
      </tr>
    ));
  }
}

const source = dragSource(Types.ROW, rowSource, sourceCollect)(OrderRow);
const row = dropTarget(Types.ROW, rowTarget, targetCollect)(source);

module.exports = row;
