import React, {Component} from 'react';

import PropTypes from 'prop-types';

class FilterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedOption
    };
    this.handleOptionList = this.handleOptionList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleButtonText = this.handleButtonText.bind(this);
  }
  static get propTypes() {
    return {
      containerClassName: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      filterOptions: PropTypes.array.isRequired,
      selectedOption: PropTypes.array,
      onSubmit: PropTypes.func.isRequired,
      type: PropTypes.string.isRequired
    };
  }
  componentDidMount() {
    const {filterOptions} = this.props;
    const {selected} = this.state;
    console.log('FilterOptions::', filterOptions);
    if (filterOptions.length === 1) {
      selected.push(filterOptions[0].name.toString());
      this.setState({selected});
      this.handleButtonText(selected);
    }
  }
  handleClick(e) {
    const {selected} = this.state;
    const value = e.target.value;
    if (e.target.checked === true) {
      selected.push(value);
    } else {
      const index = selected.findIndex(id => id === value);
      if (index > -1) {
        selected.splice(index, 1);
      }
    }
    this.setState({selected});
  }
  handleSubmit() {
    const selected = this.state.selected;
    this.props.onSubmit(selected, this.props.type);
  }
  handleReset() {
    this.setState({selected: []});
    this.props.onSubmit([], this.props.type);
  }
  handleOptionList(list) {
    const {selected} = this.state;
    const dispArray = [];
    let keyVal = 121;
    console.log('List :: ', list);
    for (let count = 0; count < list.length; count++) {
      console.log('Value :: ', list[count].description);
      dispArray.push(
        <li key={keyVal++}>
          <label key={keyVal++} className="container-ck bold-font-family">
            {list[count].description}
            <input key={keyVal++} type="checkbox" value={list[count].name} onChange={this.handleClick} checked={Boolean(selected.indexOf(list[count].name.toString()) > -1)}/>
            <span key={keyVal++} className="checkmark"/>
          </label>
        </li>
      );
    }
    console.log('DisplayArray ::', dispArray);
    return (dispArray);
  }
  handleButtonText(selection) {
    const {filterOptions} = this.props;
    let buttonText = '';
    for (let i = 0; i < selection.length; i++) {
      const object = filterOptions.find(obj => obj.name.toString() === selection[i]);
      if (object) {
        buttonText += buttonText.length > 0 ? ', ' + object.description : object.description;
      }
    }
    return buttonText;
  }
  render() {
    const {selected} = this.state;
    return (
    /*       <div className="claender-filtter-sm">
        <div className="theme-dropdown">
          <div>
            <span className="claender-filtter-heading">Age Group</span>
            <div className="uk-button-dropdown theme-dropdown uk-margin-remove" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
              <button className="uk-button">
                <span className="btn-text">All</span>
                <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
                  <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
                </svg>
              </button>
              <div className="uk-dropdown width-300">
                <ul className="uk-nav uk-nav-dropdown uk-text-left">
                  <li>
                    <label className="container-ck bold-font-family">
                  Any
                      <input type="checkbox"/>
                      <span className="checkmark"/>
                    </label>
                  </li>
                  <li>
                    <label className="container-ck bold-font-family">
                  Toddler
                      <input type="checkbox"/>
                      <span className="checkmark"/>
                    </label>
                  </li>
                  <li>
                    <label className="container-ck bold-font-family">
                  Child (5-9)
                      <input type="checkbox"/>
                      <span className="checkmark"/>
                    </label>
                  </li>
                </ul>
                <a className="close-dp dp-footer-link uk-float-left" href="#">Done</a>
                <a className="dp-footer-link uk-float-right" href="#">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div> */

      <div className={this.props.containerClassName}>
        <div className="uk-button-dropdown theme-dropdown uk-margin-remove" data-uk-dropdown="{mode:'click',pos:'bottom-left'}">
          <button className="uk-button"><span className="btn-text">{selected.length < 1 ? 'Any' : this.handleButtonText(selected)}</span>
            <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
              <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
            </svg>
          </button>
          <div>
            <ul className="uk-nav uk-nav-dropdown uk-text-left">
              {this.handleOptionList(this.props.filterOptions)}
            </ul>
            <a className="close-dp dp-footer-link uk-float-left" onClick={this.handleSubmit}>Done</a>
            <a className="dp-footer-link uk-float-right" onClick={this.handleReset}>Cancel</a>
          </div>
        </div>
      </div>

    );
  }
}

FilterSelect.defaultProps = {
  selectedOption: ['0', '1']
};
export default FilterSelect;

