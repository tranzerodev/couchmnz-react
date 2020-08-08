import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class ActionImagesSlider extends Component {
  render() {
    const {images, baseUrl} = this.props;
    return (
      <div className="uk-slidenav-position cl-sd-managePhoto-slider" data-uk-slideshow>
        <ul className="uk-slideshow">
          { images.map(imageItem => {
            return (
              <li key={imageItem.image}>
                <img src={baseUrl + imageItem.image} alt={imageItem.caption_en}/>
              </li>
            );
          }
          )}

        </ul>
        <a href="" className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slideshow-item="previous"/>
        <a href="" className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slideshow-item="next"/>
        <ul className="uk-dotnav uk-dotnav-contrast uk-position-bottom uk-flex-center">
          { images.map((imageItem, index) => {
            return (
              <li key={imageItem.image} data-uk-slideshow-item={index}><a href=""/></li>
            );
          }
          )}
        </ul>
      </div>
    );
  }
  static get propTypes() {
    return {
      images: PropTypes.array.isRequired,
      baseUrl: PropTypes.string.isRequired
    };
  }
}

export default ActionImagesSlider;
