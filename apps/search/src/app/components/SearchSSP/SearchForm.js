import React, {Component} from 'react';
/* Remove comment if required. Presently used States. import PropTypes from 'prop-types'; */
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearableValue: false,
      selectedSport: '',
      SportsList: [
        {value: '', label: 'Select Sport'},
        {value: 'baseball', label: 'Baseball'},
        {value: 'volleyball', label: 'Volley Ball'},
        {value: 'basketball', label: 'Basket Ball'},
        {value: 'tennis', label: 'Tennis'},
        {value: 'badminton', label: 'Badminton'}]
    };
  }

  handleChange = selectedSport => {
    this.setState({selectedSport});
    console.log(`Selected: ${selectedSport.label}`);
  }

  render() {
    return (
      <div>
        <form>
          <Select
            name="SelectSport"
            value={this.state.selectedSport}
            onChange={this.handleChange}
            options={this.state.SportsList}
            clearableValue
          />
        </form>
      </div>
    );
  }
}

export default SearchForm;
