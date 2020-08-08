import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Accord extends Component {
  constructor(props) {
    super(props);
    /* This.defaultProps = {
      mainID: '',
      mainClassName: '',
      header: '',
      headerState: 'open',
      contentBody: '',
      bodyClassName: '',
      showBody: false
    }; */
    this.state = {
      showBody: true,
      headerState: ''
    };
    this.handleHeadBang = this.handleHeadBang.bind(this);
  }

  static get propTypes() {
    return {
      mainID: PropTypes.string.isRequired,
      mainClassName: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      headerState: PropTypes.string.isRequired,
      contentBody: PropTypes.array.isRequired,
      bodyClassName: PropTypes.string.isRequired,
      showBody: PropTypes.bool.isRequired
    };
  }

  handleHeadBang(event) {
    event.preventDefault();
    if (this.props.showBody === !this.state.showBody) {
      this.setState({headerState: '', showBody: true});
    } else {
      this.setState({headerState: 'open', showBody: false});
    }
  }

  render() {
    return (
      <div id={this.props.mainID} className={this.props.mainClassName}>
        <div className="sub-heading" onClick={this.handleHeadBang}>
          <h2 className={this.state.headerState}>{this.props.header}</h2>
        </div>
        <div className={this.props.bodyClassName} style={(this.props.showBody && this.state.showBody) ? {display: 'block'} : {display: 'none'}}>
          {this.props.contentBody}
        </div>
      </div>
    );
  }
}

export default Accord;
