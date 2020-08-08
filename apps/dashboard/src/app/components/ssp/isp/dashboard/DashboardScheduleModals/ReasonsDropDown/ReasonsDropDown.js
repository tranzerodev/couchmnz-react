import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router-dom';
import translate from 'redux-polyglot/translate';

import {fetchReasons} from '../../../../../../actions';
import {FULFILLED, PENDING} from '../../../../../../constants/ActionTypes';
import {notNull} from '../../../../../../validators/common/util';

class ReasonsDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReasonId: []
    };
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.renderReasons = this.renderReasons.bind(this);
  }

  sortReasonsByName(reason, reason1) {
    return reason.name > reason1.name;
  }

  componentWillMount() {
    // If (this.props.reasons.status !== FULFILLED && this.props.reasons.status !== PENDING) {

    if (notNull(this.props.event)) {
      this.props.fetchReasons({event: this.props.event});
    } else {
      this.props.fetchReasons({event: 'defaultEvent'});
    }
  }

  handleReasonChange(e) {
    const id = '';
    let name = '';

    name = e.target.value;

    console.log('name', name);

    this.props.onChange(e);
  }

  renderReasons(reason) {
    return (

      <option key={reason.id} id={reason.id} value={reason.name} >{reason.name}</option>

    );
  }

  render() {
    return (

      <select name="cl-select-role" id="cl-select-role" onChange={this.handleReasonChange} >
        <option value={'Select'}>Select</option>
        {
          this.props.reasons && this.props.reasons.data.length >= 1 && this.props.reasons.data.sort(this.sortReasonsByName).map(this.renderReasons)
        }
      </select>

    );
  }
  static get propTypes() {
    return {
      reasons: PropTypes.object,
      fetchReasons: PropTypes.func,
      onChange: PropTypes.func,
      event: PropTypes.string
    };
  }
}

ReasonsDropDown.defaultProps = {
  reasons: {data: []},
  fetchReasons: () => {},
  onChange: () => {},
  event: ''
};

const mapStateToProps = state => {
  const {reasons} = state;
  return {
    reasons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReasons: event => dispatch(fetchReasons(event))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate(ReasonsDropDown)));
