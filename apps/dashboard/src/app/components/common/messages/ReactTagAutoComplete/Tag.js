import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class Tag extends Component {
  render() {
    const {tag, onDelete} = this.props;
    return (
      <span>{tag.displayName}<a onClick={onDelete}><i className="uk-icon-remove"/></a></span>
    );
  }
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};
