import React, {Component} from 'react';
// Import {connect} from 'react-redux';
// import {fetchSSPSessions} from '../../actions';
import PropTypes from 'prop-types';

class FiltSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ['0']
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
      onClick: PropTypes.func
    };
  }
  componentDidMount() {
    if (this.props.selectedOption[0] === 0) {
      const initState = [];
      for (let count = 0; count < this.props.filterOptions.length; count++) {
        initState.push(count.toString());
      }
      this.setState({selected: initState});
      // Console.log(this.state.selected);
    }
  }
  handleClick(event) {
    if (event.target.checked) {
      // If all options are selected then Any should be selected and state should be set as 0
      if (this.state.selected.length === this.props.filterOptions.length - 1) {
        // Const newState = 0;
        const newState = ['0'];
        newState.push(this.state.selected);
        this.setState({selected: newState});
        // Console.log(this.state.selected);
        return;
      }
      // Else the target value should be included in state.selected array
      const newState = this.state.selected;
      newState.push(event.target.value);
      //  Console.log(this.state.selected);
      this.setState({selected: newState});
      // Console.log(this.state.selected);
    //   This.props.onClick(this.state.selected);
    } else {
      // In case of unchecking
      const newArray = [];
      // If 'any' or 'all' option is unchecked then the selected state should be updated with remainder option flags.
      if (event.target.value === '0') {
        for (let count = 1; count < this.props.filterOptions.length; count++) {
          newArray.push(count.toString());
        }
        this.setState({selected: newArray});
        // Console.log(this.state.selected);
        return;
      }
      // If some other option is unchecked while any or all is checked
      if ((event.target.value > 0) && (this.state.selected.indexOf('0') > 0)) {
        const newArr = [];
        for (let count = 0; count < this.props.filterOptions.length; count++) {
          if (this.state.selected[count] !== '0') {
            newArr.push(this.state.selected[count]);
          }
        }
        this.setState({selected: newArr});
        // Console.log(this.state.selected);
        return;
      }
      // Remove the checked entry from the selected state list.
      const selList = this.state.selected;
      for (let count = 0; count < selList.length; count++) {
        if ((selList[count] !== event.target.value) && (count !== 0)) {
          newArray.push(selList[count]);
        }
      }
      this.setState({selected: newArray});
      // Console.log(this.state.selected);
    }
  }
  handleSubmit(event) {
    // Event.preventDefault();
    this.props.onClick(this.state.selected);
  }
  handleReset(event) {
    event.preventDefault();
    this.setState({selected: 0});
  }
  handleOptionList(list) {
    const dispArray = [];
    //  Console.log(list);
    let keyVal = 12;
    for (let count = 0; count < list.length; count++) {
      dispArray.push(
        <li key={keyVal++}>
          <label key={keyVal++} className="container-ck bold-font-family">
            {list[count]}
            <input key={keyVal++} type="checkbox" value={count} onClick={this.handleClick} defaultChecked={this.props.selectedOption === '0' || this.state.selected === '0' || this.state.selected === count.toString()}/>
            <span key={keyVal++} className="checkmark"/>
          </label>
        </li>
      );
    }
    return (dispArray);
  }
  handleButtonText(selection) {
    if (selection.length > 1 && selection.indexOf('0') === -1) {
      const retString = this.props.filterOptions[this.state.selected[0]].slice(0, 8) + ' & ' + (this.state.selected.length - 1) + ' more';
      return (retString);
    }
    if (selection.indexOf('0') >= 0) {
      return (this.props.filterOptions[0]);
    }
    return (this.props.filterOptions[this.state.selected]);
  }

  render() {
    return (
      <div className={this.props.containerClassName}>
        <span className="claender-filtter-heading">{this.props.heading}</span>
        <div className="uk-button-dropdown theme-dropdown uk-margin-remove" data-uk-dropdown="{mode:'click',pos:'bottom-right'}">
          <button className="uk-button"><span className="btn-text">{this.handleButtonText(this.state.selected)}</span>
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
  selectedOption: ['0']
};
export default FiltSelect;
