import {FULFILLED, SEARCH_MESSAGE_RECIPIENTS} from '../../constants/ActionTypes';
const initalState = [
  {
    id: '5a608e4cdb25292e067b2589',
    displayName: 'John',
    nickname: 'john',
    type: 'team',
    profilePic: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f55edd25074391.5633ee08081f9.png'
  },
  {
    id: '5a608e4cdb25292e067b24212',
    displayName: 'Jim',
    nickname: 'jim',
    type: 'athlete',
    profilePic: 'https://pickaface.net/assets/images/slides/slide4.png'
  },
  {
    id: '5a608e4cdb25292e067b2589964',
    displayName: 'Arnab',
    nickname: 'arnab',
    type: 'session',
    profilePic: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f55edd25074391.5633ee08081f9.png'
  },
  {
    id: '5a608e4cdb25292e067b412ds',
    displayName: 'Jeevan',
    nickname: 'jeevan',
    type: 'athlete',
    profilePic: 'https://pickaface.net/assets/images/slides/slide4.png'
  },
  {
    id: '5a608e4cdb25292e067b251423',
    displayName: 'Ganesh',
    type: 'athlete',
    nickname: 'ganesh',
    profilePic: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/f55edd25074391.5633ee08081f9.png'
  }
];
const recipients = (state = initalState, action) => {
  switch (action.type) {
    case SEARCH_MESSAGE_RECIPIENTS + FULFILLED: {
      const {recipients} = action.payload.data.payload;
      return recipients;
    }
    default:
      return state;
  }
};

export default recipients;
