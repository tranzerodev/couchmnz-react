const constansts = {
  nicknameAvailabilityFlags: {
    available: 'Y',
    notAvailable: 'N'
  },
  zipCodeMaxlength: 20,
  profilePicture: {
    size: 5242880,
    sizeInMB: 5,
    dimensions: {
      width: 360,
      height: 360
    },
    extensions: ['.jpg', '.jpeg', '.png'],
    extensionsDisplay: ['jpg, ', 'jpeg, ', 'png']
  },
  actionPicture: {
    size: 5242880,
    sizeInMB: 2,
    maxPictures: 10,
    dimensions: {
      width: 100,
      height: 200
    },
    extensions: ['.jpg', '.jpeg', '.png', '.gif'],
    extensionsDisplay: ['jpg, ', 'jpeg, ', 'png, ', 'gif']
  },
  actionVideos: {
    size: 15728640,
    sizeInMB: 15,
    maxVideos: 1,
    extensions: ['.mp4']
  },
  paypalEmailVerificationCodeLength: 6,
  paypalLearnMoreLink: 'https://www.paypal.com/in/webapps/mpp/how-paypal-works',
  paypalSignUp: 'https://www.paypal.com/in/webapps/mpp/account-selection',
  profileActiveStatus: {
    ACTIVE: 'Y',
    NOT_ACTIVE: 'N'
  },
  BankDetails: {
    holder: {
      individual: 'I',
      company: 'C'
    },
    accountType: {
      checking: 'C',
      saving: 'S'
    }
  },
  numberOfYears: 60,
  saveType: {
    sportsSpecific: 'SS',
    onlyProfile: 'OP',
    both: 'B',
    none: 'N'
  },
  defaultSession: {
    yes: 'Y',
    no: 'N'
  },
  profileActiveFlages: {
    active: 'Y',
    inactive: 'N'
  },
  listingHeadlineLength: 140,
  businessModel: {
    payPerBooking: 'PPB'
  },
  payoutOption: {
    payPal: 'PP',
    bank: 'BK'
  },
  RegistrationFlowPageStatusFlags: {
    complete: 'Y',
    disabled: 'D',
    intermediate: 'N'
  },
  masterDataTypes: {
    ispDegree: 'isp-degree',
    ispInstitution: 'isp-institution',
    ispCertification: 'isp-certification',
    ispAffiliation: 'isp-affiliation',
    ispAward: 'isp-award',
    ispTool: 'isp-tool',
    state: 'state',
    city: 'city'
  },
  sportExperience: {
    coaching: 'coaching',
    playing: 'playing',
    min: 0,
    max: 99
  },
  trainingLocationTypes: ['I', 'O'],
  sportsActiveFlages: {
    active: 'Y',
    inactive: 'N'
  },
  sportsDataStatusColorCodes: {
    green: 'green',
    red: 'red',
    gray: 'gray'
  },
  profilePageStatusClass: {
    complete: 'complete',
    intermediate: 'current',
    disabled: 'upcoming'
  },
  hasSession: {
    yes: 'Y',
    no: 'N'
  },
  profiles: {
    ssp: 'ssp',
    isp: 'isp',
    athlete: 'athlete',
    parent: 'parent'
  },
  genders: [
    'A',
    'M',
    'F',
    'O'
  ],
  filterQueries: {
    athleteGender: 'athlete_gender',
    athleteAgeGroups: 'athlete_age_groups',
    athleteSkillLevels: 'athlete_skill_levels',
    trainingLatLong: 'training_loc_position',
    trainerGenderParam: 'trainer_gender',
    trainerTypesParam: 'trainer_type',
    sessionTypesParam: 'session_type',
    distanceParam: 'distance',
    canTravelParam: 'can_travel',
    minPrice: 'min_price',
    maxPrice: 'max_price',
    yearOfTrainingExperienceParam: 'year_of_training_exp',
    yearOfPlayingExperienceParam: 'year_of_playing_exp',
    instantBookParam: 'instant_book',
    isCertifiedParam: 'is_certified',
    page: 'page'
  },
  searchParams: {
    ages: {
      toddler: 'Toddler (0-4)',
      child: 'Child (5-9)',
      preteen: 'Preteen (10-12)',
      adolescent: 'Adolescent (13-17)',
      collegiate: 'Collegiate (18-22)',
      adult: 'Adult'
    }
  },
  gender: {
    any: 'A',
    male: 'M',
    female: 'F',
    other: 'O'
  },
  orderOptions: [
    'A',
    'PROCESSING',
    'SUCCESS',
    'FAILED'
  ],
  orderStatus: {
    PAID: 'P',
    IN_PROGRESS: 'IP',
    DISPUTED: 'D',
    FAILED: 'F',
    REFUNDED: 'R'
  },
  defaultDateFormat: 'll',
  defaultOrderStatus: 'A',
  orderHistoryDateFormat: 'll',
  defaultFromMonthSub: 2,
  defaultViewDate: 'January 01, 2000 00:00:00',
  schedulerNavigationDateFormat: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  orderHistoryItemPerPage: 4,
  trainingServicesIconMap: {
    G: 'cl-icon-usergroup',
    P: 'cl-icon-connection',
    C: 'cl-icon-clinic',
    T: 'cl-icon-team'
  },
  scheduledSessionQueryFilters: {
    date: 'date'
  },
  canSchedule: {
    yes: 'Y',
    no: 'N'
  },
  athleteAvailableQueryFilters: {
    date: 'date'
  },
  userProfileTypes: {
    ISP: 'isp',
    ATHLETE: 'athlete',
    PARENT: 'parent'
  },
  displayNames: {
    isp: 'ISP',
    parent: 'Parent',
    athlete: 'Athlete'
  },
  switchProfileType: {
    profile: 'profile',
    dependent: 'dependent'
  },
  trainingServices: {
    group: 'G',
    team: 'T',
    clinic: 'C',
    individual: 'I'
  },
  schedules: {
    queryFilters: {
      date: 'date'
    },
    ISO_DATE_FORMAT: 'YYYY-MM-DDTHH:mm:ss.sssZ'
  },
  manageBookings: {
    bookedOn: 'ddd, Do MMM',
    startTime: 'dddd, h:mm a',
    endTime: 'hh:mm a',
    year: 'Do MMM YYYY',
    queryFilters: {
      sportId: 'sport_id',
      sessionId: 'session_id',
      athleteId: 'athlete_id',
      endDate: 'end_date',
      page: 'page'
    },
    endDateFilter: {
      forever: 'FOREVER',
      thisWeek: 'THIS_WEEK',
      thisMonth: 'THIS_MONTH',
      nextMonth: 'NEXT_MONTH'
    },
    pageLimit: 10
  },
  ISPSessionHistory: {
    queryFilters: {
      sportId: 'sport_id',
      athleteId: 'athlete_id',
      endDate: 'end_date',
      page: 'page',
      sortBy: 'sort_by',
      numOfDays: 'num_days',
      status: 'status'
    },
    pageLimit: 10,
    sorters: {
      ALPHABETICAL: 'alphabetical',
      MOST_RECENT: 'most_recent'
    },
    numOfDays: [90, 60, 30],
    statusFilter: ['active', 'closed']
  },
  messaging: {
    queryFilters: {
      messageTypes: 'message_types',
      search: 'search',
      sessionDateTo: 'session_date_to',
      sessionDateFrom: 'session_date_from',
      sessionLocationId: 'session_location_id',
      sportId: 'sport_id',
      sessionId: 'session_id'
    },
    apiQueryFilters: {
      messageTypes: 'messageTypes',
      search: 'search',
      sessionDateTo: 'sessionDateTo',
      sessionDateFrom: 'sessionDateFrom',
      sessionLocationId: 'sessionLocationId',
      sportId: 'sportId',
      sessionId: 'sessionId',
      page: 'page',
      limit: 'limit'
    }
  },
  scheduleSession: {
    upcommingSessionDateFormat: 'DD MMMM',
    startTime: 'hh:mm',
    endTime: 'hh:mm A',
    year: 'Do MMM YYYY',
    sessionTimeIntervalMinutes: 15,
    defaultStartTime: {
      hour: 5,
      minute: 0
    },
    defaultEndTime: {
      hour: 23,
      minute: 59
    }
  },
  canWriteReviewFlags: {
    yes: 'Y',
    no: 'N'
  },
  sessionHistory: {
    queryFilters: {
      from: 'from',
      to: 'to',
      page: 'page',
      limit: 'limit',
      order: 'orderBy',
      sortBy: 'sortBy'
    },
    monthRangeCount: 3,
    monthAddCount: 3,
    yearRangeCount: 3,
    pageLimit: 6,
    sort: [
      {
        sortBy: 'date',
        order: 'desc',
        textKey: 'most_rencent'
      },
      {
        sortBy: 'alpha',
        order: 'asc',
        textKey: 'alpha_asec'
      },
      {
        sortBy: 'alpha',
        order: 'desc',
        textKey: 'alpha_desc'
      }
    ]
  },
  reasons: {
    cancelFutureSessions: 'CANCEL_FUTURE_SESSIONS',
    reportInstructor: 'REPORT_INSTRUCTOR',
    reportAthlete: 'REPORT_ATHLETE',
    requestToRefund: 'REQUEST_TO_REFUND',
    cancelSession: 'CANCEL_SESSION',
    reschedule: 'RESCHEDULE'
  },
  exportType: {
    pdf: 'pdf',
    excel: 'excel'
  },
  defaultPage: 1,
  triedToResolveWithAthleteFlags: {
    yes: 'Y',
    no: 'N'
  },
  sessionEvents: {
    scheduled: 'SCHEDULED',
    reserved: 'RESERVED',
    unscheduled: 'UNSCHEDULED',
    rejectedRescheduleRequest: 'REJECTED_RESCHEDULED_REQUEST',
    booked: 'BOOKED',
    completed: 'COMPLETED',
    rescheduledBySsp: 'RESCHEDULED_BY_SSP',
    rescheduledByAthlete: 'RESCHEDULED_BY_ATHLETE',
    reviewGiven: 'REVIEW_GIVEN',
    rescheduledAcceptedByAthlete: 'ACCEPTED',
    rescheduledRejectedBySSP: 'RESCHEDULED_REJECTED_BY_SSP',
    rescheduledRejectedByAthlete: 'RESCHEDULED_REJECTED_BY_ATHLETE',
    cancelledByAthlete: 'CANCELLED_BY_ATHLETE',
    cancelledBySSP: 'CANCELLED_BY_SSP',
    scheduleAwaitedByAthlete: 'SCHEDULE_AWAITED_BY_ATHLETE',
    rescheduleAwaitedByAthlete: 'RESCHEDULE_AWAITED_BY_ATHLETE',
    rescheduleAwaitedBySsp: 'RESCHEDULE_AWAITED_BY_SSP',
    cancelledBySsp: 'CANCELLED_BY_SSP',
    cancelledBySystem: 'CANCELLED_BY_SYSTEM',
    rescheduleAwaitedBySSP: 'RESCHEDULE_AWAITED_BY_SSP',
    paymentAccrued: 'PAYMENT_ACCRUED'
  },
  sessionEventActions: {
    RESCHEDULE: 'RESCHEDULE',
    ACCEPT: 'ACCEPT',
    REJECT: 'REJECT',
    CANCEL: 'CANCEL',
    REMIND_ATHLETE: 'REMIND_ATHLETE',
    ACCEPT_ALL: 'ACCEPT_ALL',
    REJECT_ALL: 'REJECT_ALL',
    APPLY_ACCEPT_DECLINE: 'APPLY_ACCEPT_DECLINE'
  },
  apiBooleanFlags: {
    TRUE: 'Y',
    FALSE: 'N'
  },
  momentJSConstants: {
    WEEK: 'WEEK',
    YEAR: 'YEAR',
    MONTH: 'MONTH',
    MINUTE: 'minute',
    DAY: 'DAY'
  },
  reasonNames: {
    profileMismatch: 'PROFILE_MISMATCH',
    scheduleConflict: 'SCHEDULE_CONFLICT',
    rescheduledByAthleteWaitingForReply: 'RESCHEDULED_BY_ATHLETE_WAITING_FOR_REPLY_FROM_SSP',
    refundRequestWaitingForReply: 'REFUND_REQUESTED_WAITING_FOR_REPLY_FROM_SSP',
    rescheduled: 'RESCHEDULED',
    rescheduledByAthlete: 'RESCHEDULED_BY_ATHLETE',
    rescheduledBySsp: 'RESCHEDULED_BY_SSP'
  },
  actionTypes: {
    seeRecomandations: 'SEE_RECOMANDATIONS',
    proposeNewTime: 'PROPOSE_NEW_TIME',
    cancelSession: 'CANCEL_SESSION',
    accept: 'ACCEPT',
    reject: 'REJECT'
  },
  canRender: {
    yes: 'Y',
    no: 'N'
  },
  submitTypes: {
    sport: 'sport',
    profile: 'profile',
    createSport: 'createSport'
  },
  profileSession: {
    buffer: {
      min: 0,
      def: 15,
      step: 15,
      max: 60
    },
    session: {
      min: 15,
      def: 45,
      step: 15
    },
    totalSlots: {
      min: 0,
      def: 0,
      step: 1
    }
  },
  biography: {
    sportExperienceType: {
      coaching: 'coaching',
      playing: 'playing'
    },
    initialState: {
      // Award: {id: null, award: {id: null, name: null}, year: null, institution: {id: null, name: null}},
      award: {
        id: null,
        name: null,
        institutionID: null,
        institutionName: null,
        year: null
      },
      // Accomplishment: {id: null, year: null, description: null},
      accomplishment: {
        id: null,
        description: null,
        year: null
      },
      // Certification: {id: null, year: null, certification: {id: null, name: null}, institution: {id: null, name: null}},
      certification: {
        id: null,
        name: null,
        institutionID: null,
        institutionName: null,
        year: null
      },
      // Degree: {id: null, year: null, degree: {id: null, name: null}, institution: {id: null, name: null}},
      degree: {
        id: null,
        name: null,
        institutionID: null,
        institutionName: null,
        year: null
      },
      // Affiliation: {id: null, organization: {id: null, name: null}},
      affiliation: {
        id: null,
        organizationID: null,
        name: null
      },
      // Experience: {id: null, type: 'coaching', description: null},
      experience: {
        id: null,
        type: 'playing',
        description: null,
        year: null
      },
      // Tool: {id: null, tool: {id: null, name: null}, certification: {id: null, name: null}, institution: {id: null, name: null}}
      tool: {
        id: null,
        name: null,
        isCertified: 'N',
        certificateID: null,
        certificateName: null,
        institutionID: null,
        institutionName: null
      }
    }
  },
  yes: 'Y',
  no: 'N',
  all: 'all',
  minimumYear: 1900,
  maximumYear: new Date().getFullYear(),
  minimumExperience: 1,
  maximumExperience: 100,
  responseCodes: {
    success: 0,
    emptyPayload: 100
  },
  shoppingCart: {
    localStorageKey: 'shoppingCartData',
    canUpdateShoppingCartKey: 'canUpdateShoppingCart',
    canUpdate: {
      Y: 'YES',
      N: 'NO'
    },
    actions: {
      add: 'ADD',
      update: 'UPDATE',
      delete: 'DELETE',
      deleteSsp: 'DELETE_SSP',
      deleteSchedule: 'DELETE_SCHEDULE',
      clone: 'CLONE'
    },
    localStorageKeys: {
      cartId: 'shoppingCartId'
    },
    queryString: {
      cartId: 'cartId'
    },
    itemStatus: {
      scheduled: 'SCHEDULED',
      unscheduled: 'UNSCHEDULED'
    },
    isDependentFlag: {
      yes: 'YES',
      no: 'NO'
    },
    currencyDecimals: 2,
    errorCodesForPaymentConfirmation: [128, 123, 131]
  },
  google: {
    keyNames: {
      postalCode: 'postal_code',
      streetNumber: 'street_number',
      route: 'route',
      sublocality: 'sublocality',
      sublocalityLevel1: 'sublocality_level_1',
      locality: 'locality',
      neighborhood: 'neighborhood',
      administrativeAreaLevel1: 'administrative_area_level_1',
      administrativeAreaLevel2: 'administrative_area_level_2',
      administrativeAreaLevel3: 'administrative_area_level_3',
      country: 'country'
    }
  },
  willingToTravelFlags: {
    yes: 'Y',
    no: 'N'
  },
  distanceUnit: {
    miles: 'M',
    km: 'K'
  },
  conversion: {
    feetToInch: 12,
    inchToFeet: 0.0833333,
    poundsToKilos: 0.453592,
    kilosToPounds: 2.20462,
    milesToKilometres: 1.60934,
    kilometresToMiles: 0.621371
  },
  units: {
    mass: {
      kilos: 'K',
      pounds: 'P'
    },
    length: {
      feet: 'F',
      inch: 'I'
    },
    distance: {
      kilometres: 'K',
      miles: 'M'
    }
  },
  weekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  workingDaysSlider: {
    maxValue: 1200, // In minutes 20:00
    minValue: 300, // In minutes 5:00
    stepSize: 5,
    defaultDayTiming: {
      startTime: {
        hour: 8,
        minute: 0
      },
      endTime: {
        hour: 17,
        minute: 0
      }
    },
    defaultDayTimingInFloat: {
      min: 570, // In minutes 9:30
      max: 1110 // In minutes 18:30
    }
  },
  displayTypes: {
    block: 'block',
    none: 'none'
  },
  fieldClasses: {
    holder: 'field-holder',
    error: 'field-holder error'
  },
  maxFeet: 8,
  maxInches: 11,
  bookingPreference: {
    mode: {
      autoAccept: 'A',
      manualAccept: 'N'
    },
    initalBookingCutOffTime: {
      autoAccept: 3,
      manualAccept: 8
    },
    bookingCutOffTime: {
      min: 1,
      max: 24
    }
  },
  minAthleteAge: 13,
  avgAthleteAge: 18,
  maxAthleteAge: 120,
  minParentAge: 0,
  avgParentAge: 3,
  maxParentAge: 999,
  maxSpecificPricing: 32768,
  ispRegFlowPageKeys: {
    services: 'SERVICES',
    trainingPrefernce: 'TRAINING_PREF',
    pricing: 'PRICING',
    travelPreference: 'TRAVEL_PREF',
    locations: 'LOCATIONS',
    sessions: 'SESSIONS',
    biography: 'BIOGRAPHY',
    listing: 'LISTINGS',
    media: 'MEDIA',
    schedules: 'SCHEDULES'
  },
  businessEmailVerificationStatus: {
    verified: 'Y',
    notVerified: 'N'
  },
  businessEmailOTPLength: 6,
  emailOTPLength: 6,
  contactPreferences: {
    smsFlags: {
      yes: 'Y',
      no: 'N'
    }
  },
  scroll: {
    profile: 0,
    preferences: 575,
    locations: 1300,
    session: 1730,
    biography: 225,
    listing: 225
  },
  scrollDelay: 1000,
  defaultOfferTerminology: 'Session',
  defaultOfferTerminologyPlural: 'Sessions',
  defaultOfferTerminologyValue: 'Session',
  parent: {
    maxAgeApplicableForGrade: 18
  },
  regularExp: {
    urlProtocol: /^[a-zA-Z]+:\/\//
  },
  url: {
    prtocol: 'https://'
  },
  emailVerificationStatusCode: {
    emailExists: 106
  },
  InviteAthlete: {
    inviteBy: {
      email: 'EMAIL',
      profile: 'PROFILE'
    },
    tagDelimiters: [',', 'Enter']
  },
  RepeatSession: {
    frequency: {
      daily: 'daily',
      weekly: 'weekly'
    },
    endRepeatType: {
      onDate: 'onDate',
      forever: 'forever'
    }
  },
  defaultPicture: 'photo-default.png',
  defaultPhone: '123456789',
  payment: {
    types: {
      card: 'card',
      wallet: 'wallet',
      threeDSecure: 'three_d_secure'
    },
    threeDSecure: {
      options: {
        optional: 'optional',
        required: 'required'
      }
    },
    queryStrings: {
      clientSecret: 'client_secret',
      liveMode: 'livemode',
      source: 'source',
      canSaveCard: 'canSaveCard',
      canUseWallet: 'canUseWallet',
      canUseReward: 'canUseReward',
      rewardAmount: 'rewardAmount',
      transactionId: 'transactionId'
    },
    saveCardFlags: {
      yes: 'Y',
      no: 'N'
    }
  },
  experienceLimit: 99,
  pricingOperators: {
    add: 'A',
    subtract: 'S'
  },
  isPercentFlags: {
    yes: 'Y',
    no: 'N'
  },
  athleteScheduler: {
    errorCodes: {
      schedule: [132, 133, 134]
    }
  },
  trainigTypes: {
    private: 'trainingType.private',
    group: 'trainingType.group',
    team: 'trainingType.team',
    clinic: 'trainingType.clinics'
  },
  bookingActorType: {
    athlete: 'ATHLETE',
    ssp: 'SSP'
  }
};
export default constansts;

