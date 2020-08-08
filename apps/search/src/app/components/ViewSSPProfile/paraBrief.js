import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactHtmlParser from 'react-html-parser';

class ParaBrief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allContent: '',
      displayContent: '',
      toggleshows: '...read more'
    };
    // This.setState({allContent: this.props.paraContent})
    this.handleToggle = this.handleToggle.bind(this);
  }
  static get propTypes() {
    return {
      paraClassName: PropTypes.string,
      linkClassName: PropTypes.string,
      paraContent: PropTypes.string.isRequired
    };
  }
  componentDidMount() {
    if (this.props.paraContent && this.props.paraContent.length) {
      const paraLength = this.props.paraContent.length;
      if (paraLength > 160) {
        this.setState({allContent: this.props.paraContent, displayContent: (this.props.paraContent.slice(0, 159)) + '...'});
      } else {
        this.setState({allContent: this.props.paraContent, displayContent: this.props.paraContent});
      }
    }
  }
  handleToggle(event) {
    event.preventDefault();
    let beBrief = this.state.allContent.slice(0, 159);
    beBrief += '...';
    if (this.state.displayContent.length < this.state.allContent.length) {
      this.setState({displayContent: this.state.allContent});
      this.setState({toggleshows: 'read less'});
    } else {
      this.setState({displayContent: beBrief});
      this.setState({toggleshows: '...read more'});
    }
  }
  render() {
    return (
      <p className={this.props.paraClassName}>
        { reactHtmlParser(this.state.displayContent) }  <a href="_self" className={this.props.linkClassName} style={(this.state.allContent.length > 160) ? {display: 'block'} : {display: 'none'}} onClick={this.handleToggle}>{this.state.toggleshows}</a>
      </p>
    );
  }
}

ParaBrief.defaultProps = {
  paraClassName: '',
  linkClassName: ''
};

export default ParaBrief;
