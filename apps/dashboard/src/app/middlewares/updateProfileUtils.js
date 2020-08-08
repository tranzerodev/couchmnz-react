import {Map} from 'immutable';
function constructProfileSection(profile, contact, presentNickName) {
  const displayPicture = (profile.displayPicture) ? profile.displayPicture : '';
  const {firstName, lastName, gender} = contact;
  const {nickname} = presentNickName;

  return {
    ...profile,
    displayPicture,
    nickName: nickname,
    firstName,
    lastName,
    gender
  };
}

function constructProfileSummary(summary, {sport, genCertifications, genAwards, genAffiliations, degrees, genTools, training}) {
  const {sports} = summary;
  let newSports = [];
  const {id, name} = sport;

  const existedSport = (sports.findIndex(sportItem => sportItem.id === id) > -1);
  if (existedSport) {
    console.log('newsport dnabs dfy451vn.', sports);
    newSports = [].concat(sports);
  } else {
    newSports = sports.concat({id, name});
    console.log('newsport dnabs dfy47914254543143.', sports);
  }

  return (
    {
      ...summary,
      sports: newSports,
      nonSportSpecializations: [],
      genCertifications,
      genAwards,
      genAffiliations,
      genUnivDegrees: degrees,
      genTools,
      subSSPTypes: training
    }
  );
}
/* eslint new-cap:0 */
function constructContact(contact) {
  const contactMap = Map(contact);
  return contactMap.delete('firstName').delete('lastName').delete('gender').toObject();
}
/* eslint new-cap:0 */

export function constructProfile(storeState) {
  const {
    bookingPreferences,
    cancellationPolicy,
    businessModel,
    contact, degrees, sport,
    payoutOption, bankDetails,
    paypalDetails, currency, profile, training,
    genCertifications, genAwards, genAffiliations, genTools, presentNickName,
    bookingCutOffTime

  } = storeState;

  const profileSection = (profile.data && profile.data.profile) ? profile.data.profile : {};

  const profileSummary = (profile.data && profile.data.summary) ? profile.data.summary : {};

  const newProfileSection = constructProfileSection(profileSection, contact, presentNickName);

  const newProfileSummary = constructProfileSummary(profileSummary, {sport, genCertifications, genAwards, genAffiliations, degrees, genTools, training});

  const newContact = constructContact(contact);

  return {
    profile: newProfileSection,
    summary: newProfileSummary,
    notes: {
      meetNotes: '',
      firstPrepNotes: '',
      gearNotes: ''
    },
    contact: newContact,
    bookingPreference: bookingPreferences,
    bookingCutOffTime,
    workHours: [],
    cancellationPolicy,
    businessModel,
    payoutOption,
    currency,
    bankDetails,
    paypalDetails
  };
}
