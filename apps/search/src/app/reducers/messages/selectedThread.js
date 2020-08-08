import {FETCH_SELECTED_THREAD, CLEAR_SELECTED_THREAD, FULFILLED, PENDING, REJECTED, GET_UPDATED_SELECTED_THREAD} from '../../constants/ActionTypes';
const initialState = {
  data: {
    messages: [
      {
        body: {
          newSession: {
            bookingStatus: 'RESCHEDULE.DECLINED',
            address: 'Mansfield Park, 17 Winslow Ave., San Francisco',
            athleteName: 'Ganesh',
            name: 'Intermediate soccer session',
            coach: {
              name: 'Nagaraj',
              nickname: 'nagaraj_pp',
              profilePic: ''
            },
            startDate: '2018-01-23T13:10:28+00:00',
            endDate: '2018-01-23T13:12:28+00:00'
          },
          oldSession: {
            address: 'Mansfield Park, 17 Winslow Ave., San Francisco',
            startDate: '2018-01-23T13:10:28+00:00',
            endDate: '2018-01-23T13:12:28+00:00'
          }
        },
        type: 'RESCHEDULE_REQUEST_DECLINED',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          acceptedSession: 2,
          totalSession: 3,
          sessions: [
            {
              bookingStatus: 'BOOKING.ACCEPTED',
              address: 'Mansfield Park, 17 Winslow Ave., San Francisco',
              athleteName: 'Ganesh',
              name: 'Intermediate soccer session',
              coach: {
                name: 'Nagaraj',
                nickname: 'nagaraj_pp',
                profilePic: ''
              },
              startDate: '2018-01-23T13:10:28+00:00',
              endDate: '2018-01-23T13:12:28+00:00'
            },
            {
              bookingStatus: 'BOOKING.DECLINED',
              athleteName: 'Ganesh',
              name: 'Intermediate soccer session',
              coach: {
                name: 'Nagaraj',
                nickname: 'nagaraj_pp',
                profilePic: ''
              },
              startDate: '2018-01-23T13:10:28+00:00',
              endDate: '2018-01-23T13:12:28+00:00'
            },
            {
              bookingStatus: 'BOOKING.ACCEPTED',
              address: 'HSR layout bangalore.',
              athleteName: 'Ganesh',
              name: 'Intermediate soccer session',
              coach: {
                name: 'Nagaraj',
                nickname: 'nagaraj_pp',
                profilePic: ''
              },
              startDate: '2018-01-23T13:10:28+00:00',
              endDate: '2018-01-23T13:12:28+00:00'
            }
          ]

        },
        type: 'BOOKING_PARTAILLY_ACCEPTED',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          session: {
            bookingStatus: 'RESCHEDULE.REQUESTED',
            address: 'Mansfield Park, 17 Winslow Ave., San Francisco',
            athleteName: 'Ganesh',
            name: 'Intermediate soccer session',
            coach: {
              name: 'Nagaraj',
              nickname: 'nagaraj_pp',
              profilePic: ''
            },
            startDate: '2018-01-23T13:10:28+00:00',
            endDate: '2018-01-23T13:12:28+00:00'
          }
        },
        type: 'RESCHEDULE_REQUEST',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          session: {
            name: 'Soccer training',
            coach: {
              name: 'Nagaraj',
              nickname: 'nagaraj_pp',
              profilePic: ''
            },
            athleteName: 'Ganesh'
          },
          paymentInfo: {
            amount: 250,
            bookingDate: '2018-01-23T13:12:28+00:00',
            bookingId: '456231'
          },
          totalSession: 4
        },
        type: 'SESSION_COMPLETED',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          session: {
            name: 'Soccer training',
            coach: {
              name: 'Nagaraj',
              nickname: 'nagaraj_pp',
              profilePic: ''
            },
            athleteName: 'Ganesh'
          },
          paymentInfo: {
            amount: 250,
            bookingDate: '2018-01-23T13:12:28+00:00',
            bookingId: '456231'
          },
          totalSession: 4,
          refundedSession: 3
        },
        type: 'REFUND_SUCCESSFUL',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          currentSession: 1,
          totalSession: 3,
          session: {
            bookingStatus: 'BOOKING.DECLINED',
            athleteName: 'Ganesh',
            name: 'Intermediate soccer session',
            coach: {
              name: 'Nagaraj',
              nickname: 'nagaraj_pp',
              profilePic: ''
            },
            startDate: '2018-01-23T13:10:28+00:00',
            endDate: '2018-01-23T13:12:28+00:00'
          }
        },
        type: 'RATE_SESSION',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          session: {
            bookingStatus: 'BOOKING.DECLINED',
            athleteName: 'Ganesh',
            name: 'Intermediate soccer session',
            coach: {
              name: 'Nagaraj',
              nickname: 'nagaraj_pp',
              profilePic: ''
            },
            startDate: '2018-01-23T13:10:28+00:00',
            endDate: '2018-01-23T13:12:28+00:00'
          }
        },
        type: 'BOOKING_DECLINED_SCHEDULE',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          coachName: 'Jeevan', sportName: 'Soccer', SSPType: 'ISP'
        },
        type: 'BOOKING_DECLINED_PROFILE',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      },
      {
        body: {
          coachName: 'Garry', sportName: 'Golf', SSPType: 'ISP'
        },
        type: 'SSP_OUT_OF_COACHLIST',
        timestamp: '2018-01-23T13:12:28+00:00',
        subject: 'Soccer event invitation',
        from: {
          id: '5a617f76db2529c70e7b23c7',
          profilePic: '5a618077db25296a0e7b23c6.jpg',
          displayName: 'Coachlist',
          nickname: 'ganesh',
          type: 'isp'
        },
        attachments: [],
        threadId: 1,
        to: [
          {
            id: '5a673354db2529182af12f68',
            profilePic: '5a67340bdb2529182af12f69.jpg',
            displayName: 'Ganesh Poojary',
            nickname: 'ganesh',
            type: 'isp'
          }
        ],
        id: '1'
      }
    ],
    subject: 'Soccer event invitation',
    members: [
      {
        id: '5a673354db2529182af12f68',
        profilePic: 'https://localhost/images/user_media/profile_pics/5a67340bdb2529182af12f69.jpg',
        displayName: 'Ravish Poojary',
        nickname: 'ravish',
        type: 'isp'
      }
    ],
    labels: [
      'Important'
    ],
    archived: true,
    starred: false,
    id: 1
  },
  status: ''
};
const selectedThread = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SELECTED_THREAD + PENDING : {
      const newState = Object.assign({}, initialState, {status: PENDING});
      return newState;
    }
    case FETCH_SELECTED_THREAD + FULFILLED : {
      const data = action.payload.data.payload;
      const newState = Object.assign({}, {data, status: FULFILLED});
      return newState;
    }
    case FETCH_SELECTED_THREAD + REJECTED : {
      // Const newState = Object.assign({}, initialState, {status: REJECTED});
      const newState = Object.assign({}, initialState, {status: FULFILLED});
      return newState;
    }
    case GET_UPDATED_SELECTED_THREAD + FULFILLED: {
      const data = action.payload.data.payload;
      const newState = Object.assign({}, {data});
      return newState;
    }
    case CLEAR_SELECTED_THREAD: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default selectedThread;
