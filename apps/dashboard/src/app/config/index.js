import {PAYMENT_REDIRECT_ROUTE} from '../constants/pathConstants';

const configuration = require('./config.json');
const config = {
  // BaseURL: 'https://www.apimint.com:443/mock/COACHLIST/v1',
  // baseURL: 'https://dev.coachlist.com/api/v1',
  // baseURL: 'https://www.coachlist.com/api/v1',
  sspSearchBaseUrl: configuration.sspSearchBaseUrl,
  staticBaseURL: configuration.baseUrl + '/static',
  baseURL: configuration.baseUrl + '/api/v1',
  ssrUrl: configuration.ssrUrl,
  endpoints: {
    test: {
      method: 'GET',
      url: 'http://httpbin.org/get'
    },
    user: {
      ssp: {
        locations: {
          method: 'GET',
          url: '/isp/profile/{profileID}/training-locations/{sportID}',
          headers: {
            'Content-type': 'application/json',
            'x-mock-access': '213b88a141b0a704287809735cd7db'
          }
        },
        sessions: {
          method: 'GET',
          url: '/isp/profile/{profileID}/sport/{sportID}/sessions',
          headers: {
            'Content-type': 'application/json',
            'x-mock-access': '213b88a141b0a704287809735cd7db'
          }
        },
        delete: {
          sessions: {
            url: '/isp/profile/{profileID}/sport/{sportID}/session/{sessionID}'
          },
          event: {
            url: '/ssp/event/{eventID}'
          },
          discount: {
            url: '/isp/profile/{profileID}/sport/{sportID}/sub-ssp-type/{subSSPTypeID}/volume-discount/{discountID}'
          }
        },
        events: {
          method: 'GET',
          url: '/ssp/events',
          headers: {
            'Content-type': 'application/json',
            'x-mock-access': '213b88a141b0a704287809735cd7db'
          }
        },
        profile: {
          method: 'GET',
          url: '/isp/profile/{profileID}',
          headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': '{token}'
          }
        },
        activate: {
          method: 'POST',
          url: '/isp/profile/{profileID}/activate'
        },
        set: {
          profile: {
            method: 'POST',
            url: '/isp/profile/{profileID}',
            headers: {
              'Content-type': 'application/json',
              'X-CSRF-TOKEN': '{token}'
            }
          },
          sports: {
            method: 'POST',
            url: '/isp/profile/{profileID}/sport/{sportID}',
            headers: {
              'Content-type': 'application/json',
              'X-CSRF-TOKEN': '{token}'
            }
          },
          event: {
            method: 'POST',
            url: '/event'
          }
        }
      },
      profile: {
        activate: {
          method: 'POST',
          url: '/{type}/profile/{profileID}/activate'
        }
      }
    },
    metadata: {
      sports: {
        method: 'GET',
        url: '/master/sports',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      degrees: {
        method: 'GET',
        url: '/master/bio/degree/sport/{sportID}',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      certifications: {
        method: 'GET',
        url: '/master/bio/certificate/sport/{sportID}',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      affiliations: {
        method: 'GET',
        url: '/master/bio/affiliation/sport/{sportID}',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      awards: {
        method: 'GET',
        url: '/master/bio/award/sport/{sportID}',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      tools: {
        method: 'GET',
        url: '/master/bio/tool/sport/{sportID}',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      skills: {
        method: 'GET',
        url: '/master/skills',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      ages: {
        method: 'GET',
        url: '/master/age-groups',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      training: {
        method: 'GET',
        url: 'isp/sport/{sportID}/sub-ssp-types',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      services: {
        method: 'GET',
        url: '/isp/other-services/{sportID}',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      countries: {
        method: 'GET',
        url: '/master/countries',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      states: {
        method: 'GET',
        url: '/country/{countryID}/states?s=200',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      },
      institutions: {
        method: 'GET',
        url: '/master/institutions',
        headers: {
          'Content-type': 'application/json',
          'x-mock-access': '213b88a141b0a704287809735cd7db'
        }
      }
    }
  },
  translations: {
    enUs: require('../locale/enUs.json'),
    es: require('../locale/es.json')
  },
  colors: [
    '#42B7DB', '#ff913d', '#84c54b', '#d179ce'
  ],
  colorCombinations: [
    {
      borderColor: '#42B7DB',
      borderTopColor: '#42B7DB',
      color: '#42B7DB',
      background: 'rgba(22, 183, 219, 0.2)'
    }, {
      borderColor: ' #ff913d',
      borderTopColor: ' #ff913d',
      color: '#ff913d',
      background: 'rgba(255, 145, 61, 0.2)'
    }, {
      borderColor: '#84c54b',
      borderTopColor: '#84c54b',
      color: '#84c54b',
      background: 'rgba(132, 197, 75, 0.2)'
    }, {
      borderColor: '#d179ce',
      borderTopColor: '#d179ce',
      color: '#d179ce',
      background: 'rgba(209, 121, 206, 0.2)'
    }
  ],
  cancellationPollicies: ['L', 'C', 'N'],
  rewardsHistoryFilters: {
    ALL: 'all',
    REFERRALS: 'referrals',
    SESSIONS_COMPLETED: 'sessionComplete'
  },
  // RedirectUrl: 'https://dev.coachlist.com/logout',
  redirectUrl: configuration.ssrUrl + '/logout',
  redirectUrl: configuration.baseUrl,
  TOKEN_NAME: 'x-mock-access',
  // TOKEN_NAME: 'X-CSRF-TOKEN'
  RegStages: {
    DASHBOARD: 45
  },
  supportEmails: {
    firstSupportEmail: 'support@coachlist.com',
    secondSupportEmail: 'admin@coachlist.com'
  },
  RegExp: {
    Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    nickName: /^[a-zA-Z0-9-]*$/,
    url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    phone: /^[0-9\s-()+]+$/,
    zipcode: /^[a-zA-Z0-9-_ ]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
    messagingLabel: /^[a-zA-Z0-9_ ]*$/
  },
  pointPerFriendInvite: 10,
  sessionBookingStatus: {
    BOOKING_ACCEPTED: 'BOOKING.ACCEPTED',
    BOOKING_DECLINED: 'BOOKING.DECLINED',
    BOOKING_RQUESTED: 'BOOKING.REQUESTED',
    RESCHEDULE_ACCEPTED: 'RESCHEDULE.ACCEPTED',
    RESCHEDULE_DECLINED: 'RESCHEDULE.DECLINED',
    RESCHEDULE_REQUESTED: 'RESCHEDULE.REQUESTED'
  },
  messagingSystem: {
    defaultThreadPageLimit: 10,
    defaultThreadPage: 1,
    acceptFileType: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.odt,.avi,.ogg,.m4a,.mov,.mp3,.mp4,.mpg,.wav,.wmv,.zip,.rar,.xls,.xlsx',
    maxFileSizeLimit: 15, // In MB
    messageActionFilters: {
      sessionFromAndToDateFormat: 'D-M-YYYY'
    },
    messageThreadItem: {
      maxMembersNameChars: 20
    },
    messageAttachment: {
      imageAttachmentName: 'image',
      fileAttachmentName: 'attachment'
    },
    MESSAGE_TYPE: {
      MESSAGE_SENT: 'MESSAGE.SENT',
      MESSAGE_RECEIVED: 'MESSAGE.RECEIVED',
      BOOKING: 'BOOKING',
      SSP_OUT_OF_COACHLIST: 'SSP_OUT_OF_COACHLIST', // SSP NO LONGER PART OF CAOCHLIST
      BOOKING_DECLINED_PROFILE: 'BOOKING_DECLINED_PROFILE',
      BOOKING_DECLINED_SCHEDULE: 'BOOKING_DECLINED_SCHEDULE',
      RATE_SESSION: 'RATE_SESSION',
      REFUND_SUCCESSFUL: 'REFUND_SUCCESSFUL',
      SESSION_COMPLETED: 'SESSION_COMPLETED',
      RESCHEDULE_REQUEST: 'RESCHEDULE_REQUEST',
      RESCHEDULE_REQUEST_DECLINED: 'RESCHEDULE_REQUEST_DECLINED',
      BOOKING_PARTIALLY_ACCEPTED: 'BOOKING_PARTIALLY_ACCEPTED',
      BOOKING_REQUEST_RECEIVED: 'BOOKING_REQUEST_RECEIVED',
      BOOKING_REQUEST_ACCEPTED: 'BOOKING_REQUEST_ACCEPTED',
      RESCHDULE_SUCESSFULL: 'RESCHDULE_SUCESSFULL',
      SESSION_SCHEDULE_REQUEST: 'SESSION_SCHEDULE_REQUEST',
      SESSION_RESCHEDULE_REQUEST: 'SESSION_RESCHEDULE_REQUEST',
      UPCOMING_SESSION_NOT_MET_REQUIRED_PARTICIPANTS: 'UPCOMING_SESSION_NOT_MET_REQUIRED_PARTICIPANTS',
      SSP_SESSION_BOOKING_REQUEST_REMINDER: 'SSP_SESSION_BOOKING_REQUEST_REMINDER',
      SSP_SESSION_BOOKING_REMINDER: 'SSP_SESSION_BOOKING_REMINDER',
      SSP_REQUEST_RATING_SERVICE: 'SSP_REQUEST_RATING_SERVICE',
      SSP_SESSION_CANCELLED: 'SSP_SESSION_CANCELLED',
      SSP_FUND_TRANSFER_BANK: 'SSP_FUND_TRANSFER_BANK',
      SSP_FUND_WITHDRAW_REQUEST: 'SSP_FUND_WITHDRAW_REQUEST',
      MESSAGE_BOOKING_REQUEST_SENT: 'MESSAGE_BOOKING_REQUEST_SENT',
      MESSAGE_SESSION_BOOKING_REQUEST_SENT_ACCEPTED: 'MESSAGE_SESSION_BOOKING_REQUEST_SENT_ACCEPTED',
      MESSAGE_SESSION_CHANGE_REQUEST: 'MESSAGE_SESSION_CHANGE_REQUEST',
      MESSAGE_SESSION_CANCEL: 'MESSAGE_SESSION_CANCEL',
      MESSAGE_SESSION_RESCHEDULE_REQUEST_CONFIRM: 'MESSAGE_SESSION_RESCHEDULE_REQUEST_CONFIRM',
      MESSAGE_SESSION_RESCHEDULE_DECLINE_PROPOSE_NEW_TIME: 'MESSAGE_SESSION_RESCHEDULE_DECLINE_PROPOSE_NEW_TIME',
      MESSAGE_SESSION_COMPLETE: 'MESSAGE_SESSION_COMPLETE',
      MESSAGE_RATE_SERVICE: 'MESSAGE_RATE_SERVICE',
      SSP_BOOKING_ACCEPTED: 'SSP_BOOKING_ACCEPTED',
      SSP_RESCHEDULE_CONFIRMED_SSP: 'SSP_RESCHEDULE_CONFIRMED_SSP',
      SSP_RESCHEDULE_REQUEST_SENT: 'SSP_RESCHEDULE_REQUEST_SENT',
      SSP_CANCELLED_SESSION_SSP: 'SSP_CANCELLED_SESSION_SSP',
      ATHLETE_RESCHEDULE_REQUEST_SENT: 'ATHLETE_RESCHEDULE_REQUEST_SENT',
      ATHLETE_CANCELLED_SESSION_ATHLETE: 'ATHLETE_CANCELLED_SESSION_ATHLETE',
      ATHLETE_SESSION_BOOKING_REMINDER: 'ATHLETE_SESSION_BOOKING_REMINDER'
    },
    metadataPollDelay: 36000,
    shoppingCartDataPollDelay: 30000,
    messageSearchDebounceTimeout: 400,
    threadLabelColors: [
      'msg_messagesList-label--colorGreen',
      'msg_messagesList-label--colorYellow',
      'msg_messagesList-label--colorPurple'
    ],
    messageRecipientProfileTypes: [
      {
        type: 'team',
        displayName: 'typeTeam'
      },
      {
        type: 'session',
        displayName: 'typeSession'
      },
      {
        type: 'athlete',
        displayName: 'typeAthlete'
      }
    ],
    messageThreadSorters: {
      sortby: [
        {
          displayTextKey: 'recieved',
          value: 'recieved'
        },
        {
          displayTextKey: 'sender',
          value: 'sender'
        }
      ],
      orderBy: [
        {
          displayTextKey: 'newest',
          value: 'newest'
        },
        {
          displayTextKey: 'oldest',
          value: 'oldest'
        }
      ]
    },
    messageThreadFilters: {
      messageTypes: [
        {
          displayName: 'bookingRequest',
          value: 'BOOKING_REQUEST.ALL',
          sub: [
            {
              displayName: 'accepted',
              value: 'BOOKING_REQUEST.ACCEPTED'
            },
            {
              displayName: 'declined',
              value: 'BOOKING_REQUEST.DECLINED'
            }
          ]
        },
        {
          displayName: 'enquiry',
          value: 'ENQUIRY.ALL',
          sub: [

            {
              displayName: 'notResponded',
              value: 'ENQUIRY.NOT_RESPONDED'
            },
            {
              displayName: 'sentCustomPackage',
              value: 'ENQUIRY.SEND_CUSTOM_PACKAGE'
            }
          ]
        },
        {
          displayName: 'rescheduleRequest',
          value: 'RESCHEDULE_REQUEST.ALL',
          sub: [
            {
              displayName: 'accepted',
              value: 'RESCHEDULE_REQUEST.ACCEPTED'
            },
            {
              displayName: 'declined',
              value: 'RESCHEDULE_REQUEST.DECLINED'
            }
          ]
        },
        {
          displayName: 'conversation',
          value: 'CONVERSATION'
        }
      ]
    }
  },
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  offerTerminologies: {
    Session: 'Session',
    Lesson: 'L',
    Class: 'C',
    Training: 'T'
  },
  assetsBasePath: './',
  profileBaseUrl: 'https://coachlist.com/profile/',
  phoneTypes: {
    landline: 'landline',
    mobile: 'mobile'
  },
  tokenQueryStringName: 'token',
  modalQueryStringName: 'showModal',
  showModalLocalStorage: 'showModalStatus',
  showModalStatus: 'Y',
  jwtTokenNameInLocalStorage: 'coachlistJwtAuthToken',
  userTypes: {
    ssp: {
      name: 'ssp',
      sspSubTypes: {
        ISP: 'isp',
        CAMP: 'camp',
        BUSINESS: 'business',
        SERVICE_PROVIDER: 'service-provider'
      }
    }
  },
  genders: [
    {
      displayName: 'AccountDetails.genderMale',
      value: 'M'
    },
    {
      displayName: 'AccountDetails.genderFemale',
      value: 'F'
    },
    {
      displayName: 'AccountDetails.genderOther',
      value: 'O'
    }
  ],
  withdrawSettings: [
    {
      displayName: 'FundWithdrawTypes.auto',
      value: 'A'
    },
    {
      displayName: 'FundWithdrawTypes.manual',
      value: 'M'
    }
  ],
  OrderFilter: {
    defaultName: 'All',
    custom: ' '
  },
  minWithdrawAmount: 500,
  defaultPosition: {
    lat: 38.68551,
    lng: -96.503906
  },
  defaultZoom: 4,
  minZoom: 2,
  zoomLevels: {
    country: 4,
    state: 7,
    city: 20
  },
  volumeDiscount: [
    {
      id: null,
      name: 'Trial',
      numberOfSessions: 1,
      discount: 0.0,
      isActive: 'N'
    },
    {
      id: null,
      name: 'Bronze Package',
      numberOfSessions: 3,
      discount: 4.0,
      isActive: 'N'
    },
    {
      id: null,
      name: 'Silver Package',
      numberOfSessions: 5,
      discount: 7.0,
      isActive: 'N'
    },
    {
      id: null,
      name: 'Gold Package',
      numberOfSessions: 10,
      discount: 12.0,
      isActive: 'N'
    }
  ],
  templateDataBio: [
    {
      id: 1,
      data: 'A former #10 ranked junior golfer and USGA Public Links champion in 2011, I am considered one of the top women’s junior golf instructors in the west coast. I was also a Junior Solheim Cup participant. As a professional I was runner up for Symetra Tour Player of the Year in 2011, Rookie of the Year in 2002, and was a first team All American and was inducted into the Nevada Sports Hall of Fame. I turned professional in 2005 and won my first championship on my second year on tour, the Corning Classic. I can take you from a novice to as far as you’re willing to put in the effort to achieve. With enough coaching and practice, anyone can have a good game of golf!'
    }
  ],
  templateDataService: [
    {
      id: 1,
      data: 'The introductory instructional program for beginning golfers ages 6-18, or the Adult Beginner’s Lessons for those over 18, is perfect for those brand new to golf, who are looking to learn skills of golf, or further their abilities in the game. Students will be assigned to teams according to skill and age level during group sessions (no more than 15 students per class so everyone gets individual attention). Students will be instructed on various skills including; putting, chipping, sand play and full swing. Rules, etiquette and course management will also be addressed.'
    }
  ],
  mapControls: {
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false
  },
  googleApiKey: configuration.googleApiKey,
  googleMapUrl: 'https://maps.googleapis.com/maps/api/js?key={key}&libraries=geometry,places',
  cultures: ['en', 'en-GB', 'es', 'fr', 'ar-AE'],
  sessionLengthUnit: 'minutes',
  sessionBufferUnit: 'minutes',
  schedulerDayWeekViewStartTime: 5,
  format: {
    dateFormat: 'dd',
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, 'llll', culture).slice(0, 11).replace(/,/g, ''),
    dayRangeHeaderFormat: ({start, end}, culture, localizer) =>
      localizer.format(start, 'llll', culture).slice(0, 11).replace(/,/g, '') + ' ' + localizer.format(start, 'YYYY', culture) + ' — ' +
      localizer.format(end, 'llll', culture).slice(0, 11).replace(/,/g, '') + ' ' + localizer.format(end, 'YYYY', culture)
  },
  sspDeatilsPage: configuration.sspSearchBaseUrl + '/#/ssp/{nickname}/{sportID}',
  searchUrl: configuration.sspSearchBaseUrl + '/#/search/sport/{sportName}?training_loc_position={latlng}',
  returnUrlKeyName: 'coachlistReturnUrl',
  auth: {
    localStorage: {
      keys: {
        registration: 'registration',
        shortRegRedirectUrl: 'shortRegRedirectUrl'
      },
      registration: {
        short: 'short'
      }
    }
  },
  payment: {
    stripe: {
      apiKey: configuration.stripePublicKey,
      returnUrl: configuration.dashboardBaseUrl + '/#'
    }
  },
  tosUrl: configuration.dashboardBaseUrl + '/terms',
  homePage: configuration.baseUrl
};

export default config;
