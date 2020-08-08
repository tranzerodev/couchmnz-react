import React, {Component} from 'react';
// Import {connect} from 'react-redux';
// import {fetchSSPSessions} from '../../actions';
import PropTypes from 'prop-types';
import {  
  UK_BUTTON_DROPDOWN, THEME_DROPDOWN, UK_MARGIN_REMOVE, UK_DROPDOWN_CLOSE
} from '../../constants/cssConstants'

class FiltSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedOption,
      dropdownClasses: this.props.dropdownClasses
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
    if (filterOptions.length === 1) {
      selected.push(filterOptions[0].id.toString());
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
    this.setState({
      dropdownClasses: this.props.dropdownClasses + UK_DROPDOWN_CLOSE
    })
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
    for (let count = 0; count < list.length; count++) {
      dispArray.push(
        <li key={keyVal++}>
          <label key={keyVal++} className="container-ck bold-font-family">
            {list[count].value}
            <input key={keyVal++} type="checkbox" value={list[count].id} onChange={this.handleClick} checked={Boolean(selected.indexOf(list[count].id.toString()) > -1)}/>
            <span key={keyVal++} className="checkmark"/>
          </label>
        </li>
      );
    }
    return (dispArray);
  }
  handleButtonText(selection) {
    const {filterOptions} = this.props;
    let buttonText = '';
    for (let i = 0; i < selection.length; i++) {
      const object = filterOptions.find(obj => obj.id.toString() === selection[i]);
      if (object) {
        buttonText += buttonText.length > 0 ? ', ' + object.value : object.value;
      }
    }
    return buttonText;
  }
  render() {
    const {selected} = this.state;
    return (
      <div className={this.props.containerClassName}>
        <span className="claender-filtter-heading">{this.props.heading}</span>
        <div className={this.state.dropdownClasses} data-uk-dropdown="{mode:'click',pos:'bottom-left'}">
          <button className="uk-button"><span className="btn-text">{selected.length < 1 ? 'Any' : this.handleButtonText(selected)}</span>
            <svg className="cl-arrow-right" xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5">
              <path fill="none" fillRule="evenodd" stroke="#42B7DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l3 3 3-3"/>
            </svg>
          </button>
          <div className="uk-dropdown width-300">
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

FiltSelect.defaultProps = {
  selectedOption: ['0', '1'],
  dropdownClasses: UK_BUTTON_DROPDOWN + THEME_DROPDOWN + UK_MARGIN_REMOVE
};
export default FiltSelect;
