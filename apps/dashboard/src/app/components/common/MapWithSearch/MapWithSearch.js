import React, {Component} from 'react';
import config from '../../../config';
import {PropTypes} from 'prop-types';
import translate from 'redux-polyglot/translate';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import {MAP_MARKER_ICON} from '../../../constants/assetsPaths';

class MapWithSearch extends Component {
  render() {
    return (
      <GoogleMap zoom={this.props.zoom} defaultCenter={config.defaultPosition} center={this.props.center ? this.props.center : config.defaultPosition} options={this.props.options} disableDefaultUI>
        <SearchBox
          ref={this.props.onSearchRef}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.props.onPlacesChanged}
        >
          <div className="cl-sd-search-mapLocation">
            <div className="uk-autocomplete cl-sd-cityDropdownhead">
              <input ref={this.props.onSearchTextRef} type="text" placeholder={this.props.p.t('MapWithSearch.searchPlaceHolder')} className="uk-form-controls search"/>
            </div>
            <svg version={1.0} id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve">
              <path
                fill="#666666"
                d="M23.891,20.858l-4.691-4.693c0.838-1.486,1.356-3.178,1.356-5.004c0-5.667-4.611-10.277-10.278-10.277 C4.61,0.884,0,5.494,0,11.161c0,5.668,4.61,10.28,10.278,10.28c2.511,0,4.783-0.94,6.572-2.441l4.45,4.451L23.891,20.858z M2.541,11.161c0-4.266,3.471-7.736,7.737-7.736c4.266,0,7.736,3.471,7.736,7.736c0,4.268-3.47,7.738-7.736,7.738 C6.011,18.898,2.541,15.429,2.541,11.161z"
              />
            </svg>
          </div>
        </SearchBox>
        {
          this.props.isMarkerShown &&
            this.props.markers &&
              this.props.markers.length &&
                this.props.markers.map((marker, i) => (
                  <Marker
                    {...this.props}
                    key={i}
                    position={marker}
                    icon={{
                      url: MAP_MARKER_ICON
                    }}
                  />
                ))
        }
      </GoogleMap>
    );
  }
  static get propTypes() {
    return {
      isMarkerShown: PropTypes.bool.isRequired,
      p: PropTypes.shape({t: PropTypes.func}).isRequired,
      center: PropTypes.object.isRequired,
      markers: PropTypes.array.isRequired,
      onPlacesChanged: PropTypes.func.isRequired,
      onSearchRef: PropTypes.func.isRequired,
      onSearchTextRef: PropTypes.func.isRequired,
      options: PropTypes.object.isRequired,
      bounds: PropTypes.object,
      zoom: PropTypes.number.isRequired
    };
  }
}

MapWithSearch.defaultProps = {
  bounds: {}
};

export default translate(withScriptjs(withGoogleMap(MapWithSearch)));
