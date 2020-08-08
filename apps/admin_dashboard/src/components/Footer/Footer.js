import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="#">Coachlist</a> &copy; Coachlist</span>
        <span className="ml-auto">Powered by <a href="#">CoreUI</a></span>
      </footer>
    );
  }
}

export default Footer;
