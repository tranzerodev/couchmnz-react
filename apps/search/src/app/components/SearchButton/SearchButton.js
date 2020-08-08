import React, {Component} from 'react';
import {PulseLoader} from 'react-spinners';
import {PENDING, FULFILLED, REJECTED} from '../../constants/ActionTypes';
import {connect} from 'react-redux';
import {postSearchFilter} from '../../actions';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';

/* eslint react/no-array-index-key: 0 */
class SearchButton extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.stopLoader = this.stopLoader.bind(this);
    this.state = {
      loading: false
    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.postSearchFilter(this.props.searchFilter);
  }
  stopLoader() {
    this.setState({loading: false});
  }
  componentDidMount() {
    if (this.props.searchFilter && this.props.searchFilter.status === PENDING) {
      this.setState({loading: true});
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchFilter.status === PENDING) {
      this.setState({loading: true});
    }
    if (nextProps.searchFilter.status === FULFILLED) {
      this.setState({loading: false});
    }
  }
  render() {
    return (
      <div>
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
  static get propTypes() {
    return {
      postSearchFilter: PropTypes.func,
      searchFilter: PropTypes.any
    };
  }
}
SearchButton.defaultProps = {
  postSearchFilter: () => {},
  searchFilter: () => {}
};

const mapStateToProps = state => {
  const {searchFilter} = state;
  return {
    searchFilter
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postSearchFilter: data => dispatch(postSearchFilter(data))
  };
};

const SearchButtonPage = translate(connect(mapStateToProps, mapDispatchToProps)(SearchButton));
export default SearchButtonPage;
