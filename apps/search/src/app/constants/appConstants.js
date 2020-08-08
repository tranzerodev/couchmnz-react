import config from '../config';

const constansts = {
  nicknameAvailabilityFlags: {
    available: 'Y',
    notAvailable: 'N'
  },
  zipCodeMaxlength: 20,
  profilePicture: {
    size: 2097152,
    sizeInMB: 2,
    dimensions: {
      width: 360,
      height: 360
    },
    extensions: ['.jpg', '.jpeg', '.png'],
    extensionsDisplay: ['jpg, ', 'jpeg, ', 'png']
  },
  actionPicture: {
    size: 2097152,
    sizeInMB: 2,
    maxPictures: 10,
    dimensions: {
      width: 1200,
      height: 800
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
  numberOfYears: 35,
  saveType: {
    sportsSpecific: 'SS',
    onlyProfile: 'OP',
    both: 'B'
  },
  defaultSession: {
    yes: 'Y',
    no: 'N'
  },
  profileActiveFlages: {
    active: 'Y',
    inactive: 'N'
  },
  athleteAgeList: [
    {
      name: 'Toddler (0-4)',
      description: 'Toddler (0-4)'
    },
    {
      name: 'Child (5-9)',
      description: 'Child (5-9)'
    },
    {
      name: 'Preteen (10-12)',
      description: 'Preteen (10-12)'
    },
    {
      name: 'Adolescent (13-17)',
      description: 'Adolescent (13-17)'
    },
    {
      name: 'Collegiate (18-22)',
      description: 'Collegiate (18-22)'
    },
    {
      name: 'Adult',
      description: 'Adult'
    },
    {
      name: 'Masters',
      description: 'Masters'
    }
  ],
  athleteSkillList: [

    {
      name: 'Beginner',
      description: 'Beginner'
    },
    {
      name: 'Intermediate',
      description: 'Intermediate'
    },
    {
      name: 'Advanced',
      description: 'Advanced'
    },
    {
      name: 'Professional',
      description: 'Professional'
    },
    {
      name: 'Paralympic',
      description: 'Paralympic'
    }
  ],
  trainerTypeList: [
    {
      name: 'Individual Sole Proprietor',
      description: 'Individual Sole Proprietor'
    }
  ],
  trainerSessionList: [
    {
      name: 'Private Training',
      description: 'Private Training'
    },
    {
      name: 'Group Training',
      description: 'Group Training'
    },
    {
      name: 'Team Training',
      description: 'Team Training'
    },
    {
      name: 'Clinics',
      description: 'Clinics'
    }
  ],
  yearOfTrainingExperienceList: [
    {
      name: '<5',
      description: 'Under 5 yr'
    },
    {
      name: '5-10',
      description: '5 - 10 yr'
    },
    {
      name: '10-15',
      description: '10 - 15 yr'
    },
    {
      name: '>15',
      description: 'Over 15 yr'
    }
  ],
  yearOfPlayingExperienceList: [
    {
      name: '<5',
      description: 'Under 5 yr'
    },
    {
      name: '5-10',
      description: '5 - 10 yr'
    },
    {
      name: '10-15',
      description: '10 - 15 yr'
    },
    {
      name: '>15',
      description: 'Over 15 yr'
    }
  ],
  genders: {Male: 'M', Female: 'F'},
  instantBook: {Yes: 'Y', No: 'N'},
  isCertified: {Yes: 'Y', No: 'N'},
  canTravel: {Yes: 'Y', No: 'N'},
  sportTextDebounceTimeout: 250,
  searchQueryKeys: {
    sportName: 'sports.name',
    locationName: 'sports.trainingLocations.fullAddress',
    athleteGenders: 'sports.athleteGenders',
    athleteSkills: 'sports.athleteSkills',
    athleteAgeGroups: 'sports.athleteAgeGroups',
    yearOfCoachingExperienceRanges: 'sports.yearOfCoachingExperience',
    yearOfPlayingExperienceRanges: 'sports.yearOfPlayingExperience',
    sspSubType: 'sports.sspSubType',
    sspSubTypeNames: 'sports.sspSubType.name',
    basePrice: 'sports.sspSubType.basePrice',
    isCertified: 'isCertified',
    certificates: 'certificates',
    certificatesCategory: 'certificates.category',
    certificatesSubCategory: 'certificates.subCategory',
    sspTypes: 'sspType',
    gender: 'gender',
    canAcceptInstantBooking: 'canAcceptInstantBooking',
    canTravel: 'sports.canTravel',
    minPrice: 'minPrice',
    maxPrice: 'maxPrice',
    trainingLocations: 'sports.trainingLocations',
    trainingLocation: 'sports.trainingLocations.location',
    distance: 'distance',
    unit: 'unit',
    page: 'from',
    limit: 'size'

  },
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
    page: 'page',
    sortBy: 'sort_by'
  },
  locationSuggesttionESFields: [
    'sports.trainingLocations.worldRegion',
    'sports.trainingLocations.country',
    'sports.trainingLocations.localRegion',
    'sports.trainingLocations.state',
    'sports.trainingLocations.city',
    'sports.trainingLocations.area'
  ],
  primaryLocSearchESFields: [
    'sports.trainingLocations.city.name',
    'sports.trainingLocations.state.name',
    'sports.trainingLocations.country.name',
    'sports.trainingLocations.localRegion.name',
    'sports.trainingLocations.worldRegion.name',
    'sports.trainingLocations.fullAddress'
  ],
  googleMapsConfig: {
    apiKey: config.googleApiKey,
    version: '3.30'
  },
  eventQueries: {
    location: 'location_id',
    service: 'service_id',
    facility: 'facility_id',
    skill: 'skill_id',
    gender: 'gender',
    ageGroup: 'age_group_id',
    date: 'sess_date'
  },
  mapZoomLevel: {
    min: 4,
    max: 20,
    default: 11,
    custom: 5
  },
  mapZoomCondionThreshold: 15,
  mapZoomCondionThresholdValue: 6,
  defaultMapCenter: {
    lat: 37.2582146,
    lng: -104.654745

  },
  distanceZoomLevelMapping: {
    4: 1500,
    5: 800,
    6: 500,
    7: 200,
    8: 100,
    9: 50,
    10: 30,
    11: 15,
    12: 10,
    13: 5,
    14: 2,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 1,
    20: 1
  },
  indexToDistanceMapping: [
    1, 2, 5, 10, 15, 30, 50, 100, 200, 500, 800, 1500
  ],
  defaultLimit: 50,
  defaultSearchLocation: 'United States',
  searchItemMaxLength: 40,
  filterType: {
    athlete: {key: 'athlete', value: 'green'},
    trainer: {key: 'trainer', value: 'lightblue'},
    training: {key: 'training', value: 'lightblue'},
    year: {key: 'year', value: 'lightblue'},
    session: {key: 'session', value: 'lightblue'},
    is: {key: 'is', value: 'lightblue'},
    distance: {key: 'distance', value: 'lightorange'},
    can: {key: 'can', value: 'lightorange'},
    min: {key: 'min', value: 'darkblue'},
    max: {key: 'max', value: 'darkblue'}
  },
  genderType: {
    male: {key: 'M', value: 'FilterCloud.male'},
    female: {key: 'F', value: 'FilterCloud.female'}
  },
  offerPercent: 50,
  trainigType: {
    private: 'PRIVATE TRAINING',
    group: 'GROUP TRAINING',
    team: 'TEAM TRAINING',
    clinic: 'CLINICS'
  },
  trainigTypes: {
    private: 'trainingType.private',
    group: 'trainingType.group',
    team: 'trainingType.team',
    clinic: 'trainingType.clinics'
  },
  sspTypes: {
    isp: 'sspTypes.isp',
    business: 'sspTypes.business',
    clinic: 'sspTypes.clinic',
    trainingFacility: 'sspTypes.training'
  },

  SSPProfile: {
    offerType: {
      gender: 'GENDER'
    }
  },
  sortinFilterValues: {
    priceHighToLow: 'price_high-low',
    priceLowToHigh: 'price_low-high'
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
      cartId: 'shoppingCartId',
      savedSchedules: 'schedules'
    },
    queryString: {
      cartId: 'cartId'
    },
    itemStatus: {
      scheduled: 'SCHEDULED',
      unscheduled: 'UNSCHEDULED'
    },
    qty: {
      max: 99,
      min: 1
    },
    isDependentFlag: {
      yes: 'YES',
      no: 'NO'
    },
    currencyDecimals: 2
  },
  auth: {
    otpCodeLength: 6,
    errorCode: {
      accountNotActive: 5
    }
  },
  userProfileTypes: {
    ISP: 'isp',
    ATHLETE: 'athlete',
    PARENT: 'parent'
  },
  profilePreviewParameter: '1527684316'
};
export default constansts;
