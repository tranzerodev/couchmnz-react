
import {SET_STATE, MARKER_CLICK, ADD_MARKER, UPDATE_SEARCH_FILTER, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';
import {Map} from 'immutable';
import merge from 'array-object-merge';

const initialState = {
  markers: [],
  gmapMarkers: [],
  showingInfoWindow: 'false',
  activeMarker: null,
  selectedTitle: '',
  selectedMarker: {},
  selectedID: '',
  aggregations: {},
  status: ''
};

function updateResult(state, data) {
  const markers = [];
  data.hits.hits.forEach(marker => {
    markers.push({
      _id: marker._id,
      title: marker._source.name,
      description: marker._source.name,
      position: [marker._source.trainingLocations[0].location.lat,
        marker._source.trainingLocations[0].location.lon],
      sspType: marker._source.sspType,
      sspSubType: marker._source.sspSubType,
      canTravel: marker._source.canTravel,
      travelUpto: marker._source.travelUpto,
      yearOfExperience: marker._source.yearOfExperience,
      verified: marker._source.verified,
      gender: marker._source.gender,
      media: marker._source.media,
      certificates: marker._source.certificates,
      ratings: marker._source.ratings,
      mostPopular: marker._source.mostPopular,
      canAcceptInstantBooking: marker._source.canAcceptInstantBooking,
      sportsCategories: marker._source.sports,
      nickName: marker._source.nickName,
      athletePref: marker._source.athletePref,
      properties: marker._source.sspType,
      image: 'http://www.donaldtavakolimd.com/images/assets/landscapes/landscape-5-800x400.jpg',
      url: 'http://www.donaldtavakolimd.com/images/assets/landscapes/landscape-5-800x400.jpg',
      mapOn: true,
      trainingLocations: marker._source.trainingLocations,
      highlight: marker.highlight

    });
  });

  const oldMarkerList = [];
  state.get('markers').forEach(marker => {
    marker.mapOn = false;
    oldMarkerList.push(marker);
  });

  const newMarkerList = [];
  markers.forEach(marker => {
    marker.mapOn = true;
    oldMarkerList.push(marker);
  });

  const updatedMarkers = merge({list: oldMarkerList}, {list: newMarkerList}, '_id');
  return state.update('markers', oldmarkers => updatedMarkers.list).update('aggregations', aggregations => data.aggregations).update('status', status => 'FULFILLED');
}

function getMarkerIndex(state, itemId) {
  return state.get('markers').findIndex(
    item => item.get('_id') === itemId
  );
}
function updateStatus(state, status) {
  return state.update('status', statusVal => status);
}
function updateMarker(state, markerIndex, mapOnVal) {
  return state.get('markers')
    .get(markerIndex)
    .update('mapOn', mapOn => mapOnVal);
}

function setState(state, newState) {
  return state.merge(newState);
}

function onMarkerClick(state, marker) {
  return state.merge(Map({
    activeMarker: marker,
    selectedTitle: marker.title,
    selectedID: marker._id,
    selectedMarker: marker.marker,
    showingInfoWindow: true
  }));
}

function addMarker(state, marker) {
  const markers = state.get('gmapMarkers');
  const newMarkers = markers.push(marker);
  return state.update('gmapMarkers', oldmarkers => markers);
}

export default function (state = Map(initialState), action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action.state);
    case MARKER_CLICK:
      return onMarkerClick(state, action.marker);
    case ADD_MARKER:
      return addMarker(state, action.marker);
    case UPDATE_SEARCH_FILTER + FULFILLED: {
      return updateResult(state, action.payload.data);
    }
    case UPDATE_SEARCH_FILTER + PENDING: {
      return updateStatus(state, 'PENDING');
    }
    case UPDATE_SEARCH_FILTER + REJECTED: {
      return updateStatus(state, 'REJECTED');
    }
    default:
      return state;
  }
}
