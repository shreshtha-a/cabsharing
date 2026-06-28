// utils/localRides.js
// Temporary local storage layer until backend driver verification is built

export const getLocalRides = () => {
  try {
    return JSON.parse(localStorage.getItem('hopin_published_rides') || '[]');
  } catch {
    return [];
  }
};

export const saveLocalRide = (ride) => {
  const rides = getLocalRides();
  rides.unshift(ride); // newest first
  localStorage.setItem('hopin_published_rides', JSON.stringify(rides));
};

export const deleteLocalRide = (id) => {
  const rides = getLocalRides().filter(r => r.id !== id);
  localStorage.setItem('hopin_published_rides', JSON.stringify(rides));
};