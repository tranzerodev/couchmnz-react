const constants = {
  endpoints: {
    home: {
      method: 'GET',
      url: 'https:www.coachlist.com/'
    }
  },
  profiles: [{
    id: '593fb4615e78ff2d7860f620',
    displayName: 'Paul Temple',
    businessName: 'NZ International Coach',
    sports: [{
      id: '',
      name: 'soccer',
      image: '/images/icons/soccer.png'
    }],
    ages: [{
      id: '',
      name: 'Collegiate (18-22)'
    },
    {
      id: '',
      name: 'Adolescent (13-17)'
    }],
    location: {
      lat: -36.918115,
      lng: 174.796405
    },
    numberOfReviews: 0,
    experience: 14,
    displayPicture: '/images/profile/photo-default.png',
    distanceFromClient: 0,
    pricePerHour: {
      min: 80,
      max: 150
    }
  },
  {
    id: '593fb4615e78ff2d7860f61d',
    displayName: 'Neil Mcguire',
    businessName: 'Neil McGuire\'s Soccer School',
    sports: [{
      id: '',
      name: 'soccer',
      image: '/images/icons/soccer.png'
    }],
    ages: [{
      id: '',
      name: 'Collegiate (18-22)'
    },
    {
      id: '',
      name: 'Child (5-9)'
    },
    {
      id: '',
      name: 'Preteen (10-12)'
    },
    {
      id: '',
      name: 'Adult'
    },
    {
      id: '',
      name: 'Adolescent (13-17)'
    }],
    location: {
      lat: 37.82705,
      lng: -121.997692
    },
    numberOfReviews: 0,
    experience: 19,
    displayPicture: '/images/profile/photo-default.png',
    distanceFromClient: 0,
    pricePerHour: {
      min: 30,
      max: 70
    }
  }]
};

export default constants;
