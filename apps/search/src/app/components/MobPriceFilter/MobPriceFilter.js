import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import translate from 'redux-polyglot/translate';
import InputRange from 'react-input-range';
import {withRouter} from 'react-router-dom';
import QueryString from 'query-string';

import 'react-input-range/lib/css/index.css';

import appConstants from '../../constants/appConstants';

const {filterQueries, searchQueryKeys} = appConstants;

class PriceFilter extends Component {
  constructor(props) {
    super(props);
    const {query, searchData} = this.props;

    const priceMin = query[filterQueries.minPrice];
    const priceMax = query[filterQueries.maxPrice];

    const maxMinRange = this.getMaxMinPrice(searchData);

    this.state = {
      price: {
        min: (priceMin) ? priceMin : maxMinRange.min,
        max: (priceMax) ? priceMax : maxMinRange.max
      }

    };

    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const {query, searchData} = newProps;
    const priceMin = query[filterQueries.minPrice];
    const priceMax = query[filterQueries.maxPrice];

    const maxMinRange = this.getMaxMinPrice(searchData);

    this.setState({
      price: {
        min: (priceMin) ? priceMin : maxMinRange.min,
        max: (priceMax) ? priceMax : maxMinRange.max
      }
    });
  }

  handlePriceChange(value) {
    this.setState({price: value});
  }
  handleSearch() {
    const {history, query} = this.props;
    const {location} = history;
    const {pathname} = location;
    const {price} = this.state;
    const {min, max} = price;
    const {minPrice, maxPrice} = filterQueries;
    const updatedFilters = Object.assign({}, query,
      {
        [minPrice]: (min && min > 0) ? min : undefined,
        [maxPrice]: (max && max > 0) ? max : undefined,
        page: undefined
      }
    );

    const search = QueryString.stringify(updatedFilters);
    history.push({
      pathname,
      search
    });
  }
  handleResetFilter() {
    const {query} = this.props;
    const priceMin = query[filterQueries.minPrice];
    const priceMax = query[filterQueries.maxPrice];

    this.setState({
      price: {
        min: (priceMin) ? priceMin : 0,
        max: (priceMax) ? priceMax : 0
      }
    });
  }

  getMaxMinPrice(searchData) {
    let min = 0;
    let max = 10;
    if (searchData && searchData.aggregations && searchData.aggregations.prices && searchData.aggregations.prices) {
      const prices = searchData.aggregations.prices;
      const minPrice = prices[searchQueryKeys.minPrice];
      const maxPrice = prices[searchQueryKeys.maxPrice];
      min = (minPrice && minPrice.value) ? minPrice.value : 0;
      max = (maxPrice && maxPrice.value) ? maxPrice.value : 10;
    }
    return ({min, max});
  }
  render() {
    const {p, searchData} = this.props;
    const minMaxRange = this.getMaxMinPrice(searchData);

    return (
      <div id="cl-sr-pricemenu" className="uk-offcanvas">
        <div className="uk-offcanvas-bar">
          <div className="uk-accordion-content">
            <h3>Price</h3>
            <div className="uk-width-1 cl-sr-leftspace">
              <h5>{p.t('PriceFilter.pricePerHour')}</h5>
            </div>
            <div className="uk-width-1 cl-sr-leftspace">
              <div className="uk-width-1 cl-range-slider">
                <InputRange
                  steps={5}
                  maxValue={minMaxRange.max}
                  minValue={minMaxRange.min}
                  value={this.state.price}
                  onChange={this.handlePriceChange}
                />
              </div>
            </div>
            <div className="uk-width-1-1 sr-subnav-borderbottom">
              <a className="sr-dd-searchlink" onClick={this.handleSearch}>{p.t('AthleteFilters.btnSearch')}</a>
            </div>
            <div className="uk-width-1-1">
              <a className="sr-dd-cancellink" onClick={this.handleResetFilter}>{p.t('AthleteFilters.btnReset')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PriceFilter.propTypes = {
  p: PropTypes.shape({t: PropTypes.func}).isRequired,
  query: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  searchData: PropTypes.object
};

PriceFilter.defaultProps = {
  searchData: null
};

const mapStateToProps = state => {
  const {router, searchData} = state;
  return {
    query: router.query,
    searchData: searchData.data
  };
};

export default withRouter(translate(connect(mapStateToProps)(PriceFilter)));

