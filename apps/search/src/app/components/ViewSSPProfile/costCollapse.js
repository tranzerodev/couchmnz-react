import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RateCollapse extends Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      costHeader: '',
      costSubHeader: '',
      headerState: 'opened',
      costBody: '',
      showBody: true
    };
    this.state = {
      showBody: true,
      headerState: 'opened'
    };
    this.handleHeadBang = this.handleHeadBang.bind(this);
  }

  static get propTypes() {
    return {
      costHeader: PropTypes.array.isRequired,
      costSubHeader: PropTypes.array.isRequired,
      costBody: PropTypes.array.isRequired,
      showBody: PropTypes.bool.isRequired
    };
  }

  handleHeadBang(event) {
    event.preventDefault();
    if (this.props.showBody === !this.state.showBody) {
      this.setState({headerState: 'opened', showBody: true});
    } else {
      this.setState({headerState: '', showBody: false});
    }
  }

  render() {
    let keyVal = 0;
    return (
      <div key={keyVal++} className="coach-cost-table">
        <div key={keyVal++} className="uk-grid uk-flex-middle pad-T30 pad-B30">
          {this.props.costHeader}
          {this.props.costSubHeader}
          <div key={keyVal++} className="pad-T-sx15">
            <a href="#" className={'price-show-hide ' + this.state.headerState} onClick={this.handleHeadBang}>see rates</a>
          </div>
        </div>
        <div key={keyVal++} className="training-cost" style={(this.props.showBody && this.state.showBody) ? {display: 'block'} : {display: 'none'}}>
          {this.props.costBody}
        </div>
      </div>
    );
  }
}

export default RateCollapse;
