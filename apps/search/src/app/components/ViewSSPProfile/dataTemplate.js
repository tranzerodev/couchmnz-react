this.state = {
  loading: true,
  navactive: '',
  schedules: [],
  isSection: {
    ProfilePop: true,
    LocationPop: true,
    SessionsPop: true,
    ReviewsPop: true,
    CAQPop: true
  },
  showSideBar: false,
  data: {sspID: '524ef252566',
    sports: [{name: 'Golf', sportsID: '2125bf15gt'}, {name: 'Baseball', sportsID: '515125884haft256'}, {name: 'Cricket', sportsID: 'lp2525998ko'}],
    sessionTerm: 'Training',
    isActive: true,
    isVerified: false,
    firstName: 'Neil',
    lastName: 'Mcguire',
    displayName: 'Neil McG',
    displayPicture: 'http://www.keithwilliamsgolf.com/files/www.keithwilliamsgolf.com/image/Keith%20Williams%20profile.jpg',
    numberOfReviews: 19,
    rating: 4.8,
    presentSport: 'Golf',
    specialization: {
      roles: [
        'Caddy',
        'Golfer',
        'Fitter'
      ]
    },
    ssptype: 'Individual Trainer',
    ssptypeID: '',
    contact: {
      locationName: 'McG Sports',
      street: '48 Haskins Ranch Circle',
      locale: 'Danville Central',
      cityID: '58e4b35ddb252928067b3857',
      cityName: 'Danville',
      stateName: 'CA',
      country: 'USA',
      continent: 'North America'
    },
    ssPics: [
      {
        src: 'https://sunrisesoccer.demosphere-secure.com/_files/coaches-1/sunrise-sc-senior-coaches/Coach%20Andres%20Profile.jpg'
      },
      {
        src: 'https://sunrisesoccer.demosphere-secure.com/_files/coaches-1/sunrise-sc-senior-coaches/coach%20russ%20profile.jpg'
      },
      {
        src: 'https://blog.campchampions.com/hs-fs/hub/314467/file-510211292-gif/Blog_Images/overnight-summer-camp-vs-sports-camp-football.gif?t=1517332106119&width=455&name=overnight-summer-camp-vs-sports-camp-football.gif'
      },
      {
        src: 'https://www.active.com/Assets/sports-camp.jpg'
      }
    ],
    profVideo: {
      src: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4?test1',
      type: 'video/mp4'
    },
    certBadges: [
      {
        src: 'https://nbcsportsgrouppressbox.files.wordpress.com/2012/12/pga_tour1.gif'
      },
      {
        src: 'https://prairiestonesports.com/wp-content/themes/pss-2016/images/stories/images/PersonalTraining-logo.png'
      }
    ],
    brief: 'I\'m passionate about helping people take their game to the next level.',
    experience: [
      {
        role: 'Coaching',
        timeinYrs: 23,
        categs: [
          'Collegiate Golfers',
          'LPGA Tours',
          'LPGA Symetra Tours',
          'Mini Tours'
        ]
      },
      {
        role: 'Playing',
        timeinYrs: 11,
        categs: [
          'Teen Golf Tournament',
          'Collegiate Events'
        ]
      },
      {
        role: 'Caddy-ing',
        timeinYrs: 5,
        categs: [
          'Teen Golf Pro Tournament',
          'Pro Events'
        ]
      }
    ],
    coachesAt: {
      street: '48 Haskins Ranch Circle',
      cityID: '58e4b35ddb252928067b3857',
      cityName: 'Danville',
      stateName: 'California',
      zip: '94506',
      location: {
        lat: 37.795127,
        lng: -121.912959
      }
    },
    awards: [
      '2016 PGA Championship Winner',
      '2011 Teen Pro Tournament Runner-up'
    ],
    sportAwards: [
      '2015 PGA Champion Coach',
      '2013 Teen Pro Tournament Coach'
    ],
    certifications: [
      'PGA Golf',
      'United States Golf Federation (USSF)',
      'PGA Canada'
    ],
    sportCertifs: [
      'Nike',
      'Adams',
      'Bridgestone'
    ],
    edDegrees: [
      'M.S. in Nutrition, Ohio State University',
      'GNDS, University of Michigan'
    ],
    sportDegrees: [
      'M.S. in Nutrition, Ohio State University',
      'GNDS, University of Michigan'
    ],
    aboutMe: 'Neil McGuire completed his sixth season as California\'s head coach in 2012 owning a 73-41-12 overall record with the Golden Bears. McGuire has overseen the development of multiple national team players on both the domestic and international levels. Betsy Hassett completed her career at Berkeley this fall after playing in the London Olympics and the 2011 World Cup with the New Zealand national squad. Four-year Bear Alex Morgan is currently a member of the U.S. National Team and won gold at the London Olympics, where she scored three goals, including one game winner. Morgan, one of most decorated Cal women\'s soccerplayer in history - also won silver at the 2011 FIFA Women\'s World Cup. Morgan was the No. 1 draft pick in the 2011 WPS draft, marking the first-ever top draft prospect for the Bears. Additionally, former Bear and Icelandic National Team member Katrin Omarsdottir is currently playing professionally. In addition to his responsibilities at Cal, McGuire served as one of the head coaches on the Region 4 Olympic Development Program staff, on which he has led the 1995 and 1994 age groups. In 2010 and 2011, he coached the Mustang Blast to back-to-back Northern California State Championships, winning the Far West Regional Championships in 2011 before finishing tied for third in points at the USYSA National Championships. He joined the University of California family with his wife, Jesica, daughter, Kelyn, and sons, Ethan and Owen. ',
    coachStyle: 'Don\'t be fooled by the white Hair. When he starts running you will see that he\'s done two circles around you even before you\'ve taken the first step. On the coaching front he has trained noobs, pros and veterans and they each rated him more than 4. He knows his stuff and knows how to find your improvement areas with razor-like precision.',
    trainingTerm: 'Session',
    priceCurrency: '$',
    priceMin: 52,
    pricePerSession: {
      trainingTypes: [
        {
          name: 'Private Training',
          priceMin: 62,
          priceMax: 70
        },
        {
          name: 'Team Training',
          priceMin: 52,
          priceMax: 178
        },
        {
          name: 'Group Training',
          priceMin: 60,
          priceMax: 78
        }
      ]
    },
    trainingOffer: [
      'Any Gender',
      'All Ages',
      'Beginner, Intermediate'
    ],
    trainTypes: [
      'Private',
      'Group',
      'Team',
      'Camp'
    ],
    trainSpeciality: [
      'Putting',
      'Short Game',
      'Full Swing',
      'Bunker Play'
    ],
    otherService: [
      'Club Fitting',
      'Book Reading'
    ],
    address: [
      {
        id: 0,
        name: 'McG Sports',
        street: 'Greenbrook School Park',
        cityID: '58e4b35ddb252928067b3857',
        city: 'Danville',
        state: 'California',
        country: 'United States of America',
        zip: '94526',
        facility: 'Indoor, Faux Turf',
        lat: 37.79135,
        lng: -121.97447,
        locationWebsite: 'http://www.mcg.org.au/things-to-do/national-sports-museum'
      },
      {
        id: 1,
        name: 'McG Water Sports',
        street: 'Danville Central',
        cityID: '58e4b35ddb252928067b3857',
        city: 'Danville',
        state: 'California',
        country: 'United States of America',
        zip: '94506',
        facility: 'Stadium 24m Deep Pool, Jetskis, Artificial Beach',
        lat: 37.833333,
        lng: -122,
        locationWebsite: 'http://www.mcg.org.au/things-to-do/national-sports-museum'
      }
    ],
    specQs: [
      {
        Ques: 'What is the best training session for this trainer?',
        Ans: 'All of them.'
      }
    ],
    commonQs: [
      {
        Ques: 'What is the best training session?',
        Ans: 'The one offered by this coach. Try it. Book it. Buy a career.'
      }
    ],
    instUSP: 'This instructor offers a lot for a low cost and of mediocre skill-level.',
    sessions: [
      {
        sessionDispName: 'session1',
        trainLocation: {
          trainDistancetoUser: '3mi',
          trainVenue: 'Danville High',
          trainCity: 'Danville',
          trainCounty: 'Danville',
          trainState: 'California',
          trainCountry: 'USA',
          trainType: 'Group',
          trainSpeciality: [
            'Golfer'
          ],
          trainFacilities: [
            'MiniCourse',
            'Putt Practice'
          ]
        },
        trainSched: [
          {
            trainLocFlag: 0,
            trainOpen: 4,
            traineeSkillLevel: 'Novice',
            traineeAgeGroup: '25-35',
            traineeGender: 'Male',
            trainDates: []
          },
          {
            trainLocFlag: 0,
            trainOpen: 1,
            traineeSkillLevel: 'Novice',
            traineeAgeGroup: '17-24',
            traineeGender: 'Male',
            trainDates: [
              '2017-02-21',
              '2017-02-24'
            ]
          }
        ]
      },
      {
        sessionDispName: 'session2',
        trainLocation: {
          trainDistancetoUser: '1mi',
          trainVenue: 'Danville Club',
          trainCity: 'Danville',
          trainCounty: 'Danville',
          trainState: 'California',
          trainCountry: 'USA',
          trainType: 'Private',
          trainSpeciality: [
            'Golfer',
            'Caddy'
          ],
          trainFacilities: [
            'MiniCourse',
            'Wacker Cage',
            'Putt Practice'
          ]
        },
        trainSched: [
          {
            trainLocFlag: 0,
            trainOpen: 0,
            traineeSkillLevel: 'Novice',
            traineeAgeGroup: '25-35',
            traineeGender: 'Male',
            trainDates: [
              '2017-02-01',
              '2017-02-03',
              '2017-02-07',
              '2017-02-10',
              '2017-02-12',
              '2017-02-14',
              '2017-02-18'
            ]
          },
          {
            trainLocFlag: 0,
            trainOpen: 12,
            traineeSkillLevel: 'Amateur',
            traineeAgeGroup: '17-24',
            traineeGender: 'Male',
            trainDates: [
              '2017-02-02',
              '2017-02-06',
              '2017-02-09',
              '2017-02-15',
              '2017-02-22'
            ]
          }
        ]
      }
    ],
    simProfile: [
      {
        displayName: 'Simon Burton',
        profileSSImage: 'http://hoopgroup.com/wp-content/uploads/2013/08/James-Cormier-e1376411577167.jpg',
        rating: 4.3,
        isVerified: true,
        trainerType: 'Individual Trainer',
        sportsCoachedIn: [
          'Soccer',
          'Golf',
          'Swimming'
        ],
        coachesAt: {
          Place: 'Danvers',
          State: 'Massachussetts',
          Country: 'USA'
        },
        expertTag: '20 years of Coaching experience in sports I spent 15 years training for and playing.',
        rateMin: '160',
        rateCurr: '$',
        rateUnit: 'Session'
      },
      {
        displayName: 'Sharon Douglas',
        profileSSImage: 'http://lifechanging.fitness/wp-content/uploads/2014/03/LEIGH-Coaches-PROFILE.jpg',
        rating: 3.5,
        isVerified: false,
        trainerType: 'Individual Trainer',
        sportsCoachedIn: [
          'Golf'
        ],
        coachesAt: {
          Place: 'Seattle',
          State: 'Washington',
          Country: 'USA'
        },
        expertTag: '18 years training the next generation of Football players.',
        rateMin: '120',
        rateCurr: '$',
        rateUnit: 'Day'
      },
      {
        displayName: 'Tanya Roberts',
        profileSSImage: 'http://lifechanging.fitness/wp-content/uploads/2014/03/LEIGH-Coaches-PROFILE.jpg',
        rating: 2.4,
        isVerified: false,
        trainerType: 'Individual Trainer',
        sportsCoachedIn: [
          'Golf',
          'Ice-Hockey'
        ],
        coachesAt: {
          Place: 'New York City',
          State: 'New York',
          Country: 'USA'
        },
        expertTag: '18 years training the next generation of Football players.',
        rateMin: '80',
        rateCurr: '$',
        rateUnit: 'hr'
      }
    ],
    trainLocationBC: {

      continent: 'North America',
      continentID: '2525669',

      country: 'USA',
      countryID: '56fed52889',

      state: 'California',
      stateID: '4022695',

      distCounty: 'Danville County',
      distCountyID: '897655656red',

      city: 'Danville',
      cityID: 'efr256687'

    },
    nearbySSPCountry: [
      {
        name: 'Florida',
        distCountyID: 'free58445'
      },
      {
        name: 'Greater San Jose',
        distCountyID: 'froi43324'
      }
    ],
    nearbySSPCity: [
      {
        name: 'San Francisco',
        cityID: 'sfran3244567'
      },
      {
        name: 'New York',
        cityID: 'nyny259986'
      }
    ]},
  sessionFilteredList: [
    {
      sessionID: '52eef36265',
      sessionTime: {
        start: 700,
        end: 800
      },
      trainOpen: 4,
      sessionPunch: 'Girls Golf Team for Pre-finals',
      sessionSport: 'Golf',
      sessionType: 'Team Training',
      sessionGender: 'Female',
      sessionAgeG: '13-17 yrs',
      sessionSkillLevel: 'Intermediate',
      trainVenue: 'McG Water Sports',
      trainVenueID: '25889gre6355',
      distAway: '3 mi away',
      sessionRegRate: {
        rate: 68,
        currency: '$'
      },
      discountRate: {
        amt: 10,
        currency: '$',
        percent: 101
      }
    },
    {
      sessionID: '52eef36265',
      sessionTime: {
        start: 900,
        end: 1130
      },
      trainOpen: 3,
      sessionPunch: 'Men\'s Golf Team for Semi-finals',
      sessionSport: 'Golf',
      sessionType: 'Men Training',
      sessionGender: 'Male',
      sessionAgeG: '21-24 yrs',
      sessionSkillLevel: 'Amateur',
      trainVenue: 'McG Sports',
      trainVenueID: '25889gre6355',
      distAway: '0.5 mi away',
      sessionRegRate: {
        rate: 154,
        currency: '$'
      },
      discountRate: {
        amt: 0,
        currency: '%',
        percent: 15
      }
    },
    {
      sessionID: '52eef36265',
      sessionTime: {
        start: 1200,
        end: 1430
      },
      trainOpen: 3,
      sessionPunch: 'Men\'s Golf Team for Semi-finals',
      sessionSport: 'Golf',
      sessionType: 'Men Training',
      sessionGender: 'Male',
      sessionAgeG: '21-24 yrs',
      sessionSkillLevel: 'Amateur',
      trainVenue: 'McG Sports',
      trainVenueID: '25889gre6355',
      distAway: '0.5 mi away',
      sessionRegRate: {
        rate: 154,
        currency: '$'
      },
      discountRate: {
        amt: 0,
        currency: '%',
        percent: 15
      }
    },
    {
      sessionID: '52eef36265',
      sessionTime: {
        start: 1800,
        end: 1930
      },
      trainOpen: 3,
      sessionPunch: 'Men\'s Golf Team for Semi-finals',
      sessionSport: 'Golf',
      sessionType: 'Men Training',
      sessionGender: 'Male',
      sessionAgeG: '21-24 yrs',
      sessionSkillLevel: 'Amateur',
      trainVenue: 'McG Sports',
      trainVenueID: '25889gre6355',
      distAway: '0.5 mi away',
      sessionRegRate: {
        rate: 154,
        currency: '$'
      },
      discountRate: {
        amt: 0,
        currency: '%',
        percent: 15
      }
    },
    {
      sessionID: '52eef36265',
      sessionColor: '#eeb0ec',
      sessionTime: {
        start: 2000,
        end: 2200
      },
      trainOpen: 3,
      sessionPunch: 'Men\'s Golf Team for Semi-finals',
      sessionSport: 'Golf',
      sessionType: 'Men Training',
      sessionGender: 'Male',
      sessionAgeG: '21-24 yrs',
      sessionSkillLevel: 'Amateur',
      trainVenue: 'McG Sports',
      trainVenueID: '25889gre6355',
      distAway: '0.5 mi away',
      sessionRegRate: {
        rate: 154,
        currency: '$'
      },
      discountRate: {
        amt: 0,
        currency: '%',
        percent: 15
      }
    }
  ],
  sessionBookList: []
};
