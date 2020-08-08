import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AttachmentBlockView extends Component {
  constructor(props) {
    super(props);
    this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
  }
  handleOnDeleteClick() {
    console.log('Props of fileup', this.props);
    const {blockProps, block} = this.props;
    const {onDelete, id} = blockProps;
    if (onDelete) {
      onDelete(block.key, id);
    }
  }
  render() {
    console.log('Attachmentview rendered', this.props.blockProps);
    const style = {
      backgroundColor: '#f5f5f5',
      padding: '10px 0px'
    };
    const {name, url} = this.props.blockProps;
    return (
      <span style={style}>
        <span className="uk-icon-paperclip"/>
        <span><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></span>
        <span onClick={this.handleOnDeleteClick} className="uk-icon-button uk-icon-trash"/>
      </span>
    );
  }
}

AttachmentBlockView.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired
};
