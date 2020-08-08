import React, {Component} from 'react';
import config from '../../../config';
import {PropTypes} from 'prop-types';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import {MAP_MARKER_ICON} from '../../../constants/assetsPaths';
/* Const Map = withScriptjs(withGoogleMap(this.props => {
  return (
    <GoogleMap defaultZoom={config.defaultZoom} defaultCenter={config.defaultPosition} center={this.props.center ? this.props.center : config.defaultPosition}>
      {
        this.props.isMarkerShown &&
          this.props.markers &&
            this.props.markers.length &&
              this.props.markers.map((marker, i) => <Marker key={i} position={marker} draggable onPositionChanged={this.props.onPositionChanged(marker)}/>)
      }
    </GoogleMap>
  );
})); */

class Map extends Component {
  constructor() {
    super();
    this.handlePositionChanged = this.handlePositionChanged.bind(this);
    this.state = {};
  }
  componentDidMount() {

  }
  handlePositionChanged(e) {
    console.log('Map', 'handlePositionChanged', e);
  }
  handleMapMounted(map) {
    this.props.onMapMounted(map);
  }
  render() {
    return (
      <GoogleMap ref={'map'} zoom={this.props.zoom} defaultCenter={config.defaultPosition} center={this.props.center ? this.props.center : config.defaultPosition} options={this.props.options}>
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
      center: PropTypes.object.isRequired,
      markers: PropTypes.array.isRequired,
      onMapMounted: PropTypes.func
    };
  }
}

Map.defaultProps = {
  onMapMounted: () => {}
};

export default withScriptjs(withGoogleMap(Map));
